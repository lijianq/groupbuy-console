<template>
  <div>
    <a-steps class="steps" :current="currentStep">
      <a-step :title="$t('account.register.baseinfo')">
        <a-icon slot="icon" type="form" />
      </a-step>
      <a-step :title="$t('account.register.license')">
        <a-icon slot="icon" type="file" />
      </a-step>
      <a-step :title="$t('account.register.finish')">
        <a-icon slot="icon" type="check-circle" />
      </a-step>
    </a-steps>
    <div class="content">
      <register-base-info v-if="currentStep === 0" @nextStep="nextStep"/>
      <register-license v-if="currentStep === 1" @nextStep="nextStep" @prevStep="prevStep"/>
      <register-finish v-if="currentStep === 2" @prevStep="prevStep" @finish="finish"/>
    </div>
  </div>
</template>

<script lang="ts">
import Register from "./Register"
export default Register
</script>

<style lang="less" scoped>
@import "Register";
</style>
