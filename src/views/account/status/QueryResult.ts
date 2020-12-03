import { Component, Vue, Prop } from 'vue-property-decorator'
import {RouterConfiguration} from '@/config'
import ResponseConstant from '@/api/common/ResponseConstant'

@Component
export default class QueryResult extends Vue {

    @Prop({type: Object, default: null})
    queryResult: any | null

    hasResult = false
    status: any = {}

    created() {
        if (this.queryResult.companyName) {
            this.hasResult = true;
            this.status = ResponseConstant.companyStatus[this.queryResult.status]
        }
    }

    backToLogin() {
        this.$router.push({ path: RouterConfiguration.loginPath })
    }

}
