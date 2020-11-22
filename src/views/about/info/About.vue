<template>
  <div class="about">
    <h1>{{$t("about.content")}} {{ accountName }}</h1>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AccountModule } from "@/store";
// import { Route } from 'vue-router'

@Component
export default class About extends Vue {
    accountName = AccountModule.getAccount().name
    // beforeRouteEnter(to: Route, from: Route, next: () => void): void {
    //     console.log('From:', from, 'To:', to)
    //     next()
    // }
    //
    // beforeRouteLeave(to: Route, from: Route, next: () => void): void {
    //     console.log('From:', from, 'To:', to)
    //     next()
    // }
}
</script>
