<template>
  <div>
    <a-form :form="form" id="baseInfoForm" style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item
          :label="$t('account.register.baseinfo.companyname')"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
      >
        <a-input
            v-decorator="['companyName', {rules: [{required: true, message: $t('account.register.baseinfo.companyname.required')},{max: 100, message: $t('account.register.baseinfo.companyname.max')}]}]"/>
      </a-form-item>

      <a-form-item
          :label="$t('account.register.baseinfo.companyindustry')"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
      >
        <a-select
            v-decorator="['companyIndustry', {initialValue: 'ecommerce', rules: [{required: true, message: $t('account.register.baseinfo.companyindustry.required')}]}]">
          <a-select-option value="ecommerce">{{ $t('company.industry.ecommerce') }}</a-select-option>
          <a-select-option value="manufacture">{{ $t('company.industry.manufacture') }}</a-select-option>
          <a-select-option value="trade">{{ $t('company.industry.trade') }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item
          :label="$t('account.register.baseinfo.companycontact')"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
      >
        <a-input
            v-decorator="['companyContact', {rules: [{required: true, message: $t('account.register.baseinfo.companycontact.required')},{max: 30, message: $t('account.register.baseinfo.companycontact.max')}]}]"/>
      </a-form-item>

      <a-form-item
          :label="$t('account.register.baseinfo.companyemail')"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
      >
        <a-input
            v-decorator="['companyEmail', {rules: [{required: true, message: $t('account.register.baseinfo.companyemail.required')},{pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message:$t('account.register.baseinfo.companyemail.invalid')},{max: 100, message: $t('account.register.baseinfo.companyemail.max')}]}]"/>
      </a-form-item>

      <a-form-item
          :label="$t('account.register.baseinfo.companyphone')"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
      >
        <a-input
            v-decorator="['companyPhone', {rules: [{required: true, message: $t('account.register.baseinfo.companyphone.required')},{pattern: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/, message: $t('account.register.baseinfo.companyphone.invalid')},{max: 20, message: $t('account.register.baseinfo.companyphone.max')}]}]"/>
      </a-form-item>

      <a-form-item
          :label="$t('account.register.baseinfo.companyaddress')"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
      >
        <a-input
            v-decorator="['companyAddress', {rules: [{required: true, message: $t('account.register.baseinfo.companyaddress.required')},{max: 200, message: $t('account.register.baseinfo.companyaddress.max')}]}]"/>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" class="step-button" @click="nextStep">{{
            $t('account.register.baseinfo.next')
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
import RegisterBaseInfo from "./RegisterBaseInfo"
export default RegisterBaseInfo
</script>

<style lang="less" scoped>
@import "RegisterBaseInfo";
</style>
