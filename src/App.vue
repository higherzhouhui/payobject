<template>
  <div id="app" v-loading="loading">
    <NormalHeader v-if="normalHeader"/>
    <router-view></router-view>
    <el-backtop class="elbacktop" v-if="normalHeader"></el-backtop>

    <div id="svgIconDown" @click="scrollBottom">
      <svg-icon iconClass="angle-down-solid" className="down-arrow" />
    </div>
    <div id="svgIconUp" @click="scrollTop">
      <svg-icon iconClass="angle-down-solid" className="down-arrow up-arrow" />
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
      this.onScroll()
    },
  },
  methods: {
    scrollBottom() {
      const scrollY = window.scrollY;
      window.scrollTo({ behavior: 'smooth', top: scrollY + window.screen.availHeight });
    },
    scrollTop() {
      const scrollY = window.scrollY;
      window.scrollTo({ behavior: 'smooth', top: scrollY -  window.screen.availHeight});
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
      const svgIconDownDom = document.getElementById('svgIconDown')
      const svgIconUpDom = document.getElementById('svgIconUp')
      if (document.body.offsetWidth > 500 || this.normalHeader) {
        if (svgIconDownDom) {
          svgIconDownDom.style.display = 'none'
        }
        if (svgIconUpDom) {
          svgIconUpDom.style.display = 'none'
        }
        return
      }
      const avaheight = window.screen.availHeight;
      const scrollY = window.scrollY;
      const allHeight = document.body.offsetHeight
      if (allHeight - avaheight - scrollY == 0) {
        if (svgIconDownDom) {
          svgIconDownDom.style.display = 'none'
        }
        if (svgIconUpDom) {
          svgIconUpDom.style.display = 'block'
        }
      } else {
        if (svgIconDownDom) {
          svgIconDownDom.style.display = 'block'
        }
        if (svgIconUpDom) {
          svgIconUpDom.style.display = 'none'
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

.down-arrow {
  position: fixed;
  bottom: 80px;
  right: 20px;
  color: #fff!important;
  font-size: 2rem!important;
  cursor: pointer;
  z-index: 10001;
}
.up-arrow {
  transform: rotate(180deg);
}
</style>
