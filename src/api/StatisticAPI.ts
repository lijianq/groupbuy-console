import Request from '@/api/Request'

class StatisticAPI {

    private apiPaths = {
        product: "/gb/statistic/product",
        customer: "/gb/statistic/customer",
        statistic: "/gb/statistic"
    }
    private request = Request.getDefaultInstance()

    getCustomerStatistics(queryParam: any) {
        return this.request.request({
            url: this.apiPaths.customer,
            method: "post",
            data: queryParam
        })
    }

    getProductStatistics(queryParam: any) {
        return this.request.request({
            url: this.apiPaths.product,
            method: "post",
            data: queryParam
        })
    }

    getStatistics() {
        return this.request.request({
            url: this.apiPaths.statistic,
            method: "post",
            data: {}
        })
    }


}

const statisticAPI = new StatisticAPI()
export default statisticAPI