class AppPreference {

    private currentLangKey = "app.preference.currentLang"
    private layoutKey = "app.preference.layout"
    private themeKey = "app.preference.theme"
    private primaryColorKey = "app.preference.primaryColor"
    private colorWeakKey = "app.preference.colorWeak"
    private fixedHeaderKey = "app.preference.fixedHeader"
    private fixSiderbarKey = "app.preference.fixSiderbar"
    private contentWidthKey = "app.preference.contentWidth"
    private autoHideHeaderKey = "app.preference.autoHideHeader"
    private multiTabKey = "app.preference.multiTab"
    private autoLoginKey = "app.preference.autoLoginKey"

    setLanguage(currentLang: string) {
        localStorage.setItem(this.currentLangKey, currentLang)
    }

    getLanguage() {
        const currentLang = localStorage.getItem(this.currentLangKey)
        return currentLang ? currentLang : 'zh-CN'
    }

    setLayout(layout: string) {
        localStorage.setItem(this.layoutKey, layout)
    }

    getLayout() {
        const layout = localStorage.getItem(this.layoutKey)
        return layout ? layout : 'sidemenu'
    }

    setTheme(theme: string) {
        localStorage.setItem(this.themeKey, theme)
    }

    getTheme() {
        const theme = localStorage.getItem(this.themeKey)
        return theme ? theme : 'dark'
    }

    setPrimaryColor(primaryColor: string) {
        localStorage.setItem(this.primaryColorKey, primaryColor)
    }

    getPrimaryColor() {
        const primaryColor = localStorage.getItem(this.primaryColorKey)
        return primaryColor ? primaryColor : '#52C41A'
    }

    setContentWidth(contentWidth: string) {
        localStorage.setItem(this.contentWidthKey, contentWidth)
    }

    getContentWidth() {
        const contentWidth = localStorage.getItem(this.contentWidthKey)
        return contentWidth ? contentWidth : 'Fluid'
    }

    setColorWeak(colorWeak: boolean) {
        localStorage.setItem(this.colorWeakKey, String(colorWeak))
    }

    getColorWeak() {
        const colorWeak = localStorage.getItem(this.colorWeakKey)
        return colorWeak ? ( colorWeak === 'true') : false
    }

    setFixedHeader(fixedHeader: boolean) {
        localStorage.setItem(this.fixedHeaderKey, String(fixedHeader))
    }

    getFixedHeader() {
        const fixedHeader = localStorage.getItem(this.fixedHeaderKey)
        return fixedHeader ? ( fixedHeader === 'true') : true
    }

    setFixSiderbar(fixSiderbar: boolean) {
        localStorage.setItem(this.fixSiderbarKey, String(fixSiderbar))
    }

    getFixSiderbar() {
        const fixSiderbar = localStorage.getItem(this.fixSiderbarKey)
        return fixSiderbar ? ( fixSiderbar === 'true') : true
    }

    setAutoHideHeader(autoHideHeader: boolean) {
        localStorage.setItem(this.autoHideHeaderKey, String(autoHideHeader))
    }

    getAutoHideHeader() {
        const autoHideHeader = localStorage.getItem(this.autoHideHeaderKey)
        return autoHideHeader ? ( autoHideHeader === 'true') : false
    }

    setMultiTab(multiTab: boolean) {
        localStorage.setItem(this.multiTabKey, String(multiTab))
    }

    getMultiTab() {
        const multiTab = localStorage.getItem(this.multiTabKey)
        return multiTab ? ( multiTab === 'true') : false
    }

    setAutoLogin(autoLogin: boolean) {
        localStorage.setItem(this.autoLoginKey, String(autoLogin))
    }

    getAutoLogin() {
        const autoLogin = localStorage.getItem(this.autoLoginKey)
        return autoLogin ? ( autoLogin === 'true') : false
    }
}

const AppPreferenceModule = new AppPreference()
export default AppPreferenceModule
