<template>
  <a-tabs default-active-key="1">
    <a-tab-pane key="1" :tab="$t('account.basic.setting')">
      <basic-setting
        :account="account"
        @accountChanged="accountChanged"
      ></basic-setting>
    </a-tab-pane>
    <a-tab-pane key="2" :tab="$t('account.security.setting')">
      <security-setting :account="account"></security-setting>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BasicSetting from "./BasicSetting.vue";
import SecuritySetting from "./SecuritySetting.vue";
import personalAPI from "@/api/personal/PersonalAPI";
import { AccountModule } from "@/store";

@Component({
  components: {
    BasicSetting,
    SecuritySetting,
  },
})
export default class AccountSetting extends Vue {
  account: any = null;

  created() {
    personalAPI
      .getAccount()
      .then((result) => {
        this.account = result.data;
      })
      .catch((error) => {
        this.$message.error(error.message);
      });
  }

  accountChanged(values: any) {
    this.account.accountFullName = values.accountFullName;
    this.account.accountPhone = values.accountPhone;
    const currentAccount = AccountModule.getAccount();
    currentAccount.accountFullName = values.accountFullName;
    if (values.accountAvatar) {
      currentAccount.accountAvatar = values.accountAvatar;
    }
    AccountModule.setAccount(currentAccount);
    this.$eventBus.$emit("currentAccountChanged");
  }
}
</script>
