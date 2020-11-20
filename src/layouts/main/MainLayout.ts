import { Component, Vue, Watch } from 'vue-property-decorator'
import ProLayout, { SettingDrawer, updateColorWeak } from '@ant-design-vue/pro-layout'
import { AppPreferenceModule, AppRuntimeModule } from '@/store'
import { DefaultSetting } from '@/config'
import RightContent from '@/components/globalheader'

@Component({
    components: {
        SettingDrawer,
        RightContent,
        ProLayout
    }
})
export default class MainLayout extends Vue {

    isProPreviewSite = process.env.VUE_APP_PREVIEW === 'true' && process.env.NODE_ENV !== 'development'
    menus: any[] = []
    collapsed = AppRuntimeModule.sidebarCollapsed
    title = DefaultSetting.title

    settings: any = {
        layout: AppPreferenceModule.getLayout(),
        contentWidth: AppPreferenceModule.getLayout() === 'sidemenu' ? 'Fluid' : AppPreferenceModule.getContentWidth(),
        theme: AppPreferenceModule.getTheme(),
        primaryColor: AppPreferenceModule.getPrimaryColor(),
        fixedHeader: AppPreferenceModule.getFixedHeader(),
        fixSiderbar: AppPreferenceModule.getFixSiderbar(),
        colorWeak: AppPreferenceModule.getColorWeak(),
        autoHideHeader: AppPreferenceModule.getAutoHideHeader(),
        hideHintAlert: true,
        hideCopyButton: true
    }
    isMobile = AppRuntimeModule.isMobile
    query: any = {}

    @Watch('collapsed')
    setCollapsed() {
        AppRuntimeModule.setSidebarCollapsed(this.collapsed)
    }

    @Watch('isMobile')
    setMobileMode() {
        AppRuntimeModule.setMobileMode(this.isMobile)
    }

    created() {
        this.menus = AppRuntimeModule.menus
    }

    mounted() {
        const userAgent = navigator.userAgent
        if (userAgent.indexOf('Edge') > -1) {
            this.$nextTick(() => {
                this.collapsed = !this.collapsed
                setTimeout(() => {
                    this.collapsed = !this.collapsed
                }, 16)
            })
        }
        // updateTheme(this.settings.primaryColor)
        updateColorWeak(this.settings.colorWeak)
    }

    i18nRender(key: string) {
        return this.$t(key)
    }

    handleMediaQuery (val: any) {
        this.query = val
        if (this.isMobile && !val['screen-xs']) {
            this.isMobile = false
            return
        }
        if (!this.isMobile && val['screen-xs']) {
            this.isMobile = true
            this.collapsed = false
            this.settings.contentWidth = 'Fluid'
        }
    }

    handleCollapse (val: boolean) {
        this.collapsed = val
    }

    handleChangeSetting (setting: any) {
        const type = setting.type
        const value = setting.value
        switch (type) {
            case 'theme':
                this.settings.theme = value
                AppPreferenceModule.setTheme(value)
                break
            case 'primaryColor':
                this.settings.primaryColor = value
                AppPreferenceModule.setPrimaryColor(value)
                break
            case 'layout':
                this.settings.layout = value
                AppPreferenceModule.setLayout(value)
                break
            case 'fixedHeader':
                this.settings.fixedHeader = value
                AppPreferenceModule.setFixedHeader(value)
                break
            case 'fixSiderbar':
                this.settings.fixSiderbar = value
                AppPreferenceModule.setFixSiderbar(value)
                break
            case 'colorWeak':
                this.settings.colorWeak = value
                AppPreferenceModule.setColorWeak(value)
                break
            case 'contentWidth':
                this.settings.contentWidth = value
                AppPreferenceModule.setContentWidth(value)
                break
        }
    }
}
