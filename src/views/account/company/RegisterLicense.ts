import { Component, Vue } from 'vue-property-decorator'
import {WrappedFormUtils} from 'ant-design-vue/types/form/form'
import {RouterConfiguration} from '@/config'
import StorageKeys from "@/config/StorageKeys"
import cosAPI from "@/api/cos/CosAPI"
import CosConfig from "@/api/cos/CosConfig";

@Component
export default class  RegisterLicense extends Vue {

    labelCol = { lg: { span: 5 }, sm: { span: 5 } }
    wrapperCol = { lg: { span: 19 }, sm: { span: 19 } }
    form!: WrappedFormUtils
    loading = false
    licenseFileList: any[] = []
    logoFileList: any[] = []
    logoFile!: File
    licenseFile!: File

    created() {
        this.form = this.$form.createForm(this, {name: 'licenseForm'})
    }

    nextStep () {
        const { form: { validateFields } } = this
        validateFields((err, values) => {
            if (!err) {
                const base = sessionStorage.getItem(StorageKeys.registerBaseKey)
                if (base) {
                    const baseFormData = JSON.parse(base)
                    baseFormData.companyLicenseNo = values.companyLicenseNo
                    cosAPI.putObject(this.licenseFile, "license.jpg").then( (result: any) => {
                        baseFormData.id = result.targetId
                        baseFormData.companyLicense = result.Location
                        baseFormData.companyLogo = `${CosConfig.cosUrl}${result.targetId}/logo.jpg`
                        cosAPI.putObject(this.logoFile, "logo.jpg", result.targetId);
                        this.$emit('nextStep')
                    }).catch(error => {
                        this.$message.error(error.message)
                    })
                } else {
                    this.$emit('prevStep')
                }
                this.loading = false
            } else {
                this.loading = false;
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

    handleLicenseFileChange(info: any) {
        this.logoFile = info.file
        let fileList = [...info.fileList]
        fileList = fileList.slice(-1)
        this.licenseFileList = fileList
    }

    handleLogoFileChange(info: any) {
        this.licenseFile = info.file
        let fileList = [...info.fileList]
        fileList = fileList.slice(-1)
        this.logoFileList = fileList
    }
}
