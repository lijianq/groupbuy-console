import Request from '@/api/common/Request'

class OperationAPI {

    private apiPaths = {
        logistics: "/admin/op/setting/logistics",
        freight: "/admin/op/setting/freight"
    }
    private request = Request.getDefaultInstance()

    getLogistics(query: any) {
        return this.request.request({
            url: this.apiPaths.logistics,
            method: 'post',
            data: query
        })
    }

    saveLogistics(logistics: any) {
        return this.request.request({
            url: this.apiPaths.logistics,
            method: 'put',
            data: logistics
        })
    }

    deleteLogistics(logisticsIds: string[]) {
        return this.request.request({
            url: this.apiPaths.logistics,
            method: 'delete',
            data: logisticsIds
        })
    }
}

const operationAPI = new OperationAPI()
export default operationAPI