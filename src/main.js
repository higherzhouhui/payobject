import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import store from '@/store/index'
import './style/scssFile.scss'
import router from './router/index.js'
import i18n from "./lang/i18n";
import { Local } from '@/utils/index'
import locale from 'element-ui/lib/locale'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(ElementUI, {
  i18n: function () {
      if(Local('lang') == 'en') {
        locale.use(enLocale)
      }else{
        locale.use(zhLocale)
      }
  }
})
// Vue.locale('en', lang)


Vue.config.productionTip = false
Vue.prototype.$store=store;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
