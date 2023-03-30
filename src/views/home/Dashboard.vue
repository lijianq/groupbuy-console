<template>
  <div>
    <div class="page-common-header">
      <a-row>
        <a-col :span="6">
          <div class="header-divider"></div>
          <div class="header-title">{{ $t("home.dashboard.title") }}</div>
        </a-col>
        <a-col :offset="16" :span="2">
          <a-button
            icon="reload"
            :loading="refreshing"
            @click="getStatistics"
            >{{ $t("dashboard.button.refresh") }}</a-button
          >
        </a-col>
      </a-row>
    </div>

    <div class="app-container">
      <a-row :gutter="20">
        <a-col :span="6">
          <a-card style="height:100px;">
            <a-row>
              <a-col :span="8"
                ><orderSVG style="width: 54px; height: 54px; fill:#F56C6C;"
              /></a-col>
              <a-col :span="16">
                <a-row
                  ><a-col :span="24"
                    ><div class="total-title">
                      {{ $t("dashboard.today.order.count") }}
                    </div></a-col
                  ></a-row
                >
                <a-row
                  ><a-col :span="24"
                    ><div class="total-value">
                      ￥{{ record.orderSummary.todayOrderNum }}
                    </div></a-col
                  ></a-row
                >
              </a-col>
            </a-row>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card style="height:100px;">
            <a-row>
              <a-col :span="8"
                ><totalTodaySVG style="width: 54px; height: 54px; fill:#F56C6C;"
              /></a-col>
              <a-col :span="16">
                <a-row
                  ><a-col :span="24"
                    ><div class="total-title">
                      {{ $t("dashboard.today.order.amount") }}
                    </div></a-col
                  ></a-row
                >
                <a-row
                  ><a-col :span="24"
                    ><div class="total-value">
                      ￥{{ record.orderSummary.todayAmount }}
                    </div></a-col
                  ></a-row
                >
              </a-col>
            </a-row>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card style="height:100px;" shadow="never">
            <a-row>
              <a-col :span="8"
                ><totalYesterdaySVG
                  style="width: 54px; height: 54px; fill:#F56C6C;"
              /></a-col>
              <a-col :span="16">
                <a-row
                  ><a-col :span="24"
                    ><div class="total-title">
                      {{ $t("dashboard.yesterday.order.amount") }}
                    </div></a-col
                  ></a-row
                >
                <a-row
                  ><a-col :span="24"
                    ><div class="total-value">
                      ￥{{ record.orderSummary.yesterdayAmount }}
                    </div></a-col
                  ></a-row
                >
              </a-col>
            </a-row>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card style="height:100px;" shadow="never">
            <a-row>
              <a-col :span="8"
                ><totalWeekSVG style="width: 54px; height: 54px; fill:#F56C6C;"
              /></a-col>
              <a-col :span="16">
                <a-row
                  ><a-col :span="24"
                    ><div class="total-title">
                      {{ $t("dashboard.week.order.amount") }}
                    </div></a-col
                  ></a-row
                >
                <a-row
                  ><a-col :span="24"
                    ><div class="total-value">
                      ￥{{ record.orderSummary.weekAmount }}
                    </div></a-col
                  ></a-row
                >
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>

      <a-row :gutter="20" style="margin-top:20px;">
        <a-col :span="12">
          <a-card :headStyle="headStyle">
            <div slot="title">
              {{ $t("dashboard.product.overview") }}
            </div>
            <div style="padding: 40px">
              <a-row>
                <a-col :span="6" class="color-danger overview-item-value">{{
                  record.productSummary.inactiveProductNum
                }}</a-col>
                <a-col :span="6" class="color-danger overview-item-value">{{
                  record.productSummary.activeProductNum
                }}</a-col>
                <a-col :span="6" class="color-danger overview-item-value">{{
                  record.productSummary.totalProductNum
                }}</a-col>
              </a-row>
              <a-row class="font-medium">
                <a-col :span="6" class="overview-item-title">{{
                  $t("dashboard.product.inactive")
                }}</a-col>
                <a-col :span="6" class="overview-item-title">{{
                  $t("dashboard.product.active")
                }}</a-col>
                <a-col :span="6" class="overview-item-title">{{
                  $t("dashboard.product.all")
                }}</a-col>
              </a-row>
            </div>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card :headStyle="headStyle">
            <div slot="title">{{ $t("dashboard.customer.overview") }}</div>
            <div style="padding: 40px">
              <a-row>
                <a-col :span="6" class="color-danger overview-item-value">{{
                  record.customerSummary.todayNewCustomerNum
                }}</a-col>
                <a-col :span="6" class="color-danger overview-item-value">{{
                  record.customerSummary.yesterdayNewCustomerNum
                }}</a-col>
                <a-col :span="6" class="color-danger overview-item-value">{{
                  record.customerSummary.monthNewCustomerNum
                }}</a-col>
                <a-col :span="6" class="color-danger overview-item-value">{{
                  record.customerSummary.totalCustomerNum
                }}</a-col>
              </a-row>
              <a-row class="font-medium">
                <a-col :span="6" class="overview-item-title">{{
                  $t("dashboard.customer.today.add")
                }}</a-col>
                <a-col :span="6" class="overview-item-title">{{
                  $t("dashboard.customer.yesterday.add")
                }}</a-col>
                <a-col :span="6" class="overview-item-title">{{
                  $t("dashboard.customer.month.add")
                }}</a-col>
                <a-col :span="6" class="overview-item-title">{{
                  $t("dashboard.customer.all")
                }}</a-col>
              </a-row>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import orderSVG from "@/assets/order.svg?inline";
import totalTodaySVG from "@/assets/total-today.svg?inline";
import totalYesterdaySVG from "@/assets/total-yesterday.svg?inline";
import totalWeekSVG from "@/assets/total-week.svg?inline";
import statisticAPI from "@/api/StatisticAPI";

@Component({
  components: {
    orderSVG,
    totalTodaySVG,
    totalYesterdaySVG,
    totalWeekSVG,
  },
})
export default class Dashboard extends Vue {
  refreshing = false;

  public record: any = {
    orderSummary: {
      todayOrderNum: "0",
      todayAmount: "0.00",
      yesterdayAmount: "0.00",
      weekAmount: "0.00",
    },
    productSummary: {
      totalProductNum: "0",
      inactiveProductNum: "0",
      activeProductNum: "0",
    },
    customerSummary: {
      totalCustomerNum: "0",
      todayNewCustomerNum: "0",
      yesterdayNewCustomerNum: "0",
      monthNewCustomerNum: "0",
    },
  };

  public headStyle: any = {
    "font-size": "14px",
    "background-color": "#f3f3f3",
    "border-bottom": "1px solid #e4e4e4",
  };

  created() {
    this.getStatistics();
  }

  getStatistics() {
    this.refreshing = true;
    statisticAPI
      .getStatistics()
      .then((result) => {
        this.record = result.data;
      })
      .catch((error) => {
        this.$message.error(error.message);
      })
      .finally(() => {
        this.refreshing = false;
      });
  }
}
</script>
<style lang="less" scoped>
.app-container {
  .total-title {
    font-size: 16px;
    color: #909399;
    left: 70px;
    top: -50px;
  }

  .total-value {
    font-size: 18px;
    color: #606266;
    left: 70px;
    top: -40px;
  }

  .overview-item-title {
    margin-top: 10px;
    text-align: center;
  }

  .overview-item-value {
    font-size: 24px;
    text-align: center;
  }

  .color-danger {
    color: #f56c6c;
  }

  .font-medium {
    font-size: 14px;
    color: #606266;
  }
}
</style>
