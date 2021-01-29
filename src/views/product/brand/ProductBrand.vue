<template>
  <a-card :border="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item :label="$t('product.brand.name')">
              <a-input
                v-model="queryParam.brandName"
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
        class="operation-button"
        @click="handleAdd"
        icon="plus"
        >{{ $t("product.brand.add") }}</a-button
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
      rowKey="brandId"
      :loading="loading"
      :pagination="pagination"
      :columns="columns"
      :data-source="data"
      :rowSelection="rowSelection"
      @change="handleChange"
    >
      <span slot="brandLogo" slot-scope="text, record">
        <template>
          <img v-if="record.brandLogo" :src="`http://${text}`" class="logo" />
        </template>
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <div>
            <a @click="handleEdit(record)">{{ $t("route.action.edit") }}</a>
          </div>
        </template>
      </span>
    </a-table>

    <product-brand-operation
      ref="brandOperation"
      :visible="visible"
      :record="currentRecord"
      @cancel="handleCancel"
      @ok="handleOk"
    />
  </a-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import productAPI from "@/api/product/ProductAPI";
import { Modal } from "ant-design-vue";
import ProductBrandOperation from "./ProductBrandOperation.vue";

@Component({
  components: {
    ProductBrandOperation,
  },
})
export default class ProductBrand extends Vue {
  queryParam: any = {};
  get columns() {
    return [
      {
        title: this.$t("product.brand.name"),
        dataIndex: "brandName",
      },
      {
        title: this.$t("product.brand.logo"),
        dataIndex: "brandLogo",
        scopedSlots: { customRender: "brandLogo" },
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

  getBrands(query: any) {
    this.loading = true;
    productAPI
      .getBrands(query)
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
    this.getBrands(query);
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
      title: this.$t("product.brand.delete.title"),
      content: this.$t("product.brand.delete.content"),
      onOk: () => {
        this.loading = true;
        productAPI
          .deleteBrand(this.rowSelection.selectedRowKeys)
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
    if (this.currentRecord.brandId) {
      this.currentRecord.brandName = result.brandName;
      this.currentRecord.brandLogo = result.brandLogo;
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
.logo {
  height: 32px;
  vertical-align: center;
  margin-right: 10px;
  border-style: none;
}
</style>
