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
            <a-form-item :label="$t('product.name')">
              <a-input
                v-model="queryParam.productName"
                :placeholder="$t('search.input.hint')"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item :label="$t('customer.community')">
              <a-input
                v-model="queryParam.customerCommunity"
                :placeholder="$t('search.input.hint')"
              />
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item :label="$t('customer.building')">
              <a-select
                v-model="queryParam.customerBuilding"
                :placeholder="$t('search.select.hint')"
              >
                <a-select-option
                  v-for="option in intRange"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item :label="$t('customer.gate')">
              <a-select
                v-model="queryParam.customerGate"
                :placeholder="$t('search.select.hint')"
              >
                <a-select-option
                  v-for="option in intRange"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item :label="$t('customer.floor')">
              <a-select
                v-model="queryParam.customerFloor"
                :placeholder="$t('search.select.hint')"
              >
                <a-select-option
                  v-for="option in intRange"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item :label="$t('order.status')">
              <a-select
                v-model="queryParam.orderStatus"
                :placeholder="$t('search.select.hint')"
              >
                <a-select-option value="New">{{
                  $t("order.status.new")
                }}</a-select-option>
                <a-select-option value="Process">{{
                  $t("order.status.process")
                }}</a-select-option>
                <a-select-option value="Ready">{{
                  $t("order.status.ready")
                }}</a-select-option>
                <a-select-option value="Completed">{{
                  $t("order.status.completed")
                }}</a-select-option>
                <a-select-option value="Invalid">{{
                  $t("order.status.invalid")
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="16" :sm="24">
            <a-form-item :label="$t('order.daterange')">
              <a-range-picker
                format="YYYY-MM-DD"
                v-model="queryParam.orderDateRange"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" class="operation-button" @click="handleQuery">{{
        $t("order.query")
      }}</a-button>
      <a-button class="operation-button" @click="handleReset">{{
        $t("order.reset")
      }}</a-button>
      <a-button
        type="primary"
        class="operation-button"
        @click="handleAdd"
        icon="plus"
        >{{ $t("order.add") }}</a-button
      >
      <a-button
        type="danger"
        class="operation-button"
        icon="delete"
        v-if="rowSelection.selectedRowKeys.length > 0"
        @click="handleDelete(rowSelection.selectedRowKeys)"
        >{{ $t("order.delete") }}</a-button
      >
      <a-button
        type="primary"
        style="float: right;"
        class="operation-button"
        @click="printLabels"
        >{{ $t("order.print.label") }}</a-button
      >
      <a-button
        type="primary"
        style="float: right;"
        class="operation-button"
        @click="printOrder"
        >{{ $t("order.print") }}</a-button
      >
    </div>

    <a-table
      rowKey="orderId"
      :loading="loading"
      :pagination="pagination"
      :columns="columns"
      :data-source="data"
      :rowSelection="rowSelection"
      @change="handleChange"
    >
      <span slot="orderStatus" slot-scope="text">
        <template>
          {{ $t(`order.status.${text.toLowerCase()}`) }}
        </template>
      </span>
      <span slot="orderProfit" slot-scope="text, record">
        <template>
          {{ Number(record.orderAmount - record.orderCost).toFixed(2) }}
        </template>
      </span>
      <span slot="productDetail" slot-scope="text, record">
        <template>
          <div v-if="record.productSpec">
            {{
              `${record.productName}/${record.productUnit}/${record.productSpec}`
            }}
          </div>
          <div v-else>
            {{ `${record.productName}/${record.productUnit}` }}
          </div>
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
            <a @click="handleEdit(record)">{{ $t("order.edit") }}</a>
          </div>
        </template>
      </span>
    </a-table>

    <order-operation
      ref="orderOperation"
      :visible="visible"
      :record="currentRecord"
      @cancel="handleCancel"
      @ok="handleOk"
    />
    <iframe
      ref="printIFrame"
      width="0"
      height="0"
      frameborder="0"
      id="print-iframe"
      style="display: none;"
    ></iframe>
  </a-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import orderAPI from "@/api/OrderAPI";
import { Modal } from "ant-design-vue";
import OrderOperation from "./OrderOperation.vue";
import { IntRange } from "@/config";
import moment from "moment";
import printJS from "print-js";

@Component({
  components: {
    OrderOperation,
  },
})
export default class Order extends Vue {
  intRange = IntRange.smallRange;
  queryParam: any = {};
  get columns() {
    return [
      {
        title: this.$t("product.name"),
        dataIndex: "productName",
        scopedSlots: { customRender: "productDetail" },
      },
      {
        title: this.$t("customer.name"),
        dataIndex: "customerName",
      },
      // {
      //   title: this.$t("customer.phone"),
      //   dataIndex: "customerPhone",
      // },
      {
        title: this.$t("order.unit"),
        dataIndex: "orderUnit",
      },
      {
        title: this.$t("order.amount"),
        dataIndex: "orderAmount",
      },
      // {
      //   title: this.$t("order.profit"),
      //   dataIndex: "orderCost",
      //   scopedSlots: { customRender: "orderProfit" },
      // },
      {
        title: this.$t("customer.detail.address"),
        dataIndex: "customerCommunity",
        scopedSlots: { customRender: "customerDetailAddress" },
      },
      {
        title: this.$t("order.status"),
        dataIndex: "orderStatus",
        scopedSlots: { customRender: "orderStatus" },
      },
      {
        title: this.$t("order.time"),
        dataIndex: "orderTime",
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
    this.handleReset();
    this.processQuery();
  }

  onSelectChange(selectedRowKeys: any[]) {
    this.rowSelection.selectedRowKeys = selectedRowKeys;
  }

  getOrders(query: any) {
    this.loading = true;
    orderAPI
      .getOrders(query)
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
    if (this.queryParam.orderDateRange) {
      this.queryParam.orderStartDate = moment(
        this.queryParam.orderDateRange[0]
      ).format("YYYY-MM-DD");
      this.queryParam.orderEndDate = moment(
        this.queryParam.orderDateRange[1]
      ).format("YYYY-MM-DD");
    }
    this.rowSelection.selectedRowKeys = [];
    const query: any = { ...this.queryParam };
    query.pageNumber = this.pagination.current;
    query.pageSize = this.pagination.pageSize;
    this.getOrders(query);
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
    this.queryParam = {
      orderDateRange: [moment().subtract(1, "week"), moment()],
    };
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
      title: this.$t("order.delete.title"),
      content: this.$t("order.delete.content"),
      onOk: () => {
        this.loading = true;
        orderAPI
          .deleteOrder(ids)
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

  handleOk() {
    this.visible = false;
    this.rowSelection.selectedRowKeys = [];
    this.handleQuery();
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

  printOrder() {
    const query: any = { ...this.queryParam };
    query.pageNumber = 1;
    query.pageSize = 1000;
    this.loading = true;
    orderAPI
      .getOrderDeliveries(query)
      .then((result) => {
        const records: any = result.data;
        this.print(records);
      })
      .catch((error) => {
        this.$message.error(error.message);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  print(records: any) {
    printJS({
      printable: records,
      properties: [
        {
          field: "customerName",
          displayName: this.$t("customer.name"),
          columnSize: 1,
        },
        {
          field: "productName",
          displayName: this.$t("product.name"),
          columnSize: 1,
        },
        {
          field: "customerDetailAddress",
          displayName: this.$t("customer.detail.address"),
          columnSize: 1,
        },
        {
          field: "orderUnit",
          displayName: this.$t("order.unit"),
          columnSize: 1,
        },
      ],
      type: "json",
      gridStyle:
        "padding: 16px 16px; overflow-wrap: break-word; color: rgba(0, 0, 0, 0.85); font-weight: 500; text-align: left; border-bottom: 1px solid #e8e8e8; transition: background 0.3s ease;",
      gridHeaderStyle:
        "padding: 16px 16px; overflow-wrap: break-word; color: rgba(0, 0, 0, 0.85); font-size: 20px; font-weight: bold; text-align: left; background: #fafafa; border-bottom: 1px solid #e8e8e8; transition: background 0.3s ease;",
    });
  }

  printLabels() {
    (this.$refs.printIFrame as any).contentWindow.document.body.innerHTML =
      "<div style='page-break-after: always;'><h1>标签测试</h1></div><div style='page-break-after: always;'><h1>标签测试</h1></div>";
    console.log(this.$refs.printIFrame);
    (this.$refs.printIFrame as any).contentWindow.print();
    (this.$refs.printIFrame as any).contentWindow.document.body.innerHTML = "";
    console.log(this.$refs.printIFrame);
  }
}
</script>
