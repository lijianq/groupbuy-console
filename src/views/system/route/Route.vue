<template>
  <div>
    <div class="table-operator">
      <a-button
        type="primary"
        class="operation-button"
        icon="plus"
        @click="handleAdd"
        >{{ $t('system.route.create') }}</a-button
      >
      <a-button
        type="danger"
        class="operation-button"
        icon="delete"
        v-if="selectedRowKeys.length > 0"
        >{{ $t('system.route.delete') }}</a-button
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
          <a-icon :type="record.routeMeta.icon" style="margin-right: 5px;"></a-icon> {{ $t(record.routeMeta.title) }}
        </template>
      </span>
      <span slot="type" slot-scope="text">
        <template>
          {{ $t(`system.route.${text.toLowerCase()}`) }}
        </template>
      </span>
      <span v-if="record.routeType !== 'Preset'" slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">{{ $t('system.route.edit') }}</a>
          <a-divider type="vertical" />
          <a @click="handleEdit(record)">{{ $t('system.route.delete') }}</a>
          <a-divider type="vertical" />
          <a @click="handleEdit(record)">{{ $t('system.route.actions') }}</a>
          <span v-if="record.routeType === 'Group'">
            <a-divider type="vertical" />
            <a @click="handleEdit(record)">{{ $t('system.route.child') }}</a>
          </span>
        </template>
      </span>
    </a-table>

    <route-operation
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
import RouteOperation from "./RouteOperation.vue"
import SystemAPI from "@/api/system/SystemAPI"

@Component({
  components: {
    STable,
    RouteOperation,
  },
})
export default class Route extends Vue {
  columns: any[] = [
    {
      title: this.$t('system.route.name'),
      dataIndex: "routeName",
      scopedSlots: { customRender: "name" }
    },
    {
      title: this.$t('system.route.type'),
      dataIndex: "routeType",
      scopedSlots: { customRender: "type" }
    },
    {
      title: this.$t('system.route.action'),
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
    SystemAPI.getRoutes().then(response => {
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
