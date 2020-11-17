<template>
  <error-page type="500"></error-page>
</template>

<script lang="ts">
import ErrorPage from "@/components/error"
import { Component, Vue } from "vue-property-decorator"

@Component({
  components: {
    ErrorPage
  }
})
export default class Error500 extends Vue {
}
</script>
