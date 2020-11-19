<template>
  <div :class="wrpCls">
    <avatar-dropdown :menu="showMenu" :current-account="currentAccount" :class="prefixCls" />
    <lang-selector :class="prefixCls" />
  </div>
</template>

<script lang="ts">
import RightContent from './RightContent'
export default RightContent
</script>

<style lang="less" scoped>
</style>
