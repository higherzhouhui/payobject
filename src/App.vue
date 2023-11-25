<template>
  <div id="app" v-loading="loading">
    <NormalHeader v-if="normalHeader"/>
    <router-view></router-view>
    <el-backtop class="elbacktop" v-if="normalHeader"></el-backtop>
    <NormalFooter v-if="normalFooter"/>
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
      adminList: ['admin', 'manage'],
      normalHeader: true,
      normalFooter: true,
      loading: true,
    }
  },
  mounted() {
    this.loading = false
  },
  watch: {
    $route(to) {
      // 根据路由判断是否展示header和footer
      const path = to.path;
      this.normalHeader = true
      this.normalFooter = true
      this.adminList.map(item => {
        if (path.includes(item)) {
          this.normalHeader = false
          this.normalFooter = false
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.elbacktop {
  border-radius: 4px;
  background: $baseColor;
}
.el-backtop:hover {
  background: $baseHover;
}
::v-deep .el-icon-caret-top {
  color: #fff;
}
</style>
