<template>
  <div>
    <a-form>
      <a-result status="success" :title="$t('account.forgot.reset.finish')" style="max-width: 500px; margin: 40px auto 0;">
        <template #extra>
          <a-button type="primary" class="finish-step-button" @click="backToLogin">{{
              $t('company.back')
            }}
          </a-button>
        </template>
      </a-result>
    </a-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {RouterConfiguration} from "@/config";

@Component
export default class ResetFinish extends Vue {

    backToLogin() {
        this.$router.push({ path: RouterConfiguration.loginPath })
    }

}
</script>

<style lang="less" scoped>
button.finish-step-button {
  padding: 0 15px;
  font-size: 14px;
  height: 35px;
  width: 50%;
}
</style>
