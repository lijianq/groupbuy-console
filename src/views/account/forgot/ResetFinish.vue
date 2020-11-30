<template>
  <div>
    <a-form>
      <a-result status="success" :title="$t('account.forgot.reset.finish')" style="max-width: 500px; margin: 40px auto 0;">
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
import ResetFinish from "./ResetFinish"
export default ResetFinish
</script>

<style lang="less" scoped>
@import "ResetFinish";
</style>
