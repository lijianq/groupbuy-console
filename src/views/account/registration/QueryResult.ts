import { Component, Vue } from 'vue-property-decorator'
import {RouterConfiguration} from '@/config'

@Component
export default class QueryResult extends Vue {

    result: any = {
        1: {
            status: "account.registration.status.1",
            statusMessage: "account.registration.status.1.message"
        },
        2: {
            status: "account.registration.status.2",
            statusMessage: "account.registration.status.2.message"
        },
        3: {
            status: "account.registration.status.3",
            statusMessage: "account.registration.status.3.message"
        }
    }

    status = 2

    backToLogin() {
        this.$router.push({ path: RouterConfiguration.loginPath })
    }

}
