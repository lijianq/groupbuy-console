<template>
  <a-modal
    :title="title"
    :width="700"
    :visible="visible"
    :confirmLoading="loading"
    :okText="$t('common.ok')"
    @ok="
      () => {
        $emit('ok');
      }
    "
    :cancelText="$t('common.cancel')"
    @cancel="
      () => {
        $emit('cancel');
      }
    "
  >
    <a-spin :spinning="loading">
      <a-form :form="form" id="resourceOpForm" v-bind="formLayout">
        <a-form-item
          v-show="model && model.resourceId"
          :label="$t('system.resource.id')"
        >
          <a-input v-decorator="['resourceId']" disabled />
        </a-form-item>
        <a-form-item
          v-show="model && model.resourceParentId"
          :label="$t('system.resource.parent.id')"
        >
          <a-input v-decorator="['resourceParentId']" disabled />
        </a-form-item>
        <a-form-item :label="$t('system.resource.name')">
          <a-input
            v-decorator="[
              'resourceName',
              {
                rules: [
                  {
                    required: true,
                    max: 30,
                    message: $t('system.resource.name.required'),
                  },
                ],
              },
            ]"
          >
          </a-input>
        </a-form-item>
        <a-form-item :label="$t('system.resource.type')">
          <a-select
            @change="handleTypeChange"
            v-decorator="[
              'resourceType',
              {
                rules: [
                  {
                    required: true,
                    message: $t('system.resource.type.required'),
                  },
                ],
              },
            ]"
          >
            <a-select-option value="Group">{{
              $t("system.resource.group")
            }}</a-select-option>
            <a-select-option value="Item">{{
              $t("system.resource.item")
            }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="$t('system.resource.method')">
          <a-select
            :disabled="gdisable"
            v-decorator="[
              'resourceMethod',
              {
                rules: [
                  {
                    required: true,
                    message: $t('system.resource.method.required'),
                  },
                ],
              },
            ]"
          >
            <a-select-option value="*">*</a-select-option>
            <a-select-option value="GET">GET</a-select-option>
            <a-select-option value="POST">POST</a-select-option>
            <a-select-option value="PUT">PUT</a-select-option>
            <a-select-option value="DELETE">DELETE</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="$t('system.resource.path')">
          <a-input
            :disabled="gdisable"
            addon-before="/**"
            v-decorator="[
              'resourcePath',
              {
                rules: [
                  {
                    required: true,
                    max: 100,
                    message: $t('system.resource.path.required'),
                  },
                ],
              },
            ]"
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { WrappedFormUtils } from "ant-design-vue/types/form/form";

@Component
export default class ResourceOperation extends Vue {
  fields = [
    "resourceId",
    "resourceParentId",
    "resourceName",
    "resourcePath",
    "resourceType",
    "resourceMethod",
  ];

  title: string = "";

  @Prop({ type: Boolean, default: false })
  visible = false;

  @Prop({ type: Boolean, default: false })
  loading = false;

  @Prop({ type: Object, default: null })
  model: any | {};

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
  gdisable = false;

  created() {
    this.form = this.$form.createForm(this, { name: "resourceOpForm" });
  }

  @Watch("model")
  modelChanged() {
    this.gdisable = false;
    if (this.model && Object.keys(this.model).length > 0) {
      this.title = this.$t("system.resource.modify").toString();
      this.fields.forEach((v) => this.form.getFieldDecorator(v, {}));
      this.handleTypeChange(this.model.resourceType);
      let resourcePath = "";
      if (
        this.model.resourcePath &&
        this.model.resourcePath.startsWith("/**")
      ) {
        resourcePath = this.model.resourcePath.substring(3);
      } else {
        resourcePath = this.model.resourcePath;
      }
      this.form.setFieldsValue({
        resourceId: this.model.resourceId,
        resourceParentId: this.model.resourceParentId,
        resourceName: this.model.resourceName,
        resourceMethod: this.model.resourceMethod,
        resourcePath: resourcePath,
        resourceType: this.model.resourceType,
      });
    } else {
      this.title = this.$t("system.resource.create").toString();
      this.form.resetFields();
    }
  }

  handleTypeChange(value: string) {
    if (value === "Group") {
      this.gdisable = true;
    } else {
      this.gdisable = false;
    }
  }
}
</script>
