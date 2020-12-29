<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item :label="$t('company.name')">
              <a-input
                v-model="queryParam.companyName"
                :placeholder="$t('common.input.search.hint')"
              />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item :label="$t('company.status')">
              <a-select
                v-model="queryParam.companyStatus"
                :placeholder="$t('common.select.search.hint')"
              >
                <a-select-option value="New">{{
                  $t("company.status.new")
                }}</a-select-option>
                <a-select-option value="Invalid">{{
                  $t("company.status.invalid")
                }}</a-select-option>
                <a-select-option value="Active">{{
                  $t("company.status.active")
                }}</a-select-option>
                <a-select-option value="Expired">{{
                  $t("company.status.expired")
                }}</a-select-option>
                <a-select-option value="Inactive">{{
                  $t("company.status.inactive")
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item :label="$t('company.industry')">
              <a-select
                v-model="queryParam.companyIndustry"
                :placeholder="$t('common.select.search.hint')"
              >
                <a-select-option
                  v-for="industry in industries"
                  :key="industry.value"
                  :value="industry.value"
                >
                  {{ $t(industry.label) }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item :label="$t('company.region')">
              <a-cascader
                :options="addressOptions"
                :placeholder="$t('common.select.address.hint')"
                v-model="queryParam.companyRegion"
              />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item :label="$t('company.address')">
              <a-input
                v-model="queryParam.companyAddress"
                :placeholder="$t('common.input.search.hint')"
              />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item :label="$t('company.email')">
              <a-input
                :placeholder="$t('common.input.email.hint')"
                v-model="queryParam.companyEmail"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" class="operation-button" @click="handleQuery">{{
        $t("route.action.query")
      }}</a-button>
      <a-button class="operation-button" @click="handleReset">{{ $t("common.reset") }}</a-button>
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
      rowKey="companyId"
      :loading="loading"
      :pagination="pagination"
      :columns="columns"
      :data-source="data"
      :rowSelection="rowSelection"
      @change="handleChange"
    >
      <span slot="companyStatus" slot-scope="text">
        <template>
          {{ $t(`company.status.${text.toLowerCase()}`)}}
        </template>
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <div v-if="record.companyStatus === 'New'">
            <a @click="handleApprove(record)">{{ $t("route.action.examine") }}</a>
          </div>
          <div v-else>
            <a @click="handleDetail(record)">{{ $t("route.action.detail") }}</a>
            <a-divider type="vertical" />
            <a @click="handlePermission(record)">{{ $t("route.action.permission") }}</a>
          </div>
        </template>
      </span>
    </a-table>

    <company-detail
      ref="companyDetail"
      :visible="visible"
      :record="currentRecord"
      @cancel="handleCancel"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Address, Industry } from "@/config";
import systemAPI from "@/api/system/SystemAPI";
import { Modal } from "ant-design-vue";
import CompanyDetail from "./CompanyDetail.vue";

@Component({
  components: {
    CompanyDetail
  }
})
export default class Company extends Vue {
  queryParam: any = {};
  get columns() {
    return [
      {
        title: this.$t("company.id"),
        dataIndex: "companyId",
      },
      {
        title: this.$t("company.name"),
        dataIndex: "companyName",
      },
      {
        title: this.$t("company.contact"),
        dataIndex: "companyContact",
      },
      {
        title: this.$t("company.email"),
        dataIndex: "companyEmail",
      },
      {
        title: this.$t("company.phone"),
        dataIndex: "companyPhone",
      },
      {
        title: this.$t("company.status"),
        dataIndex: "companyStatus",
        scopedSlots: { customRender: "companyStatus" },
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

  industries: any[] = [];
  addressOptions: any[] = [];
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
    this.industries = Industry.industries;
    this.addressOptions = Address.options;
    this.processQuery();
  }

  onSelectChange(selectedRowKeys: any[]) {
    this.rowSelection.selectedRowKeys = selectedRowKeys;
  }

  getCompanies(query: any) {
    this.loading = true;
    systemAPI
      .getCompanies(query)
      .then((result) => {
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
    this.rowSelection.selectedRowKeys = []
    const query: any = {...this.queryParam}
    if (query.companyRegion) {
      query.companyRegion = query.companyRegion.toString()
    }
    query.pageNumber = this.pagination.current
    query.pageSize = this.pagination.pageSize
    this.getCompanies(query)
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
    this.queryParam = {}
  }

  handleDelete(ids: string[]) {
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
      title: this.$t("company.delete.title"),
      content: this.$t("company.delete.content"),
      onOk: () => {
        this.loading = true;
        systemAPI.deleteCompanies(ids)
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

  handleCancel() {
    this.visible = false;
    setTimeout(() => {
       this.currentRecord = null;
    }, 150)
  }

  handleDetail(record: any) {
    record.type = "detail";
    this.currentRecord = record;
    this.visible = true;
  }

  handlePermission(record: any) {
    record.type = "permission";
    this.currentRecord = record;
    this.visible = true;
  }

  handleApprove(record: any) {
    record.type = "approval";
    this.currentRecord = record;
    this.visible = true;
  }
}
</script>

<style lang="less" scoped>
button.operation-button {
  padding: 0 15px;
  font-size: 14px;
  height: 35px;
  width: 120px;
}
</style>
