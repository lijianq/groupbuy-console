// import axios from 'axios'

import { AccountModule } from '@/store'
import AppRuntimeModule from '@/store/modules/AppRuntime'

class AccountAPI {

    private routerComponents: any = {
        BlankLayout: () => import('@/layouts/blank/BlankLayout.vue'),
        RouteView: () => import('@/layouts/view/RouteView'),
        Dashboard: () => import('@/views/about/info/About.vue'),
        Analysis: () => import('@/views/error/404.vue'),
        About: () => import('@/views/about/info/About.vue'),
        AccountSetting: () => import('@/views/error/404.vue'),
        AccountRoles: () => import('@/views/error/404.vue'),
        AccountManage: () => import('@/views/error/404.vue'),
        AccountPermission: () =>  import('@/views/error/404.vue'),
        SystemApplication: () => import('@/views/error/404.vue'),
        SystemModule: () => import('@/views/error/404.vue'),
        SystemPermission: () => import('@/views/error/404.vue'),
        SystemTenant: () =>  import('@/views/error/404.vue'),
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
                'name': 'home',
                'parentId': 0,
                'id': 1,
                'meta': {
                    'icon': 'home',
                    'title': 'router.menu.home',
                    'show': true
                },
                'component': 'RouteView',
                'path': '/home',
                'redirect': '/home/dashboard',
                children: [
                    {
                        'name': 'dashboard',
                        'parentId': 1,
                        'id': 1001,
                        'meta': {
                            'icon': 'dashboard',
                            'title': 'router.menu.home.dashboard',
                            'show': true
                        },
                        'component': 'Dashboard',
                        'path': 'dashboard'
                    },
                    {
                        'name': 'analysis',
                        'parentId': 1,
                        'id': 1002,
                        'meta': {
                            'icon': 'line-chart',
                            'title': 'router.menu.home.analysis',
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
                'name': 'system',
                'path': '/system',
                'parentId': 0,
                'id': 5,
                'meta': {
                    'icon': 'desktop',
                    'title': 'router.menu.system',
                    'show': true
                },
                'component': 'RouteView',
                'redirect': '/system/application',
                children: [
                    {
                        'name': 'SystemApplication',
                        'parentId': 5,
                        'id': 5001,
                        'meta': {
                            'icon': 'appstore',
                            'title': 'router.menu.system.application',
                            'show': true
                        },
                        'component': 'SystemApplication',
                        'path': 'application'
                    },
                    {
                        'name': 'SystemModule',
                        'parentId': 5,
                        'id': 5002,
                        'meta': {
                            'icon': 'deployment-unit',
                            'title': 'router.menu.system.module',
                            'show': true
                        },
                        'component': 'SystemModule',
                        'path': 'module'
                    },
                    {
                        'name': 'SystemPermission',
                        'parentId': 5,
                        'id': 5003,
                        'meta': {
                            'icon': 'lock',
                            'title': 'router.menu.system.permission',
                            'show': true
                        },
                        'component': 'SystemPermission',
                        'path': '/system/permission'
                    },
                    {
                        'name': 'SystemTenant',
                        'parentId': 5,
                        'id': 5004,
                        'meta': {
                            'icon': 'shop',
                            'title': 'router.menu.system.tenant',
                            'show': true
                        },
                        'component': 'SystemTenant',
                        'path': 'tenant'
                    },
                ]
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
                        'name': 'AccountSetting',
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
                        'name': 'AccountRoles',
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
                        'name': 'AccountManage',
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
                        'name': 'AccountPermission',
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
