import {Module, VuexModule, MutationAction, getModule, Mutation} from 'vuex-module-decorators'
import store from '@/store'

@Module({ name: 'appRuntime', dynamic: true, namespaced: true, store: store})
class AppRuntime extends VuexModule {

    public menus: any[] = []

    public isMobile = false

    public sidebarCollapsed = false

    @Mutation
    setMenus(menus: any[]) {
        this.menus = menus
    }

    @MutationAction({ mutate: ['sidebarCollapsed']})
    async setSidebarCollapsed(sidebarCollapsed: boolean) {
        return {
            sidebarCollapsed: sidebarCollapsed
        }
    }

    @MutationAction({ mutate: ['isMobile']})
    async setMobileMode(isMobile: boolean) {
        return {
            isMobile: isMobile
        }
    }
}

const AppRuntimeModule = getModule(AppRuntime)
export default AppRuntimeModule
