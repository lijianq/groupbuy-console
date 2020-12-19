<template>
  <div>
    <div class="table-operator">
      <a-button
        type="primary"
        class="operation-button"
        icon="plus"
        @click="handleAdd"
        >{{ $t('system.function.create') }}</a-button
      >
      <a-button
        type="danger"
        class="operation-button"
        icon="delete"
        v-if="selectedRowKeys.length > 0"
        >{{ $t('system.function.delete') }}</a-button
      >
    </div>

    <a-table
      :columns="columns"
      :data-source="data"
      :row-selection="rowSelection"
      :pagination="false"
      :loading="dataLoading"
      rowKey="routeId"
    >
      <span slot="name" slot-scope="text, record">
        <template>
          <a-icon :type="record.routeMeta.icon" style="margin-right: 5px;"></a-icon> {{ text }}
        </template>
      </span>
      <span v-if="record.routeType !== 'Preset'" slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">{{ $t('system.function.edit') }}</a>
          <a-divider type="vertical" />
          <a @click="handleEdit(record)">{{ $t('system.function.delete') }}</a>
          <a-divider type="vertical" />
          <a @click="handleEdit(record)">{{ $t('system.function.actions') }}</a>
          <span v-if="record.routeType === 'Group'">
            <a-divider type="vertical" />
            <a @click="handleEdit(record)">{{ $t('system.function.child') }}</a>
          </span>
        </template>
      </span>
    </a-table>

    <function-operation
      ref="createModal"
      :visible="visible"
      :loading="confirmLoading"
      :model="mdl"
      @cancel="handleCancel"
      @ok="handleOk"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import STable from "@/components/table/STable"
import FunctionOperation from "./FunctionOperation.vue"
import SystemAPI from "@/api/system/SystemAPI"

@Component({
  components: {
    STable,
    FunctionOperation,
  },
})
export default class Function extends Vue {
  columns: any[] = [
    {
      title: "system.function.name",
      dataIndex: "routeName",
      scopedSlots: { customRender: "name" }
    },
    {
      title: "system.function.type",
      dataIndex: "routeType",
    },
    {
      title: "system.function.action",
      dataIndex: "action",
      scopedSlots: { customRender: "action" },
    },
  ];
  data: any[] = []
  dataLoading = false
  selectedRowKeys: any[] = [];
  selectedRows: any[] = [];

  rowSelection: any = {
    onChange: this.onSelectChange,
  };

  mdl: any = null
  visible = false
  confirmLoading = false

  created() {
    this.dataLoading = true
    SystemAPI.getFunctions().then(response => {
      this.data = response.data as any[]
      console.log(this.data)
    }).catch(error => {
      this.$message.error(error.message)
    }).finally(() => {
      this.dataLoading = false
    })
  }

  onSelectChange(selectedRowKeys: any[], selectedRows: any[]) {
    this.selectedRowKeys = selectedRowKeys;
    this.selectedRows = selectedRows;
  }

  handleEdit(record: any) {
    this.visible = true;
    this.mdl = { ...record };
  }

  handleAdd() {
    this.mdl = null;
    this.visible = true;
  }

  handleOk() {
    console.log("Click OK");
    this.visible = false;
  }
  handleCancel() {
    console.log("Click Cancel");
    this.visible = false;
  }
}
</script>

<style lang="less" scoped>
button.operation-button {
  padding: 0 15px;
  font-size: 14px;
  height: 35px;
  width: 15%;
}
</style>
