import antdEnUS from 'ant-design-vue/es/locale-provider/en_US'
import momentEU from 'moment/locale/eu'

export default class EnUS {

    private static components = {
        antLocale: antdEnUS,
        momentName: 'eu',
        momentLocale: momentEU
    }

    private static messages = {
        "app.setting.pagestyle": "Page style",
        "app.setting.pagestyle.dark": "Dark",
        "app.setting.pagestyle.light": "Light",
        "app.setting.content-width": "Content Width",
        "app.setting.content-width.fixed": "Fixed",
        "app.setting.content-width.fluid": "Fluid",
        "app.setting.themecolor": "Theme Color",
        "app.setting.themecolor.dust": "Dust Red",
        "app.setting.themecolor.volcano": "Volcano",
        "app.setting.themecolor.sunset": "Sunset Orange",
        "app.setting.themecolor.cyan": "Cyan",
        "app.setting.themecolor.green": "Polar Green",
        "app.setting.themecolor.daybreak": "Daybreak Blue (default)",
        "app.setting.themecolor.geekblue": "Geek Glue",
        "app.setting.themecolor.purple": "Golden Purple",
        "app.setting.navigationmode": "Navigation Mode",
        "app.setting.sidemenu": "Side Menu Layout",
        "app.setting.topmenu": "Top Menu Layout",
        "app.setting.fixedheader": "Fixed Header",
        "app.setting.fixedsidebar": "Fixed Sidebar",
        "app.setting.fixedsidebar.hint": "Works on Side Menu Layout",
        "app.setting.hideheader": "Hidden Header",
        "app.setting.hideheader.hint": "Works when Hidden Header is enabled",
        "app.setting.othersettings": "Other Settings",
        "app.setting.weakmode": "Weak Mode",
        "app.setting.multitab": "Multi Tab Mode",
        "app.setting.copy": "Copy Setting",
        "app.setting.copyinfo": "Copied setting to clipboard.",
        "app.setting.production.hint": "Copy setting works only in development environment",
        "app.setting.changcolor": "Setting new theme color",
        "router.menu.root": "Home",
        "router.menu.dashboard": "Dashboard",
        "router.menu.dashboard.workspace": "Workspace",
        "router.menu.dashboard.analysis": "Analysis",
        "router.menu.product": "Commodity Center",
        "router.menu.inventory": "Inventory Center",
        "router.menu.member": "Member Center",
        "router.menu.about": "About",
        "router.menu.account": "Account Center",
        "router.menu.account.setting": "Settings",
        "router.menu.account.roles": "Roles",
        "router.menu.account.manage": "Accounts",
        "router.menu.account.permission": "Permissions",
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
            name: 'TECH MATTERS'
        },
        about: {
            content: 'Welcome'
        },
        account: {
            layout: {
                title: "Devops Platform",
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
        main: {
            layout: {
                avatar: {
                    account: {
                        center: "Account",
                        setting: "Setting",
                        logout: "Logout"
                    }
                },
                logout: {
                    dialog: {
                        ok: "Confirm",
                        cancel: "Cancel",
                        title: "Logout",
                        content: "Do you confirm to logout?"
                    }
                }
            }
        },
        error: {
            "backtohome": "Back to Home",
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
