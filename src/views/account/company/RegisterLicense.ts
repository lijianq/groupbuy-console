import { Component, Vue } from 'vue-property-decorator'
import {WrappedFormUtils} from 'ant-design-vue/types/form/form'
import {RouterConfiguration} from '@/config'

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

    nextStep () {
        // const { form: { validateFields } } = this
        this.loading = true
        this.$emit('nextStep')
        this.loading = false
        // validateFields((err, values) => {
        //     if (!err) {
        //         console.log('values', values)
        //         this.$emit('nextStep')
        //         this.loading = false
        //     } else {
        //         this.loading = false;
        //     }
        // })
    }

    prevStep () {
        this.$emit('prevStep')
    }

    backToLogin() {
        this.$router.push({ path: RouterConfiguration.loginPath })
    }

    checkFile(event: any) {

        if (Array.isArray(event)) {
            return event
        }

        return  event && event.fileList

    }

    handleLicenseFileChange(info: any) {
        let fileList = [...info.fileList]
        fileList = fileList.slice(-1)

        this.licenseFileList = fileList
    }

    handleLogoFileChange(info: any) {
        let fileList = [...info.fileList]
        fileList = fileList.slice(-1)

        this.logoFileList = fileList
    }
}
