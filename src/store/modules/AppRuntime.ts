import { Module, VuexModule, getModule, Mutation } from 'vuex-module-decorators'
import store from '@/store'

@Module({ name: 'appRuntime', dynamic: true, namespaced: true, store: store })
class AppRuntime extends VuexModule {

    public isMobile = false

    public sidebarCollapsed = false

    @Mutation
    setSidebarCollapsed(sidebarCollapsed: boolean) {
        this.sidebarCollapsed = sidebarCollapsed
    }

    @Mutation
    setMobileMode(isMobile: boolean) {
        this.isMobile = isMobile
    }

}

const AppRuntimeModule = getModule(AppRuntime)
export default AppRuntimeModule
