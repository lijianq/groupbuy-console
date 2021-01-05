<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item :label="$t('role.name')">
              <a-input
                v-model="queryParam.roleName"
                :placeholder="$t('common.input.search.hint')"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-button
              type="primary"
              class="operation-button"
              @click="handleQuery"
              >{{ $t("route.action.query") }}</a-button
            >
            <a-button class="operation-button" @click="handleReset">{{
              $t("common.reset")
            }}</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button
        type="primary"
        class="operation-button"
        @click="handleAdd"
        icon="plus"
        >{{ $t("role.add") }}</a-button
      >
      <a-button
        type="danger"
        class="operation-button"
        icon="delete"
        v-if="rowSelection.selectedRowKeys.length > 0"
        @click="handleDelete(rowSelection.selectedRowKeys)"
        >{{ $t("route.action.delete") }}</a-button
      >
    </div>

    <a-table
      rowKey="roleId"
      :loading="loading"
      :pagination="pagination"
      :columns="columns"
      :data-source="data"
      :rowSelection="rowSelection"
      @change="handleChange"
    >
      <span slot="action" slot-scope="text, record">
        <template>
          <div>
            <a @click="handleEdit(record)">{{ $t("route.action.edit") }}</a>
            <a-divider type="vertical" />
            <a @click="handlePermission(record)">{{
              $t("route.action.permission")
            }}</a>
          </div>
        </template>
      </span>
    </a-table>

    <role-operation
      ref="roleOperation"
      :visible="visible"
      :record="currentRecord"
      @cancel="handleCancel"
      @ok="handleOk"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import companyAPI from "@/api/company/CompanyAPI";
import { Modal } from "ant-design-vue";
import RoleOperation from "./RoleOperation.vue";

@Component({
  components: {
    RoleOperation,
  },
})
export default class RoleManage extends Vue {
  queryParam: any = {};
  get columns() {
    return [
      {
        title: this.$t("role.id"),
        dataIndex: "roleId",
      },
      {
        title: this.$t("role.name"),
        dataIndex: "roleName",
      },
      {
        title: "",
        dataIndex: "action",
        scopedSlots: { customRender: "action" },
      },
    ];
  }

  data: any[] = [];

  rowSelection: any = {
    selectedRowKeys: [],
    onChange: this.onSelectChange,
  };

  loading = false;
  pagination: any = {
    defaultCurrent: 1,
    current: 1,
    defaultPageSize: 10,
    pageSize: 10,
    pageSizeOptions: ["10", "30", "50", "100"],
    showSizeChanger: true,
  };

  // operation modal
  visible = false;
  currentRecord: any = null;

  created() {
    this.processQuery();
  }

  onSelectChange(selectedRowKeys: any[]) {
    this.rowSelection.selectedRowKeys = selectedRowKeys;
  }

  getCompanyRoles(query: any) {
    this.loading = true;
    companyAPI
      .getCompanyRoles(query)
      .then((result: any) => {
        const records: any = result.data;
        const pagination = { ...this.pagination };
        pagination.total = parseInt(records.totalCount);
        this.data = records.resultSet;
        this.pagination = pagination;
      })
      .catch((error) => {
        this.$message.error(error.message);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  processQuery() {
    this.rowSelection.selectedRowKeys = [];
    const query: any = { ...this.queryParam };
    query.pageNumber = this.pagination.current;
    query.pageSize = this.pagination.pageSize;
    this.getCompanyRoles(query);
  }

  handleQuery() {
    this.pagination.current = 1;
    this.processQuery();
  }

  handleChange(pagination: any) {
    if (this.pagination.pageSize !== pagination.pageSize) {
      this.pagination.current = 1;
    } else {
      this.pagination.current = pagination.current;
    }
    this.pagination.pageSize = pagination.pageSize;
    this.processQuery();
  }

  handleReset() {
    this.queryParam = {};
  }

  handleDelete() {
    Modal.confirm({
      okText: this.$t("common.ok").toString(),
      cancelText: this.$t("common.cancel").toString(),
      icon: () =>
        this.$createElement("a-icon", {
          props: {
            type: "exclamation-circle",
            theme: "twoTone",
            twoToneColor: "#FF0000",
          },
        }),
      title: this.$t("role.delete.title"),
      content: this.$t("role.delete.content"),
      onOk: () => {
        this.loading = true;
        companyAPI
          .deleteCompanyRoles(this.rowSelection.selectedRowKeys)
          .then(() => {
            this.rowSelection.selectedRowKeys = [];
            this.handleQuery();
          })
          .catch((error) => {
            this.$message.error(error.message);
          })
          .finally(() => {
            this.loading = false;
          });
      },
      onCancel: () => {
        // do nothing
      },
    });
  }

  handleOk(result: any) {
    this.visible = false;
    if (this.currentRecord.roleId) {
      this.currentRecord.roleName = result.roleName;
    } else {
      this.rowSelection.selectedRowKeys = [];
      this.handleQuery();
    }
    setTimeout(() => {
      this.currentRecord = null;
    }, 150);
  }

  handleCancel() {
    this.visible = false;
    setTimeout(() => {
      this.currentRecord = null;
    }, 150);
  }

  handlePermission(record: any) {
    this.currentRecord = record;
    this.currentRecord.type = "permission";
    this.visible = true;
  }

  handleAdd() {
    this.currentRecord = {};
    this.currentRecord.type = "add";
    this.visible = true;
  }

  handleEdit(record: any) {
    this.currentRecord = record;
    this.currentRecord.type = "edit";
    this.visible = true;
  }
}
</script>

<style lang="less" scoped>
button.operation-button {
  margin-right: 12px;
  padding: 0 15px;
  font-size: 14px;
  height: 32px;
  width: 120px;
}
</style>
