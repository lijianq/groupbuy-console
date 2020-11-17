import { BlankLayout, AccountLayout } from '@/layouts'

export class RouterConfiguration {

    static constantRoutes = [
        {
            path: '/',
            redirect: '/account',
        },
        {
            path: '/about',
            component: BlankLayout,
            redirect: '/about/info',
            children: [
                {
                    path: 'info',
                    name: 'About',
                    meta: {
                        title: 'router.about'
                    },
                    component: () => import('@/views/about/About.vue')
                }
            ]
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
                    component: () => import('@/views/account/Login.vue')
                }
            ]
        },
        {
            path: '/error',
            component: BlankLayout,
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
        },
        {
            path: '*', redirect: '/error/404', hidden: true
        }

    ]

}
