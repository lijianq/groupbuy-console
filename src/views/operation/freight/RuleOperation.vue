<template>
  <a-modal
    :title="title"
    :width="700"
    :visible="visible"
    :okText="$t('common.ok')"
    @ok="handleOk"
    :cancelText="$t('common.cancel')"
    @cancel="handleCancel"
  >
    <a-form :form="form" id="ruleOpForm" v-bind="formLayout">
      <a-form-item :label="$t('operation.freight.region')">
        <a-select
          :labelInValue="true"
          v-decorator="[
            'area',
            {
              rules: [
                {
                  required: true,
                  message: $t('operation.freight.region.required'),
                },
              ],
            },
          ]"
        >
          <a-select-option
            v-for="area in areaData"
            :key="area.areaId"
            :value="area.areaId"
          >
            {{ area.areaName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :label="$t('operation.freight.rule')">
        <a-form-item v-if="chargeType === '0'" :style="ruleColStyle">
          <a-input
            :addonAfter="$t('operation.freight.unit')"
            v-decorator="[
              'firstUnit',
              {
                initialValue: '0',
                rules: [
                  {
                    required: true,
                    pattern: /^[0-9]\d*$/,
                    message: $t('int.required'),
                  },
                ],
              },
            ]"
          >
          </a-input>
        </a-form-item>
        <a-form-item v-else :style="ruleColStyle">
          <a-input
            :addonAfter="$t('operation.freight.weight')"
            v-decorator="[
              'firstWeight',
              {
                initialValue: '0',
                rules: [
                  {
                    required: true,
                    pattern: /^(([0-9]\d*)|\d)(\.\d{1,2})?$/,
                    message: $t('weight.required'),
                  },
                ],
              },
            ]"
          >
          </a-input>
        </a-form-item>
        <a-form-item :style="ruleColStyle">
          <a-input
            :addonAfter="$t('common.money.unit')"
            v-decorator="[
              'firstPrice',
              {
                initialValue: '0.00',
                rules: [
                  {
                    required: true,
                    pattern: /^(([0-9]\d*)|\d)(\.\d{1,2})?$/,
                    message: $t('money.required'),
                  },
                ],
              },
            ]"
          >
          </a-input>
        </a-form-item>
        <a-form-item v-if="chargeType === '0'" :style="ruleColStyle">
          <a-input
            :addonBefore="$t('operation.freight.increase')"
            :addonAfter="$t('common.package.unit')"
            v-decorator="[
              'nextUnit',
              {
                initialValue: '0',
                rules: [
                  {
                    required: true,
                    pattern: /^[0-9]\d*$/,
                    message: $t('int.required'),
                  },
                ],
              },
            ]"
          >
          </a-input>
        </a-form-item>
        <a-form-item v-else :style="ruleColStyle">
          <a-input
            :addonBefore="$t('operation.freight.increase')"
            :addonAfter="$t('common.weight.unit')"
            v-decorator="[
              'nextWeight',
              {
                initialValue: '0',
                rules: [
                  {
                    required: true,
                    pattern: /^(([0-9]\d*)|\d)(\.\d{1,2})?$/,
                    message: $t('weight.required'),
                  },
                ],
              },
            ]"
          >
          </a-input>
        </a-form-item>
        <a-form-item :style="ruleColStyle">
          <a-input
            :addonBefore="$t('operation.freight.fee.increase')"
            :addonAfter="$t('common.money.unit')"
            v-decorator="[
              'nextPrice',
              {
                initialValue: '0.00',
                rules: [
                  {
                    required: true,
                    pattern: /^(([0-9]\d*)|\d)(\.\d{1,2})?$/,
                    message: $t('money.required'),
                  },
                ],
              },
            ]"
          >
          </a-input>
        </a-form-item>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { WrappedFormUtils } from "ant-design-vue/types/form/form";

@Component
export default class RuleOperation extends Vue {
  title: string = this.$t("operation.freight.region.add").toString();

  @Prop({ type: Boolean, default: false })
  visible = false;

  @Prop({ type: String, default: "0" })
  chargeType!: string;

  @Prop({ type: Array, default: null })
  areaData!: any[];

  formLayout: any = {
    labelCol: {
      xs: { span: 12 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 20 },
      sm: { span: 16 },
    },
  };

  ruleColStyle: any = {
    "margin-right": "2px",
    display: "inline-block",
    width: "calc(50% - 5px)",
  };

  form!: WrappedFormUtils;

  created() {
    this.form = this.$form.createForm(this, { name: "ruleOpForm" });
  }

  handleOk() {
    this.form.validateFields((err, values) => {
      if (!err) {
        this.$emit("ok", values);
        this.form.resetFields();
      }
    });
  }

  handleCancel() {
    this.form.resetFields();
    this.$emit("cancel");
  }
}
</script>
