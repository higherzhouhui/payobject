<template>

  <img
    v-if="code == 'USDT'"
    src="@/assets/images/usdt.png"
    :class="dashboard ? 'usdt-pic' : 'usdt-inner'"
  />
  <img
    v-else-if="code == 'EUR'"
    src="@/assets/images/eu.png"
    :class="dashboard ? 'usdt-pic' : 'usdt-inner'"
  />
  <img
    v-else-if="code == 'ANG'"
    src="@/assets/images/an.png"
    :class="dashboard ? 'usdt-pic' : 'usdt-inner'"
  />
  <span
  v-else-if="getFlagIcon(code, flagList)"
  :class="`flag-icon ${getFlagIcon(code, flagList)}`"
></span>
</template>
<script>
import { getFlagIcon } from "@/utils/common";
export default {
  name: "flagIcon",
  props: {
    code: {
      type: String,
      default: ''
    },
    flagList: {
      type: Array,
      default: function() { //这里默认return一个数组，即可解决上述的报错问题
        return [];
      }

    },
    dashboard: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      getFlagIcon: getFlagIcon,
    };
  },
  created() {
    
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.usdt-pic {
  width: 30px;
  height: 30px;
  margin-bottom: 6px;
}
</style>
