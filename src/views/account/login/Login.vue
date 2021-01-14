<template>
  <div class="main">
    <div class="top">
      <div class="header">
        <img src="~@/assets/logo.svg" class="logo" alt="logo" />
        <span class="title">{{ $t("common.platform.name") }}</span>
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
          :placeholder="$t('account.company')"
          v-decorator="[
            'companyId',
            {
              rules: [
                { required: true, message: $t('account.company.message') },
              ],
            },
          ]"
        >
          <a-icon
            slot="prefix"
            type="shop"
            :style="{ color: 'rgba(0,0,0,.25)' }"
          />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="text"
          :placeholder="$t('account.sub.account')"
          v-decorator="[
            'accountName',
            {
              rules: [
                { required: true, message: $t('account.sub.account.message') },
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
                { required: true, message: $t('account.password.message') },
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
        <a-input
          size="large"
          :placeholder="$t('account.auth.code')"
          v-decorator="[
            'accountCode',
            {
              rules: [
                { required: true, message: $t('account.auth.code.required') },
              ],
            },
          ]"
        >
          <a-icon
            slot="prefix"
            type="key"
            :style="{ color: 'rgba(0,0,0,.25)' }"
          />
          <div slot="suffix" @click="refreshCode" style="width: 109px;">
            <p-auth-code :identifyCode="identifyCode"></p-auth-code>
          </div>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-checkbox
          v-decorator="['rememberMe', { valuePropName: 'checked' }]"
          >{{ $t("account.autologin") }}</a-checkbox
        >
        <div style="float: right;">
          <router-link :to="{ path: '/account/forgot' }" class="forge-password"
            >{{ $t("account.forgot") }}
          </router-link>
        </div>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
          >{{ $t("common.confirm") }}
        </a-button>
      </a-form-item>
      <div class="account-register">
        <router-link :to="{ path: '/account/register' }">{{
          $t("account.register")
        }}</router-link>
        <router-link class="registration" :to="{ path: '/account/status' }"
          >{{ $t("account.registration") }}
        </router-link>
      </div>
    </a-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { WrappedFormUtils } from "ant-design-vue/types/form/form";
import md5 from "md5";
import accountAPI from "@/api/account/AccountAPI";
import { AppPreferenceModule, AccountModule } from "@/store";
import { RouterConfiguration } from "@/config";
import PAuthCode from "@/components/auth/PAuthCode.vue";

@Component({
  components: {
    PAuthCode,
  },
})
export default class Login extends Vue {
  form!: WrappedFormUtils;
  state = { loginBtn: false };
  autoLogin = false;
  identifyCodes = "1234567890abcdefjhijklinopqrsduvwxyz";
  identifyCode = "";

  created() {
    this.form = this.$form.createForm(this, { name: "loginForm" });
    this.autoLogin = AppPreferenceModule.getAutoLogin();
    this.makeAuthCode(5);
  }

  mounted() {
    this.form.setFieldsValue({ rememberMe: this.autoLogin });
  }

  randomNum(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  makeAuthCode(length: number) {
    for (let i = 0; i < length; i++) {
      this.identifyCode += this.identifyCodes[
        this.randomNum(0, this.identifyCodes.length)
      ];
    }
  }

  refreshCode() {
    this.identifyCode = "";
    this.makeAuthCode(5);
  }

  handleSubmit(event: Event) {
    let redirect = RouterConfiguration.homePath;
    if (this.$route.query.redirect) {
      redirect = this.$route.query.redirect as string;
    }
    event.preventDefault();
    this.state.loginBtn = true;
    const validateFieldsKey = [
      "companyId",
      "accountName",
      "accountPassword",
      "accountCode",
      "rememberMe",
    ];
    this.form.validateFields(
      validateFieldsKey,
      { force: true },
      (err, values) => {
        if (!err) {
          const authCode = values.accountCode;
          if (this.identifyCode !== authCode) {
            this.$message.error(
              this.$t("account.auth.code.incorrect").toString()
            );
            this.state.loginBtn = false;
            return;
          }
          const rememberMe = values.rememberMe ? values.rememberMe : false;
          if (this.autoLogin !== rememberMe) {
            AppPreferenceModule.setAutoLogin(rememberMe);
          }
          const params: any = {};
          params.companyId = values.companyId;
          params.accountName = values.accountName;
          params.accountPassword = md5(values.accountPassword);
          accountAPI
            .login(params)
            .then((response) => {
              const currentAccount = response.data;
              AccountModule.setAccount(currentAccount);
              this.$router.push({ path: redirect });
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
