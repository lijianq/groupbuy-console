<template>
  <div class="about">
    <h1>{{$t("about.content")}} {{ accountName }}</h1>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AccountModule } from "@/store";

@Component
export default class About extends Vue {
    accountName = AccountModule.name
}
</script>
