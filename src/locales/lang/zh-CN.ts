import antdZhCN from 'ant-design-vue/es/locale/zh_CN'
import momentCN from 'moment/locale/zh-cn'

export default class ZhCN {

    private static components = {
        antLocale: antdZhCN,
        momentName: 'zh-cn',
        momentLocale: momentCN
    }

    static messages = {
        // app setting
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

        // API Resource
        "api.resource": "资源",

        // HTML Title
        "router.account.login": "登录",
        "router.error.401": "401",
        "router.error.404": "404",
        "router.error.500": "500",
        "router.account.register": "注册",
        "router.account.forgot": "忘记密码",
        "router.account.status": "公司状态",

        // Menu
        "router.menu.about": "关于",
        "router.menu.personal": "个人中心",
        "router.menu.personal.setting": "账号设置",
        "router.menu.system": "系统管理",
        "router.menu.system.route": "路由配置",
        "router.menu.system.company": "公司管理",
        "router.menu.home": "首页",
        "router.menu.home.dashboard": "系统首页",
        "router.menu.company": "公司设置",
        "router.menu.company.role": "角色管理",
        "router.menu.company.account": "账号管理",

        // Page Action Type
        "route.preset.action.show": "显示",
        "route.action.all": "全部",
        "route.action.add": "添加",
        "route.action.create": "创建",
        "route.action.delete": "删除",
        "route.action.edit": "编辑",
        "route.action.modify": "修改",
        "route.action.query": "查询",
        "route.action.manage": "管理",
        "route.action.detail": "详情",
        "route.action.set": "设置",
        "route.action.reset": "重置",
        "route.action.reject": "拒绝",
        "route.action.approve": "同意",
        "route.action.examine": "审批",
        "route.action.permission": "权限",
        "route.action.complete": "完成",
        "route.action.save": "保存",
        "route.action.view": "查看",

        // Common Label
        "common.yes": "是",
        "common.no": "否",
        "common.ok": "确认",
        "common.close": "关闭",
        "common.cancel": "取消",
        "common.confirm": "确定",
        "common.cancel.message": "确认取消吗?",
        "common.delete.message": "确认要删除吗?",
        "common.lang": "语言",
        "common.platform.company.name": "无所谓科技",
        "common.platform.name": "运营管理平台",
        "common.welcome": "欢迎",
        "common.help": "帮助",
        "common.privacy": "隐私",
        "common.conditions": "条款",
        "common.copyright": "版权 @ 2021 无所谓科技有限公司",
        "common.email.invalid": "输入的邮件地址无效",
        "common.prev": "上一步",
        "common.next": "下一步",
        "common.back.login": "返回登录",
        "common.back.home": "返回首页",
        "common.save": "保存",
        "common.refresh": "刷新",
        "common.input.search.hint": "请输入关键字查找",
        "common.input.email.hint": "请输入邮件地址",
        "common.select.search.hint": "请选择",
        "common.select.address.hint": "请选择地区",
        "common.reset": "重置",
        "common.more": "更多",
        "common.email": "邮箱",
        "common.phone": "电话",
        "common.phone.invalid": "输入的电话号码无效",
        "common.phone.max": "电话号码超过20个字符",
        "common.email.max": "邮件地址超过100个字符",
        "common.image.select": "选择图片",
        "permission.set": "设置权限",

        // common error
        "error.400": "无效请求",
        "error.401": "未授权访问",
        "error.403": "禁止访问",
        "error.404": "抱歉，你访问的资源不存在",
        "error.406": "抱歉，该记录已经存在",
        "error.500": "服务器内部错误",
        "error.default": "连接到服务器失败，请联系管理员",

        // account
        "account.company": "公司账号",
        "account.company.message": "请输入公司账号",
        "account.sub.account": "子账号",
        "account.sub.account.message": "请输入子账号",
        "account.password": "密码",
        "account.password.title": "账号密码",
        "account.password.description": "修改账号密码",
        "account.password.message": "请输入密码",
        "account.password.confirm": "确认密码",
        "account.password.mismatch": "两次输入的密码不一致",
        "account.password.max": "请输入少于30个字符",
        "account.password.min": "请输入大于8个字符",
        "account.password.old": "旧密码",
        "account.password.modify": "修改密码",
        "account.autologin": "自动登录",
        "account.forgot": "忘记密码",
        "account.register": "公司注册",
        "account.registration": "公司状态",
        "account.email.auth": "邮箱验证",
        "account.reset": "密码重置",
        "account.finish": "重置结果",
        "account.auth.code": "验证码",
        "account.auth.code.send": "发送验证码",
        "account.auth.code.required": "请输入验证码",
        "account.auth.code.incorrect": "验证码不正确",
        "account.auth.code.sent": "已发送验证码到您的邮箱, 20分钟内有效",
        "account.auth.email": "子账号邮箱",
        "account.auth.email.required": "请输入个人账号的邮件地址",
        "account.reset.success": "密码重置成功",
        "account.reset.failure": "密码重置失败",
        "account.setting": "账号设置",
        "account.logout": "退出",
        "account.logout.confirm.message": "确认退出登录吗?",
        "account.name": "账号名称",
        "account.name.required": "请输入账号名称",
        "account.full.name": "用户全名",
        "account.full.name.required": "请输入不超过50个字符的全名",
        "account.email": "账号邮箱",
        "account.email.modify": "修改账号邮箱",
        "account.email.description": "修改账户已绑定的邮箱",
        "account.phone": "联系电话",
        "account.status": "账号状态",
        "account.status.required": "请选择账号状态",
        "account.status.new": "新建",
        "account.status.active": "正常",
        "account.status.inactive": "失效",
        "account.id": "账号标识",
        "account.role": "角色",
        "account.add": "添加账号",
        "account.delete.title": "删除账号",
        "account.delete.content": "确认要删除所选账号吗?",
        "acount.role.set": "设置角色",
        "account.preset.admin": "预置管理账号",
        "account.basic.setting": "基本设置",
        "account.security.setting": "安全设置",
        "account.avatar.modify": "修改头像",

        // company
        "company.industry.ecommerce": "电子商务",
        "company.industry.manufacture": "制造业",
        "company.industry.trade": "商业贸易",
        "company.base": "公司基本信息",
        "company.id": "公司编号",
        "company.license": "公司营业执照",
        "company.finish": "完成注册",
        "company.name": "公司名称",
        "company.name.required": "请输入公司名称",
        "company.name.max": "请输入少于100个字符",
        "company.industry": "所属行业",
        "company.industry.required": "请选择所属行业",
        "company.contact": "公司联系人",
        "company.contact.required": "请输入公司联系人",
        "company.contact.max": "请输入少于30个字符",
        "company.email": "公司邮件",
        "company.email.required": "请输入公司邮件",
        "company.phone": "公司电话",
        "company.phone.required": "请输入公司电话",
        "company.region": "所属地区",
        "company.region.required": "请选择一个地区",
        "company.address": "公司地址",
        "company.address.required": "请输入公司地址",
        "company.address.max": "请输入少于200个字符",
        "company.license.logo": "公司标志",
        "company.license.logo.upload": "点击上传公司标志",
        "company.license.logo.limit": "公司标志图片不能超过1M",
        "company.license.no": "营业执照编号",
        "company.license.no.required": "请输入营业执照编号",
        "company.license.no.invalid": "请输入有效的营业执照编号",
        "company.license.license": "营业执照",
        "company.license.upload": "点击或拖动文件上传营业执照快照",
        "company.license.limit": "公司营业执照图片不能超过10M",
        "company.license.required": "请上传营业执照",
        "company.license.next": "提交注册",
        "company.finish.title": "您的注册已提交",
        "company.finish.subtitle": "我们将在3-4个工作日内将审核结果以及进一步的信息发送到您的注册邮箱。您也可以通过链接-公司状态来查看审核状态。",
        "company.base.input": "输入基本信息",
        "company.status": "公司状态",
        "company.status.description": "状态信息",
        "company.notfound": "您的公司记录不存在",
        "company.expired.date": "过期日期",
        "company.status.current": "当前状态",
        "company.status.new": "等待审批",
        "company.status.invalid": "无效",
        "company.status.active": "正常",
        "company.status.expired": "过期",
        "company.status.inactive": "失效",
        "company.delete.title": "删除公司",
        "company.delete.content": "确认要删除所选公司吗?",

        // System Route

        "system.route.create": "创建路由",
        "system.route.actions": "操作项",
        "system.route.child": "创建子路由",
        "system.route.id": "路由编号",
        "system.route.parent.id": "父路由编号",
        "system.route.name": "路由名称",
        "system.route.type": "路由类型",
        "system.route.group": "路由组",
        "system.route.item": "路由项",
        "system.route.preset": "预置",
        "system.route.component": "实现组件",
        "system.route.path": "路由路径",
        "system.route.redirect": "重定向路径",
        "system.route.icon": "路由图标",
        "system.route.name.required": "请输入不超过50个字符的名称",
        "system.route.type.required": "请选择类型",
        "system.route.component.required": "请选择组件",
        "system.route.path.required": "请输入不超过50个字符的路径",
        "system.route.redirect.required": "请输入不超过50个字符的路径",
        "system.route.icon.required": "请选择路由图标名称",
        "system.route.action.delete.title": "删除路由配置",
        "system.route.action.delete.content": "该操作会删除所选路由以及它的子路由, 确认删除吗?",
        "system.route.add": "添加操作",
        "system.route.action.type": "操作类型",
        "system.route.action.type.required": "请选择操作类型",
        "system.route.action.resource": "关联资源",

        // role
        "role.name": "角色名称",
        "role.name.required": "请输入不多于30个字符的名称",
        "role.add": "添加角色",
        "role.id": "角色编号",
        "role.delete.title": "删除角色",
        "role.delete.content": "确认要删除所选角色吗?",
    }

    static getMessages() {
        return {
            ...this.components,
            ...this.messages
        }
    }
}

