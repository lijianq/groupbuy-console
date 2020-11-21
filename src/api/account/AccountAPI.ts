// import axios from 'axios'

import { AccountModule } from '@/store'
import AppRuntimeModule from '@/store/modules/AppRuntime'

class AccountAPI {

    login() {
        const account = {
            name: 'Admin',
            avatar: 'bluenet.png',
            accessToken: '1223231313133131133',
            expireTime: '123131414241'
        }
        AccountModule.setAccount(account)
        this.setAccountMenu()
        this.setAccountPermissions()
    }

    logout() {
        AccountModule.setAccount({})
    }

    setAccountMenu() {
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
                'component': 'RouterView',
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
                        'path': '/dashboard/workspace'
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
                        'path': '/dashboard/analysis'
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
                'component': 'Product',
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
                'component': 'inventory',
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
                'component': 'member',
                'path': '/member'
            },
            {
                'name': 'about',
                'parentId': 0,
                'id': 5,
                'meta': {
                    'icon': 'info-circle',
                    'title': 'router.menu.about',
                    'show': true
                },
                'component': 'about',
                'path': '/about/info'
            }
        ]
        AppRuntimeModule.setMenus(menus)
    }

    setAccountPermissions() {
        return {}
    }

}

const accountAPI = new AccountAPI()
export default accountAPI
