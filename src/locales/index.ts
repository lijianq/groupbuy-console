import Vue from 'vue'
import VueI18n from 'vue-i18n'
import I18N from './I18N'
import {AppPreferenceModule} from "@/store";

Vue.use(VueI18n)
const i18n = new I18N().getVueI18N(AppPreferenceModule.getLanguage())
export default i18n
