import { AccountModule } from '@/store'
import Request from '@/api/common/Request'
import { ComponentConfiguration, RouterConfiguration } from '@/config'

class AccountAPI {

    private apiPaths = {
        login: "/platform/login",
        accountActions: "/platform/account/actions",
        authcode: "/platform/authcode",
        reset: "/platform/reset"
    }

    private request = Request.getDefaultInstance()

    login(params: any) {
        return this.request.request({
            url: this.apiPaths.login,
            method: 'post',
            data: params
        })
    }

    sendAuthCode(params: any) {
        return this.request.request({
            url: this.apiPaths.authcode,
            method: 'post',
            data: params
        })
    }

    resetPassword(params: any) {
        return this.request.request({
            url: this.apiPaths.reset,
            method: 'post',
            data: params
        })
    }

    logout() {
        AccountModule.setAccount({})
    }

    async loadAccountRoutes() {
        const rootRoute: any = {
            name: 'root',
            path: '',
            component: () => import('@/layouts/main/MainLayout.vue'),
            redirect: RouterConfiguration.homePath,
            meta: {
                title: 'router.menu.home'
            },
            children: []
        }
        const response = await this.request.request({
            url: this.apiPaths.accountActions,
            method: 'get',
            data: {}
        })
        const actions: any = response.data
        const routes = this.parseAccountRoutes(actions)
        rootRoute.children = routes
        const accountRoutes = []
        accountRoutes.push(rootRoute)
        return { menus: actions, routes: accountRoutes }
    }

    private parseAccountRoutes(actions: any[]) {
        return actions.map(action => {
            const currentRoute: any = {
                path: action.path || '',
                name: action.name || '',
                component: ComponentConfiguration.components[action.component] || undefined,
                meta: {
                    title: action.meta.title || name,
                    icon: action.meta.icon || "desktop",
                    hiddenHeaderContent: action.meta.hiddenHeaderContent,
                    target: action.meta.target,
                    permission: action.actions
                }
            }
            if (action.meta.show === true) {
                currentRoute.hidden = true
            }
            if (action.meta.hiddeChildren) {
                currentRoute.hideChildrenInMenu = true
            }
            if (action.redirect) {
                currentRoute.redirect = action.redirect
            }
            if (action.children && action.children.length > 0) {
                currentRoute.children = this.parseAccountRoutes(action.children)
            }
            return currentRoute
        })
    }
}

const accountAPI = new AccountAPI()
export default accountAPI
