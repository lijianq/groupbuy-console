import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $eventBus: Vue;
  }
  declare module '*.vue' {
    export default Vue
  }
}