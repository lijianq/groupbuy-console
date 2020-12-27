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
            $t('company.back')
          }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {ValidationRule, WrappedFormUtils} from "ant-design-vue/types/form/form";
import {RouterConfiguration} from "@/config";

@Component
export default class ResetPassword extends Vue {

    labelCol = { lg: { span: 5 }, sm: { span: 5 } }
    wrapperCol = { lg: { span: 19 }, sm: { span: 19 } }
    form!: WrappedFormUtils

    created() {
        this.form = this.$form.createForm(this, {name: 'resetForm'})
    }

    resetPassword() {
        // const { form: { validateFields } } = this
        // validateFields((err, values) => {
        //     if (!err) {
        //         console.log('values', values)
        //         this.$emit('nextStep')
        //     }
        // })
        this.$emit('nextStep')
    }

    prevStep () {
        this.$emit('prevStep')
    }

    backToLogin() {
        this.$router.push({ path: RouterConfiguration.loginPath })
    }

    checkConfirmPassword(rules: ValidationRule, value: string, callback: Function){
        const password1 = this.form.getFieldValue('password1');
        if(password1 && password1 !== value){
            callback(new Error(this.$t('account.forgot.reset.password.mismatch') as string))
        }else{
            callback();
        }
    }

}
</script>

<style lang="less" scoped>
button.in-step-button {
  margin-left : 15px;
  padding: 0 15px;
  font-size: 14px;
  height: 35px;
  width: 25%;
}

button.submit-step-button {
  margin-left : 15px;
  padding: 0 15px;
  font-size: 14px;
  height: 35px;
  width: 40%;
}
</style>
