<template>
  <div>
    <a-steps class="steps" :current="currentStep">
      <a-step :title="$t('company.base.input')">
        <a-icon slot="icon" type="edit" />
      </a-step>
      <a-step :title="$t('company.status')">
        <a-icon slot="icon" type="info-circle" />
      </a-step>
    </a-steps>
    <div class="content">
      <query-input v-if="currentStep === 0" @nextStep="nextStep" />
      <query-result
        :queryResult="queryResult"
        v-if="currentStep === 1"
        @finish="finish"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import QueryInput from "./QueryInput.vue";
import QueryResult from "./QueryResult.vue";

@Component({
  components: {
    QueryInput,
    QueryResult,
  },
})
export default class Query extends Vue {
  currentStep = 0;
  queryResult = {};

  nextStep(data: any) {
    this.queryResult = data;
    if (this.currentStep < 1) {
      this.currentStep += 1;
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
  margin: 40px auto 0;
}
</style>
