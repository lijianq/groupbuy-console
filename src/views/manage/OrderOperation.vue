<template>
  <a-modal
    :title="title"
    :width="700"
    :dialog-style="{ top: '30px' }"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleClose"
  >
    <template slot="footer">
      <a-button class="right-button" @click="handleClose()">{{
        $t("order.close")
      }}</a-button>
      <a-button type="primary" class="right-button" @click="handleSave()">{{
        $t("order.save")
      }}</a-button>
    </template>
    <a-spin :spinning="loading">
      <a-card :bordered="false" v-if="record">
        <div>
          <a-form :form="form" id="orderOpForm" v-bind="formLayout">
            <a-form-item
              v-show="record && record.orderId"
              :label="$t('order.id')"
            >
              <a-input v-decorator="['orderId']" disabled />
            </a-form-item>
            <a-form-item :label="$t('order.customer')">
              <a-select
                v-decorator="[
                  'orderCustomer',
                  {
                    rules: [
                      {
                        required: true,
                        message: $t('order.customer.required'),
                      },
                    ],
                  },
                ]"
                showSearch
                :placeholder="$t('order.customer.required')"
                :showArrow="false"
                :filterOption="false"
                @search="fetchCustomers"
                @change="handleCustomerChange"
                :notFoundContent="
                  cfetching ? undefined : $t('order.customer.nodata')
                "
              >
                <a-spin v-if="cfetching" slot="notFoundContent" size="small" />
                <a-select-option
                  v-for="(customer, index) in customers"
                  :value="customer.customerId"
                  :key="index"
                  >{{ customer.customerName }}</a-select-option
                >
              </a-select>
            </a-form-item>
            <a-form-item :label="$t('order.product')">
              <a-select
                v-decorator="[
                  'orderProduct',
                  {
                    rules: [
                      {
                        required: true,
                        message: $t('order.product.required'),
                      },
                    ],
                  },
                ]"
                showSearch
                :placeholder="$t('order.product.required')"
                :showArrow="false"
                :filterOption="false"
                @search="fetchProducts"
                @change="handleProductChange"
                :notFoundContent="
                  pfetching ? undefined : $t('order.product.nodata')
                "
              >
                <a-spin v-if="pfetching" slot="notFoundContent" size="small" />
                <a-select-option
                  v-for="(product, index) in products"
                  :value="
                    `${product.productId}|${product.productPrice}|${product.productCost}`
                  "
                  :key="index"
                >
                  <div v-if="product.productSpec">
                    {{
                      `${product.productName}/${product.productUnit}/${product.productSpec}`
                    }}
                  </div>
                  <div v-else>
                    {{ `${product.productName}/${product.productUnit}` }}
                  </div>
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="$t('order.unit')">
              <a-select
                :placeholder="$t('order.unit.select')"
                mode="combobox"
                @change="handleUnitChange"
                v-decorator="[
                  'orderUnit',
                  {
                    rules: [
                      {
                        required: true,
                        pattern: /^(([0-9]\d*)|\d)(\.\d{1,2})?$/,
                        message: $t('order.unit.select'),
                      },
                    ],
                  },
                ]"
              >
                <a-select-option
                  v-for="option in intRange"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="$t('order.amount')">
              <a-input v-decorator="['orderAmount']" disabled />
            </a-form-item>
            <a-form-item :label="$t('order.cost')">
              <a-input v-decorator="['orderCost']" disabled />
            </a-form-item>
            <a-form-item :label="$t('order.status')">
              <a-select
                v-decorator="[
                  'orderStatus',
                  {
                    rules: [
                      {
                        required: true,
                        message: $t('order.status.required'),
                      },
                    ],
                  },
                ]"
              >
                <a-select-option value="New">{{
                  $t("order.status.new")
                }}</a-select-option>
                <a-select-option value="Process">{{
                  $t("order.status.process")
                }}</a-select-option>
                <a-select-option value="Ready">{{
                  $t("order.status.ready")
                }}</a-select-option>
                <a-select-option value="Completed">{{
                  $t("order.status.completed")
                }}</a-select-option>
                <a-select-option value="Invalid">{{
                  $t("order.status.invalid")
                }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="$t('order.memo')">
              <a-textarea v-decorator="['orderMemo']" />
            </a-form-item>
          </a-form>
        </div>
      </a-card>
    </a-spin>
  </a-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import customerAPI from "@/api/CustomerAPI";
import orderAPI from "@/api/OrderAPI";
import productAPI from "@/api/ProductAPI";
import { WrappedFormUtils } from "ant-design-vue/types/form/form";
import { Address, IntRange } from "@/config";
import { debounce } from "lodash";

@Component
export default class OrderOperation extends Vue {
  customers = [];
  cfetching = false;
  products = [];
  pfetching = false;
  selectedProductId = "";
  selectedProductPrice = 0.0;
  selectedProductCost = 0.0;
  selectedCustomerId = "";
  addressOptions = Address.options;
  intRange = IntRange.smallRange;
  title: string = this.$t("manage.order.title").toString();

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
    "orderId",
    "orderCustomer",
    "orderProduct",
    "orderUnit",
    "orderAmount",
    "orderCost",
    "orderStatus",
    "orderMemo",
  ];
  form!: WrappedFormUtils;

  isAdd = false;
  isEdit = false;
  loading = false;

  created() {
    this.form = this.$form.createForm(this, { name: "orderOpForm" });
  }

  @Watch("record")
  modelChanged() {
    this.resetData();
    if (this.record && Object.keys(this.record).length > 0) {
      this.setFlag(this.record.type);
      let orderProduct = "";
      if (this.record.productSpec) {
        orderProduct = `${this.record.productName}/${this.record.productUnit}/${this.record.productSpec}`;
      } else {
        orderProduct = `${this.record.productName}/${this.record.productUnit}`;
      }
      this.fields.forEach((v) => this.form.getFieldDecorator(v, {}));
      if (this.isEdit) {
        this.form.setFieldsValue({
          orderId: this.record.orderId,
          orderCustomer: this.record.customerName,
          orderProduct: orderProduct,
          orderAmount: this.record.orderAmount,
          orderCost: this.record.orderCost,
          orderUnit: this.record.orderUnit,
          orderStatus: this.record.orderStatus,
          orderMemo: this.record.orderMemo,
        });
        this.selectedCustomerId = this.record.customerId;
        this.selectedProductId = this.record.productId;
        this.selectedProductPrice = this.record.productPrice;
        this.selectedProductCost = this.record.productCost;
      } else {
        this.form.setFieldsValue({ orderStatus: "Process" });
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
        const order: any = {};
        order.orderId = values.orderId || "-1";
        order.customerId = this.selectedCustomerId;
        order.productId = this.selectedProductId;
        order.orderUnit = values.orderUnit;
        order.orderAmount = values.orderAmount;
        order.orderCost = values.orderCost;
        order.orderStatus = values.orderStatus;
        order.orderMemo = values.orderMemo;
        orderAPI
          .saveOrder(order)
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

  fetchCustomers = debounce(this.fetchCustomerData, 800);

  fetchCustomerData(value: any) {
    if (value.trim().length == 0) {
      this.cfetching = false;
      this.customers = [];
      return;
    }
    this.cfetching = true;
    const query: any = {};
    query.customerName = value;
    customerAPI
      .getCustomerByName(query)
      .then((result: any) => {
        this.customers = result.data.resultSet;
      })
      .catch((error) => {
        this.$message.error(error.message);
      })
      .finally(() => {
        this.cfetching = false;
      });
  }

  fetchProducts = debounce(this.fetchProductData, 800);

  fetchProductData(value: any) {
    if (value.trim().length == 0) {
      this.pfetching = false;
      this.products = [];
      return;
    }
    this.pfetching = true;
    const query: any = {};
    query.productName = value;
    productAPI
      .getProductByName(query)
      .then((result: any) => {
        this.products = result.data.resultSet;
      })
      .catch((error) => {
        this.$message.error(error.message);
      })
      .finally(() => {
        this.pfetching = false;
      });
  }

  handleProductChange(value: any) {
    const infos = value.split("|");
    this.selectedProductId = infos[0];
    this.selectedProductPrice = infos[1];
    this.selectedProductCost = infos[2];
    const unit = this.form.getFieldValue("orderUnit");
    if (unit) {
      const amount = this.selectedProductPrice * unit;
      const cost = this.selectedProductCost * unit;
      this.form.setFieldsValue({ orderAmount: amount, orderCost: cost });
    } else {
      this.form.setFieldsValue({ orderAmount: "0.00", orderCost: "0.00" });
    }
  }

  handleUnitChange(value: any) {
    const amount = this.selectedProductPrice * value;
    const cost = this.selectedProductCost * value;
    this.form.setFieldsValue({ orderAmount: amount, orderCost: cost });
  }

  handleCustomerChange(value: any) {
    this.selectedCustomerId = value;
  }
}
</script>
