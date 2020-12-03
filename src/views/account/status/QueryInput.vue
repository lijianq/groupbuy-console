<template>
  <div>
    <a-form :form="form" id="queryForm" style="max-width: 500px; margin: 100px auto 0;">
      <a-form-item
          :label="$t('account.register.base.email')"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
      >
        <a-input
            v-decorator="['companyEmail', {rules: [{required: true, message: $t('account.register.base.email.required')},{pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message:$t('account.register.base.email.invalid')},{max: 100, message: $t('account.register.base.email.max')}]}]"/>
      </a-form-item>

      <a-form-item
          :label="$t('account.register.license.no')"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
      >
        <a-input
            v-decorator="['companyLicenseNo', {rules: [{required: true, message: $t('account.register.license.no.required')}, {pattern: /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/, message:$t('account.register.license.no.invalid')}]}]"/>
      </a-form-item>

      <a-form-item>
        <a-button :loading="loading" type="primary" class="step-button" @click="query">{{
            $t('account.status.input.query')
          }}
        </a-button>
        <a-button type="primary" class="step-button" @click="backToLogin">{{
            $t('account.register.back')
          }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import QueryInput from "./QueryInput"
export default QueryInput
</script>

<style lang="less" scoped>
@import "QueryInput";
</style>
