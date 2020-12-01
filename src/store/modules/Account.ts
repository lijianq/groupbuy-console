import AppPreferenceModule from '@/store/modules/AppPreference'
import StorageKeys from "@/config/StorageKeys"

class Account {



    getAccount() {
        let account: string | null
        if ( AppPreferenceModule.getAutoLogin()) {
            account = localStorage.getItem(StorageKeys.accountKey)
        } else {
            account = sessionStorage.getItem(StorageKeys.accountKey)
        }
        return account ? JSON.parse(account) : {}
    }

    setAccount(account: any) {
        if ( AppPreferenceModule.getAutoLogin()) {
            localStorage.setItem(StorageKeys.accountKey, JSON.stringify(account))
        } else {
            sessionStorage.setItem(StorageKeys.accountKey, JSON.stringify(account))
        }
    }
}

const AccountModule = new Account()
export default AccountModule
