<template>
  <div>
    <a-form :form="form" id="licenseForm" style="max-width: 500px; margin: 40px auto 0;">

      <a-form-item
          :label="$t('account.register.license.logo')"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
      >
        <a-upload
            :before-upload="beforeUpload"
            accept="image/*"
            id="companyLogo"
            :multiple="false"
            :file-list="logoFileList"
            @change="handleLogoFileChange"
        >
          <a-button>
            <a-icon type="upload"/>
            {{ $t('account.register.license.logo.upload') }}
          </a-button>
        </a-upload>
      </a-form-item>

      <a-form-item
          :label="$t('account.register.license.no')"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
      >
        <a-input
            v-decorator="['companyLicenseNo', {rules: [{required: true, message: $t('account.register.license.no.required')}, {pattern: /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/, message:$t('account.register.license.no.invalid')}]}]"/>
      </a-form-item>

      <a-form-item
          :label="$t('account.register.license.license')"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
      >
        <a-upload-dragger
            :before-upload="beforeUpload"
            v-decorator="['companyLicense', {getValueFromEvent: this.checkFile, rules: [{required: true, message: $t('account.register.license.license.required')}]}]"
            :multiple="false"
            accept="image/*"
            :file-list="licenseFileList"
            @change="handleLicenseFileChange"
        >
          <p class="ant-upload-drag-icon">
            <a-icon type="copy" />
          </p>
          <p class="ant-upload-text">
            {{ $t('account.register.license.license.upload') }}
          </p>
        </a-upload-dragger>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" class="in-step-button" @click="prevStep">{{
            $t('account.register.license.prev')
          }}
        </a-button>
        <a-button :loading="loading" type="primary" class="submit-step-button" @click="nextStep">{{
            $t('account.register.license.next')
          }}
        </a-button>
        <a-button type="primary" class="in-step-button" @click="backToLogin">{{
            $t('account.register.back')
          }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import {WrappedFormUtils} from 'ant-design-vue/types/form/form'
import {RouterConfiguration} from '@/config'
import cosAPI from "@/api/cos/CosAPI"
import CosUpload from "@/api/cos/CosUpload"
import registerAPI from "@/api/register/RegisterAPI"

@Component
export default class  RegisterLicense extends Vue {

    labelCol = { lg: { span: 5 }, sm: { span: 5 } }
    wrapperCol = { lg: { span: 19 }, sm: { span: 19 } }
    form!: WrappedFormUtils
    loading = false
    licenseFileList: any[] = []
    logoFileList: any[] = []

    @Prop({type: Object, default: null})
    baseFormData: any | null

    created() {
        this.form = this.$form.createForm(this, {name: 'licenseForm'})
    }

    closeLoading() {
        setTimeout(() => {
            this.loading = false
        }, 600)
    }

    nextStep () {
        const { form: { validateFields } } = this
        this.loading = true

        validateFields((err, values) => {
            if (!err) {
                const { baseFormData } = this
                if (baseFormData) {
                    const { baseFormData } = this
                    baseFormData.companyLicenseNo = values.companyLicenseNo
                    const uploads: CosUpload[] = []
                    if (this.logoFileList.length > 0) {
                        uploads.push(new CosUpload(this.logoFileList[0].originFileObj, 'logo'))
                    }
                    uploads.push(new CosUpload(this.licenseFileList[0].originFileObj, 'license'))
                    cosAPI.uploadFiles(uploads).then( (result: any) => {
                        baseFormData.id = result.targetId
                        if (result.logo) {
                            baseFormData.companyLogo = result.logo.Location
                        }
                        baseFormData.companyLicense = result.license.Location
                        baseFormData.companyRegion = baseFormData.companyRegion.toString()
                        registerAPI.register(baseFormData).then(() => {
                            this.$emit('nextStep')
                        }).catch(error => {
                            // roll back the value of region to array
                            baseFormData.companyRegion = baseFormData.companyRegion.split(",")
                            this.$message.error(error.message)
                            this.closeLoading()
                        })
                    }).catch(error => {
                        this.$message.error(error.message)
                        this.closeLoading()
                    })
                } else {
                    this.$emit('prevStep')
                }
            } else {
                this.closeLoading()
            }
        })
    }

    prevStep () {
        this.$emit('prevStep')
    }

    backToLogin() {
        this.$router.push({ path: RouterConfiguration.loginPath })
    }

    checkFile(event: any) {
        if (Array.isArray(event)) {
            return event
        }
        return  event && event.fileList
    }

    beforeUpload() {
        return false
    }

    handleLogoFileChange(info: any) {
        let fileList = [...info.fileList]
        fileList = fileList.slice(-1)
        if (fileList.length > 0) {
            const file = fileList[0].originFileObj
            if (this.isLarge(file, 1)) {
                this.$message.error(`${this.$t('account.register.license.logo.limit')}`)
                fileList.pop()
            }
        }
        this.logoFileList = fileList
    }

    isLarge(file: File, size: number) {
        return file.size / 1024 / 1024 > size
    }

    handleLicenseFileChange(info: any) {
        let fileList = [...info.fileList]
        fileList = fileList.slice(-1)
        if (fileList.length > 0) {
            const file = fileList[0].originFileObj
            if (this.isLarge(file, 10)) {
                this.$message.error(`${this.$t('account.register.license.license.limit')}`)
                fileList.pop()
            }
        }
        this.licenseFileList = fileList
    }
}
</script>

<style lang="less" scoped>
button.in-step-button {
  margin-left : 15px;
  padding: 0 15px;
  font-size: 14px;
  height: 35px;
  width: 25%;
}

button.submit-step-button {
  margin-left : 15px;
  padding: 0 15px;
  font-size: 14px;
  height: 35px;
  width: 40%;
}
</style>
