import { Component, Vue } from 'vue-property-decorator'
import {WrappedFormUtils} from 'ant-design-vue/types/form/form'
import md5 from 'md5'
import { accountAPI } from '@/api'
import { AppPreferenceModule, AccountModule} from '@/store'
import { RouterConfiguration } from '@/config'

@Component
export default class Login extends Vue {

    form!: WrappedFormUtils
    state = { loginBtn: false }
    autoLogin = false

    created() {
        this.form = this.$form.createForm(this, {name: 'loginForm'})
        this.autoLogin = AppPreferenceModule.getAutoLogin()
    }

    mounted() {
        this.form.setFieldsValue({rememberMe: this.autoLogin });
    }

    handleSubmit (event: Event) {
        let redirect = RouterConfiguration.homePath
        if (this.$route.query.redirect) {
            redirect = this.$route.query.redirect as string
        }
        event.preventDefault()
        this.state.loginBtn = true
        const validateFieldsKey = ['companyId', 'accountName', 'accountPassword', 'rememberMe']
        this.form.validateFields(validateFieldsKey, { force: true }, (err, values) => {
            if (!err) {
                const rememberMe = values.rememberMe ? values.rememberMe : false
                if (this.autoLogin !== rememberMe) {
                    AppPreferenceModule.setAutoLogin(rememberMe)
                }
                const params: any = {}
                params.companyId = values.companyId
                params.accountName = values.accountName
                params.accountPassword = md5(values.accountPassword)
                accountAPI.login(params).then(response => {
                    const currentAccount = response.data
                    AccountModule.setAccount(currentAccount)
                    this.$router.push({ path: redirect })
                }).catch(error => {
                    this.$message.error(error.message)
                }).finally(() => {
                    this.state.loginBtn = false
                })
            } else {
                setTimeout(() => {
                    this.state.loginBtn = false
                }, 600)
            }
        })
    }
}
