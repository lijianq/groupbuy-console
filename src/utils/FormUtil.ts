import StorageKeys from "@/config/StorageKeys"

export class FormUtil {
    static cleanForms() {
        sessionStorage.removeItem(StorageKeys.registerBaseKey)
    }
}
