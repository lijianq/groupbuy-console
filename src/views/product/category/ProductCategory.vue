<template>
  <div>
    <div class="table-operator">
      <a-button
        type="primary"
        class="operation-button"
        icon="plus"
        @click="handleAdd"
        >{{ $t("system.route.create") }}</a-button
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
      :columns="columns"
      :data-source="data"
      :row-selection="rowSelection"
      :pagination="false"
      :loading="dataLoading"
      rowKey="routeId"
    >
      <span slot="name" slot-scope="text">
        <template>
          {{ $t(text) }}
        </template>
      </span>
      <span slot="icon" slot-scope="text">
        <template>
          <a-icon :type="text" style="margin-right: 5px;"></a-icon>
        </template>
      </span>
      <span slot="type" slot-scope="text">
        <template>
          {{ $t(`system.route.${text.toLowerCase()}`) }}
        </template>
      </span>
      <span
        v-if="record.routeType !== 'Preset'"
        slot="action"
        slot-scope="text, record"
      >
        <template>
          <a @click="handleEdit(record)">{{ $t("route.action.modify") }}</a>
          <a-divider type="vertical" />
          <a @click="handleDelete([record.routeId])">{{
            $t("route.action.delete")
          }}</a>
          <span v-if="record.routeType === 'Group'">
            <a-divider type="vertical" />
            <a @click="addChild(record)">{{ $t("system.route.child") }}</a>
          </span>
        </template>
      </span>
    </a-table>

    <product-category-operation
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
import ProductCategoryOperation from "./ProductCategoryOperation.vue";
import SystemAPI from "@/api/system/SystemAPI";
import { WrappedFormUtils } from "ant-design-vue/types/form/form";
import { Modal } from "ant-design-vue";

@Component({
  components: {
    ProductCategoryOperation,
  },
})
export default class ProductCategory extends Vue {
  get columns() {
    return [
      {
        title: this.$t("system.route.name"),
        dataIndex: "routeName",
        scopedSlots: { customRender: "name" },
      },
      {
        title: this.$t("system.route.icon"),
        dataIndex: "routeMeta.icon",
        scopedSlots: { customRender: "icon" },
      },
      {
        title: this.$t("system.route.type"),
        dataIndex: "routeType",
        scopedSlots: { customRender: "type" },
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

  actionVisible = false;

  created() {
    this.refreshData();
  }

  refreshData() {
    this.dataLoading = true;
    SystemAPI.getRoutes()
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
        cids.push(child.routeId);
        this.fetchChidrenIds(child, cids);
      }
    }
  }

  fetchSelectedPIds(record: any, selectedRows: any[], pids: string[]) {
    const parentId: string = record.routeParentId;
    if (parentId !== "0") {
      pids.push(parentId);
      const parents: any[] = selectedRows.filter(
        (item) => item.routeId === parentId
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
        if (!this.rowSelection.selectedRowKeys.includes(child.routeId)) {
          this.rowSelection.selectedRowKeys.push(child.routeId);
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
    if (record.routeType === "Preset") {
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
      routeParentId: record.routeId,
    };
    this.visible = true;
  }

  handleOk() {
    const ref: any = this.$refs.createModal;
    const form: WrappedFormUtils = ref.form;
    this.confirmLoading = true;
    form.validateFields((err, values) => {
      if (!err) {
        const route: any = {};
        const meta: any = {};
        route.routeId = values.routeId || "-1";
        route.routeParentId = values.routeParentId || "0";
        route.routeName = values.routeName;
        route.routeComponent = values.routeComponent;
        route.routeType = values.routeType;
        route.routePath = `/${values.routePath}`;
        if (values.routeRedirect) {
          route.routeRedirect = `/${values.routeRedirect}`;
        } else {
          route.routeRedirect = values.routeRedirect;
        }
        meta.icon = values.routeIcon;
        meta.title = values.routeName;
        route.routeMeta = JSON.stringify(meta);
        SystemAPI.createRoute(route)
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
      title: this.$t("system.route.action.delete.title"),
      content: this.$t("system.route.action.delete.content"),
      onOk: () => {
        this.dataLoading = true;
        SystemAPI.deleteRoutes(ids)
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
