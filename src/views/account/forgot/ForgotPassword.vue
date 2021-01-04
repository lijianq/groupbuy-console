<template>
  <div>
    <a-steps class="steps" :current="currentStep">
      <a-step :title="$t('account.reset')">
        <a-icon slot="icon" type="lock" />
      </a-step>
      <a-step :title="$t('account.finish')">
        <a-icon slot="icon" type="check-circle" />
      </a-step>
    </a-steps>
    <div class="content">
      <reset-password v-if="currentStep === 0" @nextStep="nextStep"/>
      <reset-finish v-if="currentStep === 1" @prevStep="prevStep" @finish="finish"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ResetPassword from './ResetPassword.vue'
import ResetFinish from './ResetFinish.vue'

@Component({
    components: {
        ResetPassword,
        ResetFinish
    }
})
export default class ForgotPassword extends Vue {
    currentStep = 0
    nextStep() {
        if (this.currentStep < 1) {
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
