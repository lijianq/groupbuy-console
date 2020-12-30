import {AccountLayout, MainLayout} from '@/layouts'

export class RouterConfiguration {

    static homePath = "/home";

    static loginPath = "/account/login";

    static allowList = ['/account/login', '/account/forgot', '/account/register', '/account/status']

    static constantRoutes = [
        {
            path: '/',
            redirect: '/account',
        },
        {
            path: '/account',
            component: AccountLayout,
            redirect: '/account/login',
            children: [
                {
                    path: 'login',
                    name: 'Login',
                    meta: {
                        title: 'router.account.login'
                    },
                    component: () => import('@/views/account/login/Login.vue')
                },
                {
                    path: 'forgot',
                    name: 'Forgot',
                    meta: {
                        title: 'router.account.forgot'
                    },
                    component: () => import('@/views/account/forgot/ForgotPassword.vue')
                },
                {
                    path: 'register',
                    name: 'Register',
                    meta: {
                        title: 'router.account.register'
                    },
                    component: () => import('@/views/account/company/Register.vue')
                },
                {
                    path: 'status',
                    name: 'Status',
                    meta: {
                        title: 'router.account.status'
                    },
                    component: () => import('@/views/account/status/Query.vue')
                },
            ]
        },
        {
            path: '/error',
            component: MainLayout,
            redirect: '/error/404',
            children: [
                {
                    path: '401',
                    name: '401',
                    meta: {
                        title: 'router.error.401'
                    },
                    component: () => import('@/views/error/401.vue')
                },
                {
                    path: '404',
                    name: '404',
                    meta: {
                        title: 'router.error.404'
                    },
                    component: () => import('@/views/error/404.vue')
                },
                {
                    path: '500',
                    name: '500',
                    meta: {
                        title: 'router.error.500'
                    },
                    component: () => import('@/views/error/500.vue')
                }
            ]
        }
    ]

    static notfoundRoute = [
        {
            path: '*',
            redirect: '/error/404',
            hidden: true
        }
    ]
}
