<template>
  <div>
    <header :class="headerShow && 'headerShow'">
        <div class="inner container-auto">
            <img class="logo" src="@/assets/images/index/logo.png" alt="logo" @click="to('/index')">
            <div class="flex flex_algin_center controlMenu">
                <div class="item item-active" @click="to('/index')">{{ $t('home') }}</div>
                <div class="item ">{{ $t('product') }}&{{ $t('serve') }}</div>
            </div>
            <div class="info flex flex_align_center">
                <div class="btn-group flex controlMenu" v-if="!email">
                    <div class="btn" @click="to('/user/login')">{{ $t('login') }}</div>
                    <div class="btn normal-btn" @click="to('/user/register')">{{ $t('register') }}</div>
                </div>
                <div class="btn-group flex controlMenu" v-else>
                    <div class="btn" @click="to('/home/index')">{{email}}</div>
                </div>
                <div class="language flex flex_align_center" @click="open">
                    <img class="icon" v-if="languge == 'zh'" src="@/assets/images/index/ch.png" alt="zh">
                    <img class="icon" v-else src="@/assets/images/index/en.png" alt="en">
                    <span class="txt">{{ $t('languageChange') }}</span>
                    <img class="xiala" src="@/assets/images/index/xiala.png" alt="down">
                </div>
                <div class="controlDrop" @click="handleShowMenu">
                    <div class="menu-btn">
                        <div />
                        <div />
                        <div />
                    </div>
                    <div class="menus" :class="showMenu && 'showMenu'">
                        <div class="menus-item" @click="to('/index')">{{ $t('home') }}</div>
                        <div class="menus-item" @click="to('/user/login')" v-if="!email">{{ $t('login') }}</div>
                        <div class="menus-item" @click="to('/user/register')" v-if="!email">{{ $t('register') }}</div>
                        <div class="menus-item" @click="to('/home/index')" v-if="email">{{$t('profile')}}</div>
                        <div class="menus-item" @click="quit" v-if="email">{{$t('quitLogin')}}</div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <el-dialog class="lang_box" width="300px" :title="$t('choiceLanguage')" :visible.sync="dialogTableVisible">
      <div class="item" :class="languge == 'zh' && 'active'" @click="checkLang('zh')">中文</div>
      <div class="item" :class="languge == 'en' && 'active'" @click="checkLang('en')">English</div>
    </el-dialog>
  </div>
</template>
<script>
import { Local } from '@/utils/index'

export default {
  name: 'NormalHeader',
  data () {
    return {
      headerShow: false,
      showMovie: false,
      movieSrc: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Schlossbergbahn.webm',
      languge: Local('lang') || 'zh',
      dialogTableVisible: false,
      showMenu: false,
      email: this.$store.state.userInfo.email
    }
  },
  mounted() {
      this.onScroll()
      window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
      window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    handleShowMenu() {
        this.showMenu = !this.showMenu
    },
    to(path) {
        this.$router.push(path)
    },
    open() {
        this.dialogTableVisible = true
    },
    checkLang(lang) {
        this.languge = lang
        Local('lang', lang)
        this.$i18n.locale = lang;
        this.dialogTableVisible = false
    },
    onScroll() {
        if (window.scrollY > 88) {
            this.headerShow = true
        } else {
            this.headerShow = false
        }
    },
    quit() {
      this.$confirm("确认退出？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
      }).then(() => {
        this.$router.push("/index");
        localStorage.clear()
        logout()
      }).catch(() => {
        console.log('取消')
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@keyframes headerMove {
  0% {
      top: -88px;
  }
  100% {
      top: 0;
  }
}

header {
  position: fixed;
  z-index: 1001;
  left: 0;
  top: 0;
  width: 100%;
  height: 88px;
  display: flex;
  align-items: center;
  background: #384d78;
  box-shadow: 0 1rem 3rem rgba(0,0,0,.175)!important;
  color: #fff;
  &.headerShow {
      animation: headerMove forwards 1s;
  }

  .logo {
      height: 45px;
      cursor: pointer;
      animation: bounceln 1.5s forwards 1s;
      @media screen and (max-width: 800px) {
          height: 32px;
      }
  }
  .item-active {
      color: $baseHover;
  }
  .controlMenu {
    display: flex;
    @media screen and (max-width: 800px) {
        display: none;
    }
  }
  .controlDrop {
    display: none;
    @media screen and (max-width: 800px) {
        display: flex;
    }
  }
  .inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .item {
          cursor: pointer;
          padding: 0 1rem;
          &:hover {
              color: $baseHover;
          }
      }
      .info {
          font-size: 1rem;
      }

      .btn-group {
          .btn {
              margin-right: 16px;
              padding: 0.5rem 2rem;
              border-radius: 4px;
              cursor: pointer;
              transition: all 0.5s;
              &.active {
                  background: $baseColor;
                  color: #fff;
                  border: 1px solid transparent;
                  &:hover {
                      background: transparent;
                      color: $baseColor;
                      border: 1px solid $baseColor;
                  }
              }

              &:hover {
                  color: $baseColor;
              }
          }
      }

      .language {
          cursor: pointer;
          margin-right: 6px;
          .xiala {
            width: 20px;
            object-fit: contain;
          }
          .icon {
              width: 32px;
          }

          .txt {
              margin: 0 8px;
              font-size: 16px;
          }
      }
  }
}

.menu-btn {
  width: 36px;
  height: 36px;
  border-radius: 5px;
  background-color: #723eeb;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  padding: 5px 0;
  cursor: pointer;
  > div {
      width: 20px;
      height: 3px;
      background: #fff;
  }
}

.menus {
  position: fixed;
  top: 88px;
  width: 100%;
  left: 0;
  background: rgba($color: #8eabe7, $alpha: 1);
  z-index: 999;
  box-sizing: border-box;
  transition: all 0.5s;
  overflow: hidden;
  box-shadow: 2px 2px 1px #cddbee;
  height: 0;
  .menus-item {
      color: #fff;
      font-size: 1.2rem;
      line-height: 2.1rem;
      color: #000000;
      cursor: pointer;
      text-align: center;
      &:hover {
          color: #0501fc;
          background: rgba($color: #384d78, $alpha: 0.2);
          font-weight: bold;
      }
  }
}

.showMenu {
  height: 9.3rem;
  padding: 1.5rem 0;
}

.lang_box {
  .item {
      text-align: center;
      font-size: 18px;
      padding: 10px 0;
      cursor: pointer;
      color: $baseColor;
      &.active {
          background: $baseColor;
          color: #fff;
      }
  }
}

</style>