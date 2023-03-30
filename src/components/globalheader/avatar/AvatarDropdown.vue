<template>
  <a-dropdown v-if="currentAccount" placement="bottomRight">
    <span class="ant-pro-account-avatar">
      <a-avatar
        size="small"
        :src="avatar"
        class="antd-pro-global-header-index-avatar"
      />
      <span>{{ currentAccount.accountFullname }}</span>
    </span>
    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
        <a-menu-item key="logout" @click="logout">
          <a-icon type="logout" />
          {{ $t("account.logout") }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <span v-else>
    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
import { RouterConfiguration } from "@/config";
import { AccountModule } from "@/store";

@Component
export default class AvatarDropdown extends Vue {
  @Prop({ type: Boolean, default: true })
  menu: boolean | undefined;

  currentAccount: any = {};
  avatar: string = "";

  created() {
    this.$eventBus.$on("currentAccountChanged", this.currentAccountChanged);
    this.setData();
  }

  setData() {
    this.currentAccount = AccountModule.getAccount();
    this.avatar = require("@/assets/avatars/default.png");
  }

  currentAccountChanged() {
    this.setData();
  }

  logout() {
    Modal.confirm({
      okText: this.$t("common.ok").toString(),
      cancelText: this.$t("common.cancel").toString(),
      title: this.$t("account.logout"),
      content: this.$t("account.logout.confirm.message"),
      onOk: () => {
        AccountModule.setAccount({});
        this.$router.push({ path: RouterConfiguration.loginPath }).then(() => {
          location.reload();
        });
      },
      onCancel: () => {
        //
      },
    });
  }
}
</script>

<style lang="less" scoped>
ant-pro-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }
  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
</style>
