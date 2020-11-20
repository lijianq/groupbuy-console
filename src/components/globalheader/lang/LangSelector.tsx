import {Component, Prop, Vue} from 'vue-property-decorator'
import { AppPreferenceModule } from '@/store'
import { DomUtil } from '@/utils/DomUtil'
import './LangSelector.less'

@Component
export default class LangSelector extends Vue {

    private languages = ['zh-CN', 'en-US']

    private currentLang = AppPreferenceModule.getLanguage()

    private languageLabels: any = {
        'zh-CN': '简体中文',
        'en-US': 'English'
    }

    private languageIcons: any = {
        'zh-CN': '🇨🇳',
        'en-US': '🇺🇸'
    }

    private loadLanguageAsync(lang: string) {
        return new Promise( resolve => {
            if (this.$i18n.locale !== lang) {
                this.$i18n.locale = lang
                DomUtil.setDocumentLang(lang)
            }
            resolve(lang)
        })
    }

    private changeLang(item: any) {
        const lang: string = item.key
        this.currentLang = lang
        AppPreferenceModule.setLanguage(lang)
        this.loadLanguageAsync(lang)
    }

    @Prop({type: String, default: 'ant-pro-drop-down'})
    public prefixCls: string | undefined

    renderLangMenu() {
        return (
            <a-menu class={['menu', 'ant-pro-header-menu']} selectedKeys={[this.currentLang]} onClick={this.changeLang.bind(this)}>
                {this.languages.map(lang => (
                    <a-menu-item key={lang}>
            <span role="img" aria-label={this.languageLabels[lang]}>
              {this.languageIcons[lang]}
            </span>{' '}
                        {this.languageLabels[lang]}
                    </a-menu-item>
                ))}
            </a-menu>
        )
    }

    render() {
        return (
            <a-dropdown overlay={this.renderLangMenu()} placement="bottomRight">
                <span class={this.prefixCls}>
                    <a-icon type="global" title={this.$t('navBar.lang')} />
                </span>
            </a-dropdown>
        )

    }
}
