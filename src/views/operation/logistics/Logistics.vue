<template>
  <a-card :border="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item :label="$t('operation.logistics.name')">
              <a-input
                v-model="queryParam.logisticsName"
                :placeholder="$t('common.input.search.hint')"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-button
              type="primary"
              class="query-button"
              @click="handleQuery"
              >{{ $t("route.action.query") }}</a-button
            >
            <a-button class="query-button" @click="handleReset">{{
              $t("common.reset")
            }}</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button
        type="primary"
        class="add-button"
        @click="handleAdd"
        icon="plus"
        >{{ $t("operation.logistics.add") }}</a-button
      >
      <a-button
        type="danger"
        class="operation-button"
        icon="delete"
        v-if="rowSelection.selectedRowKeys.length > 0"
        @click="handleDelete()"
        >{{ $t("route.action.delete") }}</a-button
      >
    </div>

    <a-table
      rowKey="logisticsId"
      :loading="loading"
      :pagination="pagination"
      :columns="columns"
      :data-source="data"
      :rowSelection="rowSelection"
      @change="handleChange"
    >
      <span slot="action" slot-scope="text, record">
        <template>
          <div>
            <a @click="handleEdit(record)">{{ $t("route.action.edit") }}</a>
          </div>
        </template>
      </span>
    </a-table>

    <logistics-operation
      ref="logisticsOperation"
      :visible="visible"
      :record="currentRecord"
      @cancel="handleCancel"
      @ok="handleOk"
    />
  </a-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import operationAPI from "@/api/operation/OperationAPI";
import { Modal } from "ant-design-vue";
import LogisticsOperation from "./LogisticsOperation.vue";

@Component({
  components: {
    LogisticsOperation,
  },
})
export default class Logistics extends Vue {
  queryParam: any = {};
  get columns() {
    return [
      {
        title: this.$t("operation.logistics.id"),
        dataIndex: "logisticsId",
      },
      {
        title: this.$t("operation.logistics.name"),
        dataIndex: "logisticsName",
      },
      {
        title: this.$t("common.action"),
        dataIndex: "action",
        scopedSlots: { customRender: "action" },
      },
    ];
  }

  data: any[] = [];

  rowSelection: any = {
    selectedRowKeys: [],
    onChange: this.onSelectChange,
  };

  loading = false;
  pagination: any = {
    defaultCurrent: 1,
    current: 1,
    defaultPageSize: 10,
    pageSize: 10,
    pageSizeOptions: ["10", "30", "50", "100"],
    showSizeChanger: true,
  };

  // operation modal
  visible = false;
  currentRecord: any = null;

  created() {
    this.processQuery();
  }

  onSelectChange(selectedRowKeys: any[]) {
    this.rowSelection.selectedRowKeys = selectedRowKeys;
  }

  getLogistics(query: any) {
    this.loading = true;
    operationAPI
      .getLogistics(query)
      .then((result: any) => {
        const records: any = result.data;
        const pagination = { ...this.pagination };
        pagination.total = parseInt(records.totalCount);
        this.data = records.resultSet;
        this.pagination = pagination;
      })
      .catch((error) => {
        this.$message.error(error.message);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  processQuery() {
    this.rowSelection.selectedRowKeys = [];
    const query: any = { ...this.queryParam };
    query.pageNumber = this.pagination.current;
    query.pageSize = this.pagination.pageSize;
    this.getLogistics(query);
  }

  handleQuery() {
    this.pagination.current = 1;
    this.processQuery();
  }

  handleChange(pagination: any) {
    if (this.pagination.pageSize !== pagination.pageSize) {
      this.pagination.current = 1;
    } else {
      this.pagination.current = pagination.current;
    }
    this.pagination.pageSize = pagination.pageSize;
    this.processQuery();
  }

  handleReset() {
    this.queryParam = {};
  }

  handleDelete() {
    Modal.confirm({
      okText: this.$t("common.ok").toString(),
      cancelText: this.$t("common.cancel").toString(),
      icon: () =>
        this.$createElement("a-icon", {
          props: {
            type: "exclamation-circle",
            theme: "twoTone",
            twoToneColor: "#FF0000",
          },
        }),
      title: this.$t("operation.logistics.delete.title"),
      content: this.$t("operation.logistics.delete.content"),
      onOk: () => {
        this.loading = true;
        operationAPI
          .deleteLogistics(this.rowSelection.selectedRowKeys)
          .then(() => {
            this.rowSelection.selectedRowKeys = [];
            this.handleQuery();
          })
          .catch((error) => {
            this.$message.error(error.message);
          })
          .finally(() => {
            this.loading = false;
          });
      },
      onCancel: () => {
        // do nothing
      },
    });
  }

  handleOk(result: any) {
    this.visible = false;
    if (this.currentRecord.logisticsId) {
      this.currentRecord.logisticsName = result.logisticsName;
    } else {
      this.rowSelection.selectedRowKeys = [];
      this.handleQuery();
    }
    setTimeout(() => {
      this.currentRecord = null;
    }, 150);
  }

  handleCancel() {
    this.visible = false;
    setTimeout(() => {
      this.currentRecord = null;
    }, 150);
  }

  handleAdd() {
    this.currentRecord = {};
    this.visible = true;
  }

  handleEdit(record: any) {
    this.currentRecord = record;
    this.visible = true;
  }
}
</script>
<style lang="less" scoped>
button.add-button {
  margin-right: 12px;
  padding: 0 15px;
  font-size: 14px;
  height: 32px;
  width: 150px;
}
</style>
