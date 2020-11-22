// import axios from 'axios'

import { AccountModule } from '@/store'
import AppRuntimeModule from '@/store/modules/AppRuntime'

class AccountAPI {

    private routerComponents: any = {
        BlankLayout: () => import('@/layouts/blank/BlankLayout.vue'),
        RouteView: () => import('@/layouts/view/RouteView'),
        Workspace: () => import('@/views/about/info/About.vue'),
        Analysis: () => import('@/views/error/404.vue'),
        About: () => import('@/views/about/info/About.vue'),
        AccountSetting: () => import('@/views/error/404.vue'),
        AccountRoles: () => import('@/views/error/404.vue'),
        AccountManage: () => import('@/views/error/404.vue'),
        AccountPermission: () =>  import('@/views/error/404.vue'),
    }

    private rootRoute: any = {
        name: 'root',
        path: '',
        component: () => import('@/layouts/main/MainLayout.vue'),
        redirect: '/dashboard',
        meta: {
            title: 'router.menu.root'
        },
        children: []
    }

    login() {
        const account = {
            name: 'Admin',
            avatar: 'bluenet.png',
            accessToken: '1223231313133131133',
            expireTime: '123131414241'
        }
        AccountModule.setAccount(account)
    }

    logout() {
        AccountModule.setAccount({})
    }

    loadAccountConfig() {
        const menus = this.loadAccountMenus()
        AppRuntimeModule.setMenus(menus)
        const routes = this.loadAccountRoutes(menus)
        this.rootRoute.children = routes
        const accountRoutes = []
        accountRoutes.push(this.rootRoute)
        AppRuntimeModule.setRoutes(accountRoutes)
    }

    private loadAccountMenus() {
        const menus = [
            {
                'name': 'dashboard',
                'parentId': 0,
                'id': 1,
                'meta': {
                    'icon': 'home',
                    'title': 'router.menu.dashboard',
                    'show': true
                },
                'component': 'RouteView',
                'path': '/dashboard',
                'redirect': '/dashboard/workspace',
                children: [
                    {
                        'name': 'workspace',
                        'parentId': 1,
                        'id': 1001,
                        'meta': {
                            'icon': 'dashboard',
                            'title': 'router.menu.dashboard.workspace',
                            'show': true
                        },
                        'component': 'Workspace',
                        'path': 'workspace'
                    },
                    {
                        'name': 'analysis',
                        'parentId': 1,
                        'id': 1002,
                        'meta': {
                            'icon': 'line-chart',
                            'title': 'router.menu.dashboard.analysis',
                            'show': true
                        },
                        'component': 'Analysis',
                        'path': 'analysis'
                    },
                ]
            },
            {
                'name': 'product',
                'parentId': 0,
                'id': 2,
                'meta': {
                    'icon': 'barcode',
                    'title': 'router.menu.product',
                    'show': true
                },
                'component': 'RouteView',
                'path': '/product'
            },
            {
                'name': 'inventory',
                'parentId': 0,
                'id': 3,
                'meta': {
                    'icon': 'database',
                    'title': 'router.menu.inventory',
                    'show': true
                },
                'component': 'RouteView',
                'path': '/inventory'
            },
            {
                'name': 'member',
                'parentId': 0,
                'id': 4,
                'meta': {
                    'icon': 'team',
                    'title': 'router.menu.member',
                    'show': true
                },
                'component': 'RouteView',
                'path': '/member'
            },
            {
                'name': 'account',
                'path': '/account',
                'parentId': 0,
                'id': 6,
                'meta': {
                    'icon': 'profile',
                    'title': 'router.menu.account',
                    'show': true
                },
                'component': 'RouteView',
                'redirect': '/account/setting',
                children: [
                    {
                        'name': 'setting',
                        'parentId': 6,
                        'id': 6001,
                        'meta': {
                            'icon': 'setting',
                            'title': 'router.menu.account.setting',
                            'show': true
                        },
                        'component': 'AccountSetting',
                        'path': 'setting'
                    },
                    {
                        'name': 'roles',
                        'parentId': 6,
                        'id': 6002,
                        'meta': {
                            'icon': 'usergroup-add',
                            'title': 'router.menu.account.roles',
                            'show': true
                        },
                        'component': 'AccountRoles',
                        'path': 'roles'
                    },
                    {
                        'name': 'manage',
                        'parentId': 6,
                        'id': 6003,
                        'meta': {
                            'icon': 'user-add',
                            'title': 'router.menu.account.manage',
                            'show': true
                        },
                        'component': 'AccountManage',
                        'path': 'manage'
                    },
                    {
                        'name': 'permission',
                        'parentId': 6,
                        'id': 6004,
                        'meta': {
                            'icon': 'file-done',
                            'title': 'router.menu.account.permission',
                            'show': true
                        },
                        'component': 'AccountPermission',
                        'path': 'permission'
                    },
                ]
            },
            {
                'name': 'about',
                'parentId': 0,
                'id': 7,
                'meta': {
                    'icon': 'info-circle',
                    'title': 'router.menu.about',
                    'show': true
                },
                'component': 'About',
                'path': '/about'
            },
        ]
        return menus
    }

    private loadAccountRoutes(menus: any[]) {
        return menus.map(item => {
            const currentRoute: any = {
                path: item.path || '',
                name: item.name || '',
                component: this.routerComponents[item.component] || undefined,
                meta: {
                    title: item.meta.title || '',
                    icon: item.meta.icon,
                    hiddenHeaderContent: item.meta.hiddenHeaderContent,
                    target: item.meta.target,
                    permission: item.name
                }
            }
            if ( item.meta.show === false) {
                currentRoute.hidden = true
            }
            if ( item.meta.hiddeChildren ) {
                currentRoute.hideChildrenInMenu = true
            }
            if ( item.redirect ) {
                currentRoute.redirect = item.redirect
            }
            if ( item.children && item.children.length > 0) {
                currentRoute.children = this.loadAccountRoutes(item.children)
            }
            return currentRoute
        })
    }

    private loadAccountPermission() {
        return {}
    }

}

const accountAPI = new AccountAPI()
export default accountAPI
