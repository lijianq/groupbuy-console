<template>
  <error-page type="401"></error-page>
</template>

<script lang="ts">
import ErrorPage from "@/components/error"
import { Component, Vue } from "vue-property-decorator"

@Component({
  components: {
    ErrorPage
  }
})
export default class Error401 extends Vue {
}
</script>
