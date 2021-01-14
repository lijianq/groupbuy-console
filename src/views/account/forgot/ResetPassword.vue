<template>
  <div>
    <a-form
      :form="form"
      id="authForm"
      style="max-width: 500px; margin: 80px auto 0;"
    >
      <a-form-item
        :label="$t('account.company')"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input
          v-decorator="[
            'companyId',
            {
              rules: [
                { required: true, message: $t('account.company.message') },
              ],
            },
          ]"
        >
        </a-input>
      </a-form-item>

      <a-form-item
        :label="$t('account.sub.account')"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input
          v-decorator="[
            'accountName',
            {
              rules: [
                { required: true, message: $t('account.sub.account.message') },
              ],
            },
          ]"
        >
        </a-input>
      </a-form-item>
      <a-form-item
        :label="$t('account.auth.email')"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input-search
          @search="sendAuthCode"
          v-decorator="[
            'accountEmail',
            {
              rules: [
                { required: true, message: $t('account.auth.email.required') },
                {
                  pattern: /^[A-Za-z0-9\u4e00-\u9fa5-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                  message: $t('common.email.invalid'),
                },
              ],
            },
          ]"
        >
          <a-button
            slot="enterButton"
            style="width:120px;"
            v-text="
              (!sendBtnState && $t('account.auth.code.send')) ||
                resendTime + ' s'
            "
          ></a-button>
        </a-input-search>
      </a-form-item>

      <a-form-item
        :label="$t('account.auth.code')"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input
          v-decorator="[
            'authCode',
            {
              rules: [
                { required: true, message: $t('account.auth.code.required') },
              ],
            },
          ]"
        >
        </a-input>
      </a-form-item>

      <a-form-item
        :label="$t('account.password')"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input-password
          v-decorator="[
            'password1',
            {
              rules: [
                { required: true, message: $t('account.password.message') },
                { min: 8, message: $t('account.password.min') },
                { max: 30, message: $t('account.password.max') },
              ],
            },
          ]"
        >
        </a-input-password>
      </a-form-item>

      <a-form-item
        :label="$t('account.password.confirm')"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input-password
          v-decorator="[
            'password2',
            {
              rules: [
                {
                  validator: (rules, value, callback) => {
                    checkConfirmPassword(rules, value, callback);
                  },
                },
              ],
            },
          ]"
        >
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <a-button
          :loading="loading"
          type="primary"
          class="step-button"
          @click="resetPassword"
          >{{ $t("account.reset") }}
        </a-button>
        <a-button type="primary" class="step-button" @click="backToLogin"
          >{{ $t("common.back.login") }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  ValidationRule,
  WrappedFormUtils,
} from "ant-design-vue/types/form/form";
import { RouterConfiguration } from "@/config";
import accountAPI from "@/api/account/AccountAPI";
import md5 from "md5";

@Component
export default class ResetPassword extends Vue {
  labelCol = { lg: { span: 7 }, sm: { span: 7 } };
  wrapperCol = { lg: { span: 17 }, sm: { span: 17 } };
  form!: WrappedFormUtils;
  defaultInterval = 120;
  resendTime = this.defaultInterval;
  sendBtnState = false;
  loading = false;

  created() {
    this.form = this.$form.createForm(this, { name: "authForm" });
  }

  sendAuthCode() {
    const {
      form: { validateFields },
    } = this;
    validateFields(
      ["companyId", "accountName", "accountEmail"],
      { force: true },
      (err, values) => {
        if (!err) {
          this.sendBtnState = true;
          const interval = window.setInterval(() => {
            if (this.resendTime-- <= 0) {
              this.resendTime = this.defaultInterval;
              this.sendBtnState = false;
              window.clearInterval(interval);
            }
          }, 1000);
          accountAPI
            .sendAuthCode(values)
            .then((result: any) => {
              if (result.data.success) {
                this.$message.success(
                  this.$t("account.auth.code.sent").toString()
                );
              }
            })
            .catch((error) => {
              this.$message.error(error.message);
            });
        }
      }
    );
  }

  resetPassword() {
    this.loading = true;
    const {
      form: { validateFields },
    } = this;
    validateFields((err, values) => {
      if (!err) {
        const request: any = {};
        request.companyId = values.companyId;
        request.accountName = values.accountName;
        request.accountEmail = values.accountEmail;
        request.authCode = values.authCode;
        request.accountPassword = md5(values.password1);
        accountAPI
          .resetPassword(request)
          .then(() => {
            this.$emit("nextStep");
          })
          .catch((error) => {
            this.$message.error(error.message);
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.loading = false;
      }
    });
  }

  backToLogin() {
    this.$router.push({ path: RouterConfiguration.loginPath });
  }

  checkConfirmPassword(
    rules: ValidationRule,
    value: string,
    callback: Function
  ) {
    const password1 = this.form.getFieldValue("password1");
    if (password1 && password1 !== value) {
      callback(new Error(this.$t("account.password.mismatch") as string));
    } else {
      callback();
    }
  }
}
</script>

<style lang="less" scoped>
button.step-button {
  float: right;
  margin-left: 15px;
  padding: 0 15px;
  font-size: 14px;
  height: 35px;
  width: 42%;
}
</style>
