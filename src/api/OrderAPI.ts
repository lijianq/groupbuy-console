import Request from '@/api/Request'

class OrderAPI {

    private apiPaths = {
        order: "/gb/order",
        delivery: "/gb/order/delivery",
    }
    private request = Request.getDefaultInstance()

    getOrders(queryParam: any) {
        return this.request.request({
            url: this.apiPaths.order,
            method: "post",
            data: queryParam
        })
    }

    getOrderDeliveries(queryParam: any) {
        return this.request.request({
            url: this.apiPaths.delivery,
            method: "post",
            data: queryParam
        })
    }

    deleteOrder(orderIds: string[]) {
        return this.request.request({
            url: this.apiPaths.order,
            method: 'delete',
            data: orderIds
        })
    }

    saveOrder(order: any) {
        return this.request.request({
            url: this.apiPaths.order,
            method: 'put',
            data: order
        })
    }


}

const orderAPI = new OrderAPI()
export default orderAPI