export class DefaultSetting {
    static menu = {
        locale: true
    }
    static title = 'common.platform.company.name'
    static pwa = true
    static production = process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true'

}
