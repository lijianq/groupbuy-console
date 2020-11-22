import {AccountModule} from "@/store";
import accountAPI from "@/api/account/AccountAPI";
import router from "@/router";
import AppRuntimeModule from "@/store/modules/AppRuntime";

export default class RefreshLoad {

    static reloadAccountConfig() {
        const accessToken = AccountModule.getAccount().accessToken
        if ( typeof accessToken !== 'undefined' && accessToken.trim().length > 0) {
            accountAPI.loadAccountConfig()
            router.addRoutes(AppRuntimeModule.routes)
        }
    }

}
