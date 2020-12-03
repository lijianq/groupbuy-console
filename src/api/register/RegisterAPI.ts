import Request from '@/api/common/Request'

class RegisterAPI {

    private apiPaths = {
        register: "/company/register"
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
            url: this.apiPaths.register,
            method: 'POST',
            data: params
        })
    }
}

const registerAPI = new RegisterAPI()
export default registerAPI
