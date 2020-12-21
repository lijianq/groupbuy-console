<template>
  <a-tree
    checkable
    :tree-data="treeData"
    :default-expanded-keys="['0-0-0', '0-0-1']"
    :default-selected-keys="['0-0-0', '0-0-1']"
    :default-checked-keys="['0-0-0', '0-0-1']"
    @select="onSelect"
    @check="onCheck"
  >
    <span slot="title0010" style="color: #1890ff">sss</span>
  </a-tree>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component
export default class FunctionAction extends Vue {
  treeData = [
    {
      title: "parent 1",
      key: "0-0",
      children: [
        {
          title: "parent 1-0",
          key: "0-0-0",
          disabled: true,
          children: [
            { title: "leaf", key: "0-0-0-0", disableCheckbox: true },
            { title: "leaf", key: "0-0-0-1" },
          ],
        },
        {
          title: "parent 1-1",
          key: "0-0-1",
          children: [{ key: "0-0-1-0", slots: { title: "title0010" } }],
        },
      ],
    },
  ];
  onSelect(selectedKeys: any[], info: any[]) {
    console.log("selected", selectedKeys, info);
  }
  onCheck(checkedKeys: any[], info: any[]) {
    console.log("onCheck", checkedKeys, info);
  }
}
</script>