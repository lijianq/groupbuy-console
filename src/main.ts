import Vue from 'vue'
import App from './views/app/App.vue'
import { RegisterServiceWorker } from '@/cache'
import router from '@/router'
import store from '@/store'
import i18n from '@/locales'
import { AntdLazyLoad } from "@/core"
import './views/app/app.less'

Vue.config.productionTip = false
RegisterServiceWorker.doRegister()
AntdLazyLoad.doLazyLoad()

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
