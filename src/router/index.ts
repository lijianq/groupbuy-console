import Vue from 'vue'
import VueRouter from 'vue-router'
import { RouterConfiguration } from "@/config"

Vue.use(VueRouter)

const contextPath = process.env.VUE_APP_CONTEXT
export default new VueRouter(
    {
      mode: 'history',
      base: contextPath,
      routes: RouterConfiguration.constantRoutes
    }
)
