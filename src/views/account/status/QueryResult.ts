import { Component, Vue, Prop } from 'vue-property-decorator'
import {RouterConfiguration} from '@/config'

@Component
export default class QueryResult extends Vue {

    @Prop({type: Object, default: null})
    queryResult: any | null

    backToLogin() {
        this.$router.push({ path: RouterConfiguration.loginPath })
    }

}
