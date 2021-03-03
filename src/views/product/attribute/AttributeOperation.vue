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
      <a-form :form="form" id="brandOpForm" v-bind="formLayout">
        <a-form-item
          v-show="record && record.brandId"
          :label="$t('product.attribute.id')"
        >
          <a-input v-decorator="['attributeId']" disabled />
        </a-form-item>
        <a-form-item :label="$t('product.attribute.name')">
          <a-input
            v-decorator="[
              'attributeName',
              {
                rules: [
                  {
                    required: true,
                    max: 50,
                    message: $t('product.attribute.name.required'),
                  },
                ],
              },
            ]"
          >
          </a-input>
        </a-form-item>
        <a-form-item :label="$t('product.attribute.type')">
          <a-select
            v-decorator="[
              'attributeType',
              {
                rules: [
                  {
                    required: true,
                    message: $t('product.attribute.type.required'),
                  },
                ],
              },
            ]"
          >
            <a-select-option value="0">{{
              $t("product.attribute.type.0")
            }}</a-select-option>
            <a-select-option value="1">{{
              $t("product.attribute.type.1")
            }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="$t('product.attribute.options')">
          <a-input
            v-if="inputVisible"
            type="text"
            :style="{ width: '120px' }"
            :value="optionValue"
            @change="handleInputChange"
            @blur="handleInputConfirm"
            @keyup.enter="handleInputConfirm"
          />
          <a-tag
            v-else
            style="background: #fff; borderStyle: dashed;"
            @click="showInput"
          >
            <a-icon type="plus" /> {{ $t("product.attribute.option.add") }}
          </a-tag>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { WrappedFormUtils } from "ant-design-vue/types/form/form";
import cosAPI from "@/api/cos/CosAPI";
import productAPI from "@/api/product/ProductAPI";

@Component
export default class AttributeOperation extends Vue {
  fields = ["brandId", "brandName"];

  title: string = this.$t("router.menu.product.prop").toString();

  @Prop({ type: Boolean, default: false })
  visible = false;

  loading = false;

  @Prop({ type: Object, default: null })
  record: any | {};

  brandLogoList: any[] = [];
  inputVisible = false;
  optionValue = null;

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
    this.form = this.$form.createForm(this, { name: "brandOpForm" });
  }

  beforeUpload() {
    return false;
  }

  showInput() {
    this.inputVisible = true;
  }

  handleLogoChange(info: any) {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      if (this.isLarge(file, 0.5)) {
        this.$message.error(`${this.$t("product.brand.logo.limit")}`);
        fileList.pop();
      }
    }
    this.brandLogoList = fileList;
  }

  isLarge(file: File, size: number) {
    return file.size / 1024 / 1024 > size;
  }

  @Watch("record")
  recordChanged() {
    this.brandLogoList = [];
    if (this.record && Object.keys(this.record).length > 0) {
      this.fields.forEach((v) => this.form.getFieldDecorator(v, {}));
      this.form.setFieldsValue({
        brandId: this.record.brandId,
        brandName: this.record.brandName,
      });
      if (this.record.brandLogo) {
        const file: any = {
          uid: "-1",
          name: "logo.png",
          url: `http://${this.record.brandLogo}`,
        };
        this.brandLogoList.push(file);
      }
    } else {
      this.form.resetFields();
    }
  }

  handleOk() {
    this.loading = true;
    const pic: any = this.brandLogoList[0];
    this.form.validateFields((err, values) => {
      if (!err) {
        const brand: any = {};
        brand.brandId = values.brandId || "-1";
        brand.brandName = values.brandName;
        brand.companyId = "0";
        let isAdd = false;
        if (brand.brandId === "-1") {
          isAdd = true;
        }
        if (pic && pic.uid !== "-1") {
          cosAPI
            .uploadFile(
              pic.originFileObj,
              isAdd ? undefined : brand.brandId,
              "logo.png"
            )
            .then((result: any) => {
              brand.brandId = result.targetId;
              brand.brandLogo = result.Location;
              productAPI
                .saveBrand(brand, isAdd)
                .then((result: any) => {
                  this.$emit("ok", result.data);
                })
                .catch((error) => {
                  this.$message.error(error.message);
                })
                .finally(() => {
                  this.loading = false;
                });
            })
            .catch((error) => {
              this.$message.error(error.message);
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          brand.brandLogo = this.record.brandLogo;
          productAPI
            .saveBrand(brand, isAdd)
            .then((result: any) => {
              this.$emit("ok", result.data);
            })
            .catch((error) => {
              this.$message.error(error.message);
            })
            .finally(() => {
              this.loading = false;
            });
        }
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
