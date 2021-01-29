<template>
  <a-card :board="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item :label="$t('account.name')">
              <a-input
                v-model="queryParam.accountName"
                :placeholder="$t('common.input.search.hint')"
              />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item :label="$t('account.full.name')">
              <a-input
                v-model="queryParam.accountFullName"
                :placeholder="$t('common.input.search.hint')"
              />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item :label="$t('account.email')">
              <a-input
                :placeholder="$t('common.input.email.hint')"
                v-model="queryParam.accountEmail"
              />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item :label="$t('account.phone')">
              <a-input
                v-model="queryParam.accountPhone"
                :placeholder="$t('common.input.search.hint')"
              />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item :label="$t('account.status')">
              <a-select
                v-model="queryParam.accountStatus"
                :placeholder="$t('common.select.search.hint')"
              >
                <a-select-option value="Active">{{
                  $t("account.status.active")
                }}</a-select-option>
                <a-select-option value="Inactive">{{
                  $t("account.status.inactive")
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-button
              type="primary"
              class="query-button"
              @click="handleQuery"
              >{{ $t("route.action.query") }}</a-button
            >
            <a-button class="query-button" @click="handleReset">{{
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
        >{{ $t("account.add") }}</a-button
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
      rowKey="accountId"
      :loading="loading"
      :pagination="pagination"
      :columns="columns"
      :data-source="data"
      :rowSelection="rowSelection"
      @change="handleChange"
    >
      <span slot="accountStatus" slot-scope="text">
        <template>
          {{ $t(`account.status.${text.toLowerCase()}`) }}
        </template>
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <div v-if="record.accountId !== record.companyId">
            <a @click="handleEdit(record)">{{ $t("route.action.edit") }}</a>
            <a-divider type="vertical" />
            <a @click="handleRole(record)">{{ $t("account.role") }}</a>
          </div>
          <div v-else>
            {{ $t("account.preset.admin") }}
          </div>
        </template>
      </span>
    </a-table>

    <account-operation
      ref="accountOperation"
      :visible="visible"
      :record="currentRecord"
      @cancel="handleCancel"
      @ok="handleOk"
    />
  </a-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import companyAPI from "@/api/company/CompanyAPI";
import { Modal } from "ant-design-vue";
import AccountOperation from "./AccountOperation.vue";

@Component({
  components: {
    AccountOperation,
  },
})
export default class AccountManage extends Vue {
  queryParam: any = {};
  get columns() {
    return [
      {
        title: this.$t("account.id"),
        dataIndex: "accountId",
      },
      {
        title: this.$t("account.name"),
        dataIndex: "accountName",
      },
      {
        title: this.$t("account.full.name"),
        dataIndex: "accountFullName",
      },
      {
        title: this.$t("account.email"),
        dataIndex: "accountEmail",
      },
      {
        title: this.$t("account.phone"),
        dataIndex: "accountPhone",
      },
      {
        title: this.$t("account.status"),
        dataIndex: "accountStatus",
        scopedSlots: { customRender: "accountStatus" },
      },
      {
        title: this.$t("common.action"),
        dataIndex: "action",
        scopedSlots: { customRender: "action" },
      },
    ];
  }

  data: any[] = [];

  rowSelection: any = {
    selectedRowKeys: [],
    onChange: this.onSelectChange,
    getCheckboxProps: this.canSelected,
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

  canSelected(record: any) {
    if (record.accountId === record.companyId) {
      return {
        props: {
          disabled: true,
        },
      };
    }
    return { props: {} };
  }

  getCompanyAccounts(query: any) {
    this.loading = true;
    companyAPI
      .getCompanyAccounts(query)
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
    this.getCompanyAccounts(query);
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
      title: this.$t("account.delete.title"),
      content: this.$t("account.delete.content"),
      onOk: () => {
        this.loading = true;
        companyAPI
          .deleteCompanyAccounts(this.rowSelection.selectedRowKeys)
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
    if (this.currentRecord.accountId) {
      this.currentRecord.accountName = result.accountName;
      this.currentRecord.accountFullName = result.accountFullName;
      this.currentRecord.accountEmail = result.accountEmail;
      this.currentRecord.accountPhone = result.accountPhone;
      this.currentRecord.accountStatus = result.accountStatus;
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

  handleRole(record: any) {
    this.currentRecord = record;
    this.currentRecord.type = "role";
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
