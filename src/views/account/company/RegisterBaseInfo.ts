import { Component, Vue } from 'vue-property-decorator'
import {WrappedFormUtils} from 'ant-design-vue/types/form/form'
import {RouterConfiguration, Address} from '@/config'

@Component
export default class RegisterBaseInfo extends Vue {

    labelCol = { lg: { span: 5 }, sm: { span: 5 } }
    wrapperCol = { lg: { span: 19 }, sm: { span: 19 } }
    form!: WrappedFormUtils
    addressOptions = Address.options

    created() {
        this.form = this.$form.createForm(this, {name: 'baseInfoForm'})
    }

    nextStep() {
        // const  { form: { validateFields } } = this
        // validateFields((err, values) => {
        //     if (!err) {
        //         console.log(values)
        //         this.$emit('nextStep')
        //     }
        // })
        this.$emit('nextStep')
    }

    backToLogin() {
        this.$router.push({ path: RouterConfiguration.loginPath })
    }
}
