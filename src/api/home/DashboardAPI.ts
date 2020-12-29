import Request from '@/api/common/Request'

class DashboardAPI {

    private apiPaths = {
        content : "/homestat/content",
        chartData : "/homestat/chartData"
    }

    private request = Request.getMallInstance()
    
    getContent(){
        return this.request.request({
            url: this.apiPaths.content,
            method: 'get',
            data: {}
        })
    }
}

const dashboardAPI = new DashboardAPI()
export default dashboardAPI