<template>
  <a-card :border="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item :label="$t('customer.name')">
              <a-input
                v-model="queryParam.customerName"
                :placeholder="$t('search.input.hint')"
              />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item :label="$t('customer.phone')">
              <a-input
                v-model="queryParam.customerPhone"
                :placeholder="$t('search.input.hint')"
              />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item :label="$t('customer.community')">
              <a-input
                v-model="queryParam.customerCommunity"
                :placeholder="$t('search.input.hint')"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" class="operation-button" @click="handleQuery">{{
        $t("customer.query")
      }}</a-button>
      <a-button class="operation-button" @click="handleReset">{{
        $t("customer.reset")
      }}</a-button>
      <a-button
        type="primary"
        class="operation-button"
        @click="handleAdd"
        icon="plus"
        >{{ $t("customer.add") }}</a-button
      >
      <a-button
        type="danger"
        class="operation-button"
        icon="delete"
        v-if="rowSelection.selectedRowKeys.length > 0"
        @click="handleDelete(rowSelection.selectedRowKeys)"
        >{{ $t("customer.delete") }}</a-button
      >
    </div>

    <a-table
      rowKey="customerId"
      :loading="loading"
      :pagination="pagination"
      :columns="columns"
      :data-source="data"
      :rowSelection="rowSelection"
      @change="handleChange"
    >
      <span slot="customerAddress" slot-scope="text, record">
        <template>
          {{ `${record.customerRegion},${record.customerStreet}` }}
        </template>
      </span>
      <span slot="customerDetailAddress" slot-scope="text, record">
        <template>
          {{ `${record.customerCommunity}${getDetailAddress(record)}` }}
        </template>
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <div>
            <a @click="handleEdit(record)">{{ $t("customer.edit") }}</a>
          </div>
        </template>
      </span>
    </a-table>

    <customer-operation
      ref="customerOperation"
      :visible="visible"
      :record="currentRecord"
      @cancel="handleCancel"
      @ok="handleOk"
    />
  </a-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import customerAPI from "@/api/CustomerAPI";
import { Modal } from "ant-design-vue";
import CustomerOperation from "./CustomerOperation.vue";

@Component({
  components: {
    CustomerOperation,
  },
})
export default class Customer extends Vue {
  queryParam: any = {};
  get columns() {
    return [
      // {
      //   title: this.$t("customer.id"),
      //   dataIndex: "customerId",
      //   colSpan: 0,
      // },
      {
        title: this.$t("customer.name"),
        dataIndex: "customerName",
      },
      {
        title: this.$t("customer.phone"),
        dataIndex: "customerPhone",
      },
      {
        title: this.$t("customer.address"),
        dataIndex: "customerRegion",
        scopedSlots: { customRender: "customerAddress" },
      },
      {
        title: this.$t("customer.detail.address"),
        dataIndex: "customerCommunity",
        scopedSlots: { customRender: "customerDetailAddress" },
      },
      {
        title: this.$t("product.action"),
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

  getCustomers(query: any) {
    this.loading = true;
    customerAPI
      .getCustomers(query)
      .then((result) => {
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
    this.getCustomers(query);
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

  getDetailAddress(record: any) {
    let detailAddress;
    if (record.customerBuilding) {
      detailAddress = record.customerBuilding;
    }
    if (record.customerGate) {
      if (detailAddress) {
        detailAddress = detailAddress + "-" + record.customerGate;
      } else {
        detailAddress = record.customerGate;
      }
    }
    if (record.customerFloor) {
      if (detailAddress) {
        detailAddress = detailAddress + "-" + record.customerFloor;
      } else {
        detailAddress = record.customerFloor;
      }
    }
    if (record.customerRoom) {
      if (detailAddress) {
        detailAddress = detailAddress + "-" + record.customerRoom;
      } else {
        detailAddress = record.customerRoom;
      }
    }
    if (detailAddress) {
      detailAddress = "," + detailAddress;
    } else {
      detailAddress = "";
    }
    return detailAddress;
  }

  handleReset() {
    this.queryParam = {};
  }

  handleDelete(ids: string[]) {
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
      title: this.$t("customer.delete.title"),
      content: this.$t("customer.delete.content"),
      onOk: () => {
        this.loading = true;
        customerAPI
          .deleteCustomers(ids)
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

  handleAdd() {
    this.currentRecord = {};
    this.currentRecord.type = "add";
    this.visible = true;
  }

  handleEdit(record: any) {
    this.currentRecord = record;
    this.currentRecord.type = "edit";
    this.visible = true;
  }

  handleOk(result: any) {
    this.visible = false;
    if (this.currentRecord.customerId) {
      this.currentRecord.customerName = result.customerName;
      this.currentRecord.customerPhone = result.customerPhone;
      this.currentRecord.customerRegion = result.customerRegion;
      this.currentRecord.customerStreet = result.customerStreet;
      this.currentRecord.customerCommunity = result.customerCommunity;
      this.currentRecord.customerBuilding = result.customerBuilding;
      this.currentRecord.customerGate = result.customerGate;
      this.currentRecord.customerFloor = result.customerFloor;
      this.currentRecord.customerRoom = result.customerRoom;
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
}
</script>
