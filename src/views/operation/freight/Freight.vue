<template>
  <a-card :border="false">
    <div v-if="currentIndex === 0">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item :label="$t('operation.freight.name')">
                <a-input
                  v-model="queryParam.freightName"
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
          >{{ $t("operation.freight.add") }}</a-button
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
        :scroll="{ x: 1500, y: 500 }"
        rowKey="freightId"
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
    </div>
    <div v-if="currentIndex === 1">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" :tab="$t('operation.freight.add')">
          <a-form
            :form="form"
            id="logisticsOpForm"
            v-bind="formLayout"
            labelAlign="left"
          >
            <a-form-item :label="$t('operation.freight.id')">
              <a-input v-decorator="['logisticsId']" disabled />
            </a-form-item>
            <a-form-item :label="$t('operation.freight.name')">
              <a-input
                v-decorator="[
                  'freightName',
                  {
                    rules: [
                      {
                        required: true,
                        max: 100,
                        message: $t('operation.freight.name.required'),
                      },
                    ],
                  },
                ]"
              >
              </a-input>
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import operationAPI from "@/api/operation/OperationAPI";
import { Modal } from "ant-design-vue";

@Component
export default class Freight extends Vue {
  formLayout: any = {
    labelCol: {
      xs: { span: 12 },
      sm: { span: 3 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  };
  currentIndex = 0;
  queryParam: any = {};
  get columns() {
    return [
      {
        title: this.$t("operation.freight.name"),
        dataIndex: "freightName",
        fixed: "left",
        width: 150,
      },
      {
        title: this.$t("operation.freight.default"),
        dataIndex: "isDefault",
      },
      {
        title: this.$t("operation.freight.logistics"),
        dataIndex: "logisticsId",
      },
      {
        title: this.$t("operation.freight.type"),
        dataIndex: "chargeType",
      },
      {
        title: this.$t("operation.freight.free"),
        dataIndex: "isShippingFree",
      },
      {
        title: this.$t("operation.freight.free.amount"),
        dataIndex: "shippingFreeAmount",
      },
      {
        title: this.$t("operation.freight.first.unit"),
        dataIndex: "defaultFirstUnit",
      },
      {
        title: this.$t("operation.freight.first.price"),
        dataIndex: "defaultFirstPrice",
      },
      {
        title: this.$t("operation.freight.next.unit"),
        dataIndex: "defaultNextUnit",
      },
      {
        title: this.$t("operation.freight.next.price"),
        dataIndex: "defaultNextPrice",
      },
      {
        title: this.$t("common.action"),
        dataIndex: "action",
        fixed: "right",
        width: 150,
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
    //this.processQuery();
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
    this.currentIndex = 1;
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
