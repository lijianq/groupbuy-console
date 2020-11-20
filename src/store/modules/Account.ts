class Account {

    private accountKey = "app.current.account"

    getAccount() {
        const account = localStorage.getItem(this.accountKey)
        return account ? JSON.parse(account) : {}
    }

    setAccount(account: any) {
        localStorage.setItem(this.accountKey, JSON.stringify(account))
    }
}

const AccountModule = new Account()
export default AccountModule
