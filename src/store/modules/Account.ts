import AppPreferenceModule from '@/store/modules/AppPreference'

class Account {

    private accountKey = "app.current.account"

    getAccount() {
        let account: string | null
        if ( AppPreferenceModule.getAutoLogin()) {
            account = localStorage.getItem(this.accountKey)
        } else {
            account = sessionStorage.getItem(this.accountKey)
        }
        return account ? JSON.parse(account) : {}
    }

    setAccount(account: any) {
        if ( AppPreferenceModule.getAutoLogin()) {
            localStorage.setItem(this.accountKey, JSON.stringify(account))
        } else {
            sessionStorage.setItem(this.accountKey, JSON.stringify(account))
        }
    }
}

const AccountModule = new Account()
export default AccountModule
