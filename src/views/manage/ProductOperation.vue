<template>
  <a-modal
    :title="title"
    :width="700"
    :dialog-style="{ top: '50px' }"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleClose"
  >
    <template slot="footer">
      <a-button class="right-button" @click="handleClose()">{{
        $t("product.close")
      }}</a-button>
      <a-button type="primary" class="right-button" @click="handleSave()">{{
        $t("product.save")
      }}</a-button>
    </template>
    <a-spin :spinning="loading">
      <a-card :bordered="false" v-if="record">
        <div>
          <a-form :form="form" id="productOpForm" v-bind="formLayout">
            <a-form-item
              v-show="record && record.productId"
              :label="$t('product.id')"
            >
              <a-input v-decorator="['productId']" disabled />
            </a-form-item>
            <a-form-item :label="$t('product.name')">
              <a-input
                v-decorator="[
                  'productName',
                  {
                    rules: [
                      {
                        required: true,
                        max: 200,
                        message: $t('product.name.required'),
                      },
                    ],
                  },
                ]"
              />
            </a-form-item>
            <a-form-item :label="$t('product.price')">
              <a-input
                v-decorator="[
                  'productPrice',
                  {
                    rules: [
                      {
                        required: true,
                        pattern: /^(([0-9]\d*)|\d)(\.\d{1,2})?$/,
                        message: $t('product.price.required'),
                      },
                    ],
                  },
                ]"
              />
            </a-form-item>
            <a-form-item :label="$t('product.cost')">
              <a-input
                v-decorator="[
                  'productCost',
                  {
                    rules: [
                      {
                        required: true,
                        pattern: /^(([0-9]\d*)|\d)(\.\d{1,2})?$/,
                        message: $t('product.cost.required'),
                      },
                    ],
                  },
                ]"
              />
            </a-form-item>
            <a-form-item :label="$t('product.unit')">
              <a-input
                v-decorator="[
                  'productUnit',
                  {
                    rules: [
                      {
                        required: true,
                        max: 10,
                        message: $t('product.unit.required'),
                      },
                    ],
                  },
                ]"
              />
            </a-form-item>
            <a-form-item :label="$t('product.spec')">
              <a-input
                v-decorator="[
                  'productSpec',
                  {
                    rules: [{ max: 100, message: $t('product.spec.max') }],
                  },
                ]"
              />
            </a-form-item>
            <a-form-item :label="$t('product.status')">
              <a-select
                v-decorator="[
                  'productStatus',
                  {
                    rules: [
                      {
                        required: true,
                        message: $t('product.status.required'),
                      },
                    ],
                  },
                ]"
              >
                <a-select-option value="Active">{{
                  $t("product.status.active")
                }}</a-select-option>
                <a-select-option value="Inactive">{{
                  $t("product.status.inactive")
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-form>
        </div>
      </a-card>
    </a-spin>
  </a-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import productAPI from "@/api/ProductAPI";
import { WrappedFormUtils } from "ant-design-vue/types/form/form";

@Component
export default class ProductOperation extends Vue {
  title: string = this.$t("manage.product.title").toString();

  @Prop({ type: Boolean, default: false })
  visible = false;

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

  fields = [
    "productId",
    "productName",
    "productPrice",
    "productCost",
    "productUnit",
    "productSpec",
    "productStatus",
  ];
  form!: WrappedFormUtils;

  isAdd = false;
  isEdit = false;
  loading = false;

  created() {
    this.form = this.$form.createForm(this, { name: "productOpForm" });
  }

  @Watch("record")
  modelChanged() {
    this.resetData();
    if (this.record && Object.keys(this.record).length > 0) {
      this.setFlag(this.record.type);
      if (this.isEdit) {
        this.fields.forEach((v) => this.form.getFieldDecorator(v, {}));
        this.form.setFieldsValue({
          productId: this.record.productId,
          productName: this.record.productName,
          productPrice: this.record.productPrice,
          productCost: this.record.productCost,
          productUnit: this.record.productUnit,
          productSpec: this.record.productSpec,
          productStatus: this.record.productStatus,
        });
      }
    }
  }

  resetData() {
    this.isAdd = false;
    this.isEdit = false;
  }

  setFlag(type: string) {
    if (type === "add") {
      this.isAdd = true;
    } else if (type === "edit") {
      this.isEdit = true;
    }
  }

  renderItem(record: any) {
    return {
      label: record.title,
      value: record.key,
    };
  }

  handleClose() {
    this.$emit("cancel");
  }

  handleOk(result: any) {
    this.$emit("ok", result);
  }

  handleSave() {
    this.loading = true;
    this.form.validateFields((err, values) => {
      if (!err) {
        const product: any = {};
        product.productId = values.productId || "-1";
        product.productName = values.productName;
        product.productPrice = values.productPrice;
        product.productCost = values.productCost;
        product.productUnit = values.productUnit;
        product.productSpec = values.productSpec;
        product.productStatus = values.productStatus;
        productAPI
          .saveProduct(product)
          .then((result) => {
            this.handleOk(result.data);
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
}
</script>
