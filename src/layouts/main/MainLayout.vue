<template>
  <pro-layout
      :menus="menus"
      :collapsed="collapsed"
      :mediaQuery="query"
      :isMobile="isMobile"
      :handleMediaQuery="handleMediaQuery"
      :handleCollapse="handleCollapse"
      :i18nRender="i18nRender"
      v-bind="settings"
  >

    <template v-slot:menuHeaderRender>
      <div>
        <img src="~@/assets/logo.00.png" alt="logo"/>
        <h1>{{ $t(title) }}</h1>
      </div>
    </template>

    <setting-drawer :settings="settings" @change="handleChangeSetting"/>
    <template v-slot:rightContentRender>
      <right-content :top-menu="settings.layout === 'topmenu'" :is-mobile="isMobile" :theme="settings.theme"/>
    </template>
    <router-view/>
  </pro-layout>
</template>

<script lang="ts">
import MainLayout from "./MainLayout"
export default MainLayout
</script>

<style lang="less">
@import "MainLayout";
</style>
