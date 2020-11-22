import Vue from 'vue'
import App from './views/app/App.vue'
import { RegisterServiceWorker } from '@/cache'
import router from '@/router'
import store, {AppPreferenceModule} from '@/store'
import I18N from '@/locales'
import { AntdLazyLoad, RefreshLoad } from '@/core'
import { ThemeConfiguration} from '@/config'
import { Component } from 'vue-property-decorator'

(window as any).umi_plugin_ant_themeVar = ThemeConfiguration.themes
Vue.config.productionTip = false
RegisterServiceWorker.doRegister()
AntdLazyLoad.doLazyLoad()
RefreshLoad.reloadAccountConfig()

Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate'
])
const i18n = new I18N().getVueI18N(AppPreferenceModule.getLanguage())

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
