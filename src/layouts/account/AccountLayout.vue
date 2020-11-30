<template>
  <div id="accountLayout" :class="['account-layout-wrapper', isMobile && 'mobile']">
    <div class="container">
      <div style="float: right; margin-right: 20px;">
        <lang-selector/>
      </div>
      <router-view />
      <div class="footer">
        <div class="copyright">
          {{ $t('account.layout.copyright')}}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AccountLayout from "@/layouts/account/AccountLayout"
export default AccountLayout
</script>

<style lang="less" scoped>
@import "AccountLayout";
</style>
