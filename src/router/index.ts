import Vue from 'vue'
import VueRouter from 'vue-router'
import { constantRoutings } from "@/config/router.config"

Vue.use(VueRouter)

export default new VueRouter(
    {
      mode: 'history',
      routes: constantRoutings
    }
)
