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
import { i18nRender } from '@/locales'

@Component({
  components: {}
})

export default class App extends Vue {
  get locale () {
    const { title } = this.$route.meta
    title && (DomUtil.setDocumentTitle(`${i18nRender(title)} - ${i18nRender(DomUtil.domTitle)}`))
    return this.$i18n.getLocaleMessage(this.$store.getters.lang).antLocale
  }
}
</script>
