<template>
  <a-card :border="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item :label="$t('product.name')">
              <a-input
                v-model="queryParam.productName"
                :placeholder="$t('search.input.hint')"
              />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item :label="$t('product.status')">
              <a-select
                v-model="queryParam.productStatus"
                :placeholder="$t('search.select.hint')"
              >
                <a-select-option value="Active">{{
                  $t("product.status.active")
                }}</a-select-option>
                <a-select-option value="Inactive">{{
                  $t("product.status.inactive")
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" class="operation-button" @click="handleQuery">{{
        $t("product.query")
      }}</a-button>
      <a-button class="operation-button" @click="handleReset">{{
        $t("product.reset")
      }}</a-button>
      <a-button
        type="primary"
        class="operation-button"
        @click="handleAdd"
        icon="plus"
        >{{ $t("product.add") }}</a-button
      >
      <a-button
        type="danger"
        class="operation-button"
        icon="delete"
        v-if="rowSelection.selectedRowKeys.length > 0"
        @click="handleDelete(rowSelection.selectedRowKeys)"
        >{{ $t("product.delete") }}</a-button
      >
    </div>

    <a-table
      rowKey="productId"
      :loading="loading"
      :pagination="pagination"
      :columns="columns"
      :data-source="data"
      :rowSelection="rowSelection"
      @change="handleChange"
    >
      <span slot="productStatus" slot-scope="text">
        <template>
          {{ $t(`product.status.${text.toLowerCase()}`) }}
        </template>
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <div>
            <a @click="handleEdit(record)">{{ $t("product.edit") }}</a>
            <a-divider type="vertical" />
            <a @click="handleReady(record)">{{ $t("product.ready") }}</a>
          </div>
        </template>
      </span>
    </a-table>

    <product-operation
      ref="productOperation"
      :visible="visible"
      :record="currentRecord"
      @cancel="handleCancel"
      @ok="handleOk"
    />
  </a-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import productAPI from "@/api/ProductAPI";
import { Modal } from "ant-design-vue";
import ProductOperation from "./ProductOperation.vue";

@Component({
  components: {
    ProductOperation,
  },
})
export default class Product extends Vue {
  queryParam: any = {};
  get columns() {
    return [
      {
        title: this.$t("product.id"),
        dataIndex: "productId",
      },
      {
        title: this.$t("product.name"),
        dataIndex: "productName",
      },
      {
        title: this.$t("product.price"),
        dataIndex: "productPrice",
      },
      {
        title: this.$t("product.cost"),
        dataIndex: "productCost",
      },
      {
        title: this.$t("product.unit"),
        dataIndex: "productUnit",
      },
      {
        title: this.$t("product.spec"),
        dataIndex: "productSpec",
      },
      {
        title: this.$t("product.status"),
        dataIndex: "productStatus",
        scopedSlots: { customRender: "productStatus" },
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

  getProducts(query: any) {
    this.loading = true;
    productAPI
      .getProducts(query)
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
    if (query.companyRegion) {
      query.companyRegion = query.companyRegion.toString();
    }
    query.pageNumber = this.pagination.current;
    query.pageSize = this.pagination.pageSize;
    this.getProducts(query);
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
      title: this.$t("product.delete.title"),
      content: this.$t("product.delete.content"),
      onOk: () => {
        this.loading = true;
        productAPI
          .deleteProducts(ids)
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

  handleReady(record: any) {
    const product: any = {};
    product.productId = record.productId;
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
      title: this.$t("product.ready"),
      content: this.$t("product.ready.content"),
      onOk: () => {
        this.loading = true;
        productAPI
          .updateOrderToReady(product)
          .then(() => {
            this.$message.success(this.$t("product.ready.success").toString());
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
    if (this.currentRecord.productId) {
      this.currentRecord.productName = result.productName;
      this.currentRecord.productPrice = result.productPrice;
      this.currentRecord.productCost = result.productCost;
      this.currentRecord.productUnit = result.productUnit;
      this.currentRecord.productSpec = result.productSpec;
      this.currentRecord.productStatus = result.productStatus;
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
