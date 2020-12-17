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
import { Component, Vue } from 'vue-property-decorator'
import {WrappedFormUtils} from "ant-design-vue/types/form/form";
import {RouterConfiguration} from "@/config";

@Component
export default class AuthCode extends Vue {
    labelCol = { lg: { span: 7 }, sm: { span: 7 } }
    wrapperCol = { lg: { span: 17 }, sm: { span: 17 } }
    form!: WrappedFormUtils

    created() {
        this.form = this.$form.createForm(this, {name: 'authForm'})
    }

    sendAuthCode() {
        // const  { form: { validateFields } } = this
        // validateFields((err, values) => {
        //     if (!err) {
        //         console.log(values)
        //         this.$emit('nextStep')
        //     }
        // })
        this.$emit('nextStep')
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
