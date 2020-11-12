import Vue from 'vue'
import Vuex from 'vuex'
import Account from './modules/Account'
import AppPreference from './modules/AppPreference'
import VuexPersistence from 'vuex-persist'
import { getModule } from 'vuex-module-decorators'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({storage: window.localStorage})
const store = new Vuex.Store({
    modules: {
        appPreference: AppPreference,
        account: Account
    },
    plugins: [vuexLocal.plugin]
})

export default new Vuex.Store({})
export const AccountModule = getModule(Account, store)
export const AppPreferenceModule = getModule(AppPreference, store)
