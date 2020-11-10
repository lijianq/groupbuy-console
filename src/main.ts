import Vue from 'vue'
import App from './App.vue'
import { RegisterServiceWorker } from '@/cache'
import router from '@/router'
import store from '@/store'
import i18n from '@/locales'
import { AntdLazyLoad } from "@/core"

Vue.config.productionTip = false
RegisterServiceWorker.doRegister()
AntdLazyLoad.doLazyLoad()

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
