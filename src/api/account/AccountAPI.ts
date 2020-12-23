import { AccountModule } from '@/store'
import Request from '@/api/common/Request'
import { ComponentConfiguration, RouterConfiguration } from '@/config'

class AccountAPI {

    private request = Request.getDefaultInstance()

    private rootRoute: any = {
        name: 'root',
        path: '',
        component: () => import('@/layouts/main/MainLayout.vue'),
        redirect: '/home',
        meta: {
            title: 'router.menu.home'
        },
        children: []
    }

    login(params: any) {
        return this.request.request({
            url: '/login',
            method: 'post',
            data: params
        })
    }

    refresh(params: any) {
        return this.request.request({
            url: '/refresh',
            method: 'post',
            data: params
        })
    }

    logout() {
        AccountModule.setAccount({})
    }

    async loadAccountRoutes() {
        const response = await this.request.request({
            url: '/account/actions',
            method: 'get',
            data: {}
        })
        const actions: any = response.data
        const mallActions = RouterConfiguration.mallRoutes

        //Add for mall
        const combined = [...actions, ...mallActions]

        const routes = this.parseAccountRoutes(combined)
        this.rootRoute.children=routes
        const accountRoutes = []
        accountRoutes.push(this.rootRoute)
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
