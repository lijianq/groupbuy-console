import ZhCN from './lang/zh-CN'
import EnUS from './lang/en-US'
import VueI18n from "vue-i18n";

export default class I18N {

    private defaultLang = 'zh-CN'

    private messages = {
        'zh-CN': {
            ...ZhCN.getMessages()
        },
        'en-US': {
            ...EnUS.getMessages()
        }
    }

    public getVueI18N(lang: string) {
        return new VueI18n({
            silentTranslationWarn: true,
            locale: lang,
            fallbackLocale: this.defaultLang,
            messages: this.messages
        })
    }
}
