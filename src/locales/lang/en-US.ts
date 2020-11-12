import antdEnUS from 'ant-design-vue/es/locale-provider/en_US'
import momentEU from 'moment/locale/eu'

export default class EnUS {

    private static components = {
        antLocale: antdEnUS,
        momentName: 'eu',
        momentLocale: momentEU
    }

    private static messages = {
        router: {
            'about': 'About'
        },
        company: {
            'name': 'TECHNOLOGY MATTERS'
        }
    }

    static getMessages() {
        return {
            ...this.components,
            ...this.messages
        }
    }

}
