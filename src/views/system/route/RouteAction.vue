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
        <template slot="routeActionType" slot-scope="text, record">
          <a-select
            v-if="record.editable"
            style="margin: -5px 0; width: 350px;"
            :defaultValue="text"
            @change="(e) => handleChange(e, record, 'routeActionType')"
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
        <template slot="routeActionResource" slot-scope="text, record">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :maxLength="30"
            :value="text"
            @change="
              (e) => handleChange(e.target.value, record, 'routeActionResource')
            "
          />
          <template v-else>
            {{ text }}
          </template>
        </template>
        <template
          slot="operation"
          slot-scope="text, record"
          v-if="record.routeActionPreset !== 0"
        >
          <span v-if="record.editable">
            <a @click="() => handleSave(record)">{{ $t("common.save") }}</a>
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

  get columns() {
    return [
      {
        title: this.$t("system.route.action.type"),
        dataIndex: "routeActionType",
        width: "40%",
        scopedSlots: { customRender: "routeActionType" },
      },
      {
        title: this.$t("system.route.action.resource"),
        dataIndex: "routeActionResource",
        width: "40%",
        scopedSlots: { customRender: "routeActionResource" },
      },
      {
        dataIndex: "operation",
        scopedSlots: { customRender: "operation" },
      },
    ];
  }

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
        .then((result: any) => {
          this.data = result.data;
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
    this.editingRecord.routeActionType = record.routeActionType;
    this.editingRecord.routeActionResource = record.routeActionResource;
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
      routeActionType: "",
      routeActionResource: "",
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
    if (editingRecord.routeActionType === "") {
      this.$message.warn(
        this.$t("system.route.action.type.required").toString()
      );
      return;
    }

    if (
      editingRecord.routeActionType === record.routeActionType &&
      editingRecord.routeActionResource === record.routeActionResource
    ) {
      // no change
      this.resetEditing(record);
      return;
    }

    SystemAPI.createRouteAction(editingRecord)
      .then((result) => {
        const newRecord: any = result.data;
        record.routeActionId = newRecord.routeActionId;
        record.routeActionType = newRecord.routeActionType;
        record.routeActionResource = newRecord.routeActionResource;
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
