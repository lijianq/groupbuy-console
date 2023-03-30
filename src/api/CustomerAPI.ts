import Request from '@/api/Request'

class CustomerAPI {

    private apiPaths = {
        customer: "/gb/customer",
        search: "/gb/customer/search",
    }
    private request = Request.getDefaultInstance()

    getCustomers(queryParam: any) {
        return this.request.request({
            url: this.apiPaths.customer,
            method: "post",
            data: queryParam
        })
    }

    getCustomerByName(queryParam: any) {
        return this.request.request({
            url: this.apiPaths.search,
            method: "post",
            data: queryParam
        })
    }

    deleteCustomers(customerIds: string[]) {
        return this.request.request({
            url: this.apiPaths.customer,
            method: 'delete',
            data: customerIds
        })
    }

    saveCustomer(customer: any) {
        return this.request.request({
            url: this.apiPaths.customer,
            method: 'put',
            data: customer
        })
    }
}

const customerAPI = new CustomerAPI()
export default customerAPI