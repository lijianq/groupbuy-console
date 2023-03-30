import { MainLayout, AccountLayout } from '@/layouts'

export class RouterConfiguration {

    static loginPath = "/account/login";

    static allowList = ['/account/login']

    static homePath = "/home";

    static constantRoutes = [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            component: MainLayout,
            redirect: '/home/dashboard',
            children: [
                {
                    path: 'dashboard',
                    name: 'Dashboard',
                    meta: {
                        title: 'home.dashboard.title'
                    },
                    component: () => import('@/views/home/Dashboard.vue')
                },
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
                        title: 'account.login.title'
                    },
                    component: () => import('@/views/account/login/Login.vue')
                },
            ]
        },
        {
            path: '/manage',
            component: MainLayout,
            redirect: '/manage/product',
            children: [
                {
                    path: 'product',
                    name: 'Product',
                    meta: {
                        title: 'manage.product.title'
                    },
                    component: () => import('@/views/manage/Product.vue')
                },
                {
                    path: 'customer',
                    name: 'Customer',
                    meta: {
                        title: 'manage.customer.title'
                    },
                    component: () => import('@/views/manage/Customer.vue')
                },
                {
                    path: 'order',
                    name: 'Order',
                    meta: {
                        title: 'manage.order.title'
                    },
                    component: () => import('@/views/manage/Order.vue')
                },
                {
                    path: 'productstat',
                    name: 'ProductStatistic',
                    meta: {
                        title: 'manage.statistic.title'
                    },
                    component: () => import('@/views/manage/ProductStatistic.vue')
                },
                {
                    path: 'customerstat',
                    name: 'CustomerStatistic',
                    meta: {
                        title: 'manage.statistic.title'
                    },
                    component: () => import('@/views/manage/CustomerStatistic.vue')
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
                        title: '401'
                    },
                    component: () => import('@/views/error/401.vue')
                },
                {
                    path: '404',
                    name: '404',
                    meta: {
                        title: '404'
                    },
                    component: () => import('@/views/error/404.vue')
                },
                {
                    path: '500',
                    name: '500',
                    meta: {
                        title: '500'
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

    static menus = [
        {
            id: "1",
            parentId: "0",
            name: 'Dashboard',
            path: '/home/dashboard',
            meta: { icon: "desktop", title: "menu.dashboard", "show": true }
        },
        {
            id: "2",
            parentId: "0",
            name: 'Product',
            path: '/manage/product',
            meta: { icon: "appstore", title: "menu.product", "show": true }
        },
        {
            id: "3",
            parentId: "0",
            name: 'Customer',
            path: '/manage/customer',
            meta: { icon: "team", title: "menu.customer", "show": true }
        },
        {
            id: "4",
            parentId: "0",
            name: 'Order',
            path: '/manage/order',
            meta: { icon: "shop", title: "menu.order", "show": true }
        },
        {
            id: "5",
            parentId: "0",
            Comment: () => import('@/layouts/view/RouteView'),
            name: 'Statistic',
            path: '/manage',
            redirect: '/manage/productstat',
            meta: { icon: "table", title: "menu.statistic", "show": true },
            children:
                [
                    {
                        id: "51",
                        parentId: "5",
                        name: 'ProductStatistic',
                        path: '/manage/productstat',
                        meta: { icon: "bar-chart", title: "menu.statistic.product", "show": true }
                    },
                    {
                        id: "52",
                        parentId: "5",
                        name: 'CustomerStatistic',
                        path: '/manage/customerstat',
                        meta: { icon: "line-chart", title: "menu.statistic.customer", "show": true }
                    },
                ]
        }

    ]
}
