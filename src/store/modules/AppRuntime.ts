import {Module, VuexModule, getModule, Mutation} from 'vuex-module-decorators'
import store from '@/store'

@Module({ name: 'appRuntime', dynamic: true, namespaced: true, store: store})
class AppRuntime extends VuexModule {

    public menus: any[] = []

    public routes: any[] = []

    public isMobile = false

    public sidebarCollapsed = false

    @Mutation
    setMenus(menus: any[]) {
        this.menus = menus
    }

    @Mutation
    setRoutes(routes: any[]) {
        this.routes = routes
    }

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
