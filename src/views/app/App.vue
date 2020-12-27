<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-config-provider>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { DomUtil } from '@/utils/DomUtil'
import { ThemeUtil } from '@/utils/ThemeUtil'
import { AppPreferenceModule } from '@/store'
import AppRuntimeModule from '@/store/modules/AppRuntime'
import isMobile from 'ismobilejs'

@Component({
  components: {}
})

export default class App extends Vue {
  primaryColor = AppPreferenceModule.getPrimaryColor()
  mounted() {
    AppRuntimeModule.setMobileMode(isMobile().any)
    ThemeUtil.updateTheme(this.primaryColor)
  }
  get locale () {
    const { title } = this.$route.meta
    title && (DomUtil.setDocumentTitle(`${this.$t(title)} - ${this.$t(DomUtil.domTitle)}`))
    return this.$i18n.getLocaleMessage(AppPreferenceModule.getLanguage()).antLocale
  }
}
</script>

<style lang="less">
@import 'node_modules/ant-design-vue/es/style/themes/default.less';

html,
body,
#app, #root {
  height: 100%;
}

.colorWeak {
  filter: invert(80%);
}

.ant-layout.layout-basic {
  height: 100vh;
  min-height: 100vh;
}

canvas {
  display: block;
}

body {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

ul,
ol {
  list-style: none;
}

// 数据列表 样式
.table-alert {
  margin-bottom: 16px;
}
// 数据列表 操作
.table-operator {
  margin-bottom: 18px;

  button {
    margin-right: 8px;
  }
}
// 数据列表 搜索条件
.table-page-search-wrapper {

  .ant-form-inline {
    .ant-form-item {
      display: flex;
      margin-bottom: 24px;
      margin-right: 0;

      .ant-form-item-control-wrapper {
        flex: 1 1;
        display: inline-block;
        vertical-align: middle;
      }

      > .ant-form-item-label {
        line-height: 32px;
        padding-right: 8px;
        width: auto;
      }
      .ant-form-item-control {
        height: 32px;
        line-height: 32px;
      }
    }
  }

  .table-page-search-submitButtons {
    display: block;
    margin-bottom: 24px;
    white-space: nowrap;
  }
}

.page-common-header {

  padding: 10px 10px;
  background-color: #F3F3F3;
  border: 1px solid #E4E4E4;
  margin-bottom: 40px;
  height: 55px;

  .header-divider {
    float: left;
    width: 5px;
    height: 20px;
    background : #F56C6C;
    margin-top: 5px;
    margin-right: 10px;
    margin-left: 10px;
  }
  .header-title {
    font-size: 16px;
    font-weight: 650;
    color: #666666;
    margin-top: 5px;
  }
}

@media (max-width: @screen-xs) {
  .ant-table {
    width: 100%;
    overflow-x: auto;
    &-thead > tr,
    &-tbody > tr {
      > th,
      > td {
        white-space: pre;
        > span {
          display: block;
        }
      }
    }
  }
}
</style>
