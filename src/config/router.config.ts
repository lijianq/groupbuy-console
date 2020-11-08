import { BlankLayout, AccountLayout } from '@/layouts'

export const constantRoutings = [
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
    }

]
