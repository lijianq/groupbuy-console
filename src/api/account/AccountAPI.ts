import { AccountModule } from '@/store'
import Request from '@/api/common/Request'
import { ComponentConfiguration, RouterConfiguration } from '@/config'

class AccountAPI {

    private apiPaths = {
        login: "/login",
        accountActions: "/account/actions",
    }

    private request = Request.getDefaultInstance()

    login(params: any) {
        return this.request.request({
            url: this.apiPaths.login,
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
        const mallActions = RouterConfiguration.mallRoutes

        //Add for mall
        const combined = [...actions, ...mallActions]

        const routes = this.parseAccountRoutes(combined)
        rootRoute.children=routes
        const accountRoutes = []
        accountRoutes.push(rootRoute)
        return { menus: combined, routes: accountRoutes}
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
