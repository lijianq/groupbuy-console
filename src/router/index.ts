import Vue from 'vue'
import VueRouter from 'vue-router'
import { RouterConfiguration } from '@/config'
import routerGuard from './guard/RouterGuard'

Vue.use(VueRouter)

const contextPath = process.env.VUE_APP_CONTEXT ? process.env.VUE_APP_CONTEXT : '/'
const router = new VueRouter(
    {
        mode: 'history',
        base: contextPath,
        routes: RouterConfiguration.constantRoutes
    })


router.beforeEach( (to, from, next) => {
    routerGuard.beforeEach(to, from, next)
})

router.afterEach(() => {
    routerGuard.afterEach()
})

export default router

