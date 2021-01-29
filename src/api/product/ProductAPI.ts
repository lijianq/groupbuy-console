import Request from '@/api/common/Request'

class ProductAPI {

    private apiPaths = {
        category: "/admin/product/category",
        brand: "/admin/product/brand"
    }
    private request = Request.getDefaultInstance()

    getRootCategories() {
        return this.request.request({
            url: this.apiPaths.category,
            method: 'get'
        })
    }

    getCategoryTree(homeId: string) {
        return this.request.request({
            url: `${this.apiPaths.category}/${homeId}`,
            method: 'get'
        })
    }

    saveCategory(category: any, isAdd: boolean) {
        return this.request.request({
            url: this.apiPaths.category,
            method: isAdd ? 'put' : 'patch',
            data: category
        })
    }

    deleteCategory(categoryIds: string[]) {
        return this.request.request({
            url: this.apiPaths.category,
            method: 'delete',
            data: categoryIds
        })
    }

    getBrands(query: any) {
        return this.request.request({
            url: this.apiPaths.brand,
            method: 'post',
            data: query
        })
    }

    saveBrand(brand: any, isAdd: boolean) {
        return this.request.request({
            url: this.apiPaths.brand,
            method: isAdd ? 'put' : 'patch',
            data: brand
        })
    }

    deleteBrand(brandIds: string[]) {
        return this.request.request({
            url: this.apiPaths.brand,
            method: 'delete',
            data: brandIds
        })
    }
}

const productAPI = new ProductAPI()
export default productAPI