<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-config-provider>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { DomUtil } from '@/utils/DomUtil'
import { ThemeUtil } from '@/utils/ThemeUtil'
import { AppPreferenceModule } from '@/store'

@Component({
  components: {}
})

export default class App extends Vue {
  primaryColor = AppPreferenceModule.getPrimaryColor()
  mounted() {
    ThemeUtil.updateTheme(this.primaryColor)
  }
  get locale () {
    const { title } = this.$route.meta
    title && (DomUtil.setDocumentTitle(`${this.$t(title)} - ${this.$t(DomUtil.domTitle)}`))
    return this.$i18n.getLocaleMessage(this.$store.getters.lang).antLocale
  }
}
</script>

<style lang="less" scoped>
@import "App";
</style>
