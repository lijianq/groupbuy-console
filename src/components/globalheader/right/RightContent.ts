import { Component, Prop, Vue } from 'vue-property-decorator'
import AvatarDropdown from '../avatar/AvatarDropdown.vue'
import LangSelector from '../lang/LangSelector'
import { AccountModule } from '@/store'

@Component({
    components: {
        AvatarDropdown,
        LangSelector
    }
})
export default class RightContent extends Vue {

    @Prop({ type: String, default: 'ant-pro-global-header-index-action'})
    public prefixCls: string | undefined
    @Prop({type: Boolean, default: false})
    public isMobile: boolean | undefined
    @Prop({ type: Boolean, required: true})
    public topMenu: boolean | undefined
    @Prop({ type: String, required: true})
    public theme: string | undefined

    showMenu = true
    currentAccount: any = {}

    get wrpCls() {
        return {
            'ant-pro-global-header-index-right': true,
            [`ant-pro-global-header-index-${(this.isMobile || !this.topMenu) ? 'light' : this.theme}`]: true
        }
    }

    mounted() {
        setTimeout(() => {
            this.currentAccount = {
                name: AccountModule.name,
                avatar: require('@/assets/default.png')
            }
        }, 800)
    }
}
