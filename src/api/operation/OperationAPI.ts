import Request from '@/api/common/Request'

class OperationAPI {

    private apiPaths = {
        logistics: "/admin/op/setting/logistics",
        freight: "/admin/op/setting/freight",
        freightRule: "/admin/op/setting/freight/region",
        province: "/admin/op/common/province",
    }
    private request = Request.getDefaultInstance()

    getProvince() {
        return this.request.request({
            url: this.apiPaths.province,
            method: 'get'
        })
    }

    getLogisticsOption() {
        return this.request.request({
            url: this.apiPaths.logistics,
            method: 'get',
        })
    }

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

    getFreight(query: any) {
        return this.request.request({
            url: this.apiPaths.freight,
            method: 'post',
            data: query
        })
    }

    saveFreight(freight: any) {
        return this.request.request({
            url: this.apiPaths.freight,
            method: 'put',
            data: freight
        })
    }

    deleteFreight(freightIds: string[]) {
        return this.request.request({
            url: this.apiPaths.freight,
            method: 'delete',
            data: freightIds
        })
    }

    getFreightRegion(freightId: string) {
        return this.request.request({
            url: `${this.apiPaths.freightRule}/${freightId}`,
            method: 'get'
        })
    }
}

const operationAPI = new OperationAPI()
export default operationAPI