import Request from '@/api/common/Request'
import COS from "cos-js-sdk-v5";
import CosConfig from "./CosConfig"

export class CosAPI {

    private request = Request.getDefaultInstance()

    getCosToken(payload: any) {
        return this.request.request({
            url: '/qcos/token',
            method: 'post',
            data: payload
        })
    }

    putObject(file: File, targetName?: string, targetId?: string) {
        return new Promise((resolve, reject) => {
            const params: any = {}
            params.bucket = CosConfig.bucket
            params.region = CosConfig.region
            if (targetId) {
                params.targetId = targetId
            }
            this.getCosToken(params).then(response => {
                const data: any = response.data
                const cos = new COS({
                    getAuthorization: (options: any, callback: any) => {
                        const obj = {
                            TmpSecretId: data.credentials.tmpSecretId,
                            TmpSecretKey: data.credentials.tmpSecretKey,
                            XCosSecurityToken: data.credentials.sessionToken,
                            StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
                            ExpiredTime: data.expiredTime // 时间戳，单位秒，如：1580000900
                        }
                        callback(obj)
                    }
                })
                let fileName = file.name
                if ( targetName ) {
                    fileName = targetName
                }
                cos.putObject({
                    Bucket: 'company-1302591173', /* 必须 */
                    Region: 'ap-beijing',     /* 存储桶所在地域，必须字段 */
                    Key: `/${data.targetId}/${fileName}`,              /* 必须 */
                    StorageClass: CosConfig.StorageClass,
                    Body: file // 上传文件对象
                }, function (error: any, result: any) {
                    if (error) {
                        reject(error)
                    } else {
                        result.targetId = data.targetId
                        resolve(result)
                    }
                });
            }).catch(error => resolve(error))
        })
    }
}

const cosAPI = new CosAPI()
export default cosAPI
