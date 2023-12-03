<template>
  <div id="app" v-loading="loading">
    <NormalHeader v-if="normalHeader"/>
    <router-view></router-view>
    <el-backtop class="elbacktop" v-if="normalHeader"></el-backtop>
    <div id="svgIcon" @click="scrollBottom">
      <svg-icon iconClass="angle-down-solid" className="down-arrow" />
    </div>
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
    window.addEventListener("scroll", this.debounce(this.onScroll, 50));
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
  },
  methods: {
    scrollBottom() {
      window.scrollTo({ behavior: 'smooth', top: 1000 });
    },
    debounce(fn, delay) {
      let timer = null;
      return function() {
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(this, arguments);
        }, delay);
      }
    },
    onScroll() {
      if (document.body.offsetWidth > 500) {
        return
      }
      const svgIconDom = document.getElementById('svgIcon')
      const avaheight = window.screen.availHeight;
      const scrollY = window.scrollY;
      const allHeight = document.body.offsetHeight
      if (allHeight - avaheight == scrollY) {
        if (svgIconDom) {
          svgIconDom.style.display = 'none'
        }
      } else {
        if (svgIconDom) {
          svgIconDom.style.display = 'block'
        }
      }
    }
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
#svgIcon {
  display: none;
  @media screen and (max-width: 500px) {
    display: block;
  }
}
.down-arrow {
  position: fixed;
  bottom: 100px;
  right: 30px;
  color: #fff!important;
  font-size: 2rem!important;
  cursor: pointer;
  z-index: 10001;
}
</style>
