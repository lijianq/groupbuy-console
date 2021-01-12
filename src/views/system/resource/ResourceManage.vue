<template>
  <div>
    <div class="table-operator">
      <a-button
        type="primary"
        class="operation-button"
        icon="plus"
        @click="handleAdd"
        >{{ $t("system.resource.create") }}</a-button
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
      :columns="columns"
      :data-source="data"
      :row-selection="rowSelection"
      :pagination="false"
      :loading="dataLoading"
      rowKey="resourceId"
    >
      <span slot="type" slot-scope="text">
        <template>
          {{ $t(`system.resource.${text.toLowerCase()}`) }}
        </template>
      </span>
      <span slot="action" slot-scope="text, record">
        <template v-if="record.resourceType !== 'Preset'">
          <a @click="handleEdit(record)">{{ $t("route.action.modify") }}</a>
          <a-divider type="vertical" />

          <a v-if="record.resourceType === 'Group'" @click="addChild(record)">{{
            $t("system.resource.child")
          }}</a>
        </template>
      </span>
    </a-table>

    <resource-operation
      ref="createModal"
      :visible="visible"
      :loading="confirmLoading"
      :model="mdl"
      @cancel="handleCancel"
      @ok="handleOk"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ResourceOperation from "./ResourceOperation.vue";
import SystemAPI from "@/api/system/SystemAPI";
import { WrappedFormUtils } from "ant-design-vue/types/form/form";
import { Modal } from "ant-design-vue";

@Component({
  components: {
    ResourceOperation,
  },
})
export default class ResourceManage extends Vue {
  get columns() {
    return [
      {
        title: this.$t("system.resource.name"),
        dataIndex: "resourceName",
      },
      {
        title: this.$t("system.resource.type"),
        dataIndex: "resourceType",
        scopedSlots: { customRender: "type" },
      },
      {
        title: this.$t("system.resource.method"),
        dataIndex: "resourceMethod",
      },
      {
        title: this.$t("system.resource.path"),
        dataIndex: "resourcePath",
      },
      {
        title: this.$t("common.action"),
        dataIndex: "action",
        scopedSlots: { customRender: "action" },
      },
    ];
  }

  data: any[] = [];
  dataLoading = false;

  rowSelection: any = {
    selectedRowKeys: [],
    onChange: this.onChange,
    getCheckboxProps: this.canSelected,
    onSelect: this.onSelect,
  };

  mdl: any = null;
  visible = false;
  confirmLoading = false;

  created() {
    this.refreshData();
  }

  refreshData() {
    this.dataLoading = true;
    SystemAPI.getResources()
      .then((response) => {
        this.data = response.data as any[];
        this.rowSelection.selectedRowKeys = [];
      })
      .catch((error) => {
        this.$message.error(error.message);
      })
      .finally(() => {
        this.dataLoading = false;
      });
  }

  onChange(selectedRowKeys: any[]) {
    this.rowSelection.selectedRowKeys = selectedRowKeys;
  }

  onSelect(record: any, selected: boolean, selectedRows: any[]) {
    if (selected) {
      this.selectChildren(record);
    } else {
      this.unselectChildren(record);
      this.unselectParents(record, selectedRows);
    }
  }

  fetchChidrenIds(record: any, cids: string[]) {
    const children = record.children;
    if (children && children.length > 0) {
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        cids.push(child.resourceId);
        this.fetchChidrenIds(child, cids);
      }
    }
  }

  fetchSelectedPIds(record: any, selectedRows: any[], pids: string[]) {
    const parentId: string = record.resourceParentId;
    if (parentId !== "0") {
      pids.push(parentId);
      const parents: any[] = selectedRows.filter(
        (item) => item.resourceId === parentId
      );
      if (parents && parents.length > 0) {
        this.fetchSelectedPIds(parents[0], selectedRows, pids);
      }
    }
  }

  selectChildren(record: any) {
    const children = record.children;
    if (children && children.length > 0) {
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (!this.rowSelection.selectedRowKeys.includes(child.resourceId)) {
          this.rowSelection.selectedRowKeys.push(child.resourceId);
        }
        this.selectChildren(child);
      }
    }
  }

  unselectChildren(record: any) {
    const cids: string[] = [];
    this.fetchChidrenIds(record, cids);
    this.rowSelection.selectedRowKeys = this.rowSelection.selectedRowKeys.filter(
      (item: string) => !cids.includes(item)
    );
  }

  unselectParents(record: any, selectedRows: any[]) {
    const pids: string[] = [];
    this.fetchSelectedPIds(record, selectedRows, pids);
    this.rowSelection.selectedRowKeys = this.rowSelection.selectedRowKeys.filter(
      (item: string) => !pids.includes(item)
    );
  }

  canSelected(record: any) {
    if (record.resourceType === "Preset") {
      return {
        props: {
          disabled: true,
        },
      };
    }
    return { props: {} };
  }

  handleEdit(record: any) {
    this.visible = true;
    this.mdl = { ...record };
  }

  handleAdd() {
    this.mdl = {};
    this.visible = true;
  }

  addChild(record: any) {
    this.mdl = {
      resourceParentId: record.resourceId,
    };
    this.visible = true;
  }

  handleOk() {
    const ref: any = this.$refs.createModal;
    const form: WrappedFormUtils = ref.form;
    this.confirmLoading = true;
    const fields: string[] = [
      "resourceId",
      "resourceParentId",
      "resourceName",
      "resourceType",
    ];
    const type = form.getFieldValue("resourceType");
    if (type && type === "Item") {
      fields.push("resourceMethod");
      fields.push("resourcePath");
    }
    form.validateFields(fields, (err, values) => {
      if (!err) {
        const resource: any = {};
        resource.resourceId = values.resourceId || "-1";
        resource.resourceParentId = values.resourceParentId || "0";
        resource.resourceName = values.resourceName;
        resource.resourceType = values.resourceType;
        if (values.resourceType === "Item") {
          resource.resourceMethod = values.resourceMethod;
          resource.resourcePath = `/**${values.resourcePath}`;
        }
        SystemAPI.createResource(resource)
          .then(() => {
            this.visible = false;
            this.refreshData();
          })
          .catch((error) => {
            this.$message.error(error.message);
          })
          .finally(() => {
            form.resetFields();
            this.confirmLoading = false;
            this.visible = false;
          });
      } else {
        this.confirmLoading = false;
      }
    });
  }
  handleCancel() {
    const ref: any = this.$refs.createModal;
    const form: WrappedFormUtils = ref.form;
    form.resetFields();
    this.visible = false;
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
      title: this.$t("system.resource.delete.title"),
      content: this.$t("system.resource.delete.content"),
      onOk: () => {
        this.dataLoading = true;
        SystemAPI.deleteResources(this.rowSelection.selectedRowKeys)
          .then(() => {
            this.refreshData();
          })
          .catch((error) => {
            this.$message.error(error.message);
          })
          .finally(() => {
            this.dataLoading = false;
          });
      },
      onCancel: () => {
        // do nothing
      },
    });
  }
}
</script>
