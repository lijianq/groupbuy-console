import Request from '@/api/common/Request'
import COS from "cos-js-sdk-v5";
import CosConfig from "./CosConfig"
import CosUpload from "./CosUpload"

export class CosAPI {

    private request = Request.getDefaultInstance()

    async getCosToken(payload: any) {
        return this.request.request({
            url: '/qcos/token',
            method: 'post',
            data: payload
        })
    }

    async uploadFiles(uploads: CosUpload[], targetId?: string) {
        const result: any = {}
        if (uploads && uploads.length > 0) {
            const params: any = {}
            params.bucket = CosConfig.bucket
            params.region = CosConfig.region
            if (targetId) {
                params.targetId = targetId
            }
            const tokenResponse = await this.getCosToken(params)
            const tokenData: any = tokenResponse.data
            const cos = new COS({
                getAuthorization: (options: any, callback: any) => {
                    const obj = {
                        TmpSecretId: tokenData.credentials.tmpSecretId,
                        TmpSecretKey: tokenData.credentials.tmpSecretKey,
                        XCosSecurityToken: tokenData.credentials.sessionToken,
                        StartTime: tokenData.startTime, // 时间戳，单位秒，如：1580000000
                        ExpiredTime: tokenData.expiredTime // 时间戳，单位秒，如：1580000900
                    }
                    callback(obj)
                }
            })
            result.targetId = tokenData.targetId
            for (let i = 0; i < uploads.length; i++) {
                const upload = uploads[i]
                const file = upload.file
                if (file) {
                    const response = await this.putFile(cos, file, tokenData.targetId, upload.targetName)
                    result[upload.key] = response
                }
            }
            return result
        } else {
            return result
        }
    }

    async uploadFile(file: File, targetId?: string, targetName?: string) {
        if (file) {
            const params: any = {}
            params.bucket = CosConfig.bucket
            params.region = CosConfig.region
            if (targetId) {
                params.targetId = targetId
            }
            const tokenResponse = await this.getCosToken(params)
            const tokenData: any = tokenResponse.data
            const cos = new COS({
                getAuthorization: (options: any, callback: any) => {
                    const obj = {
                        TmpSecretId: tokenData.credentials.tmpSecretId,
                        TmpSecretKey: tokenData.credentials.tmpSecretKey,
                        XCosSecurityToken: tokenData.credentials.sessionToken,
                        StartTime: tokenData.startTime, // 时间戳，单位秒，如：1580000000
                        ExpiredTime: tokenData.expiredTime // 时间戳，单位秒，如：1580000900
                    }
                    callback(obj)
                }
            })
            const result = await this.putFile(cos, file, tokenData.targetId, targetName)
            result.targetId = tokenData.targetId
            return result
        } else {
            return {}
        }
    }

    private async putFile(cos: any, file: File, targetId: string, targetName?: string) {
        let fileName = file.name
        if (targetName) {
            fileName = targetName
        }
        return new Promise<any>((resolve, reject) => {
            cos.putObject({
                Bucket: CosConfig.bucket, /* 必须 */
                Region: CosConfig.region,     /* 存储桶所在地域，必须字段 */
                Key: `/${targetId}/${fileName}`,              /* 必须 */
                StorageClass: CosConfig.StorageClass,
                Body: file // 上传文件对象
            }, function (error: any, result: any) {
                if (error) {
                    error.message = error.error.Message
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        })
    }
}

const cosAPI = new CosAPI()
export default cosAPI
