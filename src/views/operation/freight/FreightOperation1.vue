<template>
  <a-modal
    :title="title"
    :width="700"
    :visible="visible"
    :confirmLoading="loading"
    :okText="$t('common.ok')"
    @ok="handleOk"
    :cancelText="$t('common.cancel')"
    @cancel="handleCancel"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" id="logisticsOpForm" v-bind="formLayout">
        <a-form-item
          v-show="record && record.logisticsId"
          :label="$t('operation.logistics.id')"
        >
          <a-input v-decorator="['logisticsId']" disabled />
        </a-form-item>
        <a-form-item :label="$t('operation.logistics.name')">
          <a-input
            v-decorator="[
              'logisticsName',
              {
                rules: [
                  {
                    required: true,
                    max: 100,
                    message: $t('operation.logistics.name.required'),
                  },
                ],
              },
            ]"
          >
          </a-input>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { WrappedFormUtils } from "ant-design-vue/types/form/form";
import operationAPI from "@/api/operation/OperationAPI";

@Component
export default class FreightOperation extends Vue {
  fields = ["logisticsId", "logisticsName"];

  @Prop({ type: String, default: "" })
  title: string | undefined;

  @Prop({ type: Boolean, default: false })
  visible = false;

  loading = false;

  @Prop({ type: Object, default: null })
  record: any | {};

  formLayout: any = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  form!: WrappedFormUtils;

  created() {
    this.form = this.$form.createForm(this, { name: "logisticsOpForm" });
  }

  @Watch("record")
  recordChanged() {
    if (this.record && Object.keys(this.record).length > 0) {
      this.fields.forEach((v) => this.form.getFieldDecorator(v, {}));
      this.form.setFieldsValue({
        logisticsId: this.record.logisticsId,
        logisticsName: this.record.logisticsName,
      });
    } else {
      this.form.resetFields();
    }
  }

  handleOk() {
    this.loading = true;
    this.form.validateFields((err, values) => {
      if (!err) {
        const logistics: any = {};
        logistics.logisticsId = values.logisticsId || "-1";
        logistics.logisticsName = values.logisticsName;
        logistics.companyId = "0";
        operationAPI
          .saveLogistics(logistics)
          .then((result: any) => {
            this.$emit("ok", result.data);
          })
          .catch((error) => {
            this.$message.error(error.message);
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.loading = false;
      }
    });
  }

  handleCancel() {
    this.$emit("cancel");
  }
}
</script>
