<template>
  <div>
    <a-form>
      <a-result status="info" :title="$t('account.register.finish.title')" :sub-title="$t('account.register.finish.subtitle')" style="max-width: 500px; margin: 40px auto 0;">
        <template #extra>
          <a-button type="primary" class="finish-step-button" @click="backToLogin">{{
              $t('account.register.back')
            }}
          </a-button>
        </template>
      </a-result>
    </a-form>
  </div>
</template>

<script lang="ts">
import RegisterFinish from "./RegisterFinish"
export default RegisterFinish
</script>

<style lang="less" scoped>
@import "RegisterFinish";
</style>
