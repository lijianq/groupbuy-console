import antdEnUS from 'ant-design-vue/es/locale/en_US'
import momentEU from 'moment/locale/eu'

export default class EnUS {

    private static components = {
        antLocale: antdEnUS,
        momentName: 'eu',
        momentLocale: momentEU
    }

    static messages = {
        "modal.ok": "Confirm",
        "modal.cancel": "Cancel",      
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

        // HTML Title
        "router.about": 'ABOUT',
        "router.account.login": "LOGIN",
        "router.error.401": "401",
        "router.error.404": "404",
        "router.error.500": "500",
        "router.account.register": "Register",
        "router.account.forgot": "Forgot",
        "router.account.status": "Company Status",

        // Navigation
        "router.menu.about": "About",
        "router.menu.account": "Account Center",
        "router.menu.account.setting": "Settings",
        "router.menu.system": "System Setting",
        "router.menu.system.route": "Route Configuration",
        "router.menu.system.company": "Manage Company",

        "platform.name": "TECH MATTERS",
        "about.content": "Welcome",
        "account.layout.desc": "",
        "account.layout.help": "Help",
        "account.layout.privacy": "Privacy",
        "account.layout.conditions": "Conditions",
        "account.layout.copyright": "Copyright @ 2021 TECHNOLOGY MATTERS LTD.",

        "account.login.title": "Operational Platform",
        "account.login.company": "Company account",
        "account.login.company.message": "Please input company account",
        "account.login.account": "Account",
        "account.login.account.message": "Please input account",
        "account.login.password": "Password",
        "account.login.password.message": "Please input password",
        "account.login.autologin": "Auto Login",
        "account.login.forgot": "Forgot Password",
        "account.login.confirm": "Confirm",
        "account.login.register": "Register Company",
        "account.login.registration": "Company Status",

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

        "company.base": "Company Base Info",
        "company.license": "Company Business License",
        "company.finish": "Finish Registration",
        "company.name": "Name",
        "company.name.required": "Please input company name",
        "company.name.max": "Please input less than 100 characters",
        "company.industry": "Industry",
        "company.industry.required": "Please select industry",
        "company.contact": "Contact",
        "company.contact.required": "Please input company contact",
        "company.contact.max": "Please input less than 30 characters",
        "company.email": "E-mail",
        "company.email.required": "Please input company e-mail",
        "company.email.max": "Please input less than 100 characters",
        "company.email.invalid": "Please input valid e-mail",
        "company.phone": "Phone",
        "company.phone.required": "Please input company phone",
        "company.phone.max": "Please input less than 20 characters",
        "company.phone.invalid": "Please input valid phone",
        "company.region": "Region",
        "company.region.required": "Please select a region",
        "company.address": "Address",
        "company.address.required": "Please input company address",
        "company.address.max": "Please input less than 200 characters",
        "company.next": "Next Step",
        "company.license.logo": "Logo",
        "company.license.logo.upload": "Click to upload Logo",
        "company.license.logo.limit": "The size of logo picture can not exceed 1M",
        "company.back": "Back to Login",
        "company.license.no": "License No",
        "company.license.no.required": "Please input license no",
        "company.license.no.invalid": "Please input valid license no",
        "company.license.license": "License",
        "company.license.license.upload": "Click or drag file to upload business license snapshot",
        "company.license.license.limit": "The size of license picture can not exceeds 10M",
        "company.license.license.required": "Please upload your business license",
        "company.license.prev": "Prev Step",
        "company.license.next": "Submit Registration",
        "company.finish.title": "Your registration has been submitted.",
        "company.finish.subtitle": "We will send the approval to your e-mail in 3 - 4 work days with further instruction. Also you can check the status via Company Status link.",

        "account.status.input": "Input required information",
        "account.status.result": "The status of your company",
        "account.status.result.notfound": "Your company record is not found",
        "account.status.input.query": "Query",
        "account.status.result.title": "Company Status",
        "account.status.result.status": "Company Status",
        "account.status.result.status.description": "Status Information",
        "account.company.status.0": "New",
        "account.company.status.0.message":"Your company registration is under approval. Please wait.",
        "account.company.status.1": "Invalid",
        "account.company.status.1.message": "Your company has invalid business license provided.",
        "account.company.status.2": "Active",
        "account.company.status.2.message": "Your company account is active for use.",
        "account.company.status.3": "Expired",
        "account.company.status.3.message": "Your company account was expired.",
        "account.company.status.4": "Inactive",
        "account.company.status.4.message": "Your company account is inactive and will be deleted soon.",

        "company.industry.ecommerce": "E-Commerce",
        "company.industry.manufacture": "Manufacture",
        "company.industry.trade": "Trade",

        "main.layout.avatar.account.setting": "Setting",
        "main.layout.avatar.account.logout": "Logout",
        "main.layout.logout.dialog.content": "Do you confirm to logout?",
        "error.backtohome": "Back to Home",
        "error.401": "Sorry, you does not have access to this page. Please contact your administrator.",
        "error.404": "Sorry, the page was not found",
        "error.500": "Sorry, server internal error happens. Please try it later.",

        "request.error.default": "Failed to setup connection, please contact admin.",
        "request.error.400": "Bad Request",
        "request.error.401": "Unauthorized",
        "request.error.403": "Forbidden",
        "request.error.404": "Service is not found",
        "request.error.406": "Duplicate record",
        "request.error.500": "Server internal error"
    }

    static getMessages() {
        return {
            ...this.components,
            ...this.messages
        }
    }

}
