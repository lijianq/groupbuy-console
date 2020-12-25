<template>
    <div>
        <div class="page-common-header">
            <a-row>
                <a-col :span="6">
                    <div class="header-divider"></div>
                    <div class="header-title">{{$t('router.menu.home.dashboard')}}</div>
                </a-col>
                <a-col :offset="16" :span="2">
                    <a-button icon="reload">{{$t('home.dashboard.refresh')}}</a-button>
                </a-col>
            </a-row>
        </div>

        <div class="app-container">
            <a-row :gutter="20">
                <a-col :span="6">
                    <a-card style="height:100px;" shadow="never">
                        <a-icon type="line-chart" />
                        <div class="total-title">今日订单总数</div>
                        <div class="total-value">￥{{record.todayOrderNum}}</div>
                    </a-card>
                </a-col>
                <a-col :span="6">
                    <a-card style="height:100px;" shadow="never">
                        <a-icon type="line-chart" />
                        <div class="total-title">今日销售总额</div>
                        <div class="total-value">￥{{record.todayOrderSum}}</div>
                    </a-card>
                </a-col>
                <a-col :span="6">
                    <a-card style="height:100px;" shadow="never">
                        <a-icon type="line-chart" />
                        <div class="total-title">昨日销售总额</div>
                        <div class="total-value">￥{{record.yesterdayOrderSum}}</div>
                    </a-card>
                </a-col>
                <a-col :span="6">
                    <a-card style="height:100px;" shadow="never">
                        <a-icon type="line-chart" />
                        <div class="total-title">近7天销售总额</div>
                        <div class="total-value">￥{{record.weekOrderSum}}</div>
                    </a-card>
                </a-col>
            </a-row>

        </div>
    </div>
</template>
<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'


@Component
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
    }
</style>