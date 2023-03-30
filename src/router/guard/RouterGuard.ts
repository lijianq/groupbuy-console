import { Vue } from 'vue-property-decorator'
import { Route, NavigationGuardNext } from 'vue-router'
import { AccountModule } from '@/store'
import NProgress from 'nprogress'
import '@/components/nprogress/NProgress.less'
import { RouterConfiguration } from '@/config'

class RouterGuard {

    beforeEach(to: Route, from: Route, next: NavigationGuardNext<Vue>) {
        NProgress.start()
        const accessToken = AccountModule.getAccount().accessToken
        if (accessToken) {
            if (to.path === RouterConfiguration.loginPath) {
                next({ path: RouterConfiguration.homePath })
            } else {
                let redirect = to.path
                if (from.query.redirect) {
                    redirect = decodeURIComponent(from.query.redirect as string)
                }
                if (to.path === redirect) {
                    next()
                } else {
                    next({ path: redirect, replace: true, query: {} })
                }
            }
        } else {
            if (RouterConfiguration.allowList.includes(to.path)) {
                next()
            } else {
                next({ path: RouterConfiguration.loginPath, query: { redirect: to.fullPath } })
            }
        }

        NProgress.done()
    }

    afterEach() {
        NProgress.done()
    }

}
const routerGuard = new RouterGuard()
export default routerGuard


