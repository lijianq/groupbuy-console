import { Component, Vue } from 'vue-property-decorator'
import {WrappedFormUtils} from 'ant-design-vue/types/form/form'
import {RouterConfiguration} from '@/config'

@Component
export default class QueryInput extends Vue {

    labelCol = { lg: { span: 5 }, sm: { span: 5 } }
    wrapperCol = { lg: { span: 19 }, sm: { span: 19 } }
    form!: WrappedFormUtils

    created() {
        this.form = this.$form.createForm(this, {name: 'queryForm'})
    }

    query() {
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
