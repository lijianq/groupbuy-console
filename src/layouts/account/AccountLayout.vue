<template>
  <div id="accountLayout" :class="['account-layout-wrapper', isMobile && 'mobile']">
    <div class="container">
      <div style="float: right; margin-right: 20px;">
        <lang-selector/>
      </div>
      <router-view />
      <div class="footer">
        <div class="copyright">
          {{ $t('common.copyright')}}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component,Vue} from 'vue-property-decorator'
import AppRuntimeModule from '@/store/modules/AppRuntime'
import LangSelector from '@/components/globalheader/lang/LangSelector'

@Component({
    components: {
        LangSelector
    }
})
export default class AccountLayout extends Vue {

    isMobile = AppRuntimeModule.isMobile

    constructor() {
        super()
    }

    mounted() {
        document.body.classList.add('accountLayout')
    }

    beforeDestroy() {
        document.body.classList.remove('accountLayout')
    }

}
</script>

<style lang="less" scoped>
#accountLayout.account-layout-wrapper {
  height: 100%;

  &.mobile {
    .container {
      .main {
        max-width: 368px;
        width: 98%;
      }
    }
  }

  .container {
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
    background-size: 100%;
    padding: 5px 0 144px;
    position: relative;

    a {
      text-decoration: none;
    }

    .main {
      min-width: 260px;
      width: 368px;
      margin: 0 auto;
    }

    .footer {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 0 16px;
      margin: 0 0 24px;
      text-align: center;

      .copyright {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
      }
    }
  }
}
</style>
