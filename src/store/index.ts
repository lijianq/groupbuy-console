import Vue from 'vue'
import Vuex from 'vuex'
import AccountModule from './modules/Account'
import AppPreferenceModule from './modules/AppPreference'
import AppRuntimeModule from './modules/AppRuntime'

Vue.use(Vuex)
const store = new Vuex.Store({
})
export default store
export { AccountModule, AppPreferenceModule, AppRuntimeModule }
