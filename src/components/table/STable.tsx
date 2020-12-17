import { Table } from 'ant-design-vue'
import { Component, Prop, Watch, Mixins, Vue} from 'vue-property-decorator'

@Component
export default class STable extends Mixins(Table, Vue) {

    @Prop({ type: Function, required: true })
    data!: Function

    @Prop({ type: Number, default: 1 })
    pageNum: number = 1

    @Prop({ type: Number, default: 10 })
    pageSize: number = 10

    @Prop({ type: Boolean, default: true })
    showSizeChanger = true

    @Prop({ type: [String, Boolean], default: 'auto' })
    showPagination = 'auto'

    @Prop({ type: Boolean, default: false })
    pageURI = false

    selectedRows: any[] = []
    selectedRowKeys: any[] = []
    localLoading = false
    localDataSource: any[] = []
    localPagination: any = Object.assign({}, this.pagination)

    @Watch('localPagination.current')
    currentPageChanged(pageNo: number) {
        this.pageURI && this.$router.push({
            ...this.$route,
            name: this.$route.name || undefined,
            params: Object.assign({}, this.$route.params, {
                pageNo: pageNo
            })
        })
        this.selectedRowKeys = []
        this.selectedRows = []
    }

    @Watch('pageNum')
    pageNumChanged(pageNum: number) {
        Object.assign(this.localPagination, {
            current: pageNum
        })
    }

    @Watch('pageSize')
    pageSizeChanged(pageSize: number) {
        Object.assign(this.localPagination, {
            pageSize: pageSize
        })
    }

    @Watch('showSizeChanger')
    showSizeChangerChanged(showSizeChanger: boolean) {
        Object.assign(this.localPagination, {
            showSizeChanger: showSizeChanger
        })
    }

    created() {
        const { pageNo } = this.$route.params
        const localPageNum = this.pageURI && (pageNo && parseInt(pageNo)) || this.pageNum
        this.localPagination = ['auto', true].includes(this.showPagination) && Object.assign({}, this.localPagination, {
            current: localPageNum,
            pageSize: this.pageSize,
            showSizeChanger: this.showSizeChanger
        }) || false
        this.loadData()
    }

    refresh(bool = false) {
        if (bool) {
            this.localPagination = Object.assign({}, this.localPagination, {
                current: 1,
                pageSize: this.pageSize,
                showSizeChanger: this.showSizeChanger
            })
        }
        this.loadData()
    }

    /**
      * 加载数据方法
      * @param {Object} pagination 分页选项器
      * @param {Object} filters 过滤条件
      * @param {Object} sorter 排序条件
      */
    loadData(pagination?: any, filters?: any, sorter?: any) {
        this.localLoading = true
        const parameter = Object.assign({
            pageNo: (pagination && pagination.current) ||
                this.showPagination && this.localPagination.current || this.pageNum,
            pageSize: (pagination && pagination.pageSize) ||
                this.showPagination && this.localPagination.pageSize || this.pageSize
        },
            (sorter && sorter.field && {
                sortField: sorter.field
            }) || {},
            (sorter && sorter.order && {
                sortOrder: sorter.order
            }) || {}, {
            ...filters
        }
        )
        const result = this.data(parameter)
        // 对接自己的通用数据接口需要修改下方代码中的 r.pageNo, r.totalCount, r.data
        // eslint-disable-next-line
        if ((typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function') {
            result.then((r: any) => {
                this.localPagination = this.showPagination && Object.assign({}, this.localPagination, {
                    current: r.pageNo, // 返回结果中的当前分页数
                    total: r.totalCount, // 返回结果中的总记录数
                    showSizeChanger: this.showSizeChanger,
                    pageSize: (pagination && pagination.pageSize) ||
                        this.localPagination.pageSize
                }) || false
                // 为防止删除数据后导致页面当前页面数据长度为 0 ,自动翻页到上一页
                if (r.data.length === 0 && this.showPagination && this.localPagination.current > 1) {
                    this.localPagination.current--
                    this.loadData()
                    return
                }

                // 这里用于判断接口是否有返回 r.totalCount 且 this.showPagination = true 且 pageNo 和 pageSize 存在 且 totalCount 小于等于 pageNo * pageSize 的大小
                // 当情况满足时，表示数据不满足分页大小，关闭 table 分页功能
                try {
                    if ((['auto', true].includes(this.showPagination) && r.totalCount <= (r.pageNo * this.localPagination.pageSize))) {
                        this.localPagination.hideOnSinglePage = true
                    }
                } catch (e) {
                    this.localPagination = false
                }
                this.localDataSource = r.data // 返回结果中的数组数据
                this.localLoading = false
            })
        }
    }

    /**
     * 用于更新已选中的列表数据 total 统计
     * @param selectedRowKeys
     * @param selectedRows
     */
    updateSelect(selectedRowKeys: any[], selectedRows: any[]) {
        this.selectedRows = selectedRows
        this.selectedRowKeys = selectedRowKeys
    }
    /**
    * 清空 table 已选中项
    */
    clearSelected() {
        if (typeof this.rowSelection.onChange !== 'undefined' ) {
            this.rowSelection.onChange([], [])
            this.updateSelect([], [])
        }
    }

    /**
     * 处理交给 table 使用者去处理 clear 事件时，内部选中统计同时调用
     * @param callback
     * @returns {*}
     */
    renderClear(callback: Function) {
        if (this.selectedRowKeys.length <= 0) return null
        return (
            <a style="margin-left: 24px" onClick={() => {
                callback()
                this.clearSelected()
            }
            }> 清空 </a>
        )
    }

    render() {
        const props: any = {}
        const that = this as any
        const localKeys = Object.keys(this.$data)
        Object.keys(this.$props).forEach(k => {
            const localKey = `local${k.substring(0, 1).toUpperCase()}${k.substring(1)}`
            if (localKeys.includes(localKey)) {
                props[k] = that[localKey]
                return props[k]
            }
            if (k === 'rowSelection') {
                if (this.rowSelection) {
                    // 如果需要使用alert，则重新绑定 rowSelection 事件
                    props[k] = {
                        ...this.rowSelection,
                        selectedRows: this.selectedRows,
                        selectedRowKeys: this.selectedRowKeys,
                        onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
                            this.updateSelect(selectedRowKeys, selectedRows)
                            typeof this.rowSelection.onChange !== 'undefined' && this.rowSelection.onChange(selectedRowKeys, selectedRows)
                        }
                    }
                    return props[k]
                } else {
                    // 如果没打算开启 rowSelection 则清空默认的选择项
                    props[k] = null
                    return props[k]
                }
            }
            that[k] && (props[k] = that[k])
            return props[k]
        })
        const table = (
            <a-table {...{ props, scopedSlots: { ...this.$scopedSlots } }} onChange={this.loadData} onExpand={(expanded: any, record: any) => { this.$emit('expand', expanded, record) }
            }>
            {Object.keys(this.$slots).map(name => (<template slot={name} > { this.$slots[name]} </template>)) }
            </a-table>
            )

        return(<div class="table-wrapper" >
                    {table}
               </div>
        )
    }
}
