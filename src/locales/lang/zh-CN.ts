import antd from 'ant-design-vue/es/locale-provider/zh_CN'
import momentCN from 'moment/locale/zh-cn'

export default  class ZhCN {

    private static components = {
        antLocale: antd,
        momentName: 'zh-cn',
        momentLocale: momentCN
    }

    private static messages = {
        "address.hint": "请选择地区",
        "navBar.lang": "语言",
        "app.setting.pagestyle": "整体风格",
        "app.setting.pagestyle.dark": "暗色风格",
        "app.setting.pagestyle.light": "亮色风格",
        "app.setting.content-width": "内容区域宽度",
        "app.setting.content-width.fixed": "定宽",
        "app.setting.content-width.fluid": "流式",
        "app.setting.themecolor": "主题色调",
        "app.setting.themecolor.dust": "薄暮",
        "app.setting.themecolor.volcano": "火山",
        "app.setting.themecolor.sunset": "日暮",
        "app.setting.themecolor.cyan": "明青",
        "app.setting.themecolor.green": "极光绿",
        "app.setting.themecolor.daybreak": "拂晓蓝",
        "app.setting.themecolor.geekblue": "极客蓝",
        "app.setting.themecolor.purple": "酱紫",
        "app.setting.navigationmode": "导航模式",
        "app.setting.sidemenu": "侧边菜单",
        "app.setting.topmenu": "顶部菜单",
        "app.setting.fixedheader": "固定顶部",
        "app.setting.fixedsidebar": "固定侧边",
        "app.setting.fixedsidebar.hint": "侧边菜单布局时可配置",
        "app.setting.hideheader": "隐藏顶部",
        "app.setting.hideheader.hint": "固定顶部时可配置",
        "app.setting.othersettings": "其他设置",
        "app.setting.weakmode": "色弱模式",
        "app.setting.multitab": "多页签模式",
        "app.setting.copy": "拷贝设置",
        "app.setting.copyinfo": "拷贝设置到剪切板。",
        "app.setting.production.hint": "拷贝设置仅用于开发环境。",
        "app.setting.changcolor": "正在设置主色调",

        "router.menu.home": "首页",
        "router.menu.home.dashboard": "仪表盘",
        "router.menu.home.analysis": "分析图表",
        "router.menu.product": "商品中心",
        "router.menu.inventory": "库存中心",
        "router.menu.member": "会员中心",
        "router.menu.about": "关于",
        "router.menu.account": "账号中心",
        "router.menu.account.setting": "账号设置",
        "router.menu.account.roles": "角色管理",
        "router.menu.account.manage": "账号管理",
        "router.menu.account.permission": "权限管理",
        "router.menu.system": "系统管理",
        "router.menu.system.application": "应用管理",
        "router.menu.system.module": "模块管理",
        "router.menu.system.permission": "权限管理",
        "router.menu.system.tenant": "租户管理",
        "router.about": '关于',
        "router.account.login": "登录",
        "router.error.401": "401",
        "router.error.402": "402",
        "router.error.403": "403",
        "router.account.register": "注册",
        "router.account.forgot": "忘记密码",

        "company.name": "无所谓科技",

        "about.content": "欢迎",
        "account.layout.desc": "",
        "account.layout.help": "帮助",
        "account.layout.privacy": "隐私",
        "account.layout.conditions": "条款",
        "account.layout.copyright": "版权 @ 2021 无所谓科技有限公司",

        "account.login.title": "运营管理平台",
        "account.login.error": "用户名或者密码错误",
        "account.login.tenant": "公司账号",
        "account.login.tenant.message": "请输入公司账号",
        "account.login.account": "子账号",
        "account.login.account.message": "请输入子账号",
        "account.login.password": "密码",
        "account.login.password.message": "请输入密码",
        "account.login.autologin": "自动登录",
        "account.login.forgot": "忘记密码",
        "account.login.confirm": "确定",
        "account.login.register": "公司注册",
        "account.login.registration": "您的注册",

        "account.forgot.authcode": "邮箱验证",
        "account.forgot.reset": "密码重置",
        "account.forgot.finish": "重置结果",
        "account.forgot.auth.code": "发送验证码",
        "account.forgot.auth.email": "个人账号邮箱",
        "account.forgot.auth.email.required": "请输入个人账号的邮件地址",
        "account.forgot.auth.email.invalid": "输入的邮件地址无效",
        "account.forgot.reset.authcode": "验证码",
        "account.forgot.reset.authcode.required": "请输入验证码",
        "account.forgot.reset.password1": "密码",
        "account.forgot.reset.password2": "确认密码",
        "account.forgot.reset.password.required": "请输入密码",
        "account.forgot.reset.password.max": "请输入少于30个字符",
        "account.forgot.reset.password.min": "请输入大于8个字符",
        "account.forgot.reset.password.mismatch": "两次输入的密码不一致",
        "account.forgot.reset.prev": "上一步",
        "account.forgot.reset.reset": "重置密码",
        "account.forgot.reset.finish": "密码重置成功",

        "account.register.base": "公司基本信息",
        "account.register.license": "公司营业执照",
        "account.register.finish": "完成注册",
        "account.register.base.name": "公司名称",
        "account.register.base.name.required": "请输入公司名称",
        "account.register.base.name.max": "请输入少于100个字符",
        "account.register.base.industry": "所属行业",
        "account.register.base.industry.required": "请选择所属行业",
        "account.register.base.contact": "公司联系人",
        "account.register.base.contact.required": "请输入公司联系人",
        "account.register.base.contact.max": "请输入少于30个字符",
        "account.register.base.email": "公司邮件",
        "account.register.base.email.required": "请输入公司邮件",
        "account.register.base.email.invalid": "请输入有效的邮件地址",
        "account.register.base.email.max": "请输入少于100个字符",
        "account.register.base.phone": "公司电话",
        "account.register.base.phone.required": "请输入公司电话",
        "account.register.base.phone.invalid": "请输入有效的电话",
        "account.register.base.phone.max": "请输入少于20个字符",
        "account.register.base.region": "地区",
        "account.register.base.region.required": "请选择一个地区",
        "account.register.base.address": "详细地址",
        "account.register.base.address.required": "请输入公司详细地址",
        "account.register.base.address.max": "请输入少于200个字符",
        "account.register.base.next": "下一步",
        "account.register.license.logo": "公司标志",
        "account.register.license.logo.upload": "点击上传公司标志",
        "account.register.back": "返回登录",
        "account.register.license.no": "营业执照编号",
        "account.register.license.no.required": "请输入营业执照编号",
        "account.register.license.no.invlaid": "请输入有效的营业执照编号",
        "account.register.license.license": "营业执照",
        "account.register.license.license.upload": "点击或拖动文件上传营业执照副本",
        "account.register.license.license.required": "请上传营业执照",
        "account.register.license.prev": "上一步",
        "account.register.license.next": "提交注册",
        "account.register.finish.title": "您的注册已提交",
        "account.register.finish.subtitle": "我们将在3-4个工作日内将审核结果以及进一步的信息发送到您的注册邮箱。您也可以通过链接-您的注册来查看审核状态。",

        "account.registration.input": "输入基本信息",
        "account.registration.result": "公司注册状态",
        "account.registration.input.query": "查询",
        "account.registration.result.title": "注册状态",
        "account.registration.status": "注册状态",
        "account.registration.status.description": "状态信息",
        "account.registration.status.1": "审核中",
        "account.registration.status.1.message": "您的注册请求正在审批中, 请耐心等待",
        "account.registration.status.2": "无效注册申请",
        "account.registration.status.2.message": "因提供的营业执照无效，您的注册申请被拒绝。",
        "account.registration.status.3": "已通过",
        "account.registration.status.3.message": "您的注册请求已经通过而且您的公司账户可以开始正常使用。",

        "company.industry.ecommerce": "电子商务",
        "company.industry.manufacture": "制造业",
        "company.industry.trade": "商业贸易",

        "main.layout.avatar.account.setting": "账号设置",
        "main.layout.avatar.account.logout": "退出",
        "main.layout.logout.dialog.ok": "确认",
        "main.layout.logout.dialog.cancel": "取消",
        "main.layout.logout.dialog.title": "退出",
        "main.layout.logout.dialog.content": "确认退出登录吗?",

        "error.backtohome": "返回首页",
        "error.401": "抱歉，你无权访问该页面。请联系管理员。",
        "error.404": "抱歉，你访问的页面不存在。",
        "error.500": "抱歉，服务器响应发生错误。请稍后重试。"
    }

    static getMessages() {
        return {
            ...this.components,
            ...this.messages
        }
    }
}

