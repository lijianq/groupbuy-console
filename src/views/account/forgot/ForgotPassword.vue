<template>
  <div>
    <a-steps class="steps" :current="currentStep">
      <a-step :title="$t('account.forgot.authcode')">
        <a-icon slot="icon" type="right-circle" />
      </a-step>
      <a-step :title="$t('account.forgot.reset')">
        <a-icon slot="icon" type="lock" />
      </a-step>
      <a-step :title="$t('account.forgot.finish')">
        <a-icon slot="icon" type="check-circle" />
      </a-step>
    </a-steps>
    <div class="content">
      <auth-code v-if="currentStep === 0" @nextStep="nextStep"/>
      <reset-password v-if="currentStep === 1" @nextStep="nextStep" @prevStep="prevStep"/>
      <reset-finish v-if="currentStep === 2" @prevStep="prevStep" @finish="finish"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AuthCode from './AuthCode.vue'
import ResetPassword from './ResetPassword.vue'
import ResetFinish from './ResetFinish.vue'

@Component({
    components: {
        AuthCode,
        ResetPassword,
        ResetFinish
    }
})
export default class ForgotPassword extends Vue {
    currentStep = 0
    nextStep() {
        if (this.currentStep < 2) {
            this.currentStep += 1
        }
    }
    prevStep() {
        if (this.currentStep > 0) {
            this.currentStep -= 1
        }
    }
    finish() {
        this.currentStep = 0
    }
}
</script>

<style lang="less" scoped>
.steps {
  max-width: 750px;
  margin: 40px auto;
}
</style>
