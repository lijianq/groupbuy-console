<template>
  <a-card :border="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item :label="$t('statistics.product')">
              <a-select
                v-model="queryParam.statisticProductId"
                showSearch
                :placeholder="$t('statistics.product.select')"
                :showArrow="false"
                :filterOption="false"
                @search="fetchProducts"
                :notFoundContent="
                  pfetching ? undefined : $t('statistic.product.nodata')
                "
              >
                <a-spin v-if="pfetching" slot="notFoundContent" size="small" />
                <a-select-option
                  v-for="(product, index) in products"
                  :value="product.productId"
                  :key="index"
                >
                  <div v-if="product.productSpec">
                    {{
                      `${product.productName}/${product.productUnit}/${product.productSpec}`
                    }}
                  </div>
                  <div v-else>
                    {{ `${product.productName}/${product.productUnit}` }}
                  </div>
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item :label="$t('statistic.order.status')">
              <a-select
                v-model="queryParam.statisticOrderStatus"
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
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="10" :sm="24">
            <a-form-item :label="$t('statistics.order.daterange')">
              <a-range-picker
                format="YYYY-MM-DD"
                v-model="queryParam.statisticOrderDateRange"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" class="operation-button" @click="handleQuery">{{
        $t("statistic.sum")
      }}</a-button>
      <a-button class="operation-button" @click="handleReset">{{
        $t("statistic.reset")
      }}</a-button>
    </div>

    <a-table
      rowKey="productId"
      :loading="loading"
      :columns="columns"
      :data-source="data"
      :pagination="false"
    >
      <span slot="productDetail" slot-scope="text, record">
        <template>
          <div v-if="record.productName">
            <div v-if="text">
              {{
                `${record.productName}/${record.productUnit}/${record.productSpec}`
              }}
            </div>
            <div v-else>
              {{ `${record.productName}/${record.productUnit}` }}
            </div>
          </div>
          <div v-else>
            {{ $t("statistic.summary") }}
          </div>
        </template>
      </span>
      <span slot="totalProfit" slot-scope="text, record">
        <template>
          {{ Number(record.totalAmount - record.totalCost).toFixed(2) }}
        </template>
      </span>
    </a-table>
  </a-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import productAPI from "@/api/ProductAPI";
import statisticAPI from "@/api/StatisticAPI";
import moment from "moment";
import { debounce } from "lodash";

@Component({
  components: {},
})
export default class ProductStatistic extends Vue {
  products = [];
  pfetching = false;
  queryParam: any = {};
  get columns() {
    return [
      {
        title: this.$t("product.name"),
        dataIndex: "productSpec",
        scopedSlots: { customRender: "productDetail" },
      },
      {
        title: this.$t("statistic.total.unit"),
        dataIndex: "totalUnit",
      },
      {
        title: this.$t("statistic.total.amount"),
        dataIndex: "totalAmount",
      },
      {
        title: this.$t("statistic.total.profit"),
        dataIndex: "totalCost",
        scopedSlots: { customRender: "totalProfit" },
      },
    ];
  }

  data: any = [];

  loading = false;

  created() {
    this.handleReset();
    this.processQuery();
  }

  getStatistics(query: any) {
    this.loading = true;
    statisticAPI
      .getProductStatistics(query)
      .then((result) => {
        this.data = result.data;
      })
      .catch((error) => {
        this.$message.error(error.message);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  processQuery() {
    if (this.queryParam.statisticOrderDateRange) {
      this.queryParam.statisticOrderStartDate = moment(
        this.queryParam.statisticOrderDateRange[0]
      ).format("YYYY-MM-DD");
      this.queryParam.statisticOrderEndDate = moment(
        this.queryParam.statisticOrderDateRange[1]
      ).format("YYYY-MM-DD");
    }
    const query: any = { ...this.queryParam };
    this.getStatistics(query);
  }

  handleQuery() {
    this.processQuery();
  }

  handleReset() {
    this.queryParam = {
      statisticOrderDateRange: [moment().subtract(1, "week"), moment()],
    };
  }

  fetchProducts = debounce(this.fetchProductData, 800);

  fetchProductData(value: any) {
    if (value.trim().length == 0) {
      this.pfetching = false;
      this.products = [];
      return;
    }
    this.pfetching = true;
    const query: any = {};
    query.productName = value;
    productAPI
      .getProductByName(query)
      .then((result: any) => {
        this.products = result.data.resultSet;
      })
      .catch((error) => {
        this.$message.error(error.message);
      })
      .finally(() => {
        this.pfetching = false;
      });
  }
}
</script>
