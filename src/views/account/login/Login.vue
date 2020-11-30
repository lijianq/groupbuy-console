<template>
  <div class="main">

    <div class="top">
      <div class="header">
          <img src="~@/assets/logo.svg" class="logo" alt="logo">
          <span class="title">{{ $t('account.login.title')}}</span>
      </div>
    </div>

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
            :placeholder="$t('account.login.tenant')"
            v-decorator="[
                'tenant',
                {rules: [{ required: true, message: $t('account.login.tenant.message') }], validateTrigger: 'blur'}
              ]"
        >
          <a-icon slot="prefix" type="shop" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
            size="large"
            type="text"
            :placeholder="$t('account.login.account')"
            v-decorator="[
                'account',
                {rules: [{ required: true, message: $t('account.login.account.message') }], validateTrigger: 'blur'}
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
                {rules: [{ required: true, message: $t('account.login.password.message') }], validateTrigger: 'blur'}
              ]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">{{$t('account.login.autologin')}}</a-checkbox>
        <div style="float: right;">
          <router-link
              :to="{ path: '/account/forgot' }"
              class="forge-password"
          >{{ $t('account.login.forgot') }}
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
        >{{$t('account.login.confirm')}}
        </a-button>
      </a-form-item>
      <div class="account-register">
        <router-link :to="{path: '/account/register' }">{{ $t('account.login.register') }}</router-link>
        <router-link class="registration" :to="{path: '/account/registration'}">{{ $t('account.login.registration') }} </router-link>
      </div>
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
