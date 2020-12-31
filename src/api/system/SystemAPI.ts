import Request from '@/api/common/Request'

class SystemAPI {

    private apiPaths = {
        route: "/system/route",
        routeAction: "/system/route/action",
        company: "/system/company",
        permission: "/system/company/permission",
        status: "/system/company/status"
    }
    private request = Request.getDefaultInstance()

    getRoutes() {
        return this.request.request({
            url: this.apiPaths.route,
            method: 'get',
            data: {}
        })
    }

    createRoute(route: any) {
        return this.request.request({
            url: this.apiPaths.route,
            method: 'put',
            data: route
        })
    }

    deleteRoutes(routeIds: string[]) {
        return this.request.request({
            url: this.apiPaths.route,
            method: 'delete',
            data: routeIds
        })
    }

    getRouteActions(routeId: string) {
        return this.request.request({
            url: this.apiPaths.routeAction,
            method: 'get',
            params: {
                routeId: routeId
            }
                
        })
    }

    createRouteAction(routeAction: any) {
        return this.request.request({
            url: this.apiPaths.routeAction,
            method: 'put',
            data: routeAction
        })
    }

    deleteRouteAction(routeActionId: string) {
        return this.request.request({
            url: `${this.apiPaths.routeAction}/${routeActionId}`,
            method: 'delete'
        })
    }

    getCompanies(queryParam: any) {
        return this.request.request({
            url: this.apiPaths.company,
            method: "post",
            data: queryParam
        })
    }

    deleteCompanies(companyIds: string[]) {
        return this.request.request({
            url: this.apiPaths.company,
            method: 'delete',
            data: companyIds
        })
    }

    getCompanyPermission(companyId: string) {
        return this.request.request({
            url: `${this.apiPaths.permission}/${companyId}`,
            method: 'get'
        })
    }

    setCompanyPermission(companyId: string, actions: string[]) {
        return this.request.request({
            url: `${this.apiPaths.permission}/${companyId}`,
            method: 'put',
            data: actions
        })
    }

    rejectCompany(companyId: string, request: any) {
        return this.request.request({
            url: `${this.apiPaths.status}/${companyId}`,
            method: 'delete',
            data: request
        })
    }

    approveCompany(companyId: string, request: any) {
        return this.request.request({
            url: `${this.apiPaths.status}/${companyId}`,
            method: 'put',
            data: request
        })
    }
}

const systemAPI = new SystemAPI()
export default systemAPI