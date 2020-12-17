<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="规则编号">
              <a-input v-model="queryParam.id" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="使用状态">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="调用次数">
                <a-input-number v-model="queryParam.callNo" style="width: 100%"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="更新日期">
                <a-date-picker v-model="queryParam.date" style="width: 100%" placeholder="请输入更新日期"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select v-model="queryParam.useStatus" placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" style="width: 120px;" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 10px; width: 120px;" @click="() => queryParam = {}">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 10px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" class="operation-button" icon="plus" @click="handleEdit()">新建</a-button>
      <a-button type="danger" class="operation-button" icon="delete" v-if="selectedRowKeys.length > 0">删除</a-button>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="key"
      :columns="columns"
      :data="loadData"
      :rowSelection="options.rowSelection"
    >
      <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
        </template>
        <a-dropdown>
          <a class="ant-dropdown-link">
            更多 <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">详情</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </s-table>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import STable from '@/components/table/STable'
import moment from 'moment'

@Component({
    components: {
        STable
    }
})
export default class Function extends Vue {

    mdl: any = {}
    advanced = false
    queryParam: any = {}
    columns: any[] = [
        {
            title: '#',
            scopedSlots: { customRender: 'serial' }
        },
        {
            title: '规则编号',
            dataIndex: 'no'
        },
        {
            title: '描述',
            dataIndex: 'description'
        },
        {
            title: '服务调用次数',
            dataIndex: 'callNo',
            sorter: true,
            needTotal: true,
            customRender: (text: string) => text + ' 次'
        },
        {
            title: '状态',
            dataIndex: 'status',
            needTotal: true
        },
        {
            title: '更新时间',
            dataIndex: 'updatedAt',
            sorter: true
        },
        {
            title: '操作',
            dataIndex: 'action',
            width: '150px',
            scopedSlots: { customRender: 'action' }
        }
    ]
    loadData = (parameter: any) => {
        return this.getServiceList(Object.assign(parameter, this.queryParam))
            .then( (res: any) => {
                return res
            }) 
    }
    selectedRowKeys: any[] = []
    selectedRows: any[] = []

    options: any = {
        rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange
        }
    }

    handleEdit(record: any) {
        this.$emit('onEdit', record)
    }

    handleOk() {
        console.log('OK')
    }

    onSelectChange(selectedRowKeys: any[], selectedRows: any[]) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
    }

    toggleAdvanced() {
        this.advanced = !this.advanced
    }

    resetSearchForm() {
        this.queryParam = {
            date: moment(new Date())
        }
    }

    getServiceList(options: any) {
        const totalCount = 5701
        const result = []
        const pageNo = parseInt(options.pageNo)
        const pageSize = parseInt(options.pageSize)
        const totalPage = Math.ceil(totalCount / pageSize)
        const key = (pageNo - 1) * pageSize
        const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

        for (let i = 1; i < next; i++) {
            const tmpKey = key + i
            result.push({
                key: tmpKey,
                id: tmpKey,
                no: 'No ' + tmpKey,
                description: '这是一段描述',
                callNo: 999,
                status: 2,
                updatedAt: '2020-09-08 12:00:02',
                editable: false
            })
        }
        const response = {
            pageSize: pageSize,
            pageNo: pageNo,
            totalCount: totalCount,
            totalPage: totalPage,
            data:result
        }
        return new Promise(resolve => {
            resolve(response)
        })
    }
}
</script>

<style lang='less' scoped>
button.operation-button {
    padding: 0 15px;
    font-size: 14px;
    height: 35px;
    width: 15%;
}
</style>
