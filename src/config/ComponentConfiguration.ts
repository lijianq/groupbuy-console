export class ComponentConfiguration {

    static components: any = {
        RouteView: () => import('@/layouts/view/RouteView'),
        About: () => import('@/views/about/info/About.vue'),
        AccountSetting: () => import('@/views/about/info/About.vue'),
        Function: () => import('@/views/system/function/Function.vue'),
        FunctionAction: () => import('@/views/system/function/FunctionAction.vue'),
        Company: () => import('@/views/system/company/Company.vue')
    }

}