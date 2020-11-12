import { Component, Vue } from 'vue-property-decorator'
import {WrappedFormUtils} from "ant-design-vue/types/form/form"
import md5 from 'md5'
import { AccountModule } from "@/store";

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
                    AccountModule.setAccount('admin', ['admin'], '', '1223231313133131133', '123131414241')
                        .then(() => {
                            this.$router.push({ path: '/about' })
                        })
                        .catch(() => {
                            this.isLoginError = true
                            this.state.loginBtn = false
                        })
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
