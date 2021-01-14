<template>
  <div>
    <div class="page-common-header">
      <a-row>
        <a-col :span="6">
          <div class="header-divider"></div>
          <div class="header-title">{{ $t("router.menu.home.dashboard") }}</div>
        </a-col>
        <a-col :offset="16" :span="2">
          <a-button icon="reload">{{ $t("common.refresh") }}</a-button>
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
                    ><div class="total-title">今日订单总数</div></a-col
                  ></a-row
                >
                <a-row
                  ><a-col :span="24"
                    ><div class="total-value">
                      ￥{{ record.todayOrderNum }}
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
                    ><div class="total-title">今日销售总额</div></a-col
                  ></a-row
                >
                <a-row
                  ><a-col :span="24"
                    ><div class="total-value">
                      ￥{{ record.todayOrderSum }}
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
                    ><div class="total-title">昨日销售总额</div></a-col
                  ></a-row
                >
                <a-row
                  ><a-col :span="24"
                    ><div class="total-value">
                      ￥{{ record.yesterdayOrderSum }}
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
                    ><div class="total-title">近7天销售总额</div></a-col
                  ></a-row
                >
                <a-row
                  ><a-col :span="24"
                    ><div class="total-value">
                      ￥{{ record.weekOrderSum }}
                    </div></a-col
                  ></a-row
                >
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>

      <a-card style="margin-top:20px;" :headStyle="headStyle">
        <div slot="title">待处理事务</div>
        <div class="un-handle-content">
          <a-row :gutter="20">
            <a-col :span="8">
              <div class="un-handle-item">
                <span class="font-medium">待付款订单</span>
                <span style="float: right" class="color-danger"
                  >({{ record.task0 }})</span
                >
              </div>
            </a-col>
            <a-col :span="8">
              <div class="un-handle-item">
                <span class="font-medium">已完成订单</span>
                <span style="float: right" class="color-danger"
                  >({{ record.task3 }})</span
                >
              </div>
            </a-col>
            <a-col :span="8">
              <div class="un-handle-item">
                <span class="font-medium">待确认退货订单</span>
                <span style="float: right" class="color-danger"
                  >({{ record.task5 }})</span
                >
              </div>
            </a-col>
          </a-row>
          <a-row :gutter="20">
            <a-col :span="8">
              <div class="un-handle-item">
                <span class="font-medium">待发货订单</span>
                <span style="float: right" class="color-danger"
                  >({{ record.task1 }})</span
                >
              </div>
            </a-col>
            <a-col :span="8">
              <div class="un-handle-item">
                <span class="font-medium">新缺货登记</span>
                <span style="float: right" class="color-danger"
                  >({{ record.newNoStockRegisterNum }})</span
                >
              </div>
            </a-col>
            <a-col :span="8">
              <div class="un-handle-item">
                <span class="font-medium">待处理退款申请</span>
                <span style="float: right" class="color-danger"
                  >({{ record.task6 }})</span
                >
              </div>
            </a-col>
          </a-row>
          <a-row :gutter="20">
            <a-col :span="8">
              <div class="un-handle-item">
                <span class="font-medium">已发货订单</span>
                <span style="float: right" class="color-danger"
                  >({{ record.task2 }})</span
                >
              </div>
            </a-col>
            <a-col :span="8">
              <div class="un-handle-item">
                <span class="font-medium">待处理退货订单</span>
                <span style="float: right" class="color-danger"
                  >({{ record.task4 }})</span
                >
              </div>
            </a-col>
            <a-col :span="8">
              <div class="un-handle-item">
                <span class="font-medium">广告位即将到期</span>
                <span style="float: right" class="color-danger"
                  >({{ record.advertiseExpiredNum }})</span
                >
              </div>
            </a-col>
          </a-row>
        </div>
      </a-card>

      <a-row :gutter="20" style="margin-top:20px;">
        <a-col :span="12">
          <a-card :headStyle="headStyle">
            <div slot="title">商品总览</div>
            <div style="padding: 40px">
              <a-row>
                <a-col :span="6" class="color-danger overview-item-value"
                  >100</a-col
                >
                <a-col :span="6" class="color-danger overview-item-value"
                  >400</a-col
                >
                <a-col :span="6" class="color-danger overview-item-value"
                  >50</a-col
                >
                <a-col :span="6" class="color-danger overview-item-value"
                  >500</a-col
                >
              </a-row>
              <a-row class="font-medium">
                <a-col :span="6" class="overview-item-title">已下架</a-col>
                <a-col :span="6" class="overview-item-title">已上架</a-col>
                <a-col :span="6" class="overview-item-title">库存紧张</a-col>
                <a-col :span="6" class="overview-item-title">全部商品</a-col>
              </a-row>
            </div>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card :headStyle="headStyle">
            <div slot="title">用户总览</div>
            <div style="padding: 40px">
              <a-row>
                <a-col :span="6" class="color-danger overview-item-value">{{
                  record.todayMemberNum ? 0 : record.todayMemberNum
                }}</a-col>
                <a-col :span="6" class="color-danger overview-item-value">{{
                  record.yesterdayMemberNum ? 0 : record.yesterdayMemberNum
                }}</a-col>
                <a-col :span="6" class="color-danger overview-item-value">{{
                  record.monthMemberNum ? 0 : record.monthMemberNum
                }}</a-col>
                <a-col :span="6" class="color-danger overview-item-value">{{
                  record.memberNum ? 0 : record.memberNum
                }}</a-col>
              </a-row>
              <a-row class="font-medium">
                <a-col :span="6" class="overview-item-title">今日新增</a-col>
                <a-col :span="6" class="overview-item-title">昨日新增</a-col>
                <a-col :span="6" class="overview-item-title">本月新增</a-col>
                <a-col :span="6" class="overview-item-title">会员总数</a-col>
              </a-row>
            </div>
          </a-card>
        </a-col>
      </a-row>

      <a-card style="margin-top:20px;" :headStyle="headStyle">
        <div slot="title">订单统计</div>
        <a-row>
          <a-col :span="4">
            <div style="padding: 20px">
              <div>
                <div style="color: #909399;font-size: 14px">本月订单总数</div>
                <div style="color: #606266;font-size: 24px;padding: 10px 0">
                  {{ record.currentMonthCount }}
                </div>
                <div>
                  <span
                    :class="[
                      record.compareMonthCount >= 0
                        ? 'color-success'
                        : 'color-danger',
                    ]"
                    style="font-size: 14px"
                  >
                    {{
                      record.compareMonthCount >= 0
                        ? "+" + record.compareMonthCount + "%"
                        : record.compareMonthCount + "%"
                    }}
                  </span>
                  <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
                </div>
              </div>
              <div style="margin-top: 20px;">
                <div style="color: #909399;font-size: 14px">本周订单总数</div>
                <div style="color: #606266;font-size: 24px;padding: 10px 0">
                  {{ record.currentWeekCount }}
                </div>
                <div>
                  <span
                    :class="[
                      record.compareWeekCount >= 0
                        ? 'color-success'
                        : 'color-danger',
                    ]"
                    style="font-size: 14px"
                  >
                    {{
                      record.compareWeekCount >= 0
                        ? "+" + record.compareWeekCount + "%"
                        : record.compareWeekCount + "%"
                    }}
                  </span>
                  <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
                </div>
              </div>
            </div>
          </a-col>
          <a-col :span="20">
            <a-row class="label-date-picker">
              <a-col :span="5" :offset="1">
                <div style="color:#666666;font-size: 14px;font-weight:bold">
                  近{{ chartDuration }}日订单数量为：{{ chartCountSum }}
                </div>
              </a-col>
              <a-col :span="2" :offset="5">
                <a-button type="link" block @click="countSelToday"
                  >今日</a-button
                >
              </a-col>
              <a-col :span="2">
                <a-button type="link" block @click="countSelWeek"
                  >本周</a-button
                >
              </a-col>
              <a-col :span="2">
                <a-button type="link" block @click="countSelMonth"
                  >本月</a-button
                >
              </a-col>
              <a-col :span="7">
                <a-range-picker
                  format="YYYY-MM-DD"
                  :default-value="[moment().subtract(1, 'weeks'), moment()]"
                />
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <div style="border-left:1px solid #DCDFE6">
                  <ve-line
                    height="300px"
                    :grid="grid"
                    :data="countChartData"
                    :legend-visible="false"
                    :loading="countLoading"
                    :data-empty="countDataEmpty"
                    :settings="countChartSettings"
                  ></ve-line>
                </div>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-card>

      <a-card style="margin-top:20px;" :headStyle="headStyle">
        <div slot="title">销售统计</div>
        <a-row>
          <a-col :span="4">
            <div style="padding: 20px">
              <div style="margin-top: 20px;">
                <div style="color: #909399;font-size: 14px">本月销售总额</div>
                <div style="color: #606266;font-size: 24px;padding: 10px 0">
                  {{ record.currentMonthSum }}
                </div>
                <div>
                  <span
                    :class="[
                      record.compareMonthSum >= 0
                        ? 'color-success'
                        : 'color-danger',
                    ]"
                    style="font-size: 14px"
                  >
                    {{
                      record.compareMonthSum >= 0
                        ? "+" + record.compareMonthSum + "%"
                        : record.compareMonthSum + "%"
                    }}
                  </span>
                  <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
                </div>
              </div>
              <div style="margin-top: 20px;">
                <div style="color: #909399;font-size: 14px">本周销售总额</div>
                <div style="color: #606266;font-size: 24px;padding: 10px 0">
                  {{ record.currentWeekSum }}
                </div>
                <div>
                  <span
                    :class="[
                      record.compareWeekSum >= 0
                        ? 'color-success'
                        : 'color-danger',
                    ]"
                    style="font-size: 14px"
                  >
                    {{
                      record.compareWeekSum >= 0
                        ? "+" + record.compareWeekSum + "%"
                        : record.compareWeekSum + "%"
                    }}
                  </span>
                  <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
                </div>
              </div>
            </div>
          </a-col>
          <a-col :span="20">
            <a-row class="label-date-picker">
              <a-col :span="5" :offset="1">
                <div style="color:#666666;font-size: 12px;font-weight:bold">
                  近{{ chartDuration }}日订单金额为：{{ chartAmountSum }}
                </div>
              </a-col>
              <a-col :span="2" :offset="5">
                <a-button type="link" block @click="sumSelToday">今日</a-button>
              </a-col>
              <a-col :span="2">
                <a-button type="link" block @click="sumSelWeek">本周</a-button>
              </a-col>
              <a-col :span="2">
                <a-button type="link" block @click="sumSelMonth">本月</a-button>
              </a-col>
              <a-col :span="7">
                <a-range-picker
                  format="YYYY-MM-DD"
                  :default-value="[moment().subtract(1, 'weeks'), moment()]"
                />
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <div style="border-left:1px solid #DCDFE6">
                  <ve-line
                    height="300px"
                    :grid="grid"
                    :data="sumChartData"
                    :legend-visible="false"
                    :loading="countLoading"
                    :data-empty="countDataEmpty"
                    :settings="countChartSettings"
                  ></ve-line>
                </div>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-card>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import orderSVG from "@/assets/order.svg?inline";
import totalTodaySVG from "@/assets/total-today.svg?inline";
import totalYesterdaySVG from "@/assets/total-yesterday.svg?inline";
import totalWeekSVG from "@/assets/total-week.svg?inline";
import moment from "moment";

@Component({
  components: {
    orderSVG,
    totalTodaySVG,
    totalYesterdaySVG,
    totalWeekSVG,
  },
})
export default class Dashboard extends Vue {
  public record: any = {
    todayOrderNum: 0,
    todayOrderSum: 0,
    yesterdayOrderSum: 0,
    weekOrderSum: 0,
    compareMonthCount: 0,
    compareWeekCount: 0,
    compareMonthSum: 0,
    compareWeekSum: 0,
    todayMemberNum: 0,
    yesterdayMemberNum: 0,
    monthMemberNum: 0,
    memberNum: 0,
    task0: 0,
    task1: 0,
    task2: 0,
    task3: 0,
    task4: 0,
    task5: 0,
    task6: 0,
    newNoStockRegisterNum: 0,
    advertiseExpiredNum: 0,
  };

  public headStyle: any = {
    "font-size": "14px",
    "background-color": "#f3f3f3",
    "border-bottom": "1px solid #e4e4e4",
  };

  public chartDuration = 0;
  public chartCountSum = 0;
  public chartAmountSum = 0;
  public moment = moment;
  public grid = { right: "2%" };
  public countChartData = {
    columns: [],
    rows: [],
  };
  public sumChartData = {
    columns: [],
    rows: [],
  };
  public refreshing = false;
  public countLoading = false;
  public sumLoading = false;
  public countDataEmpty = false;
  public sumDataEmpty = false;
  public countChartSettings = {
    xAxisType: "time",
    area: true,
    axisSite: { left: ["count"] },
    labelMap: { count: "订单数量" },
  };
  public sumChartSettings = {
    xAxisType: "time",
    area: true,
    axisSite: { left: ["sum"] },
    labelMap: { sum: "订单金额" },
  };

  created() {
    this.refreshing = false;
    this.getData(false);
  }

  countSelToday() {
    console.log("countSelToday");
  }

  countSelWeek() {
    console.log("countSelWeek");
  }

  countSelMonth() {
    console.log("countSelMonth");
  }

  sumSelToday() {
    console.log("sumSelToday");
  }

  sumSelWeek() {
    console.log("sumSelWeek");
  }

  sumSelMonth() {
    console.log("sumSelMonth");
  }

  getData(isRef: boolean) {
    if (isRef && !this.refreshing) this.refreshing = true;
    // dashboardAPI.getContent().then((response: any)=>{
    //     const result: any = response.data.data;
    //     this.record = result;
    //     // 本月订单总数
    //     const currentMonthCount = result.currentMonthInfo[0].count
    //     // 本周订单总数
    //     const currentWeekCount = result.currentWeekInfo[0].count
    //     // 本月销售总额
    //     const currentMonthSum = result.currentMonthInfo[0].sum
    //     // 本周销售总额
    //     const currentWeekSum = result.currentWeekInfo[0].sum
    //     this.record.currentMonthCount = currentMonthCount
    //     this.record.currentWeekCount = currentWeekCount
    //     this.record.currentMonthSum = currentMonthSum
    //     this.record.currentWeekSum = currentWeekSum
    //     // 上个月订单总数
    //     const lastMonthCount = result.lastMonthInfo[0].count
    //     // 上周订单总数
    //     const lastWeekCount = result.lastWeekInfo[0].count
    //     // 上个月销售总额
    //     const lastMonthSum = result.lastMonthInfo[0].sum
    //     // 上周销售总额
    //     const lastWeekSum = result.lastWeekInfo[0].sum
    //     // 同比上月（订单）
    //     const compareMonthCount = lastMonthCount == 0 ? 100 : (result.currentMonthCount - lastMonthCount / lastMonthCount) * 100
    //     // 同比上周（订单）
    //     const compareWeekCount = lastWeekCount == 0 ? 100 : (result.currentWeekCount - lastWeekCount / lastWeekCount) * 100
    //     // 同比上月（销售总额）
    //     const compareMonthSum = lastMonthSum == 0 ? 100 : (result.currentMonthSum - lastMonthSum / lastMonthSum) * 100
    //     // 同比上周（销售总额）
    //     const compareWeekSum = lastWeekSum == 0 ? 100 : (result.currentWeekSum - lastWeekSum / lastWeekSum) * 100
    //     this.record.compareMonthCount = (result.currentMonthCount - lastMonthCount) == 0 ? 0 : compareMonthCount
    //     this.record.compareWeekCount = (result.currentWeekCount - lastWeekCount) == 0 ? 0 : compareWeekCount
    //     this.record.compareMonthSum = (result.currentMonthSum - lastMonthSum) == 0 ? 0 : compareMonthSum
    //     this.record.compareWeekSum = (result.currentWeekSum - lastWeekSum) == 0 ? 0 : compareWeekSum
    //     // orderNumByStatus
    //     // 待付款订单(task0) status=0
    //     // 待发货订单(task1) status=1
    //     // 已发货订单(task2) status=2
    //     // 已完成订单(task3) status=3
    //     const task0 = result.orderNumByStatus.find((o: any)=>{return o.status === 0})
    //     this.record.task0 = task0 ? task0.orderNum : 0
    //     const task1 = result.orderNumByStatus.find((o: any)=>{return o.status === 1})
    //     this.record.task1 = task1 ? task1.orderNum : 0
    //     const task2 = result.orderNumByStatus.find((o: any)=>{return o.status === 2})
    //     this.record.task2 = task2 ? task2.orderNum : 0
    //     const task3 = result.orderNumByStatus.find((o: any)=>{return o.status === 3})
    //     this.record.task3 = task3 ? task3.orderNum : 0
    //     // orderReturnGroupByStatus
    //     // 待处理退货订单(task4) status=0
    //     // 待确认退货订单(task5) status=1
    //     // 待处理退款订单(task6) status=2
    //     const task4 = result.orderReturnGroupByStatus.find((o: any)=>{return o.status === 0})
    //     this.record.task4 = task4 ? task4.orderNum : 0
    //     const task5 = result.orderReturnGroupByStatus.find((o: any)=>{return o.status === 1})
    //     this.record.task5 = task5 ? task5.orderNum : 0
    //     const task6 = result.orderReturnGroupByStatus.find((o: any)=>{return o.status === 2})
    //     this.record.task6 = task6 ? task6.orderNum : 0
    //     if (isRef && this.refreshing) this.refreshing = false;
    // })
    // .catch((error) => {
    //     this.$message.error(error.message);
    // })
    // .finally(() => {
    //     this.refreshing = false;
    // });
    this.refreshing = false;
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

  .un-handle-content {
    padding: 0px 40px 10px;
  }

  .un-handle-item {
    border-bottom: 1px solid #ebeef5;
    padding: 10px;
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

  .statistics-layout {
    margin-top: 20px;
    border: 1px solid #dcdfe6;
  }

  .label-date-picker {
    align-items: center;
    justify-content: center;
    display: flex;
  }
}
</style>
