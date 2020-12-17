<template>
  <div>
    <a-form :form="form" id="baseInfoForm" style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item
          :label="$t('account.register.base.name')"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
      >
        <a-input
            v-decorator="['companyName', {rules: [{required: true, message: $t('account.register.base.name.required')},{max: 100, message: $t('account.register.base.name.max')}]}]"/>
      </a-form-item>

      <a-form-item
          :label="$t('account.register.base.industry')"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
      >
        <a-select
            v-decorator="['companyIndustry', {rules: [{required: true, message: $t('account.register.base.industry.required')}]}]">
          <a-select-option value="ecommerce">{{ $t('company.industry.ecommerce') }}</a-select-option>
          <a-select-option value="manufacture">{{ $t('company.industry.manufacture') }}</a-select-option>
          <a-select-option value="trade">{{ $t('company.industry.trade') }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item
          :label="$t('account.register.base.contact')"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
      >
        <a-input
            v-decorator="['companyContact', {rules: [{required: true, message: $t('account.register.base.contact.required')},{max: 30, message: $t('account.register.base.contact.max')}]}]"/>
      </a-form-item>

      <a-form-item
          :label="$t('account.register.base.email')"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
      >
        <a-input
            v-decorator="['companyEmail', {rules: [{required: true, message: $t('account.register.base.email.required')},{pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message:$t('account.register.base.email.invalid')},{max: 100, message: $t('account.register.base.email.max')}]}]"/>
      </a-form-item>

      <a-form-item
          :label="$t('account.register.base.phone')"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
      >
        <a-input
            v-decorator="['companyPhone', {rules: [{required: true, message: $t('account.register.base.phone.required')},{pattern: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/, message: $t('account.register.base.phone.invalid')},{max: 20, message: $t('account.register.base.phone.max')}]}]"/>
      </a-form-item>

      <a-form-item
          :label="$t('account.register.base.region')"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
      >
        <a-cascader :options="addressOptions" :placeholder="$t('address.hint')"
                    v-decorator="['companyRegion', {rules: [{required: true, message: $t('account.register.base.region.required')}]}]"
        />
      </a-form-item>
      <a-form-item
          :label="$t('account.register.base.address')"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
      >
        <a-input
            v-decorator="['companyAddress', {rules: [{required: true, message: $t('account.register.base.address.required')},{max: 200, message: $t('account.register.base.address.max')}]}]"/>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" class="step-button" @click="nextStep">{{
            $t('account.register.base.next')
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
import { Component, Vue, Prop } from 'vue-property-decorator'
import {WrappedFormUtils} from 'ant-design-vue/types/form/form'
import {RouterConfiguration, Address} from '@/config'

@Component
export default class RegisterBaseInfo extends Vue {

    labelCol = { lg: { span: 5 }, sm: { span: 5 } }
    wrapperCol = { lg: { span: 19 }, sm: { span: 19 } }
    form!: WrappedFormUtils
    addressOptions = Address.options

    @Prop({type: Object, default: null})
    baseFormData: any | null

    created() {
        this.form = this.$form.createForm(this, {name: 'baseInfoForm'})
        const { baseFormData } = this
        if (baseFormData) {
            this.form.getFieldDecorator("companyName", { initialValue: baseFormData.companyName})
            this.form.getFieldDecorator("companyIndustry", { initialValue: baseFormData.companyIndustry})
            this.form.getFieldDecorator("companyContact", { initialValue: baseFormData.companyContact})
            this.form.getFieldDecorator("companyEmail", { initialValue: baseFormData.companyEmail})
            this.form.getFieldDecorator("companyPhone", { initialValue: baseFormData.companyPhone})
            this.form.getFieldDecorator("companyRegion", { initialValue: baseFormData.companyRegion})
            this.form.getFieldDecorator("companyAddress", { initialValue: baseFormData.companyAddress})
        }
    }

    nextStep() {
        const  { form: { validateFields } } = this
        validateFields((err, values) => {
            if (!err) {
                this.$emit('nextStep', values)
            }
        })
    }

    backToLogin() {
        this.$router.push({ path: RouterConfiguration.loginPath })
    }
}
</script>

<style lang="less" scoped>
button.step-button {
  margin-left : 12px;
  padding: 0 15px;
  font-size: 14px;
  height: 35px;
  width: 45%;
}
</style>
