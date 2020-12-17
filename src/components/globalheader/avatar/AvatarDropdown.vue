<template>
  <a-dropdown v-if="currentAccount && currentAccount.accountId" placement="bottomRight">
    <span class="ant-pro-account-avatar">
      <a-avatar size="small" :src="avatar" class="antd-pro-global-header-index-avatar" />
      <span>{{ currentAccount.accountFullName }}</span>
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
import { Component, Prop, Vue } from 'vue-property-decorator'
import { AccountModule } from '@/store'
import { Modal } from 'ant-design-vue'
import { accountAPI } from '@/api'
import { RouterConfiguration} from '@/config'

@Component
export default class AvatarDropdown extends Vue {

    @Prop({type: Boolean, default: true})
    public menu: boolean | undefined

    public currentAccount = AccountModule.getAccount()
    avatar: string = ''

    created() {
        let avatarSrc: string = this.currentAccount.accountAvatar
        if (avatarSrc != null) {
            avatarSrc = avatarSrc.trim()
            if (avatarSrc.toLowerCase().startsWith('http')) {
                this.avatar = avatarSrc
            } else {
                this.avatar = require('@/assets/avatars/' + avatarSrc)
            }
        } else {
            this.avatar = require('@/assets/avatars/default.png')
        }
    }

    goSettings() {
        this.$router.push({path: '/account/setting'})
    }

    logout() {
        Modal.confirm( {
            okText: this.$t('main.layout.logout.dialog.ok').toString(),
            cancelText: this.$t('main.layout.logout.dialog.cancel').toString(),
            title: this.$t('main.layout.logout.dialog.title'),
            content: this.$t('main.layout.logout.dialog.content'),
            onOk: () => {
                accountAPI.logout()
                this.$router.push({path: RouterConfiguration.loginPath}).then(() => {
                    location.reload()
                })
            },
            onCancel: () => { console.log("Cancel logout.")}
        })
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
