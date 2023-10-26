import zh from './zh.json'
import en from './en.json'
import { Local } from '@/utils/index'

import VueI18n from 'vue-i18n'
import Vue from "vue";
Vue.use(VueI18n);
const i18n = new VueI18n({
  messages: {
      zh,
      en,
  },
  locale: Local('lang') || 'zh',
})

//i18n
export default i18n