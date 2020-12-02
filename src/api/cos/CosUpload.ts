
export default class CosUpload {

    public file!: File

    public key!: string

    public targetName?: string

    constructor(file: File, key: string, targetName?: string) {
        this.file = file
        this.key = key
        this.targetName = targetName
    }
}
