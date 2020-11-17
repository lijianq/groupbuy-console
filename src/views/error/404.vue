<template>
  <error-page type="404"></error-page>
</template>

<script lang="ts">
import ErrorPage from "@/components/error"
import { Component, Vue } from "vue-property-decorator"

@Component({
  components: {
    ErrorPage
  }
})
export default class Error404 extends Vue {
}
</script>
