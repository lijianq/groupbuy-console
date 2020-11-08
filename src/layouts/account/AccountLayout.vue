<template>
  <div id="accountLayout" :class="['account-layout-wrapper', false && 'mobile']">
    <div class="container">
      <div class="top">
        <div class="header">
          <a href="/">
            <img src="~@/assets/logo.png" class="logo" alt="logo">
            <span class="title">{{ $t('account.layout.title')}}</span>
          </a>
        </div>
        <div class="desc">
          {{ $t('account.layout.desc')}}
        </div>
      </div>

      <router-view />

      <div class="footer">
        <div class="links">
          <a href="_self">{{ $t('account.layout.help')}}</a>
          <a href="_self">{{ $t('account.layout.privacy')}}</a>
          <a href="_self">{{ $t('account.layout.conditions')}}</a>
        </div>
        <div class="copyright">
          {{ $t('account.layout.copyright')}}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AccountLayout from "./AccountLayout"
export default { AccountLayout }
</script>

<style lang="less" scoped>
@import "AccountLayout";
</style>
