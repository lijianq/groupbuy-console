import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({name: 'account'})
export default class Account extends VuexModule {

    public name = ''
    public roles: string[] = []
    public avatar = ''
    public accessToken = ''
    public expireTime = ''

    @Mutation
    public setName(name: string) {
        this.name = name
    }

    @Mutation
    public setAvatar(avatar: string) {
        this.avatar = avatar
    }

    @Mutation
    public setRoles(roles: string[]) {
        this.roles = roles
    }

    @Mutation
    public setAccessToken(accessToken: string) {
        this.accessToken = accessToken
    }

    @Mutation
    public setExpireTime(expireTime: string) {
        this.expireTime = expireTime
    }
}
