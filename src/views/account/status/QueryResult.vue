<template>
  <div>
    <a-form>
      <a-result v-if="!queryResult.hasResult" status="info" :title="$t('account.status.result.notfound')" style="max-width: 450px; margin: 0 auto 0;">
        <a-icon slot="icon" type="question-circle" style="font-size: 40px;"/>
        <template #extra>
          <a-button type="primary" class="finish-step-button" @click="backToLogin">{{
              $t('account.register.back')
            }}
          </a-button>
        </template>
      </a-result>
      <a-result v-if="queryResult.hasResult" status="info" :title="$t('account.status.result')" style="max-width: 450px; margin: 0 auto 0;">
        <a-icon slot="icon" type="info-circle" style="font-size: 40px;"/>
        <template #extra>
          <div style="text-align: left;">
            <a-descriptions :column="{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }">
              <a-descriptions-item :label="$t('account.register.base.name')">
                {{ queryResult.result.companyName }}
              </a-descriptions-item>
              <a-descriptions-item :label="$t('account.status.result.status')">
                {{ $t(queryResult.status) }}
              </a-descriptions-item>
              <a-descriptions-item :label="$t('account.status.result.status.description')">
                {{ $t(queryResult.statusDesc) }}
              </a-descriptions-item>
            </a-descriptions>
          </div>

          <a-button type="primary" class="finish-step-button" @click="backToLogin">{{
              $t('account.register.back')
            }}
          </a-button>
        </template>
      </a-result>
    </a-form>
  </div>
</template>

<script lang="ts">
import QueryResult from "./QueryResult"
export default QueryResult
</script>

<style lang="less" scoped>
@import "QueryResult";
</style>
