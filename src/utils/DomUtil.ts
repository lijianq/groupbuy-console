import { DefaultSetting } from '@/config'

export class DomUtil {

    static domTitle: string = DefaultSetting.title

    static setDocumentLang(lang: string) {
        const element = document.querySelector('html')
        if (element != null) {
            element.setAttribute('lang', lang)
        }
    }

    static setDocumentTitle(title: string) {
        document.title = title
        const ua = navigator.userAgent
        // eslint-disable-next-line
        const regex = /\bMicroMessenger\/([\d\.]+)/
        if (regex.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
            const i = document.createElement('iframe')
            i.src = '/favicon.ico'
            i.style.display = 'none'
            i.onload = function () {
                setTimeout(function () {
                    i.remove()
                }, 9)
            }
            document.body.appendChild(i)
        }
    }
}
