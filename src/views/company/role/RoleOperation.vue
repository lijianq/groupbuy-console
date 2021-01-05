<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleClose"
  >
    <template slot="footer">
      <a-button class="right-button" @click="handleClose()">{{
        $t("common.close")
      }}</a-button>
      <span v-if="isPermission">
        <a-button
          type="primary"
          class="right-button"
          @click="handleSetPermission()"
          >{{ $t("route.action.permission.set") }}</a-button
        >
        <a-button class="right-button" @click="resetChecked()">{{
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
        <div v-if="isPermission">
          <a-tree
            checkable
            v-model="checkedKeys"
            :autoExpandParent="false"
            :selectable="false"
            :tree-data="treeData"
            @check="onCheck"
          >
          </a-tree>
        </div>
        <div v-else>
          <a-form :form="form" id="roleOpForm" v-bind="formLayout">
            <a-form-item
              v-show="record && record.roleId"
              :label="$t('role.id')"
            >
              <a-input v-decorator="['roleId']" disabled />
            </a-form-item>
            <a-form-item :label="$t('role.name')">
              <a-input
                v-decorator="[
                  'roleName',
                  {
                    rules: [
                      {
                        required: true,
                        max: 30,
                        message: $t('role.name.required'),
                      },
                    ],
                  },
                ]"
              />
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
import { WrappedFormUtils } from "ant-design-vue/types/form/form";

@Component
export default class RoleOperation extends Vue {
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

  fields = ["roleId", "roleName"];
  form!: WrappedFormUtils;

  isAdd = false;
  isEdit = false;
  isPermission = false;
  loading = false;
  defaultCheckedKeys: any[] = [];
  treeData: any[] = [];
  checkedKeys: any[] = [];
  halfCheckedKeys: any[] = [];

  created() {
    this.form = this.$form.createForm(this, { name: "roleOpForm" });
  }

  @Watch("record")
  modelChanged() {
    this.resetData();
    if (this.record && Object.keys(this.record).length > 0) {
      this.setFlag(this.record.type);
      if (this.isPermission) {
        this.loading = true;
        companyAPI
          .getRolePermission(this.record.roleId)
          .then((result: any) => {
            this.treeData = result.data;
            this.setTreeData(this.treeData);
            this.checkedKeys = this.defaultCheckedKeys;
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
          roleId: this.record.roleId,
          roleName: this.record.roleName,
        });
      }
    }
  }

  resetData() {
    this.defaultCheckedKeys = [];
    this.treeData = [];
    this.checkedKeys = [];
    this.halfCheckedKeys = [];
    this.isAdd = false;
    this.isEdit = false;
    this.isPermission = false;
  }

  setFlag(type: string) {
    if (type === "permission") {
      this.isPermission = true;
    } else if (type === "add") {
      this.isAdd = true;
    } else if (type === "edit") {
      this.isEdit = true;
    }
  }

  resetChecked() {
    this.checkedKeys = this.defaultCheckedKeys;
    this.halfCheckedKeys = [];
  }

  setTreeData(records: any[]) {
    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      record.title = this.$t(record.i18nKey);
      const children = record.children;
      if (children) {
        if (record.hasPermission) {
          this.defaultCheckedKeys.push(record.key);
        }
        this.setTreeData(children);
      } else {
        if (record.hasPermission) {
          this.defaultCheckedKeys.push(record.key);
        }
      }
    }
  }

  onCheck(checkedKeys: any[], info: any) {
    this.checkedKeys = checkedKeys;
    this.halfCheckedKeys = info.halfCheckedKeys;
  }

  handleClose() {
    this.$emit("cancel");
  }

  handleOk(result: any) {
    this.$emit("ok", result);
  }

  handleSetPermission() {
    this.loading = true;
    const selectedKeys: string[] = [
      ...this.checkedKeys,
      ...this.halfCheckedKeys,
    ];
    companyAPI
      .setRolePermission(this.record.roleId, selectedKeys)
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
        const role: any = {};
        role.roleId = values.roleId || "-1";
        role.roleName = values.roleName;
        companyAPI
          .saveCompanyRole(role)
          .then((result) => {
            this.handleOk(result.data);
          })
          .catch((error) => {
            this.$message.error(error.message);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    });
  }
}
</script>
<style lang="less" scoped>
button.right-button {
  margin-left: 10px;
  padding: 0 15px;
  font-size: 14px;
  width: 120px;
}
</style>
