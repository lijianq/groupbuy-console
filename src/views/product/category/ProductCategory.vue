<template>
  <div>
    <div class="table-operator">
      <a-button
        type="primary"
        class="add-button"
        icon="plus"
        @click="handleAdd"
        >{{ $t("product.category.create") }}</a-button
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

    <div>
      <a-select
        show-search
        :showArrow="false"
        size="large"
        :placeholder="$t('product.category.select')"
        option-filter-prop="children"
        style="width: 100%; margin-bottom: 3px;"
        :filter-option="filterOption"
        :value="selectedTopCatId"
        @change="handleChange"
      >
        <a-select-option
          v-for="record in selectOptiondata"
          :key="record.categoryId"
          :value="record.categoryId"
        >
          {{ record.categoryName }}
        </a-select-option>
      </a-select>
    </div>
    <a-table
      :columns="columns"
      :data-source="treeData"
      :row-selection="rowSelection"
      :pagination="false"
      :loading="dataLoading"
      :rowKey="
        (record) => {
          return record.category.categoryId;
        }
      "
    >
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">{{ $t("route.action.modify") }}</a>
          <a-divider type="vertical" />
          <a @click="addChild(record)">{{ $t("product.category.child") }}</a>
          <a-divider type="vertical" />
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
import ProductAPI from "@/api/product/ProductAPI";
import { WrappedFormUtils } from "ant-design-vue/types/form/form";
import { Modal } from "ant-design-vue";
import productAPI from "@/api/product/ProductAPI";
import cosAPI from "@/api/cos/CosAPI";

@Component({
  components: {
    ProductCategoryOperation,
  },
})
export default class ProductCategory extends Vue {
  get columns() {
    return [
      {
        title: this.$t("product.category.name"),
        dataIndex: "category.categoryName",
      },
      {
        title: this.$t("common.action"),
        dataIndex: "action",
        scopedSlots: { customRender: "action" },
      },
    ];
  }

  selectOptiondata: any[] = [];
  selectedTopCatId: string = "";
  treeData: any[] = [];
  dataLoading = false;

  rowSelection: any = {
    selectedRowKeys: [],
    onChange: this.onChange,
    onSelect: this.onSelect,
  };

  mdl: any = null;
  visible = false;
  confirmLoading = false;
  actionVisible = false;

  created() {
    this.getRootCategories();
  }

  getRootCategories() {
    this.dataLoading = true;
    ProductAPI.getRootCategories()
      .then((response: any) => {
        this.selectOptiondata = response.data;
      })
      .catch((error) => {
        this.$message.error(error.message);
      })
      .finally(() => {
        this.dataLoading = false;
      });
  }

  filterOption(input: any, option: any) {
    return (
      option.componentOptions.children[0].text
        .toLowerCase()
        .indexOf(input.toLowerCase()) >= 0
    );
  }

  handleChange(value: any) {
    this.selectedTopCatId = value;
    this.dataLoading = true;
    ProductAPI.getCategoryTree(value)
      .then((response: any) => {
        this.treeData = [];
        this.treeData = response.data;
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
        cids.push(child.category.categoryId);
        this.fetchChidrenIds(child, cids);
      }
    }
  }

  fetchSelectedPIds(record: any, selectedRows: any[], pids: string[]) {
    const parentId: string = record.category.parentCategoryId;
    if (parentId !== "0") {
      pids.push(parentId);
      const parents: any[] = selectedRows.filter(
        (item) => item.category.categoryId === parentId
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
        if (
          !this.rowSelection.selectedRowKeys.includes(child.category.categoryId)
        ) {
          this.rowSelection.selectedRowKeys.push(child.category.categoryId);
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

  handleEdit(record: any) {
    this.visible = true;
    this.mdl = { ...record };
  }

  handleAdd() {
    this.mdl = {
      category: {},
    };
    this.visible = true;
  }

  addChild(record: any) {
    const category = {
      parentCategoryId: record.category.categoryId,
      topCategoryId: this.selectedTopCatId,
    };
    this.mdl = {
      category: category,
    };
    this.visible = true;
  }

  handleOk() {
    const ref: any = this.$refs.createModal;
    const form: WrappedFormUtils = ref.form;
    const pic: any = ref.categoryPicList[0];
    this.confirmLoading = true;
    form.validateFields((err, values) => {
      if (!err) {
        const category: any = {};
        category.categoryId = values.categoryId || "-1";
        category.parentCategoryId = values.parentCategoryId || "0";
        category.categoryName = values.categoryName;
        category.topCategoryId = this.selectedTopCatId || "-1";
        category.companyId = "0";
        let isAdd = false;
        if (category.categoryId === "-1") {
          isAdd = true;
        }
        if (pic && pic.uid !== "-1") {
          cosAPI
            .uploadFile(
              pic.originFileObj,
              isAdd ? undefined : category.categoryId,
              "cat-pic.png"
            )
            .then((result: any) => {
              category.categoryId = result.targetId;
              category.categoryPic = result.Location;
              productAPI
                .saveCategory(category, isAdd)
                .then((result: any) => {
                  const newCat = result.data;
                  this.updateData(newCat);
                  this.visible = false;
                })
                .catch((error) => {
                  this.$message.error(error.message);
                })
                .finally(() => {
                  this.confirmLoading = false;
                });
            })
            .catch((error) => {
              this.$message.error(error.message);
            })
            .finally(() => {
              this.confirmLoading = false;
            });
        } else {
          category.categoryPic = ref.model.category.categoryPic;
          productAPI
            .saveCategory(category, isAdd)
            .then((result: any) => {
              const newCat = result.data;
              this.updateData(newCat);
              this.visible = false;
            })
            .catch((error) => {
              this.$message.error(error.message);
            })
            .finally(() => {
              this.confirmLoading = false;
            });
        }
      } else {
        this.confirmLoading = false;
      }
    });
  }

  updateData(category: any) {
    if (category.parentCategoryId === "0") {
      const newOption: any = {};
      newOption.categoryId = category.categoryId;
      newOption.categoryName = category.categoryName;
      this.selectOptiondata = this.selectOptiondata.filter(
        (item) => item.categoryId !== newOption.categoryId
      );
      this.selectOptiondata.push(newOption);
    }
    if (
      this.selectedTopCatId &&
      this.selectedTopCatId === category.topCategoryId
    ) {
      this.handleChange(this.selectedTopCatId);
    }
  }

  handleCancel() {
    const ref: any = this.$refs.createModal;
    const form: WrappedFormUtils = ref.form;
    form.resetFields();
    ref.categoryPicList = [];
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
      title: this.$t("product.category.delete.title"),
      content: this.$t("product.category.delete.content"),
      onOk: () => {
        this.dataLoading = true;
        productAPI
          .deleteCategory(ids)
          .then(() => {
            if (ids.includes(this.selectedTopCatId)) {
              this.selectOptiondata = this.selectOptiondata.filter(
                (item) => item.categoryId !== this.selectedTopCatId
              );
              this.selectedTopCatId = "";
              this.treeData = [];
            } else {
              this.handleChange(this.selectedTopCatId);
            }
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

<style lang="less" scoped>
button.add-button {
  margin-right: 12px;
  padding: 0 15px;
  font-size: 14px;
  height: 32px;
  width: 150px;
}
</style>
