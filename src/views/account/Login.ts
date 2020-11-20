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
        let redirect = '/about'
        if (this.$route.query.redirect) {
            redirect = this.$route.query.redirect as string
        }
        console.log("Redirect URL: ", redirect)
        event.preventDefault()
        this.state.loginBtn = true
        const validateFieldsKey = ['account', 'password']
        this.form.validateFields(validateFieldsKey, { force: true }, (err, values) => {
            if (!err) {
                if (values.account == 'admin' && md5(values.password) == '21232f297a57a5a743894a0e4a801fc3') {
                    AccountModule.setAccount({
                        name: 'Admin',
                        avatar: '/img/avatars/default.png',
                        accessToken: '1223231313133131133',
                        expireTime: '123131414241'
                    })
                    this.$router.push({ path: redirect })
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
