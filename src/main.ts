import Vue from 'vue'
import { Button } from 'ant-design-vue';
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import i18n from './locales'
import './core/lazy_use'

Vue.component(Button.name, Button)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
