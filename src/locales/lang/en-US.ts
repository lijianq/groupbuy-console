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
            about: 'ABOUT',
            account: {
                login: 'LOGIN'
            },
            error: {
                '401': '401',
                '404': '404',
                '500': '500'
            }
        },
        company: {
            name: 'TECHNOLOGY MATTERS'
        },
        about: {
            content: 'Welcome'
        },
        account: {
            layout: {
                title: "Devops Admin Console",
                desc: "",
                help: "Help",
                privacy: "Privacy",
                conditions: "Conditions",
                copyright: "Copyright @ 2021 TECHNOLOGY MATTERS LTD."
            },
            login: {
                error: "Invalid account name or password",
                account: "Account",
                accountMessage: "Please input account name or email",
                password: "Password",
                passwordMessage: "Please input password",
                autologin: "Auto Login",
                forgot: "Forgot Password",
                confirm: "Confirm"
            }
        },
        error: {
            "401": "Sorry, you does not have access to this page. Please contact your administrator.",
            "404": "Sorry, the page was not found",
            "500": "Sorry, server internal error happens. Please try it later."
        }
    }

    static getMessages() {
        return {
            ...this.components,
            ...this.messages
        }
    }

}
