import {Module, VuexModule, MutationAction, getModule} from 'vuex-module-decorators'
import store from '@/store'

@Module({ name: 'appRuntime', dynamic: true, namespaced: true, store: store})
class AppRuntime extends VuexModule {

    public isMobile = false

    public sidebarCollapsed = false

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
