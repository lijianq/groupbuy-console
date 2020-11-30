import antdEnUS from 'ant-design-vue/es/locale-provider/en_US'
import momentEU from 'moment/locale/eu'

export default class EnUS {

    private static components = {
        antLocale: antdEnUS,
        momentName: 'eu',
        momentLocale: momentEU
    }

    private static messages = {
        "address.hint": "Please select region",
        "navBar.lang": "Lang",
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
        "app.setting.themecolor.daybreak": "Daybreak Blue",
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

        "router.menu.home": "Home",
        "router.menu.home.dashboard": "Dashboard",
        "router.menu.home.analysis": "Analysis",
        "router.menu.product": "Commodity Center",
        "router.menu.inventory": "Inventory Center",
        "router.menu.member": "Member Center",
        "router.menu.about": "About",
        "router.menu.account": "Account Center",
        "router.menu.account.setting": "Settings",
        "router.menu.account.roles": "Roles",
        "router.menu.account.manage": "Accounts",
        "router.menu.account.list": "Account List",
        "router.menu.account.modify": "Manage Account",
        "router.menu.account.permission": "Permissions",
        "router.menu.system": "System Setting",
        "router.menu.system.application": "System Application",
        "router.menu.system.module": "System Module",
        "router.menu.system.permission": "System Permission",
        "router.menu.system.tenant": "System Tenant",
        "router.about": 'ABOUT',
        "router.account.login": "LOGIN",
        "router.error.401": "401",
        "router.error.402": "402",
        "router.error.403": "403",
        "router.account.register": "Register",
        "router.account.forgot": "Forgot",

        "company.name": "TECH MATTERS",

        "about.content": "Welcome",
        "account.layout.desc": "",
        "account.layout.help": "Help",
        "account.layout.privacy": "Privacy",
        "account.layout.conditions": "Conditions",
        "account.layout.copyright": "Copyright @ 2021 TECHNOLOGY MATTERS LTD.",

        "account.login.title": "Operational Platform",
        "account.login.error": "Invalid account name or password",
        "account.login.tenant": "Company account",
        "account.login.tenant.message": "Please input company account",
        "account.login.account": "Account",
        "account.login.account.message": "Please input account",
        "account.login.password": "Password",
        "account.login.password.message": "Please input password",
        "account.login.autologin": "Auto Login",
        "account.login.forgot": "Forgot Password",
        "account.login.confirm": "Confirm",
        "account.login.register": "Register Company",
        "account.login.registration": "Your Registration",

        "account.forgot.authcode": "Verify Email",
        "account.forgot.reset": "Reset Password",
        "account.forgot.finish": "Reset Finish",
        "account.forgot.auth.code": "Send Auth Code",
        "account.forgot.auth.email": "Account Email",
        "account.forgot.auth.email.required": "Please input your account email",
        "account.forgot.auth.email.invalid": "Please input a valid email",
        "account.forgot.reset.authcode": "Auth Code",
        "account.forgot.reset.authcode.required": "Please input auth code",
        "account.forgot.reset.password1": "Password",
        "account.forgot.reset.password2": "Confirm",
        "account.forgot.reset.password.required": "Please input password",
        "account.forgot.reset.password.max": "Please input less than 30 characters",
        "account.forgot.reset.password.min": "Please input more than 8 characters",
        "account.forgot.reset.password.mismatch": "The input passwords are not same",
        "account.forgot.reset.prev": "Prev Step",
        "account.forgot.reset.reset": "Reset Password",
        "account.forgot.reset.finish": "Successfully to reset password",

        "account.register.base": "Company Base Info",
        "account.register.license": "Company Business License",
        "account.register.finish": "Finish Registration",
        "account.register.base.name": "Name",
        "account.register.base.name.required": "Please input company name",
        "account.register.base.name.max": "Please input less than 100 characters",
        "account.register.base.industry": "Industry",
        "account.register.base.industry.required": "Please select industry",
        "account.register.base.contact": "Contact",
        "account.register.base.contact.required": "Please input company contact",
        "account.register.base.contact.max": "Please input less than 30 characters",
        "account.register.base.email": "E-mail",
        "account.register.base.email.required": "Please input company e-mail",
        "account.register.base.email.max": "Please input less than 100 characters",
        "account.register.base.email.invalid": "Please input valid e-mail",
        "account.register.base.phone": "Phone",
        "account.register.base.phone.required": "Please input company phone",
        "account.register.base.phone.max": "Please input less than 20 characters",
        "account.register.base.phone.invalid": "Please input valid phone",
        "account.register.base.region": "Region",
        "account.register.base.region.required": "Please select a region",
        "account.register.base.address": "Address",
        "account.register.base.address.required": "Please input company address",
        "account.register.base.address.max": "Please input less than 200 characters",
        "account.register.base.next": "Next Step",
        "account.register.license.logo": "Logo",
        "account.register.license.logo.upload": "Click to upload Logo",
        "account.register.back": "Back to Login",
        "account.register.license.no": "License No",
        "account.register.license.no.required": "Please input license no",
        "account.register.license.no.invalid": "Please input valid license no",
        "account.register.license.license": "License",
        "account.register.license.license.upload": "Click or drag file to upload business license",
        "account.register.license.license.required": "Please upload your business license",
        "account.register.license.prev": "Prev Step",
        "account.register.license.next": "Submit Registration",
        "account.register.finish.title": "Your registration has been submitted.",
        "account.register.finish.subtitle": "We will send the approval to your e-mail in 3 - 4 work days with further instruction. Also you can check the status via your registration link.",

        "account.registration.input": "Input required information",
        "account.registration.result": "The status of your registration",
        "account.registration.input.query": "Query",
        "account.registration.result.title": "Registration Status",
        "account.registration.status": "Registration Status",
        "account.registration.status.description": "Status Information",
        "account.registration.status.1": "In process",
        "account.registration.status.1.message": "Your registration request is in process. Please give us more time.",
        "account.registration.status.2": "Invalid",
        "account.registration.status.2.message": "Your registration failed due to invalid business license provided.",
        "account.registration.status.3": "Approved",
        "account.registration.status.3.message": "Your registration request has been approved and the company account is active.",

        "company.industry.ecommerce": "E-Commerce",
        "company.industry.manufacture": "Manufacture",
        "company.industry.trade": "Trade",

        "main.layout.avatar.account.setting": "Setting",
        "main.layout.avatar.account.logout": "Logout",
        "main.layout.logout.dialog.ok": "Confirm",
        "main.layout.logout.dialog.cancel": "Cancel",
        "main.layout.logout.dialog.title": "Logout",
        "main.layout.logout.dialog.content": "Do you confirm to logout?",
        "error.backtohome": "Back to Home",
        "error.401": "Sorry, you does not have access to this page. Please contact your administrator.",
        "error.404": "Sorry, the page was not found",
        "error.500": "Sorry, server internal error happens. Please try it later.",

        "request.error.default": "Failed to setup connection, please contact admin.",
        "request.error.400": "Bad Request (400). ",
        "request.error.401": "Unauthorized (401).",
        "request.error.404": "Service is not found (404).",
        "request.error.500": "Server internal error (500)."
    }

    static getMessages() {
        return {
            ...this.components,
            ...this.messages
        }
    }

}
