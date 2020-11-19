import { Component, Vue, Watch } from 'vue-property-decorator'
import ProLayout, { SettingDrawer, updateTheme, updateColorWeak } from '@ant-design-vue/pro-layout'
import { AppPreferenceModule } from '@/store'
import AppRuntimeModule from '@/store/modules/AppRuntime'
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
    menus = []
    collapsed = AppRuntimeModule.sidebarCollapsed
    title = DefaultSetting.title

    settings: any = {
        layout: AppPreferenceModule.layout,
        contentWidth: AppPreferenceModule.layout === 'sidemenu' ? 'Fluid' : AppPreferenceModule.contentWidth,
        theme: AppPreferenceModule.theme,
        primaryColor: AppPreferenceModule.primaryColor,
        fixedHeader: AppPreferenceModule.fixedHeader,
        fixSiderbar: AppPreferenceModule.fixSiderbar,
        colorWeak: AppPreferenceModule.colorWeak,
        autoHideHeader: AppPreferenceModule.autoHideHeader,
        hideHintAlert: true,
        hideCopyButton: true
    }
    isMobile = AppRuntimeModule.isMobile
    query: any = {}
    mainMenu: any[] = []

    @Watch('collapsed')
    setCollapsed() {
        AppRuntimeModule.setSidebarCollapsed(this.collapsed)
    }

    @Watch('isMobile')
    setMobileMode() {
        AppRuntimeModule.setMobileMode(this.isMobile)
    }

    created() {
        const routes = this.mainMenu.find(item => item.path === '/')
        this.menus = (routes && routes.children) || []
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
        updateTheme(this.settings.primaryColor)
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
                break
            case 'primaryColor':
                this.settings.primaryColor = value
                break
            case 'layout':
                this.settings.layout = value
                break
            case 'fixedHeader':
                this.settings.fixedHeader = value
                break
            case 'fixSiderbar':
                this.settings.fixSiderbar = value
                break
            case 'colorWeak':
                this.settings.colorWeak = value
                break
            case 'contentWidth':
                this.settings.contentWidth = value
                break
        }
        AppPreferenceModule.setAppPreference(this.settings)
    }
}
