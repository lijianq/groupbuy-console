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
        $t("customer.close")
      }}</a-button>
      <a-button type="primary" class="right-button" @click="handleSave()">{{
        $t("customer.save")
      }}</a-button>
    </template>
    <a-spin :spinning="loading">
      <a-card :bordered="false" v-if="record">
        <div>
          <a-form :form="form" id="customerOpForm" v-bind="formLayout">
            <a-form-item
              v-show="record && record.customerId"
              :label="$t('customer.id')"
            >
              <a-input v-decorator="['customerId']" disabled />
            </a-form-item>
            <a-form-item :label="$t('customer.name')">
              <a-input
                v-decorator="[
                  'customerName',
                  {
                    rules: [
                      {
                        required: true,
                        max: 100,
                        message: $t('customer.name.required'),
                      },
                    ],
                  },
                ]"
              />
            </a-form-item>
            <a-form-item :label="$t('customer.phone')">
              <a-input
                v-decorator="[
                  'customerPhone',
                  {
                    rules: [
                      {
                        required: true,
                        message: $t('customer.phone.required'),
                      },
                      {
                        pattern: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/,
                        message: $t('customer.phone.invalid'),
                      },
                      { max: 30, message: $t('customer.phone.max') },
                    ],
                  },
                ]"
              />
            </a-form-item>
            <a-form-item :label="$t('customer.region')">
              <a-cascader
                :options="addressOptions"
                :placeholder="$t('customer.region.required')"
                v-decorator="[
                  'customerRegion',
                  {
                    rules: [
                      {
                        required: true,
                        message: $t('customer.region.required'),
                      },
                    ],
                  },
                ]"
              />
            </a-form-item>
            <a-form-item :label="$t('customer.street')">
              <a-input
                v-decorator="[
                  'customerStreet',
                  {
                    rules: [
                      {
                        max: 100,
                        message: $t('customer.street.max'),
                      },
                    ],
                  },
                ]"
              />
            </a-form-item>
            <a-form-item :label="$t('customer.community')">
              <a-input
                v-decorator="[
                  'customerCommunity',
                  {
                    rules: [
                      {
                        required: true,
                        max: 100,
                        message: $t('customer.community.required'),
                      },
                    ],
                  },
                ]"
              />
            </a-form-item>
            <a-form-item :label="$t('customer.building')">
              <a-select :allowClear="true" v-decorator="['customerBuilding']">
                <a-select-option
                  v-for="option in intRange"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="$t('customer.gate')">
              <a-select :allowClear="true" v-decorator="['customerGate']">
                <a-select-option
                  v-for="option in intRange"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="$t('customer.floor')">
              <a-select :allowClear="true" v-decorator="['customerFloor']">
                <a-select-option
                  v-for="option in intRange"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="$t('customer.room')">
              <a-select :allowClear="true" v-decorator="['customerRoom']">
                <a-select-option
                  v-for="option in intRange"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </a-select-option>
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
import customerAPI from "@/api/CustomerAPI";
import { WrappedFormUtils } from "ant-design-vue/types/form/form";
import { Address, IntRange } from "@/config";

@Component
export default class CustomerOperation extends Vue {
  addressOptions = Address.options;
  intRange = IntRange.smallRange;
  title: string = this.$t("manage.customer.title").toString();

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
    "customerId",
    "customerName",
    "customerPhone",
    "customerRegion",
    "customerStreet",
    "customerCommunity",
    "customerBuilding",
    "customerGate",
    "customerFloor",
    "customerRoom",
  ];
  form!: WrappedFormUtils;

  isAdd = false;
  isEdit = false;
  loading = false;

  created() {
    this.form = this.$form.createForm(this, { name: "customerOpForm" });
  }

  @Watch("record")
  modelChanged() {
    this.resetData();
    if (this.record && Object.keys(this.record).length > 0) {
      this.setFlag(this.record.type);
      this.fields.forEach((v) => this.form.getFieldDecorator(v, {}));
      if (this.isEdit) {
        this.form.setFieldsValue({
          customerId: this.record.customerId,
          customerName: this.record.customerName,
          customerPhone: this.record.customerPhone,
          customerRegion: this.record.customerRegion.split(","),
          customerStreet: this.record.customerStreet,
          customerCommunity: this.record.customerCommunity,
          customerBuilding: this.record.customerBuilding,
          customerGate: this.record.customerGate,
          customerFloor: this.record.customerFloor,
          customerRoom: this.record.customerRoom,
        });
      } else {
        this.form.setFieldsValue({
          customerPhone: "17711111111",
          customerRegion: ["大连市", "中山区"],
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
        const customer: any = {};
        customer.customerId = values.customerId || "-1";
        customer.customerName = values.customerName;
        customer.customerPhone = values.customerPhone;
        customer.customerRegion = values.customerRegion.toString();
        customer.customerStreet = values.customerStreet;
        customer.customerCommunity = values.customerCommunity;
        customer.customerBuilding = values.customerBuilding;
        customer.customerGate = values.customerGate;
        customer.customerFloor = values.customerFloor;
        customer.customerRoom = values.customerRoom;
        customerAPI
          .saveCustomer(customer)
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
