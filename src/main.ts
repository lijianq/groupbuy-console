import Vue from 'vue'
import App from './views/app/App.vue'
import { RegisterServiceWorker } from '@/cache'
import router from '@/router'
import store from '@/store'
import i18n from '@/locales'
import { AntdLazyLoad } from '@/core'
import { ThemeConfiguration} from '@/config'
import { Component } from 'vue-property-decorator'

(window as any).umi_plugin_ant_themeVar = ThemeConfiguration.themes
Vue.config.productionTip = false
RegisterServiceWorker.doRegister()
AntdLazyLoad.doLazyLoad()


Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate'
])

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
