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
        >{{ $t("system.route.delete") }}</a-button
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
      <span slot="name" slot-scope="text, record">
        <template>
          <a-icon
            :type="record.routeMeta.icon"
            style="margin-right: 5px;"
          ></a-icon>
          {{ text }}
        </template>
      </span>
      <span slot="display" slot-scope="text">
        <template>
          {{ $t(text) }}
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
          <a @click="handleEdit(record)">{{ $t("system.route.edit") }}</a>
          <a-divider type="vertical" />
          <a @click="handleDelete([record.routeId])">{{
            $t("system.route.delete")
          }}</a>
          <span v-if="record.routeType !== 'Group'">
            <a-divider type="vertical" />
            <a @click="handleAction(record)">{{ $t("system.route.actions") }}</a>
          </span>
          <span v-if="record.routeType === 'Group'">
            <a-divider type="vertical" />
            <a @click="addChild(record)">{{ $t("system.route.child") }}</a>
          </span>
        </template>
      </span>
    </a-table>

    <route-operation
      ref="createModal"
      :visible="visible"
      :loading="confirmLoading"
      :model="mdl"
      @cancel="handleCancel"
      @ok="handleOk"
    />
    <route-action
      ref="actionModal"
      :visible="actionVisible"
      :route="currentRoute"
      @cancel="handleActionCancel"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RouteOperation from "./RouteOperation.vue";
import RouteAction from "./RouteAction.vue";
import SystemAPI from "@/api/system/SystemAPI";
import { WrappedFormUtils } from "ant-design-vue/types/form/form";
import { Modal } from "ant-design-vue";

@Component({
  components: {
    RouteOperation,
    RouteAction
  },
})
export default class Route extends Vue {
  columns: any[] = [
    {
      title: this.$t("system.route.name"),
      dataIndex: "routeName",
      scopedSlots: { customRender: "name" },
    },
    {
      title: this.$t("system.route.display.name"),
      dataIndex: "routeMeta.title",
      scopedSlots: { customRender: "display" },
    },
    {
      title: this.$t("system.route.type"),
      dataIndex: "routeType",
      scopedSlots: { customRender: "type" },
    },
    {
      title: this.$t("system.route.action"),
      dataIndex: "action",
      scopedSlots: { customRender: "action" },
    },
  ];
  data: any[] = [];
  dataLoading = false;

  rowSelection: any = {
    selectedRowKeys: [],
    onChange: this.onChange,
    getCheckboxProps: this.canSelected,
    onSelect: this.onSelect,
  };

  mdl: any = null;
  currentRoute: any = null;
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
        this.rowSelection.selectedRowKeys = []
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
      this.unselectParents(record, selectedRows)
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
    const parentId: string = record.routeParentId
    if (parentId !== '0') {
      pids.push(parentId)
      const parents: any[] = selectedRows.filter(item => item.routeId === parentId)
      if ( parents && parents.length > 0) {
        this.fetchSelectedPIds(parents[0], selectedRows, pids)
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
    const cids: string[] = []
    this.fetchChidrenIds(record, cids)
    this.rowSelection.selectedRowKeys = this.rowSelection.selectedRowKeys.filter((item: string) => !cids.includes(item))
  }

  unselectParents(record: any, selectedRows: any[]) {
    const pids: string[] = []
    this.fetchSelectedPIds(record, selectedRows, pids)
    this.rowSelection.selectedRowKeys = this.rowSelection.selectedRowKeys.filter((item: string) => !pids.includes(item))
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
      const route: any = {};
      route.routeName = values.routeName;
      route.routeType = values.routeType;
      if (!err) {
        const route: any = {};
        const meta: any = {};
        route.routeId = values.routeId || "-1";
        route.routeParentId = values.routeParentId || "0";
        route.routeName = values.routeName;
        route.routeComponent = values.routeComponent;
        route.routeType = values.routeType;
        if (route.routeParentId === "0") {
          route.routePath = `/${values.routePath}`;
        } else {
          route.routePath = values.routePath;
        }
        if (values.routeRedirect) {
          route.routeRedirect = `/${values.routeRedirect}`;
        } else {
          route.routeRedirect = values.routeRedirect;
        }
        meta.icon = values.routeIcon;
        meta.title = values.routeI18Key;
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
      okText: this.$t("modal.ok").toString(),
      cancelText: this.$t("modal.cancel").toString(),
      icon: () =>
        this.$createElement("a-icon", {
          props: {
            type: "exclamation-circle",
            theme: "twoTone",
            twoToneColor: "#FF0000",
          },
        }),
      title: this.$t("system.route.delete.title"),
      content: this.$t("system.route.delete.content"),
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

  handleActionCancel() {
    this.currentRoute = null
    this.actionVisible = false
  }

  handleAction(record: any) {
    this.actionVisible = true
    this.currentRoute = record  
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
