<template>
  <div>
    <a-steps class="steps" :current="currentStep">
      <a-step :title="$t('account.status.input')">
        <a-icon slot="icon" type="edit" />
      </a-step>
      <a-step :title="$t('account.status.result')">
        <a-icon slot="icon" type="info-circle" />
      </a-step>
    </a-steps>
    <div class="content">
      <query-input v-if="currentStep === 0" @nextStep="nextStep"/>
      <query-result :queryResult="queryResult" v-if="currentStep === 1" @finish="finish"/>
    </div>
  </div>
</template>

<script lang="ts">
import Query from "./Query"
export default Query
</script>

<style lang="less" scoped>
@import "Query";
</style>
