import Vue from 'vue'
import VueRouter from 'vue-router'
import { RouterConfiguration } from "@/config"

Vue.use(VueRouter)
export default new VueRouter(
    {
      mode: 'history',
      routes: RouterConfiguration.constantRoutes
    }
)
