import { Component, Vue } from 'vue-property-decorator'
import {ValidationRule, WrappedFormUtils} from "ant-design-vue/types/form/form";
import {RouterConfiguration} from "@/config";

@Component
export default class ResetPassword extends Vue {

    labelCol = { lg: { span: 5 }, sm: { span: 5 } }
    wrapperCol = { lg: { span: 19 }, sm: { span: 19 } }
    form!: WrappedFormUtils

    created() {
        this.form = this.$form.createForm(this, {name: 'resetForm'})
    }

    resetPassword() {
        // const { form: { validateFields } } = this
        // validateFields((err, values) => {
        //     if (!err) {
        //         console.log('values', values)
        //         this.$emit('nextStep')
        //     }
        // })
        this.$emit('nextStep')
    }

    prevStep () {
        this.$emit('prevStep')
    }

    backToLogin() {
        this.$router.push({ path: RouterConfiguration.loginPath })
    }

    checkConfirmPassword(rules: ValidationRule, value: string, callback: Function){
        const password1 = this.form.getFieldValue('password1');
        if(password1 && password1 !== value){
            callback(new Error(this.$t('account.forgot.reset.password.mismatch') as string))
        }else{
            callback();
        }
    }

}
