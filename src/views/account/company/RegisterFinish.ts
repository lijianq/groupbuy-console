import { Component, Vue } from 'vue-property-decorator'
import {RouterConfiguration} from "@/config";

@Component
export default class RegisterFinish extends Vue {

    backToLogin() {
        this.$router.push({ path: RouterConfiguration.loginPath })
    }

}
