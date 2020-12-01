import { Component, Vue } from 'vue-property-decorator'
import {WrappedFormUtils} from 'ant-design-vue/types/form/form'
import {RouterConfiguration, Address} from '@/config'
import StorageKeys from "@/config/StorageKeys"

@Component
export default class RegisterBaseInfo extends Vue {

    labelCol = { lg: { span: 5 }, sm: { span: 5 } }
    wrapperCol = { lg: { span: 19 }, sm: { span: 19 } }
    form!: WrappedFormUtils
    addressOptions = Address.options

    created() {
        this.form = this.$form.createForm(this, {name: 'baseInfoForm'})
        const json = sessionStorage.getItem(StorageKeys.registerBaseKey)
        if (json) {
            const data = JSON.parse(json)
            this.form.getFieldDecorator("companyName", { initialValue: data.companyName})
            this.form.getFieldDecorator("companyIndustry", { initialValue: data.companyIndustry})
            this.form.getFieldDecorator("companyContact", { initialValue: data.companyContact})
            this.form.getFieldDecorator("companyEmail", { initialValue: data.companyEmail})
            this.form.getFieldDecorator("companyPhone", { initialValue: data.companyPhone})
            this.form.getFieldDecorator("companyRegion", { initialValue: data.companyRegion})
            this.form.getFieldDecorator("companyAddress", { initialValue: data.companyAddress})
        }
    }

    nextStep() {
        const  { form: { validateFields } } = this
        validateFields((err, values) => {
            if (!err) {
                sessionStorage.setItem(StorageKeys.registerBaseKey, JSON.stringify(values))
                this.$emit('nextStep')
            }
        })
    }

    backToLogin() {
        sessionStorage.removeItem(StorageKeys.registerBaseKey)
        this.$router.push({ path: RouterConfiguration.loginPath })
    }
}
