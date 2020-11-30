<template>
  <div>
    <a-form :form="form" id="resetForm" style="max-width: 500px; margin: 40px auto 0;">

      <a-form-item
          :label="$t('account.forgot.reset.authcode')"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
      >
        <a-input
            v-decorator="['authCode', {rules: [{required: true, message: $t('account.forgot.reset.authcode.required')}]}]"/>
      </a-form-item>

      <a-form-item
          :label="$t('account.forgot.reset.password1')"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
      >
        <a-input-password
          v-decorator="['password1', {rules: [{ required: true, message: $t('account.forgot.reset.password.required') },{min: 8, message: $t('account.forgot.reset.password.min')}, {max: 30, message: $t('account.forgot.reset.password.max')}]}]">
        </a-input-password>
      </a-form-item>

      <a-form-item
          :label="$t('account.forgot.reset.password2')"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
      >
        <a-input-password
            v-decorator="['password2', {rules: [{validator:(rules,value,callback)=>{checkConfirmPassword(rules,value,callback)}}]}]">
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" class="in-step-button" @click="prevStep">{{
            $t('account.forgot.reset.prev')
          }}
        </a-button>
        <a-button :loading="loading" type="primary" class="submit-step-button" @click="resetPassword">{{
            $t('account.forgot.reset.reset')
          }}
        </a-button>
        <a-button type="primary" class="in-step-button" @click="backToLogin">{{
            $t('account.register.back')
          }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import ResetPassword from "./ResetPassword"
export default ResetPassword
</script>

<style lang="less" scoped>
@import "ResetPassword";
</style>
