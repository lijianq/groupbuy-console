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
          >{{ $t("permission.set") }}</a-button
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
            :checkStrictly="true"
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
  title: string = this.$t("router.menu.company.role").toString();

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
  listData: any[] = [];
  checkedKeys: any[] = [];

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
    this.listData = [];
    this.checkedKeys = [];
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
  }

  setTreeData(records: any[]) {
    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      record.title = this.$t(record.name);
      if (record.hasPermission) {
        this.defaultCheckedKeys.push(record.key);
      }
      this.listData.push(record);
      const children = record.children;
      if (children) {
        this.setTreeData(children);
      }
    }
  }

  onCheck(checkedKeys: any, event: any) {
    this.checkedKeys = checkedKeys.checked;
    if (event.checked) {
      this.checkParent(event.node.dataRef);
    } else {
      this.uncheckChildren(event.node.dataRef);
    }
  }

  checkParent(record: any) {
    const parentKey: string = record.parentKey;
    if (parentKey) {
      if (!this.checkedKeys.includes(parentKey)) {
        this.checkedKeys.push(parentKey);
      }
      const parent: any = this.listData.filter(
        (item) => item.key === parentKey
      );
      this.checkParent(parent[0]);
    }
  }

  uncheckChildren(record: any) {
    const children = record.children;
    if (children && children.length > 0) {
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (this.checkedKeys.includes(child.key)) {
          this.checkedKeys = this.checkedKeys.filter(
            (key: string) => key !== child.key
          );
        }
        this.uncheckChildren(child);
      }
    }
  }

  handleClose() {
    this.$emit("cancel");
  }

  handleOk(result: any) {
    this.$emit("ok", result);
  }

  handleSetPermission() {
    this.loading = true;
    const request: any = {};
    request.newIds = this.checkedKeys;
    request.oldIds = this.defaultCheckedKeys;
    companyAPI
      .setRolePermission(this.record.roleId, request)
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
      } else {
        this.loading = false;
      }
    });
  }
}
</script>
