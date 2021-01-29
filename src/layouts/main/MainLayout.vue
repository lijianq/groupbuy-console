<template>
  <pro-layout
    :menus="menus"
    :collapsed="sidebarCollapsed"
    :mediaQuery="query"
    :isMobile="isMobile"
    :handleMediaQuery="handleMediaQuery"
    :handleCollapse="handleCollapse"
    :i18nRender="i18nRender"
    v-bind="settings"
  >
    <template v-slot:menuHeaderRender>
      <div>
        <img src="~@/assets/logo.00.png" alt="logo" />
        <h1>{{ $t(title) }}</h1>
      </div>
    </template>

    <setting-drawer :settings="settings" @change="handleChangeSetting" />
    <template v-slot:rightContentRender>
      <right-content
        :top-menu="settings.layout === 'topmenu'"
        :is-mobile="isMobile"
        :theme="settings.theme"
      />
    </template>
    <router-view />
  </pro-layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import ProLayout, {
  SettingDrawer,
  updateColorWeak,
} from "@ant-design-vue/pro-layout";
import { AppPreferenceModule } from "@/store";
import AppRuntimeModule from "@/store/modules/AppRuntime";
import { DefaultSetting } from "@/config";
import RightContent from "@/components/globalheader";

@Component({
  components: {
    SettingDrawer,
    RightContent,
    ProLayout,
  },
})
export default class MainLayout extends Vue {
  menus: any[] = [];
  sidebarCollapsed = AppRuntimeModule.sidebarCollapsed;
  title = DefaultSetting.title;

  settings: any = {
    layout: AppPreferenceModule.getLayout(),
    contentWidth:
      AppPreferenceModule.getLayout() === "sidemenu"
        ? "Fluid"
        : AppPreferenceModule.getContentWidth(),
    theme: AppPreferenceModule.getTheme(),
    primaryColor: AppPreferenceModule.getPrimaryColor(),
    fixedHeader: AppPreferenceModule.getFixedHeader(),
    fixSiderbar: AppPreferenceModule.getFixSiderbar(),
    colorWeak: AppPreferenceModule.getColorWeak(),
    autoHideHeader: AppPreferenceModule.getAutoHideHeader(),
    hideHintAlert: true,
    hideCopyButton: true,
  };
  isMobile = AppRuntimeModule.isMobile;
  query: any = {};

  @Watch("collapsed")
  setCollapsed() {
    AppRuntimeModule.setSidebarCollapsed(this.sidebarCollapsed);
  }

  created() {
    if (AppRuntimeModule.menus) {
      this.menus = AppRuntimeModule.menus;
    }
  }

  mounted() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf("Edge") > -1) {
      this.$nextTick(() => {
        this.sidebarCollapsed = !this.sidebarCollapsed;
        setTimeout(() => {
          this.sidebarCollapsed = !this.sidebarCollapsed;
        }, 16);
      });
    }
    updateColorWeak(this.settings.colorWeak);
  }

  i18nRender(key: string) {
    return this.$t(key);
  }

  handleMediaQuery(val: any) {
    this.query = val;
    if (this.isMobile && !val["screen-xs"]) {
      this.isMobile = false;
      return;
    }
    if (!this.isMobile && val["screen-xs"]) {
      this.isMobile = true;
      this.sidebarCollapsed = false;
      this.settings.contentWidth = "Fluid";
    }
  }

  handleCollapse(val: boolean) {
    this.sidebarCollapsed = val;
  }

  handleChangeSetting(setting: any) {
    const type = setting.type;
    const value = setting.value;
    switch (type) {
      case "theme":
        this.settings.theme = value;
        AppPreferenceModule.setTheme(value);
        break;
      case "primaryColor":
        this.settings.primaryColor = value;
        AppPreferenceModule.setPrimaryColor(value);
        break;
      case "layout":
        this.settings.layout = value;
        AppPreferenceModule.setLayout(value);
        break;
      case "fixedHeader":
        this.settings.fixedHeader = value;
        AppPreferenceModule.setFixedHeader(value);
        break;
      case "fixSiderbar":
        this.settings.fixSiderbar = value;
        AppPreferenceModule.setFixSiderbar(value);
        break;
      case "colorWeak":
        this.settings.colorWeak = value;
        AppPreferenceModule.setColorWeak(value);
        break;
      case "contentWidth":
        this.settings.contentWidth = value;
        AppPreferenceModule.setContentWidth(value);
        break;
    }
  }
}
</script>

<style lang="less">
@import "~ant-design-vue/es/style/themes/default.less";

.ant-pro-global-header-index-right {
  margin-right: 8px;

  &.ant-pro-global-header-index-dark {
    .ant-pro-global-header-index-action {
      color: hsla(0, 0%, 100%, 0.85);
      &:hover {
        background: #1890ff;
      }
    }
  }

  .ant-pro-account-avatar {
    .antd-pro-global-header-index-avatar {
      color: @primary-color;
      vertical-align: top;
      background: rgba(255, 255, 255, 0.85);
      margin: ~"calc((@{layout-header-height} - 24px) / 2)";
      margin-right: 6px;
    }
  }

  .menu {
    .anticon {
      margin-right: 8px;
    }

    .ant-dropdown-menu-item {
      min-width: 100px;
    }
  }
}
</style>
