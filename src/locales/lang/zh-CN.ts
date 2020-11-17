import antd from 'ant-design-vue/es/locale-provider/zh_CN'
import momentCN from 'moment/locale/zh-cn'

export default  class ZhCN {

    private static components = {
        antLocale: antd,
        momentName: 'zh-cn',
        momentLocale: momentCN
    }

    private static messages = {
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
        error: {
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

