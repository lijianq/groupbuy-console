import Vue from 'vue'
import Vuex from 'vuex'
import AppPreferenceModule from './modules/AppPreference'
import AccountModule from './modules/Account'

Vue.use(Vuex)
const store = new Vuex.Store({
})
export default store
export { AccountModule, AppPreferenceModule }
