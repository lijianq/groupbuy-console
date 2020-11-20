import { Component, Prop, Vue } from 'vue-property-decorator'
import { AccountModule } from '@/store'
import { Modal } from 'ant-design-vue'

@Component
export default class AvatarDropdown extends Vue {

    @Prop({type: Boolean, default: true})
    public menu: boolean | undefined

    public currentAccount = AccountModule.getAccount()
    avatar: string = ''

    created() {
        let avatarSrc: string = this.currentAccount.avatar
        if (typeof avatarSrc !== 'undefined' && avatarSrc.trim().length > 0) {
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

    goCenter() {
        this.$router.push({path: '/account/center'})
    }

    goSettings() {
        this.$router.push({path: '/account/settings'})
    }

    logout() {
        Modal.confirm( {
            okText: this.$t('main.layout.logout.dialog.ok').toString(),
            cancelText: this.$t('main.layout.logout.dialog.cancel').toString(),
            title: this.$t('main.layout.logout.dialog.title'),
            content: this.$t('main.layout.logout.dialog.content'),
            onOk: () => {
                AccountModule.setAccount({})
                this.$router.push({path: '/account/login'})
            },
            onCancel: () => { console.log("Cancel logout.")}
        })
    }

}
