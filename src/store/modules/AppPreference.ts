import StorageKeys from '@/config/StorageKeys'
class AppPreference {

    setLanguage(currentLang: string) {
        localStorage.setItem(StorageKeys.currentLangKey, currentLang)
    }

    getLanguage() {
        const currentLang = localStorage.getItem(StorageKeys.currentLangKey)
        return currentLang ? currentLang : 'zh-CN'
    }

    setLayout(layout: string) {
        localStorage.setItem(StorageKeys.layoutKey, layout)
    }

    getLayout() {
        const layout = localStorage.getItem(StorageKeys.layoutKey)
        return layout ? layout : 'topmenu'
    }

    setTheme(theme: string) {
        localStorage.setItem(StorageKeys.themeKey, theme)
    }

    getTheme() {
        const theme = localStorage.getItem(StorageKeys.themeKey)
        return theme ? theme : 'dark'
    }

    setPrimaryColor(primaryColor: string) {
        localStorage.setItem(StorageKeys.primaryColorKey, primaryColor)
    }

    getPrimaryColor() {
        const primaryColor = localStorage.getItem(StorageKeys.primaryColorKey)
        return primaryColor ? primaryColor : '#722ED1'
    }

    setContentWidth(contentWidth: string) {
        localStorage.setItem(StorageKeys.contentWidthKey, contentWidth)
    }

    getContentWidth() {
        const contentWidth = localStorage.getItem(StorageKeys.contentWidthKey)
        return contentWidth ? contentWidth : 'Fluid'
    }

    setColorWeak(colorWeak: boolean) {
        localStorage.setItem(StorageKeys.colorWeakKey, String(colorWeak))
    }

    getColorWeak() {
        const colorWeak = localStorage.getItem(StorageKeys.colorWeakKey)
        return colorWeak ? (colorWeak === 'true') : false
    }

    setFixedHeader(fixedHeader: boolean) {
        localStorage.setItem(StorageKeys.fixedHeaderKey, String(fixedHeader))
    }

    getFixedHeader() {
        const fixedHeader = localStorage.getItem(StorageKeys.fixedHeaderKey)
        return fixedHeader ? (fixedHeader === 'true') : true
    }

    setFixSiderbar(fixSiderbar: boolean) {
        localStorage.setItem(StorageKeys.fixSiderbarKey, String(fixSiderbar))
    }

    getFixSiderbar() {
        const fixSiderbar = localStorage.getItem(StorageKeys.fixSiderbarKey)
        return fixSiderbar ? (fixSiderbar === 'true') : true
    }

    setAutoHideHeader(autoHideHeader: boolean) {
        localStorage.setItem(StorageKeys.autoHideHeaderKey, String(autoHideHeader))
    }

    getAutoHideHeader() {
        const autoHideHeader = localStorage.getItem(StorageKeys.autoHideHeaderKey)
        return autoHideHeader ? (autoHideHeader === 'true') : false
    }

    setMultiTab(multiTab: boolean) {
        localStorage.setItem(StorageKeys.multiTabKey, String(multiTab))
    }

    getMultiTab() {
        const multiTab = localStorage.getItem(StorageKeys.multiTabKey)
        return multiTab ? (multiTab === 'true') : false
    }

    setAutoLogin(autoLogin: boolean) {
        localStorage.setItem(StorageKeys.autoLoginKey, String(autoLogin))
    }

    getAutoLogin() {
        const autoLogin = localStorage.getItem(StorageKeys.autoLoginKey)
        return autoLogin ? (autoLogin === 'true') : false
    }
}

const AppPreferenceModule = new AppPreference()
export default AppPreferenceModule
