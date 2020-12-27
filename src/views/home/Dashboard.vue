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
        compareMonthCount : '',
        compareWeekCount : '',
        compareMonthSum : '',
        compareWeekSum : ''
    }


}
</script>
<style lang="less" scoped>
    .app-container {
        margin-top: 40px;
        margin-left: 60px;
        margin-right: 60px;

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
    }
</style>