import antd from 'ant-design-vue/es/locale-provider/zh_CN'
import momentCN from 'moment/locale/zh-cn'

export default class ZhCN {

    private static components = {
        antLocale: antd,
        momentName: 'zh-cn',
        momentLocale: momentCN
    }

    static messages = {
        "yes": "是",
        "no": "否",
        "modal.ok": "确认",
        "modal.cancel": "取消",
        "common.cancel.message": "确认取消修改吗?",
        "common.delete.message": "确认要删除吗?",
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

        // HTML Title
        "router.account.login": "登录",
        "router.error.401": "401",
        "router.error.404": "404",
        "router.error.500": "500",
        "router.account.register": "注册",
        "router.account.forgot": "忘记密码",
        "router.account.status": "公司状态",

        // Navigation
        "router.menu.about": "关于",
        "router.menu.account": "账号中心",
        "router.menu.account.setting": "账号设置",
        "router.menu.system": "系统管理",
        "router.menu.system.route": "路由配置",
        "router.menu.system.company": "公司管理",
        // Actions
        "route.action.show": "显示",
        "route.action.create": "创建",
        "route.action.delete": "删除",
        "route.action.modify": "修改",
        "route.action.query": "查询",
        "route.action.manage": "管理",
        "router.menu.home": "首页",
        "router.menu.home.dashboard": "系统首页",

        "company.name": "无所谓科技",
        "about.content": "欢迎",
        "account.layout.desc": "",
        "account.layout.help": "帮助",
        "account.layout.privacy": "隐私",
        "account.layout.conditions": "条款",
        "account.layout.copyright": "版权 @ 2021 无所谓科技有限公司",

        "account.login.title": "运营管理平台",
        "account.login.company": "公司账号",
        "account.login.company.message": "请输入公司账号",
        "account.login.account": "子账号",
        "account.login.account.message": "请输入子账号",
        "account.login.password": "密码",
        "account.login.password.message": "请输入密码",
        "account.login.autologin": "自动登录",
        "account.login.forgot": "忘记密码",
        "account.login.confirm": "确定",
        "account.login.register": "公司注册",
        "account.login.registration": "公司状态",

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
        "account.register.license.logo.limit": "公司标志图片不能超过1M",
        "account.register.back": "返回登录",
        "account.register.license.no": "营业执照编号",
        "account.register.license.no.required": "请输入营业执照编号",
        "account.register.license.no.invalid": "请输入有效的营业执照编号",
        "account.register.license.license": "营业执照",
        "account.register.license.license.upload": "点击或拖动文件上传营业执照快照",
        "account.register.license.license.limit": "公司营业执照图片不能超过10M",
        "account.register.license.license.required": "请上传营业执照",
        "account.register.license.prev": "上一步",
        "account.register.license.next": "提交注册",
        "account.register.finish.title": "您的注册已提交",
        "account.register.finish.subtitle": "我们将在3-4个工作日内将审核结果以及进一步的信息发送到您的注册邮箱。您也可以通过链接-公司状态来查看审核状态。",

        "account.status.input": "输入基本信息",
        "account.status.result": "公司状态",
        "account.status.result.notfound": "您的公司记录不存在",
        "account.status.input.query": "查询",
        "account.status.result.title": "公司状态",
        "account.status.result.status": "公司状态",
        "account.status.result.status.description": "状态信息",
        "account.company.status.0": "审核中",
        "account.company.status.0.message": "您的公司注册正在审核中，请耐心等待",
        "account.company.status.1": "申请无效",
        "account.company.status.1.message": "公司提供的营业执照不合格，请重新注册",
        "account.company.status.2": "活动状态",
        "account.company.status.2.message": "您的公司账号可用",
        "account.company.status.3": "账号过期",
        "account.company.status.3.message": "您的公司账号已过期",
        "account.company.status.4": "非活动状态",
        "account.company.status.4.message": "您的公司账号处于非活动状态，即将被删除",

        "company.industry.ecommerce": "电子商务",
        "company.industry.manufacture": "制造业",
        "company.industry.trade": "商业贸易",

        "main.layout.avatar.account.setting": "账号设置",
        "main.layout.avatar.account.logout": "退出",
        "main.layout.logout.dialog.content": "确认退出登录吗?",

        "error.backtohome": "返回首页",
        "error.401": "抱歉，你无权访问该页面。请联系管理员。",
        "error.404": "抱歉，你访问的页面不存在。",
        "request.error.406": "抱歉，该记录已经存在。",
        "error.500": "抱歉，服务器响应发生错误。请稍后重试。",

        "request.error.default": "连接到服务器失败，请联系管理员。",
        "request.error.400": "无效请求",
        "request.error.401": "未授权访问",
        "request.error.403": "禁止访问",
        "request.error.404": "无法找到请求地址",
        "request.error.500": "服务器内部错误",
        "system.route.create": "创建路由",
        "system.route.delete": "删除",
        "system.route.edit": "修改",
        "system.route.actions": "操作项",
        "system.route.child": "创建子路由",
        "system.route.name": "路由名称",
        "system.route.display.name": "多语言显示",
        "system.route.type": "路由类型",
        "system.route.action": "操作",
        "system.route.group": "路由组",
        "system.route.item": "路由项",
        "system.route.preset": "预置",
        "system.route.component": "实现组件",
        "system.route.path": "路由路径",
        "system.route.redirect": "重定向路径",
        "system.route.icon": "路由图标",
        "system.route.i18key": "多语言主键",
        "system.route.name.required": "请输入不超过50个字符的名称",
        "system.route.type.required": "请选择类型",
        "system.route.component.required": "请选择组件",
        "system.route.path.required": "请输入不超过50个字符的路径",
        "system.route.redirect.required": "请输入不超过50个字符的路径",
        "system.route.icon.required": "请选择路由图标名称",
        "system.route.i18key.required": "请选择多语言主键",
        "system.route.delete.title": "删除路由配置",
        "system.route.delete.content": "该操作会删除所选路由以及它的子路由, 确认删除吗?",
        "system.route.add": "添加操作",
        "system.route.action.name": "操作名称",
        "system.route.action.name.required": "请输入操作名称",
        "system.route.action.name.i18key": "多语言显示",
        "system.route.save": "保存",
        "system.route.cancel": "取消",

        "home.dashboard.refresh": "刷新",

    }

    static getMessages() {
        return {
            ...this.components,
            ...this.messages
        }
    }
}

