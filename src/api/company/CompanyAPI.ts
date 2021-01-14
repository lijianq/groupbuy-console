import Request from '@/api/common/Request'

class CompanyAPI {

    private apiPaths = {
        role: "/platform/company/role",
        permission: "/platform/company/role/permission",
        account: "/platform/company/account",
        accountRole: "/platform/company/account/role"
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

    setRolePermission(roleId: string, request: any) {
        return this.request.request({
            url: `${this.apiPaths.permission}/${roleId}`,
            method: 'put',
            data: request
        })
    }

    getCompanyAccounts(query: any) {
        return this.request.request({
            url: this.apiPaths.account,
            method: 'post',
            data: query
        })
    }

    saveCompanyAccount(account: any) {
        return this.request.request({
            url: this.apiPaths.account,
            method: 'put',
            data: account
        })
    }

    deleteCompanyAccounts(accountIds: string[]) {
        return this.request.request({
            url: this.apiPaths.account,
            method: 'delete',
            data: accountIds
        })
    }

    getAccountRoles(accountId: string) {
        return this.request.request({
            url: `${this.apiPaths.accountRole}/${accountId}`,
            method: 'get'
        })
    }

    setAccountRoles(accountId: string, roleIds: string[]) {
        return this.request.request({
            url: `${this.apiPaths.accountRole}/${accountId}`,
            method: 'put',
            data: roleIds
        })
    }

}

const companyAPI = new CompanyAPI()
export default companyAPI