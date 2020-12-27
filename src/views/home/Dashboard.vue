<template>
    <div>
        <div class="page-common-header">
            <a-row>
                <a-col :span="6">
                    <div class="header-divider"></div>
                    <div class="header-title">{{$t('router.menu.home.dashboard')}}</div>
                </a-col>
                <a-col :offset="16" :span="2">
                    <a-button icon="reload">{{$t('common.refresh')}}</a-button>
                </a-col>
            </a-row>
        </div>

        <div class="app-container">
            <a-row :gutter="20">
                <a-col :span="6">
                    <a-card style="height:100px;">
                        <a-row>
                            <a-col :span="8"><orderSVG style="width: 54px; height: 54px; fill:#F56C6C;" /></a-col>
                            <a-col :span="16">
                                <a-row><a-col :span="24"><div class="total-title">今日订单总数</div></a-col></a-row>
                                <a-row><a-col :span="24"><div class="total-value">￥{{record.todayOrderNum}}</div></a-col></a-row>
                            </a-col>
                        </a-row>
                    </a-card>
                </a-col>
                <a-col :span="6">
                    <a-card style="height:100px;">
                        <a-row>
                            <a-col :span="8"><totalTodaySVG style="width: 54px; height: 54px; fill:#F56C6C;" /></a-col>
                            <a-col :span="16">
                                <a-row><a-col :span="24"><div class="total-title">今日销售总额</div></a-col></a-row>
                                <a-row><a-col :span="24"><div class="total-value">￥{{record.todayOrderSum}}</div></a-col></a-row>
                            </a-col>
                        </a-row>
                    </a-card>
                </a-col>
                <a-col :span="6">
                    <a-card style="height:100px;" shadow="never">
                        <a-row>
                            <a-col :span="8"><totalYesterdaySVG style="width: 54px; height: 54px; fill:#F56C6C;" /></a-col>
                            <a-col :span="16">
                                <a-row><a-col :span="24"><div class="total-title">昨日销售总额</div></a-col></a-row>
                                <a-row><a-col :span="24"><div class="total-value">￥{{record.yesterdayOrderSum}}</div></a-col></a-row>
                            </a-col>
                        </a-row>
                    </a-card>
                </a-col>
                <a-col :span="6">
                    <a-card style="height:100px;" shadow="never">
                        <a-row>
                            <a-col :span="8"><totalWeekSVG style="width: 54px; height: 54px; fill:#F56C6C;" /></a-col>
                            <a-col :span="16">
                                <a-row><a-col :span="24"><div class="total-title">近7天销售总额</div></a-col></a-row>
                                <a-row><a-col :span="24"><div class="total-value">￥{{record.weekOrderSum}}</div></a-col></a-row>
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
                                <span style="float: right" class="color-danger">({{record.task0}})</span>
                            </div>
                        </a-col>
                        <a-col :span="8">
                            <div class="un-handle-item">
                                <span class="font-medium">已完成订单</span>
                                <span style="float: right" class="color-danger">({{record.task3}})</span>
                            </div>
                        </a-col>
                        <a-col :span="8">
                            <div class="un-handle-item">
                                <span class="font-medium">待确认退货订单</span>
                                <span style="float: right" class="color-danger">({{record.task5}})</span>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="20">
                        <a-col :span="8">
                            <div class="un-handle-item">
                                <span class="font-medium">待发货订单</span>
                                <span style="float: right" class="color-danger">({{record.task1}})</span>
                            </div>
                        </a-col>
                        <a-col :span="8">
                            <div class="un-handle-item">
                                <span class="font-medium">新缺货登记</span>
                                <span style="float: right" class="color-danger">({{record.newNoStockRegisterNum}})</span>
                            </div>
                        </a-col>
                        <a-col :span="8">
                            <div class="un-handle-item">
                                <span class="font-medium">待处理退款申请</span>
                                <span style="float: right" class="color-danger">({{record.task6}})</span>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="20">
                        <a-col :span="8">
                            <div class="un-handle-item">
                                <span class="font-medium">已发货订单</span>
                                <span style="float: right" class="color-danger">({{record.task2}})</span>
                            </div>
                        </a-col>
                        <a-col :span="8">
                            <div class="un-handle-item">
                                <span class="font-medium">待处理退货订单</span>
                                <span style="float: right" class="color-danger">({{record.task4}})</span>
                            </div>
                        </a-col>
                        <a-col :span="8">
                            <div class="un-handle-item">
                                <span class="font-medium">广告位即将到期</span>
                                <span style="float: right" class="color-danger">({{record.advertiseExpiredNum}})</span>
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
                            <a-col :span="6" class="color-danger overview-item-value">100</a-col>
                            <a-col :span="6" class="color-danger overview-item-value">400</a-col>
                            <a-col :span="6" class="color-danger overview-item-value">50</a-col>
                            <a-col :span="6" class="color-danger overview-item-value">500</a-col>
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
                            <a-col :span="6" class="color-danger overview-item-value">{{record.todayMemberNum ? 0 : record.todayMemberNum}}</a-col>
                            <a-col :span="6" class="color-danger overview-item-value">{{record.yesterdayMemberNum ? 0 : record.yesterdayMemberNum}}</a-col>
                            <a-col :span="6" class="color-danger overview-item-value">{{record.monthMemberNum ? 0 : record.monthMemberNum}}</a-col>
                            <a-col :span="6" class="color-danger overview-item-value">{{record.memberNum ? 0 : record.memberNum}}</a-col>
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

        </div>
    </div>
</template>
<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import orderSVG from '@/assets/order.svg?inline'
import totalTodaySVG from '@/assets/total-today.svg?inline'
import totalYesterdaySVG from '@/assets/total-yesterday.svg?inline'
import totalWeekSVG from '@/assets/total-week.svg?inline'

@Component({
    components : {
        orderSVG,
        totalTodaySVG,
        totalYesterdaySVG,
        totalWeekSVG,
    }
})
export default class Dashboard extends Vue  {
    public record = {
        todayOrderNum: 0, todayOrderSum: 0, yesterdayOrderSum: 0, weekOrderSum: 0,
        compareMonthCount : 0,compareWeekCount : 0,compareMonthSum : 0,compareWeekSum : 0,
        todayMemberNum: 0, yesterdayMemberNum: 0, monthMemberNum: 0, memberNum: 0,
        task0: 0, task1: 0, task2: 0, task3: 0, task4: 0, task5: 0, task6: 0,
        newNoStockRegisterNum : 0, advertiseExpiredNum: 0,
    }

    public headStyle: any = {
        'font-size':'14px', 'background-color': '#f3f3f3', 'border-bottom': '1px solid #e4e4e4'
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
            padding : 0px 40px 10px;
        }

        .un-handle-item {
            border-bottom: 1px solid #EBEEF5;
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
            color: #F56C6C
        }

        .font-medium {
            font-size: 14px;
            color: #606266;
        }
    }
</style>