<template>
  <div>
    <a-form :form="form" id="authForm" style="max-width: 500px; margin: 80px auto 0;">
      <a-form-item
          :label="$t('account.login.company')"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
      >
        <a-input
            v-decorator="[
                'company',
                {rules: [{ required: true, message: $t('account.login.company.message') }], validateTrigger: 'blur'}
              ]"
        >
        </a-input>
      </a-form-item>

      <a-form-item
          :label="$t('account.forgot.auth.email')"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
      >
        <a-input
            v-decorator="['accountEmail', {rules: [{required: true, message: $t('account.forgot.auth.email.required')},{pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message:$t('account.forgot.auth.email.invalid')}]}]"/>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" class="step-button" @click="sendAuthCode">{{
            $t('account.forgot.auth.code')
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
import AuthCode from "./AuthCode"
export default AuthCode
</script>

<style lang="less" scoped>
@import "AuthCode";
</style>
