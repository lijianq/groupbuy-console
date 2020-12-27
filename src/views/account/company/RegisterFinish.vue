<template>
  <div>
    <a-form>
      <a-result status="info" :title="$t('company.finish.title')" :sub-title="$t('company.finish.subtitle')" style="max-width: 500px; margin: 40px auto 0;">
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
export default class RegisterFinish extends Vue {
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
