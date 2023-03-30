import Request from '@/api/Request'

class AccountAPI {

    private apiPaths = {
        login: "/gb/account/login",
    }
    private request = Request.getDefaultInstance()

    login(loginRequest: any) {
        return this.request.request({
            url: this.apiPaths.login,
            method: "post",
            data: loginRequest
        })
    }


}

const accountAPI = new AccountAPI()
export default accountAPI