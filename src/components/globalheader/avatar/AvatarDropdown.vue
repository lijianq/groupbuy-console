<template>
  <a-dropdown v-if="currentAccount && currentAccount.name" placement="bottomRight">
    <span class="ant-pro-account-avatar">
      <a-avatar size="small" :src="avatar" class="antd-pro-global-header-index-avatar" />
      <span>{{ currentAccount.fullName }}</span>
    </span>

    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
        <a-menu-item v-if="menu" key="settings" @click="goSettings">
          <a-icon type="setting" />
          {{$t('main.layout.avatar.account.setting')}}
        </a-menu-item>
        <a-menu-divider v-if="menu" />
        <a-menu-item key="logout" @click="logout">
          <a-icon type="logout" />
          {{$t('main.layout.avatar.account.logout')}}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <span v-else>
    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
  </span>
</template>

<script lang="ts">
import AvatarDropdown from "./AvatarDropdown"
export default AvatarDropdown
</script>

<style lang="less" scoped>
@import "AvatarDropdown";
</style>
