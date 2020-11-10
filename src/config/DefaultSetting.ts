export class DefaultSetting {
    static navTheme = 'dark'
    static primaryColor = '#52C41A' // primary color of ant design
    static layout = 'sidemenu' // nav menu position: `sidemenu` or `topmenu`
    static contentWidth = 'Fluid' // layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
    static fixedHeader = true // sticky header
    static fixSiderbar = true // sticky siderbar
    static colorWeak = false
    static menu = {
        locale: true
    }
    static title = 'company.name'
    static pwa = true
    static iconfontUrl = ''
    static production = process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true'

}
