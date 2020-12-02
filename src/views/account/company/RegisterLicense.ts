import { Component, Vue } from 'vue-property-decorator'
import {WrappedFormUtils} from 'ant-design-vue/types/form/form'
import {RouterConfiguration} from '@/config'
import StorageKeys from "@/config/StorageKeys"
import cosAPI from "@/api/cos/CosAPI"
import CosUpload from "@/api/cos/CosUpload"

@Component
export default class  RegisterLicense extends Vue {

    labelCol = { lg: { span: 5 }, sm: { span: 5 } }
    wrapperCol = { lg: { span: 19 }, sm: { span: 19 } }
    form!: WrappedFormUtils
    loading = false
    licenseFileList: any[] = []
    logoFileList: any[] = []

    created() {
        this.form = this.$form.createForm(this, {name: 'licenseForm'})
    }

    closeLoading() {
        setTimeout(() => {
            this.loading = false
        }, 600)
    }

    nextStep () {
        const { form: { validateFields } } = this
        this.loading = true

        validateFields((err, values) => {
            if (!err) {
                const base = sessionStorage.getItem(StorageKeys.registerBaseKey)
                if (base) {
                    const baseFormData = JSON.parse(base)
                    baseFormData.companyLicenseNo = values.companyLicenseNo
                    const uploads: CosUpload[] = []
                    if (this.logoFileList.length > 0) {
                        uploads.push(new CosUpload(this.logoFileList[0].originFileObj, 'logo'))
                    }
                    uploads.push(new CosUpload(this.licenseFileList[0].originFileObj, 'license'))
                    cosAPI.uploadFiles(uploads).then( (result: any) => {
                        baseFormData.id = result.targetId
                        if (result.logo) {
                            baseFormData.companyLogo = result.logo.Location
                        }
                        baseFormData.companyLicense = result.license.Location
                        this.$emit('nextStep')
                    }).catch(error => {
                        this.$message.error(error.message)
                        this.closeLoading()
                    })
                } else {
                    this.$emit('prevStep')
                }
            } else {
                this.closeLoading()
            }
        })
    }

    prevStep () {
        this.$emit('prevStep')
    }

    backToLogin() {
        sessionStorage.removeItem("account.register.base.form")
        this.$router.push({ path: RouterConfiguration.loginPath })
    }

    checkFile(event: any) {
        if (Array.isArray(event)) {
            return event
        }
        return  event && event.fileList
    }

    beforeUpload() {
        return false
    }

    handleLogoFileChange(info: any) {
        let fileList = [...info.fileList]
        fileList = fileList.slice(-1)
        if (fileList.length > 0) {
            const file = fileList[0].originFileObj
            if (this.isLarge(file, 1)) {
                this.$message.error(`${this.$t('account.register.license.logo.limit')}`)
                fileList.pop()
            }
        }
        this.logoFileList = fileList
    }

    isLarge(file: File, size: number) {
        return file.size / 1024 / 1024 > size
    }

    handleLicenseFileChange(info: any) {
        let fileList = [...info.fileList]
        fileList = fileList.slice(-1)
        if (fileList.length > 0) {
            const file = fileList[0].originFileObj
            if (this.isLarge(file, 10)) {
                this.$message.error(`${this.$t('account.register.license.license.limit')}`)
                fileList.pop()
            }
        }
        this.licenseFileList = fileList
    }
}
