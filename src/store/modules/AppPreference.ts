import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'

@Module({ name: 'appPreference'})
export default class AppPreference extends VuexModule {

    public layout = 'sidemenu'

    public navTheme = 'dark'

    public primaryColor = '#52C41A'

    public colorWeak = false

    public fixedHeader = true

    public fixSiderbar = true

    public contentWidth = 'Fluid'

    public autoHideHeader = false

    public isMobile = false

    public sidebarCollapsed = true

    public multiTab = false

    public currentLang = 'zh-CN'

    @MutationAction({mutate: ['layout', 'navTheme', 'primaryColor', 'colorWeak', 'fixedHeader',
        'fixSiderbar', 'contentWidth', 'autoHideHeader', 'sidebarCollapsed', 'multiTab', 'currentLang']})
    async setAppPreference(layout: string,
                    navTheme: string,
                    primaryColor: string,
                    colorWeak: boolean,
                    fixedHeader: boolean,
                    fixSiderbar: boolean,
                    contentWidth: string,
                    autoHideHeader: boolean,
                    sidebarCollapsed: boolean,
                    multiTab: boolean,
                    currentLang: string) {
        return {
            layout: layout,
            navTheme: navTheme,
            primaryColor: primaryColor,
            colorWeak: colorWeak,
            fixedHeader: fixedHeader,
            fixSiderbar: fixSiderbar,
            contentWidth: contentWidth,
            autoHideHeader: autoHideHeader,
            sidebarCollapsed: sidebarCollapsed,
            multiTab: multiTab,
            currentLang: currentLang
        }
    }
}
