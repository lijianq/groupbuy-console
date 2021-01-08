<template>
  <div class="account-settings-info">
    <a-row :gutter="24">
      <a-col :md="24" :lg="12">
        <a-list itemLayout="horizontal" :dataSource="data">
          <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
            <a-list-item-meta>
              <a slot="title">{{ item.title }}</a>
              <span slot="description">
                <span class="security-list-description">{{
                  item.description
                }}</span>
              </span>
            </a-list-item-meta>
            <template v-if="item.actions">
              <a slot="actions" @click="item.actions.callback">{{
                item.actions.title
              }}</a>
            </template>
          </a-list-item>
        </a-list>
      </a-col>
    </a-row>
    <security-modal ref="securityModal"></security-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import SecurityModal from "./SecurityModal.vue";

@Component({
  components: {
    SecurityModal,
  },
})
export default class SecuritySetting extends Vue {
  @Prop({ type: Object, default: null })
  account: any | null;

  data: any[] = [
    {
      title: this.$t("account.password.title"),
      description: this.$t("account.password.description"),
      actions: {
        title: this.$t("route.action.modify"),
        callback: () => {
          const modal: any = this.$refs.securityModal;
          modal.open(this.account.companyId, this.account.accountId, 1);
        },
      },
    },
    {
      title: this.$t("account.email"),
      description: this.$t("account.email.description"),
      actions: {
        title: this.$t("route.action.modify"),
        callback: () => {
          const modal: any = this.$refs.securityModal;
          modal.open(this.account.companyId, this.account.accountId, 2);
        },
      },
    },
  ];
}
</script>

<style type="less" scoped>
.account-settings-info {
  margin-top: 20px;
}
</style>
