import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { AccountModule } from '@/store'
import i18n from "@/locales"

export default class Request {

    private instance: AxiosInstance
    private static defaultConfig: AxiosRequestConfig = {
        baseURL: process.env.VUE_APP_API_BASE_URL,
        timeout: 6000,
        headers: {
            "content-type": "application/json;charset=UTF-8"
        }
    }

    private processRequest(config: AxiosRequestConfig) {
        config.headers['Accept-Language'] = i18n.locale
        const accessToken = AccountModule.getAccount().accessToken
        if (typeof accessToken !== 'undefined' && accessToken.trim().length > 0) {
            config.headers['x-platform-service-token'] = accessToken
        }
        return config;
    }

    private processResponse(response: any) {
        return response
    }

    private processError(error: any) {
        if (error && error.response) {
            const message = error.response.data.message
            switch (error.response.status) {
                case 400: {
                    if (message) {
                        error.message = message;
                    } else {
                        error.message = i18n.t('error.400');
                    }
                    break;
                }
                case 401: {
                    if (message) {
                        error.message = message;
                    } else {
                        error.message = i18n.t("error.401");
                    }
                    break;
                }
                case 403: {
                    if (error.response.data.authStatus === 3) {
                        // refresh token
                        const params = { refreshToken: AccountModule.getAccount().refreshToken }
                        const config = error.config
                        const requester = axios.create(error.config)
                        return requester.post('/platform/refresh', params).then(res => {
                            const account = AccountModule.getAccount();
                            account.accessToken = res.data.accessToken
                            account.expiredTime = res.data.expiredTime
                            AccountModule.setAccount(account)
                            config.headers['x-platform-service-token'] = account.accessToken
                            return requester.request(config)
                        }).catch(() => {
                            AccountModule.setAccount({})
                            window.location.href = '/'
                        })
                    } else {
                        if (message) {
                            error.message = message;
                        } else {
                            error.message = i18n.t('error.403');
                        }
                    }
                    break;
                }
                case 404: error.message = i18n.t('error.404'); break;
                case 406: error.message = i18n.t('error.406'); break;
                case 500: {
                    if (message) {
                        error.message = message;
                    } else {
                        error.message = i18n.t('error.500');
                    }
                    break;
                }
                default: error.message = i18n.t('error.default');
            }
        } else {
            error.message = i18n.t('error.default');
        }

        return Promise.reject(error)
    }

    private constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config)
        this.instance.interceptors.request.use(this.processRequest)
        this.instance.interceptors.response.use(this.processResponse, this.processError)
    }

    public static getDefaultInstance() {
        return new Request(this.defaultConfig);
    }

    public static getInstance(config: AxiosRequestConfig) {
        return new Request(config);
    }

    public getUri(config?: AxiosRequestConfig): string {
        return this.instance.getUri(config)
    }

    public request<T, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
        return this.instance.request(config);
    }

    public get<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.instance.get(url, config);
    }

    public delete<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.instance.delete(url, config);
    }

    public head<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.instance.head(url, config);
    }

    public post<T, R = AxiosResponse<T>>(url: string, data?: string, config?: AxiosRequestConfig): Promise<R> {
        return this.instance.post(url, data, config);
    }

    public put<T, R = AxiosResponse<T>>(url: string, data?: string, config?: AxiosRequestConfig): Promise<R> {
        return this.instance.put(url, data, config);
    }

    public patch<T, R = AxiosResponse<T>>(url: string, data?: string, config?: AxiosRequestConfig): Promise<R> {
        return this.instance.patch(url, data, config);
    }
}
