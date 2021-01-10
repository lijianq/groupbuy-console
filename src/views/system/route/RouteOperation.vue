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
      <a-form :form="form" id="routeOpForm" v-bind="formLayout">
        <a-form-item
          v-show="model && model.routeId"
          :label="$t('system.route.id')"
        >
          <a-input v-decorator="['routeId']" disabled />
        </a-form-item>
        <a-form-item
          v-show="model && model.routeParentId"
          :label="$t('system.route.parent.id')"
        >
          <a-input v-decorator="['routeParentId']" disabled />
        </a-form-item>
        <a-form-item :label="$t('system.route.name')">
          <a-select
            v-decorator="[
              'routeName',
              {
                rules: [
                  {
                    required: true,
                    max: 50,
                    message: $t('system.route.name.required'),
                  },
                ],
              },
            ]"
          >
            <a-select-option
              v-for="i18nkey in i18nKeys"
              :key="i18nkey"
              :value="i18nkey"
            >
              {{ `${i18nkey}:  [${$t(i18nkey)}]` }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="$t('system.route.type')">
          <a-select
            @change="handleTypeChange"
            v-decorator="[
              'routeType',
              {
                rules: [
                  {
                    required: true,
                    message: $t('system.route.type.required'),
                  },
                ],
              },
            ]"
          >
            <a-select-option value="Group">{{
              $t("system.route.group")
            }}</a-select-option>
            <a-select-option value="Item">{{
              $t("system.route.item")
            }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="$t('system.route.component')">
          <a-select
            :disabled="gdisable"
            v-decorator="[
              'routeComponent',
              {
                rules: [
                  {
                    required: true,
                    message: $t('system.route.component.required'),
                  },
                ],
              },
            ]"
          >
            <a-select-option
              v-for="component in components"
              :disabled="component === 'RouteGroup' && idisable"
              :key="component"
              :value="component"
            >
              {{ component }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="$t('system.route.path')">
          <a-input
            addon-before="/"
            v-decorator="[
              'routePath',
              {
                rules: [
                  {
                    required: true,
                    max: 50,
                    message: $t('system.route.path.required'),
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item :label="$t('system.route.redirect')">
          <a-input
            addon-before="/"
            :disabled="idisable"
            v-decorator="['routeRedirect']"
          />
        </a-form-item>
        <a-form-item :label="$t('system.route.icon')">
          <a-select
            v-decorator="[
              'routeIcon',
              {
                rules: [
                  {
                    required: true,
                    max: 50,
                    message: $t('system.route.icon.required'),
                  },
                ],
              },
            ]"
          >
            <a-select-option v-for="icon in icons" :key="icon" :value="icon">
              <a-icon :type="icon" style="margin-right: 5px;" /> {{ icon }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { WrappedFormUtils } from "ant-design-vue/types/form/form";
import { ComponentConfiguration, Icons } from "@/config";
import ZhCN from "@/locales/lang/zh-CN";

@Component
export default class RouteOperation extends Vue {
  fields = [
    "routeId",
    "routeParentId",
    "routeName",
    "routePath",
    "routeRedirect",
    "routeType",
    "routeComponent",
    "routeIcon",
  ];

  @Prop({ type: String, default: "" })
  title: string | undefined;

  @Prop({ type: Boolean, default: false })
  visible = false;

  @Prop({ type: Boolean, default: false })
  loading = false;

  @Prop({ type: Object, default: null })
  model: any | {};

  components: string[] = [];
  icons: string[] = [];
  i18nKeys: string[] = [];

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
  idisable = false;

  created() {
    this.form = this.$form.createForm(this, { name: "routeOpForm" });
    this.components = Object.keys(ComponentConfiguration.components);
    this.icons = Icons.icons;
    this.i18nKeys = Object.keys(ZhCN.messages).filter((str: string) =>
      str.startsWith("router.menu.")
    );
  }

  @Watch("model")
  modelChanged() {
    this.gdisable = false;
    this.idisable = false;
    if (this.model && Object.keys(this.model).length > 0) {
      this.fields.forEach((v) => this.form.getFieldDecorator(v, {}));
      this.handleTypeChange(this.model.routeType);
      let routePath = "";
      if (this.model.routePath && this.model.routePath.startsWith("/")) {
        routePath = this.model.routePath.substring(1);
      } else {
        routePath = this.model.routePath;
      }
      let routeRedirect = "";
      if (
        this.model.routeRedirect &&
        this.model.routeRedirect.startsWith("/")
      ) {
        routeRedirect = this.model.routeRedirect.substring(1);
      } else {
        routeRedirect = this.model.routeRedirect;
      }
      this.form.setFieldsValue({
        routeId: this.model.routeId,
        routeParentId: this.model.routeParentId,
        routeName: this.model.routeName,
        routePath: routePath,
        routeRedirect: routeRedirect,
        routeType: this.model.routeType,
        routeComponent: this.model.routeComponent,
      });

      if (this.model.routeMeta) {
        this.form.setFieldsValue({
          routeIcon: this.model.routeMeta.icon,
        });
      }
    } else {
      this.form.resetFields();
    }
  }

  handleTypeChange(value: string) {
    if (value === "Group") {
      this.gdisable = true;
      this.idisable = false;
      this.form.setFieldsValue({
        routeComponent: "RouteGroup",
      });
    } else if (value === "Item") {
      this.gdisable = false;
      this.idisable = true;
      this.form.setFieldsValue({
        routeComponent: null,
      });
    }
  }
}
</script>
