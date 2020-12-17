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
import { Component, Vue } from 'vue-property-decorator'
import {WrappedFormUtils} from 'ant-design-vue/types/form/form'
import {RouterConfiguration} from '@/config'
import registerAPI from "@/api/register/RegisterAPI"

@Component
export default class QueryInput extends Vue {

    labelCol = { lg: { span: 5 }, sm: { span: 5 } }
    wrapperCol = { lg: { span: 19 }, sm: { span: 19 } }
    form!: WrappedFormUtils
    loading = false

    created() {
        this.form = this.$form.createForm(this, {name: 'queryForm'})
    }

    closeLoading() {
        setTimeout(() => {
            this.loading = false
        }, 600)
    }

    query() {
        this.loading = true
        const  { form: { validateFields } } = this
        validateFields((err, values) => {
            if (!err) {
                registerAPI.getRegistration(values).then(result => {
                    let queryResult: any = {}
                    if (result.data !== "") {
                        queryResult = result.data
                    }
                    this.$emit('nextStep', queryResult)
                }).catch(error => {
                    this.$message.error(error.message)
                    this.closeLoading()
                })
            } else {
                this.closeLoading();
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
  margin-left : 15px;
  padding: 0 15px;
  font-size: 14px;
  height: 35px;
  width: 45%;
}
</style>
