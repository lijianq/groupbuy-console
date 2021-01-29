<template>
  <div>
    <a-steps class="steps" :current="currentStep">
      <a-step :title="$t('company.base')">
        <a-icon slot="icon" type="form" />
      </a-step>
      <a-step :title="$t('company.license')">
        <a-icon slot="icon" type="file" />
      </a-step>
      <a-step :title="$t('company.finish')">
        <a-icon slot="icon" type="check-circle" />
      </a-step>
    </a-steps>
    <div class="content">
      <register-base-info
        :baseFormData="baseFormData"
        v-if="currentStep === 0"
        @nextStep="nextStep"
      />
      <register-license
        :baseFormData="baseFormData"
        v-if="currentStep === 1"
        @nextStep="nextStep"
        @prevStep="prevStep"
      />
      <register-finish
        v-if="currentStep === 2"
        @prevStep="prevStep"
        @finish="finish"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RegisterBaseInfo from "./RegisterBaseInfo.vue";
import RegisterLicense from "./RegisterLicense.vue";
import RegisterFinish from "./RegisterFinish.vue";

@Component({
  components: {
    RegisterBaseInfo,
    RegisterLicense,
    RegisterFinish,
  },
})
export default class Register extends Vue {
  currentStep = 0;
  baseFormData: any = null;

  nextStep(data: any) {
    this.baseFormData = data;
    if (this.currentStep < 2) {
      this.currentStep += 1;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep -= 1;
    }
  }

  finish() {
    this.currentStep = 0;
  }
}
</script>

<style lang="less" scoped>
.steps {
  max-width: 750px;
  margin: 40px auto;
}
</style>
