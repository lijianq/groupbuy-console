import Request from '@/api/common/Request'

class SystemAPI {

    private apiPaths = {
        route: "/system/route",
        company: "/system/company"
    }
    private request = Request.getDefaultInstance()

    getRoutes() {
        return this.request.request({
            url: this.apiPaths.route,
            method: 'get',
            data: {}
        })
    }
}

const systemAPI = new SystemAPI()
export default systemAPI