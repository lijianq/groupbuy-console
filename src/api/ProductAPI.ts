import Request from '@/api/Request'

class ProductAPI {

    private apiPaths = {
        product: "/gb/product",
        search: "/gb/product/search",
        orderReady: "/gb/order/ready"
    }
    private request = Request.getDefaultInstance()

    getProducts(queryParam: any) {
        return this.request.request({
            url: this.apiPaths.product,
            method: "post",
            data: queryParam
        })
    }

    getProductByName(queryParam: any) {
        return this.request.request({
            url: this.apiPaths.search,
            method: "post",
            data: queryParam
        })
    }

    deleteProducts(productIds: string[]) {
        return this.request.request({
            url: this.apiPaths.product,
            method: 'delete',
            data: productIds
        })
    }

    saveProduct(product: any) {
        return this.request.request({
            url: this.apiPaths.product,
            method: 'put',
            data: product
        })
    }

    updateOrderToReady(product: any) {
        return this.request.request({
            url: this.apiPaths.orderReady,
            method: 'put',
            data: product
        });
    }
}

const productAPI = new ProductAPI()
export default productAPI