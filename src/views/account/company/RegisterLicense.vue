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
import RegisterLicense from "./RegisterLicense"
export default RegisterLicense
</script>

<style lang="less" scoped>
@import "RegisterLicense";
</style>
