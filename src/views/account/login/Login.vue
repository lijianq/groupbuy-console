<template>
  <div class="main">
    <a-form
        id="loginForm"
        class="account-layout-login"
        ref="loginForm"
        :form="form"
        @submit="handleSubmit"
    >
      <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;"
               :message="$t('account.login.error')"/>
      <a-form-item>
        <a-input
            size="large"
            type="text"
            :placeholder="$t('account.login.account')"
            v-decorator="[
                'account',
                {rules: [{ required: true, message: $t('account.login.accountMessage') }], validateTrigger: 'blur'}
              ]"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input-password
            size="large"
            :placeholder="$t('account.login.password')"
            v-decorator="[
                'password',
                {rules: [{ required: true, message: $t('account.login.passwordMessage') }], validateTrigger: 'blur'}
              ]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">{{$t('account.login.autologin')}}</a-checkbox>
        <router-link
            :to="{ path: '/about/info', params: { accout: 'admin'} }"
            class="forge-password"
            style="float: right;"
        >{{$t('account.login.forgot')}}
        </router-link>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
            size="large"
            type="primary"
            htmlType="submit"
            class="login-button"
            :loading="state.loginBtn"
            :disabled="state.loginBtn"
        >{{$t('account.login.confirm')}}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import Login from './Login'
export default Login
</script>

<style lang="less" scoped>
@import "Login";
</style>
