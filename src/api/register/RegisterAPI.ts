import Request from '@/api/common/Request'

class RegisterAPI {

    private apiPaths = {
        register: "/platform/register",
        status: "/platform/status"
    }
    private request = Request.getDefaultInstance()

    register(params: any) {
        return this.request.request({
            url: this.apiPaths.register,
            method: 'PUT',
            data: params
        })
    }

    getRegistration(params: any) {
        return this.request.request({
            url: this.apiPaths.status,
            method: 'POST',
            data: params
        })
    }
}

const registerAPI = new RegisterAPI()
export default registerAPI
