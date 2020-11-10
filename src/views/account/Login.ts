import { Component, Vue } from 'vue-property-decorator'
import {WrappedFormUtils} from "ant-design-vue/types/form/form"
import md5 from 'md5'

@Component
export default class Login extends Vue {

    form!: WrappedFormUtils
    isLoginError = false
    state = {
        loginBtn: false
    }

    created() {
        this.form = this.$form.createForm(this, {name: 'loginForm'})
    }

    handleSubmit (event: Event) {
        event.preventDefault()
        this.state.loginBtn = true
        const validateFieldsKey = ['account', 'password']
        this.form.validateFields(validateFieldsKey, { force: true }, (err, values) => {
            if (!err) {
                if (values.account == 'admin' && md5(values.password) == '21232f297a57a5a743894a0e4a801fc3') {
                    this.$router.push({ path: '/about' })
                } else {
                    this.isLoginError = true
                    this.state.loginBtn = false
                }
            } else {
                setTimeout(() => {
                    this.state.loginBtn = false
                }, 600)
            }
        })
    }
}
