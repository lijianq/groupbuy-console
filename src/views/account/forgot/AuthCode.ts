import { Component, Vue } from 'vue-property-decorator'
import {WrappedFormUtils} from "ant-design-vue/types/form/form";
import {RouterConfiguration} from "@/config";

@Component
export default class AuthCode extends Vue {
    labelCol = { lg: { span: 7 }, sm: { span: 7 } }
    wrapperCol = { lg: { span: 17 }, sm: { span: 17 } }
    form!: WrappedFormUtils

    created() {
        this.form = this.$form.createForm(this, {name: 'authForm'})
    }

    sendAuthCode() {
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
