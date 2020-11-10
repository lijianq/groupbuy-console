import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'

@Module({
    name: 'app-preference', dynamic: true, namespaced: true, store
})

class AppPreference extends VuexModule {

    public layout = ''

    public navTheme = ''

    public primaryColor = ''

    public colorWeak = false

    public fixedHeader = true

    public fixSiderbar = true

    public contentWidth = ''

    public autoHideHeader = false

    public isMobile = false

    public sidebarCollapsed = true

    public multiTab = false

    public currentLang = 'zh-CN'

}
export const AppPreferenceModule = getModule(AppPreference)
