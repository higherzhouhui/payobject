<template>
  <div>
    <header :class="headerShow ? 'headerShow' : 'headerHide'">
      <div class="inner container-auto">
        <img
          class="logo"
          src="@/assets/images/index/logo.png"
          alt="logo"
          @click="to('/index')"
        />
        <div class="flex flex_algin_center controlMenu">
          <a
            class="item"
            :class="item.active && 'item-active'"
            v-for="item in links"
            :key="item.title"
            @click="to(item.path)"
          >
            {{ item.title }}
          </a>

          <!-- <div class="item item-active" @click="to('/index')">{{ $t('home') }}</div>
                <div class="item ">{{ $t('product') }}&{{ $t('serve') }}</div> -->
        </div>
        <div class="info flex flex_align_center">
          <div class="btn-group flex controlMenu" v-if="!email">
            <div class="btn" @click="to('/user/login')">{{ $t("login") }}</div>
            <div class="btn normal-btn" @click="to('/user/register')">
              {{ $t("register") }}
            </div>
          </div>
          <div class="btn-group flex controlMenu" v-else>
            <div class="btn" @click="handleTodashboard">{{ email }}</div>
          </div>
          <div class="language flex flex_align_center" @click="open">
            <img
              class="icon"
              v-if="lang == 'zh'"
              src="@/assets/images/index/ch.png"
              alt="zh"
            />
            <img
              class="icon"
              v-else
              src="@/assets/images/index/en.png"
              alt="en"
            />
            <span class="txt">{{ $t("languageChange") }}</span>
            <img
              class="xiala"
              src="@/assets/images/index/xiala.png"
              alt="down"
            />
          </div>
          <div class="controlDrop" @click.stop="handleShowMenu">
            <div class="menu-btn">
              <div />
              <div />
              <div />
            </div>
            <div
              class="full-screen"
              v-if="showMenu"
              @click.stop="showMenu = false"
            />
            <div class="menus" :class="showMenu && 'showMenu'">
              <div class="menus-item" @click="to('/index')">
                {{ $t("home") }}
              </div>
              <div class="menus-item" @click="to('/blog')">News</div>
              <div class="menus-item" @click="to('')">{{ $t("comments") }}</div>
              <div class="menus-item" @click="to('/user/login')" v-if="!email">
                {{ $t("login") }}
              </div>
              <div
                class="menus-item"
                @click="to('/user/register')"
                v-if="!email"
              >
                {{ $t("register") }}
              </div>
              <div
                class="menus-item"
                @click="handleTodashboard"
                v-if="email"
              >
                {{ $t("profile") }}
              </div>
              <div class="menus-item" @click="quit" v-if="email">
                {{ $t("quitLogin") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <el-dialog
      class="lang_box"
      width="20rem"
      :title="$t('choiceLanguage')"
      :visible.sync="dialogTableVisible"
    >
      <div
        class="item"
        :class="lang == 'zh' && 'active'"
        @click="checkLang('zh')"
      >
        中文
      </div>
      <div
        class="item"
        :class="lang == 'en' && 'active'"
        @click="checkLang('en')"
      >
        English
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { Local } from "@/utils/index";
import i18n from "@/lang/i18n";
import { countries } from "@/api/login";

export default {
  name: "NormalHeader",
  data() {
    return {
      headerShow: false,
      showMovie: false,
      movieSrc:
        "https://upload.wikimedia.org/wikipedia/commons/8/87/Schlossbergbahn.webm",
      lang: i18n.locale,
      dialogTableVisible: false,
      showMenu: false,
      email: this.$store.state.userInfo.email || this.$store.state.userInfo.phone,
      links: [
        { title: this.$t("home"), path: "/index", active: true },
        {
          title: this.$t("comments"),
          path: "",
          active: false,
          mao: "#abountUs",
        },
        { title: "News", path: "/blog", active: false },
      ],
      path: "",
    };
  },
  mounted() {
    //   window.addEventListener('wheel', this.onWheel)
    console.log();
  },
  beforeDestroy() {
    //   window.removeEventListener('wheel', this.onWheel)
  },
  watch: {
    $route(to, _from) {
      const path = to.path;
      this.path = to.path;
      this.links.forEach((item) => {
        if (item.path == path) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
    },
    "$i18n.locale"(newValue, oldValue) {
      console.log("language switch from " + oldValue + " to " + newValue + "");
      this.links = [
        { title: this.$t("home"), path: "/index", active: true },
        {
          title: this.$t("comments"),
          path: "",
          active: false,
          mao: "#abountUs",
        },
        { title: "News", path: "/blog", active: false },
      ];
    },
  },
  methods: {
    handleShowMenu() {
      this.showMenu = !this.showMenu;
    },
    changeLnagReq() {
      const obj = {
        zh: "zh_CN",
        en: "en_US",
        tw: "zh_HK",
      };
      countries({ _lang: obj[this.lang] });
    },
    to(path) {
      if (path) {
        if (path == this.$store.state.path) {
          return;
        }
        this.$router.push(path);
      } else {
        if (this.path !== "/index") {
          this.$router.push("/index");
          setTimeout(() => {
            const elm = document.getElementById("abountUs");
            if (elm) {
              elm.scrollIntoView(true);
            }
          }, 500);
        } else {
          const elm = document.getElementById("abountUs");
          if (elm) {
            elm.scrollIntoView(true);
          }
        }
      }
    },
    open() {
      this.dialogTableVisible = true;
    },
    checkLang(lang) {
      this.lang = lang;
      Local("lang", lang);
      this.$i18n.locale = lang;
      this.dialogTableVisible = false;
      this.changeLnagReq();
    },
    onWheel(e) {
      // if (window.scrollY > 88) {
      //     this.headerShow = true
      // } else {
      //     this.headerShow = false
      // }
      const direction = e.deltaY > 0 ? "down" : "up";
      if (direction == "down") {
        this.headerShow = false;
      } else {
        this.headerShow = true;
      }
    },
    quit() {
      this.$confirm(this.$t("confirmQuit"), this.$t("hint"), {
        confirmButtonText: this.$t("queding"),
        cancelButtonText: this.$t("cancel"),
        type: "warning",
      })
        .then(() => {
          this.$router.push("/index");
          localStorage.clear();
        })
        .catch(() => {
          console.log("取消");
        });
    },
    handleTodashboard() {
      if (this.$store.state.userInfo.admin) {
        this.to("/manage/index");
      } else {
        if (this.$store.state.userInfo.userStatus) {
          this.$router.push("/admin");
        } else {
          this.$router.push("/admin/kycverification");
        }
      }
    },
  },
};
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
@keyframes headerHide {
  0% {
    top: 0;
  }
  99% {
    top: -88px;
  }
  100% {
    position: absolute;
  }
}

.headerShow {
  position: fixed;
  animation: headerMove forwards 0.5s;
}
.headerHide {
  //position: fixed;
  //animation: headerHide forwards 0.5s;
}
header {
  position: absolute;
  z-index: 1001;
  left: 0;
  top: 0;
  width: 100%;
  height: 88px;
  display: flex;
  align-items: center;
  background: $contentColor;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
  color: #fff;
  .logo {
    height: 45px;
    cursor: pointer;
    animation: bounceln 0.8s forwards 0.75s;
    @media screen and (max-width: 800px) {
      height: 32px;
    }
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
      color: #fff;
      text-decoration: none;
      &:hover {
        color: $baseHover;
      }
    }
    .item-active {
      color: $baseHover;
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
  background-color: $bgColor;
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
  background: $contentColor;
  z-index: 999;
  box-sizing: border-box;
  transition: all 0.5s;
  overflow: hidden;
  max-height: 0;
  .menus-item {
    font-size: 1.2rem;
    color: #fff;
    cursor: pointer;
    text-align: center;
    padding: 6px 0;
    &:hover {
      color: $baseColor;
      font-weight: bold;
    }
  }
}

.showMenu {
  max-height: 500px;
}

.full-screen {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 1;
}
.lang_box {
  .item {
    text-align: center;
    font-size: 1rem;
    padding: 0.8rem 0;
    cursor: pointer;
    color: $baseColor;
    &.active {
      background: $baseColor;
      color: #fff;
    }
  }
}
</style>