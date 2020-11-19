import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'

@Module({ name: 'appPreference'})
export default class AppPreference extends VuexModule {

    public layout = 'sidemenu'

    public theme = 'dark'

    public primaryColor = '#52C41A'

    public colorWeak = false

    public fixedHeader = true

    public fixSiderbar = true

    public contentWidth = 'Fluid'

    public autoHideHeader = false

    public multiTab = false

    public currentLang = 'zh-CN'

    @MutationAction({ mutate: ['currentLang']})
    async setLanguage(currentLang: string) {
        return {
            currentLang: currentLang
        }
    }

    @MutationAction({ mutate: ['layout']})
    async setLayout(layout: string) {
        return {
            layout: layout
        }
    }

    @MutationAction({ mutate: ['theme']})
    async setTheme(theme: string) {
        return {
            theme: theme
        }
    }

    @MutationAction({ mutate: ['primaryColor']})
    async setPrimaryColor(primaryColor: string) {
        return {
            primaryColor: primaryColor
        }
    }

    @MutationAction({ mutate: ['contentWidth']})
    async setContentWidth(contentWidth: string) {
        return {
            contentWidth: contentWidth
        }
    }

    @MutationAction({ mutate: ['colorWeak']})
    async setColorWeak(colorWeak: boolean) {
        return {
            colorWeak: colorWeak
        }
    }

    @MutationAction({ mutate: ['fixedHeader']})
    async setFixedHeader(fixedHeader: boolean) {
        return {
            fixedHeader: fixedHeader
        }
    }

    @MutationAction({ mutate: ['fixSiderbar']})
    async setFixSiderbar(fixSiderbar: boolean) {
        return {
            fixSiderbar: fixSiderbar
        }
    }

    @MutationAction({ mutate: ['autoHideHeader']})
    async setAutoHideHeader(autoHideHeader: boolean) {
        return {
            autoHideHeader: autoHideHeader
        }
    }

    @MutationAction({ mutate: ['multiTab']})
    async setMultiTab(multiTab: boolean) {
        return {
            multiTab: multiTab
        }
    }
}
