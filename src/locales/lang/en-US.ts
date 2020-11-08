import antdEnUS from 'ant-design-vue/es/locale-provider/en_US'
import momentEU from 'moment/locale/eu'

const components = {
    antLocale: antdEnUS,
    momentName: 'eu',
    momentLocale: momentEU
}

const locale = {

    router: {
        'about': 'About'
    },
    company: {
        'name': 'TECHNOLOGY MATTERS'
    }
}

export default {
    ...components,
    ...locale
}
