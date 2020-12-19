import Request from '@/api/common/Request'

class SystemAPI {

    private apiPaths = {
        function: "/system/function",
        company: "/system/company"
    }
    private request = Request.getDefaultInstance()

    getFunctions() {
        return this.request.request({
            url: this.apiPaths.function,
            method: 'GET',
            data: {}
        })
    }
}

const systemAPI = new SystemAPI()
export default systemAPI