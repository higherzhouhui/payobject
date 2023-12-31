import Vue from "vue";
import svgIcon from "./index.vue";

Vue.component('svg-icon', svgIcon)  //挂载全局组件
//下面这个是导入svgIcon/svg下的所有svg文件
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req);
