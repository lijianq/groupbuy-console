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
      <a-form :form="form" id="categoryOpForm" v-bind="formLayout">
        <a-form-item
          v-show="model && model.category.categoryId"
          :label="$t('product.category.id')"
        >
          <a-input v-decorator="['categoryId']" disabled />
        </a-form-item>
        <a-form-item
          v-show="model && model.category.parentCategoryId"
          :label="$t('product.category.parent.id')"
        >
          <a-input v-decorator="['parentCategoryId']" disabled />
        </a-form-item>
        <a-form-item :label="$t('product.category.name')">
          <a-input
            v-decorator="[
              'categoryName',
              {
                rules: [
                  {
                    required: true,
                    max: 100,
                    message: $t('product.category.name.required'),
                  },
                ],
              },
            ]"
          >
          </a-input>
        </a-form-item>
        <a-form-item :label="$t('product.category.pic')">
          <a-upload
            list-type="picture-card"
            :before-upload="beforeUpload"
            accept="image/*"
            id="categoryPic"
            :multiple="false"
            :file-list="categoryPicList"
            @change="handlePicChange"
          >
            <div v-if="categoryPicList.length < 2">
              <a-icon type="plus" />
            </div>
          </a-upload>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { WrappedFormUtils } from "ant-design-vue/types/form/form";

@Component
export default class ProductCategoryOperation extends Vue {
  fields = ["categoryId", "parentCategoryId", "categoryName"];

  title: string = this.$t("router.menu.product.category").toString();

  @Prop({ type: Boolean, default: false })
  visible = false;

  @Prop({ type: Boolean, default: false })
  loading = false;

  @Prop({ type: Object, default: null })
  model: any | {};

  categoryPicList: any[] = [];

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
    this.form = this.$form.createForm(this, { name: "categoryOpForm" });
  }

  beforeUpload() {
    return false;
  }

  handlePicChange(info: any) {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      if (this.isLarge(file, 0.5)) {
        this.$message.error(`${this.$t("product.category.pic.limit")}`);
        fileList.pop();
      }
    }
    this.categoryPicList = fileList;
  }

  isLarge(file: File, size: number) {
    return file.size / 1024 / 1024 > size;
  }

  @Watch("model")
  modelChanged() {
    this.categoryPicList = [];
    if (this.model && Object.keys(this.model).length > 0) {
      this.fields.forEach((v) => this.form.getFieldDecorator(v, {}));
      this.form.setFieldsValue({
        categoryId: this.model.category.categoryId,
        parentCategoryId: this.model.category.parentCategoryId,
        categoryName: this.model.category.categoryName,
      });
      if (this.model.category.categoryPic) {
        const file: any = {
          uid: "-1",
          name: "default.png",
          url: `http://${this.model.category.categoryPic}`,
        };
        this.categoryPicList.push(file);
      }
    } else {
      this.form.resetFields();
    }
  }
}
</script>
