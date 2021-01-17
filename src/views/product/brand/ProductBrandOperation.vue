<template>
  <a-modal
    :title="title"
    :width="800"
    :dialog-style="{ top: '50px' }"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleClose"
  >
    <template slot="footer">
      <a-button class="right-button" @click="handleClose()">{{
        $t("common.close")
      }}</a-button>
      <span v-if="isRole">
        <a-button
          type="primary"
          class="right-button"
          @click="handleSetRole()"
          >{{ $t("acount.role.set") }}</a-button
        >
        <a-button class="right-button" @click="resetSelected()">{{
          $t("route.action.reset")
        }}</a-button>
      </span>
      <span v-else>
        <a-button type="primary" class="right-button" @click="handleSave()">{{
          $t("route.action.save")
        }}</a-button>
      </span>
    </template>
    <a-spin :spinning="loading">
      <a-card :bordered="false" v-if="record">
        <div v-if="isRole">
          <template>
            <a-transfer
              :data-source="roleData"
              :target-keys="selectedKeys"
              :render="renderItem"
              @change="handleChange"
              :list-style="{
                width: '300px',
                height: '300px',
              }"
            />
          </template>
        </div>
        <div v-else>
          <a-form :form="form" id="accountOpForm" v-bind="formLayout">
            <a-form-item
              v-show="record && record.accountId"
              :label="$t('account.id')"
            >
              <a-input v-decorator="['accountId']" disabled />
            </a-form-item>
            <a-form-item :label="$t('account.name')">
              <a-input
                v-decorator="[
                  'accountName',
                  {
                    rules: [
                      {
                        required: true,
                        max: 30,
                        message: $t('account.name.required'),
                      },
                    ],
                  },
                ]"
              />
            </a-form-item>
            <a-form-item :label="$t('account.full.name')">
              <a-input
                v-decorator="[
                  'accountFullName',
                  {
                    rules: [
                      {
                        required: true,
                        max: 50,
                        message: $t('account.full.name.required'),
                      },
                    ],
                  },
                ]"
              />
            </a-form-item>
            <a-form-item :label="$t('account.email')">
              <a-input
                v-decorator="[
                  'accountEmail',
                  {
                    rules: [
                      {
                        required: true,
                        pattern: /^[A-Za-z0-9\u4e00-\u9fa5-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                        message: $t('common.email.invalid'),
                      },
                      { max: 100, message: $t('common.email.max') },
                    ],
                  },
                ]"
              />
            </a-form-item>
            <a-form-item :label="$t('account.phone')">
              <a-input
                v-decorator="[
                  'accountPhone',
                  {
                    rules: [
                      {
                        required: true,
                        pattern: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/,
                        message: $t('common.phone.invalid'),
                      },
                      { max: 20, message: $t('common.phone.max') },
                    ],
                  },
                ]"
              />
            </a-form-item>
            <a-form-item :label="$t('account.password')">
              <a-input-password
                v-decorator="[
                  'password1',
                  {
                    rules: [
                      {
                        required: true,
                        message: $t('account.password.message'),
                      },
                      { min: 8, message: $t('account.password.min') },
                      { max: 30, message: $t('account.password.max') },
                    ],
                  },
                ]"
              >
              </a-input-password>
            </a-form-item>

            <a-form-item :label="$t('account.password.confirm')">
              <a-input-password
                v-decorator="[
                  'password2',
                  {
                    rules: [
                      {
                        validator: (rules, value, callback) => {
                          checkConfirmPassword(rules, value, callback);
                        },
                      },
                    ],
                  },
                ]"
              >
              </a-input-password>
            </a-form-item>
            <a-form-item :label="$t('account.status')">
              <a-select
                v-decorator="[
                  'accountStatus',
                  {
                    rules: [
                      {
                        required: true,
                        message: $t('account.status.required'),
                      },
                    ],
                  },
                ]"
              >
                <a-select-option value="Active">{{
                  $t("account.status.active")
                }}</a-select-option>
                <a-select-option value="Inactive">{{
                  $t("account.status.inactive")
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
import companyAPI from "@/api/company/CompanyAPI";
import {
  WrappedFormUtils,
  ValidationRule,
} from "ant-design-vue/types/form/form";
import md5 from "md5";

@Component
export default class ProductBrandOperation extends Vue {
  @Prop({ type: String, default: "" })
  title: string | undefined;

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
    "accountId",
    "accountName",
    "accountFullName",
    "accountEmail",
    "accountPhone",
    "accountStatus",
    "password1",
    "password2",
  ];
  form!: WrappedFormUtils;

  isAdd = false;
  isEdit = false;
  isRole = false;
  loading = false;
  defaultSelectedKeys: any[] = [];
  roleData: any[] = [];
  selectedKeys: any[] = [];

  created() {
    this.form = this.$form.createForm(this, { name: "accountOpForm" });
  }

  @Watch("record")
  modelChanged() {
    this.resetData();
    if (this.record && Object.keys(this.record).length > 0) {
      this.setFlag(this.record.type);
      if (this.isRole) {
        this.loading = true;
        companyAPI
          .getAccountRoles(this.record.accountId)
          .then((result: any) => {
            this.processRoleData(result.data);
          })
          .catch((error) => {
            this.$message.error(error.message);
          })
          .finally(() => {
            this.loading = false;
          });
      } else if (this.isEdit) {
        this.fields.forEach((v) => this.form.getFieldDecorator(v, {}));
        this.form.setFieldsValue({
          accountId: this.record.accountId,
          accountName: this.record.accountName,
          accountFullName: this.record.accountFullName,
          accountEmail: this.record.accountEmail,
          accountPhone: this.record.accountPhone,
          accountStatus: this.record.accountStatus,
          password1: "••••••••",
          password2: "••••••••",
        });
      }
    }
  }

  resetData() {
    this.defaultSelectedKeys = [];
    this.roleData = [];
    this.selectedKeys = [];
    this.isAdd = false;
    this.isEdit = false;
    this.isRole = false;
  }

  setFlag(type: string) {
    if (type === "role") {
      this.isRole = true;
    } else if (type === "add") {
      this.isAdd = true;
    } else if (type === "edit") {
      this.isEdit = true;
    }
  }

  checkConfirmPassword(
    rules: ValidationRule,
    value: string,
    callback: Function
  ) {
    const password1 = this.form.getFieldValue("password1");
    if (password1 && password1 !== value) {
      callback(new Error(this.$t("account.password.mismatch") as string));
    } else {
      callback();
    }
  }

  processRoleData(roles: any[]) {
    roles.forEach((role) => {
      const item: any = {};
      item.key = role.roleId;
      item.title = role.roleName;
      this.roleData.push(item);
      if (role.hasRole) {
        this.defaultSelectedKeys.push(role.roleId);
      }
    });
    this.selectedKeys = this.defaultSelectedKeys;
  }

  resetSelected() {
    this.selectedKeys = this.defaultSelectedKeys;
  }

  handleChange(targetKeys: any[]) {
    this.selectedKeys = targetKeys;
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

  handleSetRole() {
    this.loading = true;
    companyAPI
      .setAccountRoles(this.record.accountId, this.selectedKeys)
      .then(() => {
        this.handleClose();
      })
      .catch((error) => {
        this.$message.error(error.message);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  handleSave() {
    this.loading = true;
    this.form.validateFields((err, values) => {
      if (!err) {
        const account: any = {};
        account.accountId = values.accountId || "-1";
        account.accountAvatar = this.record.accountAvatar;
        account.accountName = values.accountName;
        account.accountEmail = values.accountEmail;
        account.accountFullName = values.accountFullName;
        account.accountStatus = values.accountStatus;
        account.accountPhone = values.accountPhone;
        if (values.password1 === "••••••••") {
          account.accountPassword = this.record.accountPassword;
        } else {
          account.accountPassword = md5(values.password1);
        }
        this.loading = false;
        companyAPI
          .saveCompanyAccount(account)
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
