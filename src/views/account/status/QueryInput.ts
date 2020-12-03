import { Component, Vue } from 'vue-property-decorator'
import {WrappedFormUtils} from 'ant-design-vue/types/form/form'
import {RouterConfiguration} from '@/config'
import registerAPI from "@/api/register/RegisterAPI"

@Component
export default class QueryInput extends Vue {

    labelCol = { lg: { span: 5 }, sm: { span: 5 } }
    wrapperCol = { lg: { span: 19 }, sm: { span: 19 } }
    form!: WrappedFormUtils
    loading = false

    created() {
        this.form = this.$form.createForm(this, {name: 'queryForm'})
    }

    closeLoading() {
        setTimeout(() => {
            this.loading = false
        }, 600)
    }

    query() {
        this.loading = true
        const  { form: { validateFields } } = this
        validateFields((err, values) => {
            if (!err) {
                registerAPI.getRegistration(values).then(result => {
                    let queryResult: any = {}
                    if (result.data !== "") {
                        queryResult = result.data
                    }
                    this.$emit('nextStep', queryResult)
                }).catch(error => {
                    this.$message.error(error.message)
                    this.closeLoading()
                })
            } else {
                this.closeLoading();
            }
        })
    }

    backToLogin() {
        this.$router.push({ path: RouterConfiguration.loginPath })
    }

}
