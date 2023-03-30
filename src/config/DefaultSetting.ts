export class DefaultSetting {
    static menu = {
        locale: true
    }
    static title = 'platform.brand'
    static pwa = true
    static production = process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true'

}
