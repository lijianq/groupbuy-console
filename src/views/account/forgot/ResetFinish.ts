import { Component, Vue } from 'vue-property-decorator'
import {RouterConfiguration} from "@/config";

@Component
export default class ResetFinish extends Vue {

    backToLogin() {
        this.$router.push({ path: RouterConfiguration.loginPath })
    }

}
