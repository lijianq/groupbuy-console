import { Component, Vue, Prop } from 'vue-property-decorator'
import {WrappedFormUtils} from 'ant-design-vue/types/form/form'
import {RouterConfiguration, Address} from '@/config'

@Component
export default class RegisterBaseInfo extends Vue {

    labelCol = { lg: { span: 5 }, sm: { span: 5 } }
    wrapperCol = { lg: { span: 19 }, sm: { span: 19 } }
    form!: WrappedFormUtils
    addressOptions = Address.options

    @Prop({type: Object, default: null})
    baseFormData: any | null

    created() {
        this.form = this.$form.createForm(this, {name: 'baseInfoForm'})
        const { baseFormData } = this
        if (baseFormData) {
            this.form.getFieldDecorator("companyName", { initialValue: baseFormData.companyName})
            this.form.getFieldDecorator("companyIndustry", { initialValue: baseFormData.companyIndustry})
            this.form.getFieldDecorator("companyContact", { initialValue: baseFormData.companyContact})
            this.form.getFieldDecorator("companyEmail", { initialValue: baseFormData.companyEmail})
            this.form.getFieldDecorator("companyPhone", { initialValue: baseFormData.companyPhone})
            this.form.getFieldDecorator("companyRegion", { initialValue: baseFormData.companyRegion})
            this.form.getFieldDecorator("companyAddress", { initialValue: baseFormData.companyAddress})
        }
    }

    nextStep() {
        const  { form: { validateFields } } = this
        validateFields((err, values) => {
            if (!err) {
                this.$emit('nextStep', values)
            }
        })
    }

    backToLogin() {
        this.$router.push({ path: RouterConfiguration.loginPath })
    }
}
