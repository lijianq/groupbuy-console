<template>
  <a-modal
    title=""
    :width="880"
    :visible="visible"
    :footer="null"
    @cancel="
      () => {
        $emit('cancel');
      }
    "
  >
    <div>
      <a-button
        type="primary"
        class="editable-add-btn"
        icon="plus"
        @click="handleAdd"
        :disabled="editingKey !== ''"
        >{{ $t("system.route.add") }}</a-button
      >
      <a-table
        :columns="columns"
        :data-source="data"
        :pagination="false"
        rowKey="routeActionId"
      >
        <template slot="routeActionName" slot-scope="text, record">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :maxLength="30"
            :value="text"
            @change="
              (e) => handleChange(e.target.value, record, 'routeActionName')
            "
          />
          <template v-else>
            {{ text }}
          </template>
        </template>
        <template slot="routeActionNameI18key" slot-scope="text, record">
          <a-select
            v-if="record.editable"
            style="margin: -5px 0; width: 350px;"
            :defaultValue="text"
            @change="(e) => handleChange(e, record, 'routeActionNameI18key')"
          >
            <a-select-option
              v-for="i18nkey in i18nKeys"
              :key="i18nkey"
              :value="i18nkey"
            >
              {{ `${i18nkey}:  [${$t(i18nkey)}]` }}
            </a-select-option>
          </a-select>
          <template v-else>
            {{ `${text}:  [${$t(text)}]` }}
          </template>
        </template>
        <template slot="routeActionType" slot-scope="text">
          <template v-if="text === 'Preset'">
            {{ $t("common.yes") }}
          </template>
          <template v-else>
            {{ $t("common.no") }}
          </template>
        </template>
        <template
          slot="operation"
          slot-scope="text, record"
          v-if="record.routeActionType !== 'Preset'"
        >
          <span v-if="record.editable">
            <a @click="() => handleSave(record)">{{
              $t("common.save")
            }}</a>
            <a-divider type="vertical" />
            <a-popconfirm
              :okText="$t('common.ok')"
              :cancelText="$t('common.cancel')"
              :title="$t('common.cancel.message')"
              @confirm="() => handleCancel(record)"
            >
              <a>{{ $t("common.cancel") }}</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a
              :disabled="editingKey !== ''"
              @click="() => handleEdit(record)"
              >{{ $t("route.action.modify") }}</a
            >
            <a-divider type="vertical" />
            <a-popconfirm
              :okText="$t('common.ok')"
              :cancelText="$t('common.cancel')"
              :title="$t('common.delete.message')"
              @confirm="() => handleDelete(record.routeActionId)"
            >
              <a :disabled="editingKey !== ''">{{
                $t("route.action.delete")
              }}</a>
            </a-popconfirm>
          </span>
        </template>
      </a-table>
    </div>
  </a-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import ZhCN from "@/locales/lang/zh-CN";
import SystemAPI from "@/api/system/SystemAPI";

@Component
export default class RouteAction extends Vue {
  @Prop({ type: Boolean, default: false })
  visible = false;

  @Prop({ type: Object, default: null })
  route: any | {};

  tempKey = 0;

  columns: any[] = [
    {
      title: this.$t("system.route.action.name"),
      dataIndex: "routeActionName",
      width: "25%",
      scopedSlots: { customRender: "routeActionName" },
    },
    {
      title: this.$t("system.route.action.name.i18key"),
      dataIndex: "routeActionNameI18key",
      width: "40%",
      scopedSlots: { customRender: "routeActionNameI18key" },
    },
    {
      title: this.$t("system.route.preset"),
      dataIndex: "routeActionType",
      scopedSlots: { customRender: "routeActionType" },
    },
    {
      dataIndex: "operation",
      scopedSlots: { customRender: "operation" },
    },
  ];

  data: any[] = [];
  editingKey = "";
  editingRecord: any = {};
  i18nKeys: any[] = [];

  created() {
    this.i18nKeys = Object.keys(ZhCN.messages).filter((str: string) =>
      str.startsWith("route.action.")
    );
  }

  @Watch("route")
  routeChange() {
    this.resetEditing();
    this.data = [];
    if (this.route && this.route.routeId) {
      SystemAPI.getRouteActions(this.route.routeId)
        .then((result) => {
          this.data = result.data as any[];
        })
        .catch((error) => {
          this.$message.error(error.message);
        });
    }
  }

  initEditingRecord(record: any) {
    this.editingRecord = {};
    this.editingRecord.routeActionId = record.routeActionId;
    this.editingRecord.routeId = record.routeId;
    this.editingRecord.routeActionName = record.routeActionName;
    this.editingRecord.routeActionNameI18key = record.routeActionNameI18key;
    this.editingRecord.routeActionType = record.routeActionType;
  }

  resetEditing(record?: any) {
    if (record) {
      record.editable = false;
    }
    this.editingKey = "";
    this.editingRecord = {};
  }

  handleAdd() {
    this.tempKey = this.tempKey - 1;
    const key = this.tempKey.toString();
    const record: any = {
      routeActionId: key,
      routeActionName: "",
      routeActionNameI18key: "",
      routeActionType: "",
      routeId: this.route.routeId,
      editable: true,
    };
    this.initEditingRecord(record);
    this.editingKey = key;
    this.data = [record, ...this.data];
  }

  handleEdit(record: any) {
    const key = record.routeActionId;
    this.editingKey = key;
    this.initEditingRecord(record);
    record.editable = true;
  }

  handleChange(value: string, record: any, column: string) {
    this.editingRecord[column] = value;
  }

  handleCancel(record: any) {
    this.resetEditing(record);
    const key = record.routeActionId;
    if (key <= "0") {
      this.data = this.data.filter((item) => key !== item.routeActionId);
    }
  }

  handleSave(record: any) {
    const { editingRecord } = this;
    if (editingRecord.routeActionName === "") {
      this.$message.warn(
        this.$t("system.route.action.name.required").toString()
      );
      return;
    }

    if (
      editingRecord.routeActionName === record.routeActionName &&
      editingRecord.routeActionNameI18key === record.routeActionNameI18key
    ) {
      // no change
      this.resetEditing(record);
      return;
    }

    SystemAPI.createRouteAction(editingRecord)
      .then((result) => {
        const newRecord: any = result.data;
        console.log(newRecord);
        record.routeActionId = newRecord.routeActionId;
        record.routeActionName = newRecord.routeActionName;
        record.routeActionNameI18key = newRecord.routeActionNameI18key;
        record.routeActionType = newRecord.routeActionType;
        this.resetEditing(record);
      })
      .catch((error) => {
        this.$message.error(error.message);
      });
  }

  handleDelete(routeActionId: string) {
    SystemAPI.deleteRouteAction(routeActionId)
      .then(() => {
        this.data = this.data.filter(
          (item) => routeActionId !== item.routeActionId
        );
      })
      .catch((error) => {
        this.$message.error(error.message);
      });
  }
}
</script>

<style lang="less" scoped>
.editable-add-btn {
  margin-bottom: 10px;
  padding: 0 15px;
  font-size: 14px;
  height: 30px;
  width: 160px;
}
</style>
