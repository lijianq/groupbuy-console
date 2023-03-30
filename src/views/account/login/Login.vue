<template>
  <a-card :border="false" class="main">
    <div class="top">
      <div class="header">
        <img src="~@/assets/logo.svg" class="logo" alt="logo" />
        <span class="title">{{ $t("platform.name") }}</span>
      </div>
    </div>

    <a-form
      id="loginForm"
      class="account-layout-login"
      ref="loginForm"
      :form="form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          size="large"
          type="text"
          :placeholder="$t('account.name')"
          v-decorator="[
            'accountName',
            {
              rules: [
                {
                  required: true,
                  message: $t('account.name.required'),
                },
              ],
            },
          ]"
        >
          <a-icon
            slot="prefix"
            type="user"
            :style="{ color: 'rgba(0,0,0,.25)' }"
          />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input-password
          size="large"
          :placeholder="$t('account.password')"
          v-decorator="[
            'accountPassword',
            {
              rules: [
                { required: true, message: $t('account.password.required') },
              ],
            },
          ]"
        >
          <a-icon
            slot="prefix"
            type="lock"
            :style="{ color: 'rgba(0,0,0,.25)' }"
          />
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <a-checkbox
          v-decorator="['rememberMe', { valuePropName: 'checked' }]"
          >{{ $t("account.autologin") }}</a-checkbox
        >
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
          >{{ $t("account.confirm") }}
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { WrappedFormUtils } from "ant-design-vue/types/form/form";
import md5 from "md5";
import accountAPI from "@/api/AccountAPI";
import { AppPreferenceModule, AccountModule } from "@/store";
import { RouterConfiguration } from "@/config";

@Component({
  components: {},
})
export default class Login extends Vue {
  form!: WrappedFormUtils;
  state = { loginBtn: false };
  autoLogin = false;

  created() {
    this.form = this.$form.createForm(this, { name: "loginForm" });
    this.autoLogin = AppPreferenceModule.getAutoLogin();
  }

  mounted() {
    this.form.setFieldsValue({ rememberMe: this.autoLogin });
  }

  handleSubmit(event: Event) {
    let redirect = RouterConfiguration.homePath;
    if (this.$route.query.redirect) {
      redirect = this.$route.query.redirect as string;
    }
    event.preventDefault();
    this.state.loginBtn = true;
    const validateFieldsKey = ["accountName", "accountPassword", "rememberMe"];
    this.form.validateFields(
      validateFieldsKey,
      { force: true },
      (err, values) => {
        if (!err) {
          const rememberMe = values.rememberMe ? values.rememberMe : false;
          if (this.autoLogin !== rememberMe) {
            AppPreferenceModule.setAutoLogin(rememberMe);
          }
          const params: any = {};
          params.accountName = values.accountName;
          params.accountPassword = md5(values.accountPassword);
          accountAPI
            .login(params)
            .then((response) => {
              const currentAccount: any = response.data;
              if (currentAccount && currentAccount.status == "0") {
                AccountModule.setAccount(currentAccount);
                this.$router.push({ path: redirect });
              } else {
                this.$message.error(this.$t("account.invalid").toString());
              }
            })
            .catch((error) => {
              this.$message.error(error.message);
            })
            .finally(() => {
              this.state.loginBtn = false;
            });
        } else {
          setTimeout(() => {
            this.state.loginBtn = false;
          }, 600);
        }
      }
    );
  }
}
</script>

<style lang="less" scoped>
.top {
  text-align: center;
  margin-top: 50px;

  .header {
    height: 40px;
    line-height: 40px;

    .logo {
      height: 30px;
      vertical-align: center;
      margin-right: 20px;
      border-style: none;
    }

    .title {
      font-size: 28px;
      vertical-align: bottom;
      color: rgba(0, 0, 0, 0.85);
      font-family: Avenir, "Helvetica Neue", Arial, Helvetica, sans-serif;
      font-weight: 600;
      position: relative;
      top: 2px;
    }
  }
}

.account-layout-login {
  margin-top: 40px;

  label {
    font-size: 14px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .account-register {
    .registration {
      float: right;
    }
  }
}
</style>
