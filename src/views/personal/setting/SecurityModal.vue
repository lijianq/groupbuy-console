<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    @ok="handleSave"
    @cancel="handleClose"
  >
    <template slot="footer">
      <a-button class="right-button" @click="handleClose()">{{
        $t("common.close")
      }}</a-button>
      <a-button
        type="primary"
        :loading="loading"
        class="right-button"
        @click="handleSave()"
        >{{ $t("route.action.save") }}</a-button
      >
    </template>
    <a-card :bordered="false">
      <a-form :form="form" id="securityOpForm" v-bind="formLayout">
        <div v-if="type === 1">
          <a-form-item :label="$t('account.password.old')">
            <a-input-password
              v-decorator="[
                'opassword',
                {
                  rules: [
                    {
                      required: true,
                      message: $t('account.password.message'),
                    },
                    { min: 8, message: $t('account.password.min') },
                    { max: 30, message: $t('account.password.max') },
                  ],
                },
              ]"
            >
            </a-input-password>
          </a-form-item>
          <a-form-item :label="$t('account.password')">
            <a-input-password
              v-decorator="[
                'password1',
                {
                  rules: [
                    {
                      required: true,
                      message: $t('account.password.message'),
                    },
                    { min: 8, message: $t('account.password.min') },
                    { max: 30, message: $t('account.password.max') },
                  ],
                },
              ]"
            >
            </a-input-password>
          </a-form-item>

          <a-form-item :label="$t('account.password.confirm')">
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
        </div>
        <div v-if="type === 2">
          <a-form-item :label="$t('account.email')">
            <a-input-search
              @search="sendAuthCode"
              v-decorator="[
                'accountEmail',
                {
                  rules: [
                    {
                      required: true,
                      message: $t('account.auth.email.required'),
                    },
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

          <a-form-item :label="$t('account.auth.code')">
            <a-input
              v-decorator="[
                'authCode',
                {
                  rules: [
                    {
                      required: true,
                      message: $t('account.auth.code.required'),
                    },
                  ],
                },
              ]"
            >
            </a-input>
          </a-form-item>
        </div>
      </a-form>
    </a-card>
  </a-modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  WrappedFormUtils,
  ValidationRule,
} from "ant-design-vue/types/form/form";
import md5 from "md5";
import personalAPI from "@/api/personal/PersonalAPI";

@Component
export default class SecurityModal extends Vue {
  title: string = "";
  visible = false;
  formLayout: any = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  form!: WrappedFormUtils;
  type: number = 1;
  companyId: any = null;
  accountId: any = null;
  loading = false;
  sendBtnState = false;
  defaultInterval = 120;
  resendTime = this.defaultInterval;

  created() {
    this.form = this.$form.createForm(this, { name: "securityOpForm" });
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

  open(companyId: string, accountId: string, type: number) {
    this.companyId = companyId;
    this.accountId = accountId;
    this.type = type;
    if (type === 1) {
      this.title = this.$t("account.password.modify").toString();
    } else if (type === 2) {
      this.title = this.$t("account.email.modify").toString();
    }
    this.visible = true;
  }

  handleClose() {
    this.$emit("cancel");
    this.visible = false;
    this.form.resetFields();
  }

  handleSave() {
    if (this.type === 1) {
      this.loading = true;
      this.form.validateFields(
        ["opassword", "password1", "password2"],
        (error, values) => {
          if (!error) {
            const request: any = {};
            request.companyId = this.companyId;
            request.accountId = this.accountId;
            request.oldAccountPassword = md5(values.opassword);
            request.accountPassword = md5(values.password1);
            personalAPI
              .updatePassword(request)
              .then(() => {
                this.handleClose();
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
        }
      );
    } else if (this.type === 2) {
      this.loading = true;
      this.form.validateFields(
        ["accountEmail", "authCode"],
        (error, values) => {
          if (!error) {
            const request: any = {};
            request.companyId = this.companyId;
            request.accountId = this.accountId;
            request.accountEmail = values.accountEmail;
            request.authCode = values.authCode;
            personalAPI
              .updateEmail(request)
              .then(() => {
                this.handleClose();
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
        }
      );
    } else {
      this.handleClose();
    }
  }

  sendAuthCode() {
    const {
      form: { validateFields },
    } = this;
    validateFields(["accountEmail"], (err, values) => {
      if (!err) {
        this.sendBtnState = true;
        const interval = window.setInterval(() => {
          if (this.resendTime-- <= 0) {
            this.resendTime = this.defaultInterval;
            this.sendBtnState = false;
            window.clearInterval(interval);
          }
        }, 1000);
        const request: any = {};
        request.companyId = this.companyId;
        request.accountId = this.accountId;
        request.accountEmail = values.accountEmail;
        personalAPI
          .sendAuthCode(request)
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
    });
  }
}
</script>
<style lang="less" scoped>
button.right-button {
  margin-top: 10px;
  margin-left: 10px;
  padding: 0 15px;
  font-size: 14px;
  width: 120px;
}
</style>
