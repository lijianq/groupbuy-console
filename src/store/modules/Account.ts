import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'

@Module({name: 'account'})
export default class Account extends VuexModule {
    public name = ''
    public roles = []
    public avatar = ''
    public accessToken = ''
    public expireTime = ''

    @MutationAction({mutate: ['name', 'roles', 'avatar', 'accessToken', 'expireTime']})
    async setAccount(name: string, roles: string[], avatar: string, accessToken: string, expireTime: string) {
        return {
            name: name,
            roles: roles,
            avatar: avatar,
            accessToken: accessToken,
            expireTime: expireTime
        }
    }
}
