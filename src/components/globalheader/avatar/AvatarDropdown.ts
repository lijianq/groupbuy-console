import { Component, Prop, Vue } from 'vue-property-decorator'
import { AccountModule } from '@/store'
import { Modal } from 'ant-design-vue'

@Component
export default class AvatarDropdown extends Vue {

    @Prop({type: Object, default: null})
    public currentAccount: any | undefined
    @Prop({type: Boolean, default: true})
    public menu: boolean | undefined

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
                AccountModule.setName('')
                AccountModule.setRoles([])
                AccountModule.setAvatar('')
                AccountModule.setAccessToken('')
                AccountModule.setExpireTime('')
                this.$router.push({path: '/account/login'})
            },
            onCancel: () => { console.log("Cancel logout.")}
        })
    }

}
