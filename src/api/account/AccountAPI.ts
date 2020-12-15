// import axios from 'axios'

import { AccountModule } from '@/store'
import Request from '@/api/common/Request'

class AccountAPI {

    private request = Request.getDefaultInstance()

    private routerComponents: any = {
        RouteView: () => import('@/layouts/view/RouteView'),
        About: () => import('@/views/about/info/About.vue'),
        AccountSetting: () => import('@/views/about/info/About.vue'),
        Function: () => import('@/views/system/function/Function.vue'),
    }

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

    logout() {
        AccountModule.setAccount({})
    }

    async loadAccountRoutes() {
        const response = await this.request.request({
            url: '/account/actions',
            method: 'post',
            data: {}
        })
        const actions: any = response.data
        const routes = this.parseAccountRoutes(actions)
        this.rootRoute.children=routes
        const accountRoutes = []
        accountRoutes.push(this.rootRoute)
        return { menus: actions, routes: accountRoutes}
    }

    private parseAccountRoutes(actions: any[]) {
        return actions.map(action => {
            const currentRoute: any = {
                path: action.path || '',
                name: action.name || '',
                component: this.routerComponents[action.component] || undefined,
                meta: {
                    title: action.meta.title || name,
                    icon: action.meta.icon || "desktop",
                    hiddenHeaderContent: action.meta.hiddenHeaderContent,
                    target: action.meta.target,
                    permission: action.actionTypes
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

    // private loadAccountMenus() {
    //     const menus = [
    //         {
    //             'name': 'home',
    //             'parentId': 0,
    //             'id': 1,
    //             'meta': {
    //                 'icon': 'home',
    //                 'title': 'router.menu.home',
    //                 'show': true
    //             },
    //             'component': 'RouteView',
    //             'path': '/home',
    //             'redirect': '/home/dashboard',
    //             children: [
    //                 {
    //                     'name': 'dashboard',
    //                     'parentId': 1,
    //                     'id': 1001,
    //                     'meta': {
    //                         'icon': 'dashboard',
    //                         'title': 'router.menu.home.dashboard',
    //                         'show': true
    //                     },
    //                     'component': 'Dashboard',
    //                     'path': 'dashboard'
    //                 },
    //                 {
    //                     'name': 'analysis',
    //                     'parentId': 1,
    //                     'id': 1002,
    //                     'meta': {
    //                         'icon': 'line-chart',
    //                         'title': 'router.menu.home.analysis',
    //                         'show': true
    //                     },
    //                     'component': 'Analysis',
    //                     'path': 'analysis'
    //                 },
    //             ]
    //         },
    //         {
    //             'name': 'product',
    //             'parentId': 0,
    //             'id': 2,
    //             'meta': {
    //                 'icon': 'barcode',
    //                 'title': 'router.menu.product',
    //                 'show': true
    //             },
    //             'component': 'RouteView',
    //             'path': '/product'
    //         },
    //         {
    //             'name': 'inventory',
    //             'parentId': 0,
    //             'id': 3,
    //             'meta': {
    //                 'icon': 'database',
    //                 'title': 'router.menu.inventory',
    //                 'show': true
    //             },
    //             'component': 'RouteView',
    //             'path': '/inventory'
    //         },
    //         {
    //             'name': 'member',
    //             'parentId': 0,
    //             'id': 4,
    //             'meta': {
    //                 'icon': 'team',
    //                 'title': 'router.menu.member',
    //                 'show': true
    //             },
    //             'component': 'RouteView',
    //             'path': '/member'
    //         },
    //         {
    //             'name': 'system',
    //             'path': '/system',
    //             'parentId': 0,
    //             'id': 5,
    //             'meta': {
    //                 'icon': 'desktop',
    //                 'title': 'router.menu.system',
    //                 'show': true
    //             },
    //             'component': 'RouteView',
    //             'redirect': '/system/application',
    //             children: [
    //                 {
    //                     'name': 'SystemApplication',
    //                     'parentId': 5,
    //                     'id': 5001,
    //                     'meta': {
    //                         'icon': 'appstore',
    //                         'title': 'router.menu.system.application',
    //                         'show': true
    //                     },
    //                     'component': 'SystemApplication',
    //                     'path': 'application'
    //                 },
    //                 {
    //                     'name': 'SystemModule',
    //                     'parentId': 5,
    //                     'id': 5002,
    //                     'meta': {
    //                         'icon': 'deployment-unit',
    //                         'title': 'router.menu.system.module',
    //                         'show': true
    //                     },
    //                     'component': 'SystemModule',
    //                     'path': 'module'
    //                 },
    //                 {
    //                     'name': 'SystemPermission',
    //                     'parentId': 5,
    //                     'id': 5003,
    //                     'meta': {
    //                         'icon': 'lock',
    //                         'title': 'router.menu.system.permission',
    //                         'show': true
    //                     },
    //                     'component': 'SystemPermission',
    //                     'path': '/system/permission'
    //                 },
    //                 {
    //                     'name': 'SystemTenant',
    //                     'parentId': 5,
    //                     'id': 5004,
    //                     'meta': {
    //                         'icon': 'shop',
    //                         'title': 'router.menu.system.tenant',
    //                         'show': true
    //                     },
    //                     'component': 'SystemTenant',
    //                     'path': 'tenant'
    //                 },
    //             ]
    //         },
    //         {
    //             'name': 'account',
    //             'path': '/account',
    //             'parentId': 0,
    //             'id': 6,
    //             'meta': {
    //                 'icon': 'profile',
    //                 'title': 'router.menu.account',
    //                 'show': true
    //             },
    //             'component': 'RouteView',
    //             'redirect': '/account/setting',
    //             children: [
    //                 {
    //                     'name': 'AccountSetting',
    //                     'parentId': 6,
    //                     'id': 6001,
    //                     'meta': {
    //                         'icon': 'setting',
    //                         'title': 'router.menu.account.setting',
    //                         'show': true
    //                     },
    //                     'component': 'AccountSetting',
    //                     'path': 'setting'
    //                 },
    //                 {
    //                     'name': 'AccountRoles',
    //                     'parentId': 6,
    //                     'id': 6002,
    //                     'meta': {
    //                         'icon': 'usergroup-add',
    //                         'title': 'router.menu.account.roles',
    //                         'show': true
    //                     },
    //                     'component': 'AccountRoles',
    //                     'path': 'roles'
    //                 },
    //                 {
    //                     'name': 'AccountManage',
    //                     'parentId': 6,
    //                     'id': 6003,
    //                     'meta': {
    //                         'icon': 'user-add',
    //                         'title': 'router.menu.account.manage',
    //                         'show': true
    //                     },
    //                     'component': 'AccountManage',
    //                     'path': 'manage'
    //                 },
    //                 {
    //                     'name': 'AccountPermission',
    //                     'parentId': 6,
    //                     'id': 6004,
    //                     'meta': {
    //                         'icon': 'file-done',
    //                         'title': 'router.menu.account.permission',
    //                         'show': true
    //                     },
    //                     'component': 'AccountPermission',
    //                     'path': 'permission'
    //                 },
    //             ]
    //         },
    //
    //         {
    //             'name': 'about',
    //             'parentId': 0,
    //             'id': 7,
    //             'meta': {
    //                 'icon': 'info-circle',
    //                 'title': 'router.menu.about',
    //                 'show': true
    //             },
    //             'component': 'About',
    //             'path': '/about'
    //         },
    //     ]
    //
    //     this.request.request({
    //         url: '/account/actions',
    //         method: 'post',
    //         data: {}
    //     }).then(response => {
    //         console.log(response);
    //     })
    //
    //     return menus
    // }



}

const accountAPI = new AccountAPI()
export default accountAPI
