import Request from '@/api/common/Request'

class CompanyAPI {

    private apiPaths = {
        role: "/company/role",
        permission: "/company/role/permission"
    }
    private request = Request.getDefaultInstance()

    getCompanyRoles(query: any) {
        return this.request.request({
            url: this.apiPaths.role,
            method: 'post',
            data: query
        })
    }

    saveCompanyRole(role: any) {
        return this.request.request({
            url: this.apiPaths.role,
            method: 'put',
            data: role
        })
    }

    deleteCompanyRoles(roleIds: string[]) {
        return this.request.request({
            url: this.apiPaths.role,
            method: 'delete',
            data: roleIds
        })
    }

    getRolePermission(roleId: string) {
        return this.request.request({
            url: `${this.apiPaths.permission}/${roleId}`,
            method: 'get'
        })
    }

    setRolePermission(roleId: string, permissionIds: string[]) {
        return this.request.request({
            url: `${this.apiPaths.permission}/${roleId}`,
            method: 'put',
            data: permissionIds
        })
    }
}

const companyAPI = new CompanyAPI()
export default companyAPI