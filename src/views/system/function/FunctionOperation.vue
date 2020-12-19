<template>
  <a-modal
    :title="title"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    :okText="$t('modal.ok')"
    @ok="
      () => {
        $emit('ok');
      }
    "
    :cancelText="$t('modal.cancel')"
    @cancel="
      () => {
        $emit('cancel');
      }
    "
  >
    <a-spin :spinning="loading">
      <a-form :form="form" id="functionOpForm" v-bind="formLayout">
        <a-form-item v-show="model" label="主键ID">
          <a-input v-decorator="['routeId']" disabled />
        </a-form-item>
        <a-form-item :label="$t('system.function.name')">
          <a-input
            v-decorator="[
              'routeName',
              {
                rules: [
                  {
                    required: true,
                    max: 50,
                    message: $t('system.function.name.required'),
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item
          :label="$t('system.function.type')"
        >
          <a-select
            @change="handleTypeChange" 
            v-decorator="[
              'routeType',
              {
                rules: [
                  {
                    required: true,
                    message: $t('account.register.component.type'),
                  },
                ],
              },
            ]"
          >
            <a-select-option value="Group">{{ $t('account.register.component.group')}}</a-select-option>
            <a-select-option value="Item">{{ $t('account.register.component.item')}}</a-select-option>
            <a-select-option value="API">API</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :label="$t('system.function.component')"
        >
          <a-select
            :disabled="gdisable || adisable"
            v-decorator="[
              'routeComponent',
              {
                rules: [
                  {
                    required: true,
                    message: $t('account.register.component.required'),
                  },
                ],
              },
            ]"
          >
            <a-select-option v-for="component in components" :disabled="component === 'RouteView' && idisable" :key="component" :value="component">
              {{ component }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="$t('system.function.path')">
          <a-input
            :disabled="adisable"
            v-decorator="[
              'routePath',
              {
                rules: [
                  {
                    required: true,
                    max: 50,
                    message: $t('system.function.path.required'),
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item :label="$t('system.function.redirect')">
          <a-input
            :disabled="adisable || idisable"
            v-decorator="[
              'routeRedirect',
              {
                rules: [
                  {
                    max: 50,
                    message: $t('system.function.redirect.max'),
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item :label="$t('system.function.icon')">
          <a-input
            :disabled="adisable"
            v-decorator="[
              'routeIcon',
              {
                rules: [
                  {
                    required: true,
                    max: 50,
                    message: $t('system.function.icon.required'),
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item :label="$t('system.function.i18key')">
          <a-input
            :disabled="adisable"
            v-decorator="[
              'routeI18Key',
              {
                rules: [
                  {
                    required: true,
                    max: 50,
                    message: $t('system.function.i18key.required'),
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
import pick from "lodash.pick";
import { ComponentConfiguration } from "@/config"

@Component
export default class FunctionOperation extends Vue {
  fields = ["routeName", "routeId"];

  @Prop({ type: String, default: "" })
  title: string | undefined;

  @Prop({ type: Boolean, default: false })
  visible = false;

  @Prop({ type: Boolean, default: false })
  loading = false;

  @Prop({ type: Object, default: null })
  model: any | {};

  components: any[] = []

  formLayout: any = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 13 },
    },
  };

  form!: WrappedFormUtils
  gdisable = false
  adisable = false
  idisable = false

  created() {
    this.form = this.$form.createForm(this, { name: "functionOpForm" });
    this.components = Object.keys(ComponentConfiguration.components)
  }

  @Watch("model")
  modelChanged() {
    this.fields.forEach((v) => this.form.getFieldDecorator(v, {}));
    if (this.model) {
      this.form.setFieldsValue(pick(this.model, this.fields));
    } else {
      this.form.resetFields();
    }
  }

  handleTypeChange(value: string) {
    console.log(value)
    if (value === 'Group') {
      this.gdisable = true
      this.idisable = false
      this.adisable = false
      this.form.setFieldsValue({
        routeComponent: 'RouteView'
      })
    } else if (value === 'Item') {
      this.gdisable = false
      this.idisable = true
      this.adisable = false
      this.form.setFieldsValue({
        routeComponent: null,
        routeRedirect: null
      })
    } else {
      this.gdisable = false
      this.idisable = false
      this.adisable = true
      this.form.setFieldsValue({
        routeComponent: null,
        routePath: null,
        routeRedirect: null,
        routeIcon: null,
        routeI18Key: null
      })
    }
  }
}
</script>
