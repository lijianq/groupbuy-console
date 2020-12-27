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
      <a-button type="primary" class="operation-button">{{
        $t("route.action.query")
      }}</a-button>
      <a-button class="operation-button">{{ $t("common.reset") }}</a-button>
      <a-button
        type="danger"
        class="operation-button"
        icon="delete"
        v-if="rowSelection.selectedRowKeys.length > 0"
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
    >
      <span slot="action" slot-scope="text, record">
        <template>
          <a v-if="record">{{ $t("route.action.info") }}</a>
          <a-divider type="vertical" />
        </template>
        <template>
          <a-dropdown>
            <a class="ant-dropdown-link">
              {{ $t("common.more") }} <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a>{{ $t("route.action.company.appoval") }}</a>
              </a-menu-item>
              <a-menu-item>
                <a>{{ $t("route.action.company.permission") }}</a>
              </a-menu-item>
              <a-menu-item>
                <a>{{ $t("route.action.company.status") }}</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
      </span>
    </a-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Address, Industry } from "@/config";
import systemAPI from "@/api/system/SystemAPI";

@Component
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
    defaultPageSize: 10,
    pageSizeOptions: ["10", "30", "50", "100"],
    showSizeChanger: true,
  };

  created() {
    this.industries = Industry.industries;
    this.addressOptions = Address.options;
    this.queryParam.pageNumber = this.pagination.defaultCurrent;
    this.queryParam.pageSize = this.pagination.defaultPageSize;
    this.getCompanies(this.queryParam);
  }

  onSelectChange(selectedRowKeys: any[]) {
    this.rowSelection.selectedRowKeys = selectedRowKeys;
  }

  getCompanies(queryParam: any) {
    this.loading = true;
    systemAPI
      .getCompanies(queryParam)
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
}
</script>

<style lang="less" scoped>
button.operation-button {
  padding: 0 15px;
  font-size: 14px;
  height: 35px;
  width: 160px;
}
</style>
