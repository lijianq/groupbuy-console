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
        if ( typeof accessToken !== 'undefined' && accessToken.trim().length > 0) {
            if (to.path === RouterConfiguration.loginPath ) {
                next({path: RouterConfiguration.homePath})
            } else {

                let redirect = to.path
                if (typeof from.query.redirect !== 'undefined') {
                    redirect = decodeURIComponent( from.query.redirect as string)
                }
                if (to.path === redirect) {
                    next()
                } else {
                    next( {path: redirect, replace: true, query: {}})
                }
            }
            /** Should Process Role based Permission **/
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


