import Request from '@/api/common/Request'

class PersonalAPI {

    private apiPaths = {
        account: "/platform/account/info",
        accountEmail: "/platform/account/email",
        accountPassword: "/platform/account/password",
        accountAuthCode: "/platform/account/authcode"
    }

    private request = Request.getDefaultInstance();

    getAccount() {
        return this.request.request({
            url: this.apiPaths.account,
            method: 'get'
        })
    }

    updateAccount(account: any) {
        return this.request.request({
            url: this.apiPaths.account,
            method: 'put',
            data: account
        })
    }

    updatePassword(request: any) {
        return this.request.request({
            url: this.apiPaths.accountPassword,
            method: 'put',
            data: request
        })
    }

    updateEmail(request: any) {
        return this.request.request({
            url: this.apiPaths.accountEmail,
            method: 'put',
            data: request
        })
    }

    sendAuthCode(request: any) {
        return this.request.request({
            url: this.apiPaths.accountAuthCode,
            method: 'post',
            data: request
        })
    }
}

const personalAPI = new PersonalAPI()
export default personalAPI