<template>
  <div>
    <a-form
      :form="form"
      id="baseInfoForm"
      style="max-width: 500px; margin: 40px auto 0;"
    >
      <a-form-item
        :label="$t('company.name')"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input
          v-decorator="[
            'companyName',
            {
              rules: [
                { required: true, message: $t('company.name.required') },
                { max: 100, message: $t('company.name.max') },
              ],
            },
          ]"
        />
      </a-form-item>

      <a-form-item
        :label="$t('company.industry')"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select
          v-decorator="[
            'companyIndustry',
            {
              rules: [
                { required: true, message: $t('company.industry.required') },
              ],
            },
          ]"
        >
          <a-select-option
            v-for="industry in industries"
            :key="industry.value"
            :value="industry.value"
          >
            {{ $t(industry.label) }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item
        :label="$t('company.contact')"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input
          v-decorator="[
            'companyContact',
            {
              rules: [
                { required: true, message: $t('company.contact.required') },
                { max: 30, message: $t('company.contact.max') },
              ],
            },
          ]"
        />
      </a-form-item>

      <a-form-item
        :label="$t('company.email')"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input
          v-decorator="[
            'companyEmail',
            {
              rules: [
                { required: true, message: $t('company.email.required') },
                {
                  pattern: /^[A-Za-z0-9\u4e00-\u9fa5-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                  message: $t('common.email.invalid'),
                },
                { max: 100, message: $t('common.email.max') },
              ],
            },
          ]"
        />
      </a-form-item>

      <a-form-item
        :label="$t('company.phone')"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input
          v-decorator="[
            'companyPhone',
            {
              rules: [
                { required: true, message: $t('company.phone.required') },
                {
                  pattern: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/,
                  message: $t('common.phone.invalid'),
                },
                { max: 20, message: $t('common.phone.max') },
              ],
            },
          ]"
        />
      </a-form-item>

      <a-form-item
        :label="$t('company.region')"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-cascader
          :options="addressOptions"
          :placeholder="$t('common.select.address.hint')"
          v-decorator="[
            'companyRegion',
            {
              rules: [
                { required: true, message: $t('company.region.required') },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item
        :label="$t('company.address')"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input
          v-decorator="[
            'companyAddress',
            {
              rules: [
                { required: true, message: $t('company.address.required') },
                { max: 200, message: $t('company.address.max') },
              ],
            },
          ]"
        />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" class="step-button" @click="nextStep"
          >{{ $t("common.next") }}
        </a-button>
        <a-button type="primary" class="step-button" @click="backToLogin"
          >{{ $t("common.back.login") }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { WrappedFormUtils } from "ant-design-vue/types/form/form";
import { RouterConfiguration, Address, Industry } from "@/config";

@Component
export default class RegisterBaseInfo extends Vue {
  labelCol = { lg: { span: 5 }, sm: { span: 5 } };
  wrapperCol = { lg: { span: 19 }, sm: { span: 19 } };
  form!: WrappedFormUtils;
  addressOptions = Address.options;
  industries: any[] = [];

  @Prop({ type: Object, default: null })
  baseFormData: any | null;

  created() {
    this.industries = Industry.industries;
    this.form = this.$form.createForm(this, { name: "baseInfoForm" });
    const { baseFormData } = this;
    if (baseFormData) {
      this.form.getFieldDecorator("companyName", {
        initialValue: baseFormData.companyName,
      });
      this.form.getFieldDecorator("companyIndustry", {
        initialValue: baseFormData.companyIndustry,
      });
      this.form.getFieldDecorator("companyContact", {
        initialValue: baseFormData.companyContact,
      });
      this.form.getFieldDecorator("companyEmail", {
        initialValue: baseFormData.companyEmail,
      });
      this.form.getFieldDecorator("companyPhone", {
        initialValue: baseFormData.companyPhone,
      });
      this.form.getFieldDecorator("companyRegion", {
        initialValue: baseFormData.companyRegion,
      });
      this.form.getFieldDecorator("companyAddress", {
        initialValue: baseFormData.companyAddress,
      });
    }
  }

  nextStep() {
    const {
      form: { validateFields },
    } = this;
    validateFields((err, values) => {
      if (!err) {
        this.$emit("nextStep", values);
      }
    });
  }

  backToLogin() {
    this.$router.push({ path: RouterConfiguration.loginPath });
  }
}
</script>

<style lang="less" scoped>
button.step-button {
  margin-left: 12px;
  padding: 0 15px;
  font-size: 14px;
  height: 35px;
  width: 45%;
}
</style>
