import antd from 'ant-design-vue/es/locale-provider/zh_CN'
import momentCN from 'moment/locale/zh-cn'

export default  class ZhCN {

    private static components = {
        antLocale: antd,
        momentName: 'zh-cn',
        momentLocale: momentCN
    }

    private static messages = {
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
        "app.setting.themecolor.daybreak": "拂晓蓝（默认）",
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
        router: {
            about: '关于',
            account: {
                login: '登录'
            },
            error: {
                '401': '401',
                '404': '404',
                '500': '500'
            }
        },
        company: {
            name: '无所谓科技'
        },
        about: {
            content: '欢迎'
        },
        account: {
            layout: {
                title: "运维管理平台",
                desc: "",
                help: "帮助",
                privacy: "隐私",
                conditions: "条款",
                copyright: "版权 @ 2021 无所谓科技有限公司"
            },
            login: {
                error: "用户名或者密码错误",
                account: "账号",
                accountMessage: "请输入帐户名或邮箱地址",
                password: "密码",
                passwordMessage: "请输入密码",
                autologin: "自动登录",
                forgot: "忘记密码",
                confirm: "确定"
            }
        },
        main: {
            layout: {
                avatar: {
                    account: {
                        center: "账号中心",
                        setting: "账号设置",
                        logout: "退出"
                    }
                },
                logout: {
                    dialog: {
                        ok: "确认",
                        cancel: "取消",
                        title: "退出",
                        content: "确认退出登录吗?"
                    }
                }
            }
        },
        error: {
            "backtohome": "返回首页",
            "401": "抱歉，你无权访问该页面。请联系管理员。",
            "404": "抱歉，你访问的页面不存在。",
            "500": "抱歉，服务器响应发生错误。请稍后重试。"
        }
    }

    static getMessages() {
        return {
            ...this.components,
            ...this.messages
        }
    }
}

