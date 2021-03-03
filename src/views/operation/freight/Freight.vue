<template>
  <a-card :border="false">
    <div v-if="currentIndex === 0">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item :label="$t('operation.freight.name')">
                <a-input
                  v-model="queryParam.freightName"
                  :placeholder="$t('common.input.search.hint')"
                />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
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
          class="add-button"
          @click="handleAdd"
          icon="plus"
          >{{ $t("operation.freight.add") }}</a-button
        >
        <a-button
          type="danger"
          class="operation-button"
          icon="delete"
          v-if="rowSelection.selectedRowKeys.length > 0"
          @click="handleDelete()"
          >{{ $t("route.action.delete") }}</a-button
        >
      </div>

      <a-table
        :scroll="{ x: 1500, y: 500 }"
        rowKey="freightId"
        :loading="loading"
        :pagination="pagination"
        :columns="columns"
        :data-source="data"
        :rowSelection="rowSelection"
        @change="handleChange"
      >
        <span slot="default" slot-scope="text">
          <template>
            <div v-if="text === 0">
              {{ $t("common.yes") }}
            </div>
            <div v-else>
              {{ $t("common.no") }}
            </div>
          </template>
        </span>
        <span slot="chargeType" slot-scope="text">
          <template>
            <div v-if="text === 0">
              {{ $t("operation.freight.type.0") }}
            </div>
            <div v-else>
              {{ $t("operation.freight.type.1") }}
            </div>
          </template>
        </span>
        <span slot="shippingFree" slot-scope="text">
          <template>
            <div v-if="text === 0">
              {{ $t("common.yes") }}
            </div>
            <div v-else>
              {{ $t("common.no") }}
            </div>
          </template>
        </span>
        <span slot="rule" slot-scope="text, record">
          <template>
            <div v-if="record.chargeType === 0">
              {{
                `${record.defaultFirstUnit}${$t("operation.freight.unit")}${
                  record.defaultFirstPrice
                }${$t("common.money.unit")},${$t(
                  "operation.freight.increase"
                )}${record.defaultNextUnit}${$t("common.package.unit")}${$t(
                  "operation.freight.fee.increase"
                )}${record.defaultNextPrice}${$t("common.money.unit")}`
              }}
            </div>
            <div v-else>
              {{
                `${record.defaultFirstWeight}${$t("operation.freight.weight")}${
                  record.defaultFirstPrice
                }${$t("common.money.unit")},${$t(
                  "operation.freight.increase"
                )}${record.defaultNextWeight}${$t("common.weight.unit")}${$t(
                  "operation.freight.fee.increase"
                )}${record.defaultNextPrice}${$t("common.money.unit")}`
              }}
            </div>
          </template>
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <div>
              <a @click="handleEdit(record)">{{ $t("route.action.edit") }}</a>
            </div>
          </template>
        </span>
      </a-table>
    </div>
    <div v-if="currentIndex === 1">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" :tab="$t('operation.freight.add')">
          <a-form
            :form="form"
            id="freightOpForm"
            v-bind="formLayout"
            labelAlign="left"
          >
            <a-form-item
              v-show="currentRecord && currentRecord.freightId"
              :label="$t('operation.freight.id')"
            >
              <a-input v-decorator="['freightId']" disabled />
            </a-form-item>
            <a-form-item :label="$t('operation.freight.name')">
              <a-input
                v-decorator="[
                  'freightName',
                  {
                    rules: [
                      {
                        required: true,
                        max: 50,
                        message: $t('operation.freight.name.required'),
                      },
                    ],
                  },
                ]"
              >
              </a-input>
            </a-form-item>
            <a-form-item :label="$t('operation.freight.logistics')">
              <a-select v-decorator="['logisticsId']">
                <a-select-option
                  v-for="logistics in logisticsData"
                  :key="logistics.logisticsId"
                  :value="logistics.logisticsId"
                >
                  {{ logistics.logisticsName }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="$t('operation.freight.type')">
              <a-radio-group :options="typeOptions" v-model="chargeType" />
            </a-form-item>

            <a-form-item :label="$t('operation.freight.rule')">
              <a-form-item v-if="chargeType === '0'" :style="ruleColStyle">
                <a-input
                  :addonAfter="$t('operation.freight.unit')"
                  v-decorator="[
                    'defaultFirstUnit',
                    {
                      initialValue: '0',
                      rules: [
                        {
                          required: true,
                          pattern: /^[0-9]\d*$/,
                          message: $t('int.required'),
                        },
                      ],
                    },
                  ]"
                >
                </a-input>
              </a-form-item>
              <a-form-item v-else :style="ruleColStyle">
                <a-input
                  :addonAfter="$t('operation.freight.weight')"
                  v-decorator="[
                    'defaultFirstWeight',
                    {
                      initialValue: '0',
                      rules: [
                        {
                          required: true,
                          pattern: /^(([0-9]\d*)|\d)(\.\d{1,2})?$/,
                          message: $t('weight.required'),
                        },
                      ],
                    },
                  ]"
                >
                </a-input>
              </a-form-item>
              <a-form-item :style="ruleColStyle">
                <a-input
                  :addonAfter="$t('common.money.unit')"
                  v-decorator="[
                    'defaultFirstPrice',
                    {
                      initialValue: '0.00',
                      rules: [
                        {
                          required: true,
                          pattern: /^(([0-9]\d*)|\d)(\.\d{1,2})?$/,
                          message: $t('money.required'),
                        },
                      ],
                    },
                  ]"
                >
                </a-input>
              </a-form-item>
              <a-form-item v-if="chargeType === '0'" :style="ruleColStyle">
                <a-input
                  :addonBefore="$t('operation.freight.increase')"
                  :addonAfter="$t('common.package.unit')"
                  v-decorator="[
                    'defaultNextUnit',
                    {
                      initialValue: '0',
                      rules: [
                        {
                          required: true,
                          pattern: /^[0-9]\d*$/,
                          message: $t('int.required'),
                        },
                      ],
                    },
                  ]"
                >
                </a-input>
              </a-form-item>
              <a-form-item v-else :style="ruleColStyle">
                <a-input
                  :addonBefore="$t('operation.freight.increase')"
                  :addonAfter="$t('common.weight.unit')"
                  v-decorator="[
                    'defaultNextWeight',
                    {
                      initialValue: '0',
                      rules: [
                        {
                          required: true,
                          pattern: /^(([0-9]\d*)|\d)(\.\d{1,2})?$/,
                          message: $t('weight.required'),
                        },
                      ],
                    },
                  ]"
                >
                </a-input>
              </a-form-item>
              <a-form-item :style="ruleColStyle">
                <a-input
                  :addonBefore="$t('operation.freight.fee.increase')"
                  :addonAfter="$t('common.money.unit')"
                  v-decorator="[
                    'defaultNextPrice',
                    {
                      initialValue: '0.00',
                      rules: [
                        {
                          required: true,
                          pattern: /^(([0-9]\d*)|\d)(\.\d{1,2})?$/,
                          message: $t('money.required'),
                        },
                      ],
                    },
                  ]"
                >
                </a-input>
              </a-form-item>
            </a-form-item>
            <a-form-item :label="$t('operation.freight.free')">
              <a-switch v-model="isShippingFree" />
            </a-form-item>
            <a-form-item :label="$t('operation.freight.free.amount')">
              <a-input
                v-decorator="[
                  'shippingFreeAmount',
                  {
                    initialValue: '0.00',
                    rules: [
                      {
                        required: true,
                        pattern: /^(([0-9]\d*)|\d)(\.\d{1,2})?$/,
                        message: $t('money.required'),
                      },
                    ],
                  },
                ]"
              >
              </a-input>
            </a-form-item>
            <a-form-item :label="$t('operation.freight.default')">
              <a-switch v-model="isDefault" />
            </a-form-item>
            <a-form-item
              :label="$t('operation.freight.region.rule')"
              :wrapperCol="{ xs: { span: 24 }, sm: { span: 18 } }"
            >
              <a-button
                style="width: 100%; margin-bottom: 16px"
                type="dashed"
                icon="plus"
                @click="handleAddRule"
                >{{ $t("operation.freight.region.add") }}</a-button
              >
              <a-table
                rowKey="freightRegionId"
                :loading="regionLoading"
                :columns="regionColumns"
                :data-source="regionData"
                :pagination="false"
              >
                <span slot="rule" slot-scope="text, record">
                  <template>
                    <div v-if="chargeType === '0'">
                      {{
                        `${record.firstUnit}${$t("operation.freight.unit")}${
                          record.firstPrice
                        }${$t("common.money.unit")},${$t(
                          "operation.freight.increase"
                        )}${record.nextUnit}${$t("common.package.unit")}${$t(
                          "operation.freight.fee.increase"
                        )}${record.nextPrice}${$t("common.money.unit")}`
                      }}
                    </div>
                    <div v-else>
                      {{
                        `${record.firstWeight}${$t(
                          "operation.freight.weight"
                        )}${record.firstPrice}${$t("common.money.unit")},${$t(
                          "operation.freight.increase"
                        )}${record.nextWeight}${$t("common.weight.unit")}${$t(
                          "operation.freight.fee.increase"
                        )}${record.nextPrice}${$t("common.money.unit")}`
                      }}
                    </div>
                  </template>
                </span>
                <span slot="action" slot-scope="text, record">
                  <template>
                    <div>
                      <a @click="handleDeleteRule(record)">{{
                        $t("route.action.delete")
                      }}</a>
                    </div>
                  </template>
                </span>
              </a-table>
            </a-form-item>

            <a-form-item>
              <a-button
                :loading="saveLoading"
                class="operation-button"
                type="primary"
                @click="handleSave"
                >{{ $t("route.action.save") }}</a-button
              >
              <a-button class="operation-button" @click="handleCancel">{{
                $t("common.cancel")
              }}</a-button>
            </a-form-item>

            <role-operation
              ref="roleOperation"
              :visible="visible"
              :charge-type="chargeType"
              :area-data="areaData"
              @cancel="handleCancelRule"
              @ok="handleOk"
            />
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import operationAPI from "@/api/operation/OperationAPI";
import { Modal } from "ant-design-vue";
import RoleOperation from "./RuleOperation.vue";
import { WrappedFormUtils } from "ant-design-vue/types/form/form";

@Component({
  components: {
    RoleOperation,
  },
})
export default class Freight extends Vue {
  formLayout: any = {
    labelCol: {
      xs: { span: 12 },
      sm: { span: 3 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  };

  ruleColStyle: any = {
    "margin-right": "2px",
    display: "inline-block",
    width: "calc(50% - 5px)",
  };

  currentIndex = 0;
  queryParam: any = {};
  data: any[] = [];
  logisticsData: any[] = [];
  typeOptions: any[] = [
    { label: this.$t("operation.freight.type.0"), value: "0" },
    { label: this.$t("operation.freight.type.1"), value: "1" },
  ];
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
  form!: WrappedFormUtils;
  visible = false;
  currentRecord: any = null;
  regionLoading = false;
  saveLoading = false;
  regionData: any[] = [];
  areaData: any[] = [];
  chargeType = "";
  isDefault = false;
  isShippingFree = false;
  tempRuleId = 0;
  fields = [
    "freightId",
    "freightName",
    "logisticsId",
    "defaultFirstUnit",
    "defaultFirstWeight",
    "defaultFirstPrice",
    "defaultNextUnit",
    "defaultNextWeight",
    "defaultNextPrice",
    "shippingFreeAmount",
  ];
  get columns() {
    return [
      {
        title: this.$t("operation.freight.name"),
        dataIndex: "freightName",
        fixed: "left",
        width: 150,
      },
      {
        title: this.$t("operation.freight.default"),
        dataIndex: "isDefault",
        scopedSlots: { customRender: "default" },
      },
      {
        title: this.$t("operation.freight.logistics"),
        dataIndex: "logisticsName",
      },
      {
        title: this.$t("operation.freight.type"),
        dataIndex: "chargeType",
        scopedSlots: { customRender: "chargeType" },
      },
      {
        title: this.$t("operation.freight.free"),
        dataIndex: "isShippingFree",
        scopedSlots: { customRender: "shippingFree" },
      },
      {
        title: this.$t("operation.freight.free.amount"),
        dataIndex: "shippingFreeAmount",
      },
      {
        title: this.$t("operation.freight.rule"),
        dataIndex: "defaultFirstUnit",
        scopedSlots: { customRender: "rule" },
        width: "25%",
      },
      {
        title: this.$t("common.action"),
        dataIndex: "action",
        fixed: "right",
        width: 150,
        scopedSlots: { customRender: "action" },
      },
    ];
  }

  get regionColumns() {
    return [
      {
        title: this.$t("operation.freight.region"),
        dataIndex: "areaName",
      },
      {
        title: this.$t("operation.freight.rule"),
        dataIndex: "firstUnit",
        scopedSlots: { customRender: "rule" },
      },
      {
        title: this.$t("common.action"),
        dataIndex: "action",
        scopedSlots: { customRender: "action" },
      },
    ];
  }

  created() {
    this.form = this.$form.createForm(this, { name: "freightOpForm" });
    this.processQuery();
    this.getLogistics();
    this.getArea();
  }

  onSelectChange(selectedRowKeys: any[]) {
    this.rowSelection.selectedRowKeys = selectedRowKeys;
  }

  getLogistics() {
    operationAPI
      .getLogisticsOption()
      .then((result: any) => {
        this.logisticsData = result.data;
      })
      .catch((error) => {
        this.$message.error(error.message);
      });
  }

  getArea() {
    operationAPI
      .getProvince()
      .then((result: any) => {
        this.areaData = result.data;
      })
      .catch((error) => {
        this.$message.error(error.message);
      });
  }

  getFreight(query: any) {
    this.loading = true;
    operationAPI
      .getFreight(query)
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
    this.getFreight(query);
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
      title: this.$t("operation.freight.delete.title"),
      content: this.$t("operation.freight.delete.content"),
      onOk: () => {
        this.loading = true;
        operationAPI
          .deleteFreight(this.rowSelection.selectedRowKeys)
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

  handleAdd() {
    this.currentRecord = {};
    this.regionData = [];
    this.chargeType = "0";
    this.isDefault = false;
    this.isShippingFree = false;
    this.currentIndex = 1;
  }

  handleEdit(record: any) {
    this.currentRecord = record;
    this.chargeType = this.currentRecord.chargeType.toString();
    this.isDefault = this.currentRecord.isDefault === 0;
    this.isShippingFree = this.currentRecord.isShippingFree === 0;
    this.fields.forEach((v) => this.form.getFieldDecorator(v, {}));
    this.form.setFieldsValue({
      freightId: this.currentRecord.freightId,
      freightName: this.currentRecord.freightName,
      logisticsId: this.currentRecord.logisticsId,
      defaultFirstUnit: this.currentRecord.defaultFirstUnit,
      defaultFirstWeight: this.currentRecord.defaultFirstWeight,
      defaultFirstPrice: this.currentRecord.defaultFirstPrice,
      defaultNextUnit: this.currentRecord.defaultNextUnit,
      defaultNextWeight: this.currentRecord.defaultNextWeight,
      defaultNextPrice: this.currentRecord.defaultNextPrice,
      shippingFreeAmount: this.currentRecord.shippingFreeAmount,
    });
    this.regionLoading = true;
    operationAPI
      .getFreightRegion(this.currentRecord.freightId)
      .then((result: any) => {
        this.regionData = result.data;
      })
      .catch((error) => {
        this.$message.error(error.message);
      })
      .finally(() => {
        this.regionLoading = false;
      });
    this.currentIndex = 1;
  }

  handleTypeChange(event: any) {
    this.chargeType = event.target.value;
  }

  handleSave() {
    this.saveLoading = true;
    this.form.validateFields((err, values) => {
      if (!err) {
        const freight: any = {};
        freight.freightId = values.freightId || "-1";
        freight.companyId = "0";
        freight.freightName = values.freightName;
        freight.logisticsId = values.logisticsId;
        freight.chargeType = this.chargeType;
        freight.defaultFirstUnit = values.defaultFirstUnit || "0";
        freight.defaultFirstWeight = values.defaultFirstWeight || "0.00";
        freight.defaultFirstPrice = values.defaultFirstPrice;
        freight.defaultNextUnit = values.defaultNextUnit || "0";
        freight.defaultNextWeight = values.defaultNextWeight || "0.00";
        freight.defaultNextPrice = values.defaultNextPrice;
        freight.isShippingFree = this.isShippingFree ? "0" : "1";
        freight.shippingFreeAmount = values.shippingFreeAmount;
        freight.isDefault = this.isDefault ? "0" : "1";
        const freightRequest: any = {};
        freightRequest.freight = freight;
        freightRequest.freightRegions = this.regionData;
        operationAPI
          .saveFreight(freightRequest)
          .then(() => {
            this.processQuery();
            this.currentIndex = 0;
          })
          .catch((error) => {
            this.$message.error(error.message);
          })
          .finally(() => {
            this.saveLoading = false;
          });
      }
    });
  }

  handleCancel() {
    this.currentIndex = 0;
  }

  handleAddRule() {
    this.visible = true;
  }

  handleOk(result: any) {
    this.visible = false;
    const freightRegion: any = {};
    this.tempRuleId = this.tempRuleId - 1;
    freightRegion.freightRegionId = this.tempRuleId.toString();
    freightRegion.freightId = this.currentRecord.freightId || "-1";
    freightRegion.companyId = this.currentRecord.companyId || "0";
    freightRegion.areaId = result.area.key;
    freightRegion.areaName = result.area.label.trim();
    freightRegion.firstUnit = result.firstUnit || "0";
    freightRegion.firstPrice = result.firstPrice;
    freightRegion.firstWeight = result.firstWeight || "0.00";
    freightRegion.nextUnit = result.nextUnit || "0";
    freightRegion.nextPrice = result.nextPrice;
    freightRegion.nextWeight = result.nextWeight || "0.00";
    this.regionData = this.regionData.filter(
      (item) => item.areaId !== freightRegion.areaId
    );
    this.regionData.push(freightRegion);
  }

  handleCancelRule() {
    this.visible = false;
  }

  handleDeleteRule(record: any) {
    this.regionData = this.regionData.filter(
      (item) => item.freightRegionId !== record.freightRegionId
    );
  }
}
</script>
<style lang="less" scoped>
button.add-button {
  margin-right: 12px;
  padding: 0 15px;
  font-size: 14px;
  height: 32px;
  width: 150px;
}
</style>
