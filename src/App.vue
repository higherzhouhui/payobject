<template>
  <div id="app">
    <NormalHeader />
    <router-view></router-view>
    <el-backtop class="elbacktop"></el-backtop>
    <NormalFooter />
  </div>
</template>

<script>
import NormalHeader from "@/components/NormalHeader"
import NormalFooter from "@/components/NormalFooter"

export default {
  name: 'App',
  components: {
    NormalHeader,
    NormalFooter
  },
  data() {
    return {
      normalList: [],
      adminList: [],
      normalHeader: true,
      normalFooter: true,
    }
  },
  watch: {
    $route(to, _from) {
      const path = to.path;
      
    },
  }
}
</script>

<style lang="scss" scoped>
.elbacktop {
  border-radius: 4px;
  background: $baseColor;
}
::v-deep .el-icon-caret-top {
  color: #fff;
}
</style>
