export class ComponentConfiguration {

    static components: any = {
        RouteGroup: () => import('@/layouts/view/RouteView'),
        About: () => import('@/views/about/info/About.vue'),

        // System
        SystemResource: () => import('@/views/system/resource/ResourceManage.vue'),
        SystemRoute: () => import('@/views/system/route/Route.vue'),
        SystemCompany: () => import('@/views/system/company/Company.vue'),
        // Company Setting
        RoleManage: () => import('@/views/company/role/RoleManage.vue'),
        AccountManage: () => import('@/views/company/account/AccountManage.vue'),
        // Personal Center
        AccountSetting: () => import('@/views/personal/setting/AccountSetting.vue'),
        // Product
        ProductCategory: () => import('@/views/product/category/ProductCategory.vue'),
        ProductBrand: () => import('@/views/product/brand/ProductBrand.vue'),
        // Home
        Dashboard: () => import('@/views/home/Dashboard.vue'),
        // Operation
        OpLogistics: () => import('@/views/operation/logistics/Logistics.vue'),
        OpFreight: () => import('@/views/operation/freight/Freight.vue'),
    }
}