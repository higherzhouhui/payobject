<template>
  <div>
    <header class="flex flex_align_center flex_jc_sb flex_nowrap">
      <div class="flex flex_align_center">
        <img class="logo" src="@/assets/images/index/logo.png" alt="" />
        <div class="refresh">
          <img
            @click="
              () => {
                reload();
              }
            "
            class="notice pointer"
            src="@/assets/images/home/refresh.png"
            alt=""
          />
        </div>
        <div
          class="language flex flex_align_center hidden-sm-and-down"
          @click="open"
        >
          <img
            class="icon"
            v-if="languge == 'zh'"
            src="@/assets/images/index/ch.png"
            alt=""
          />
          <img class="icon" v-else src="@/assets/images/index/en.png" alt="" />
          <span class="txt">{{ $t("languageChange") }}</span>
          <img src="@/assets/images/index/down.png" alt="" />
        </div>
      </div>

      <div class="right flex flex_align_center">
        <img
          class="notice pointer"
          src="@/assets/images/home/notice.png"
          alt=""
        />
        <div class="user_info flex flex_align_center">
          <img
            class="avatar pointer"
            src="@/assets/images/home/user.png"
            alt="header"
          />
          <span>{{
            userInfo.nickName || userInfo.phone || userInfo.email
          }}</span>
        </div>
        <div @click="quit" class="quite pointer flex flex_align_center">
          <img
            class="notice pointer"
            src="@/assets/images/home/quit.png"
            alt=""
          />
          <span>退出登录</span>
        </div>
      </div>
    </header>
    <el-dialog
      class="lang_box"
      width="300px"
      :title="$t('choiceLanguage')"
      :visible.sync="dialogTableVisible"
    >
      <div
        class="item"
        :class="languge == 'zh' && 'active'"
        @click="checkLang('zh')"
      >
        中文
      </div>
      <div
        class="item"
        :class="languge == 'en' && 'active'"
        @click="checkLang('en')"
      >
        English
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { Local } from "@/utils/index";
import { logout } from "@/api/login";
export default {
  name: "headerIndex",
  data() {
    return {
      languge: Local("lang") || "zh",
      dialogTableVisible: false,
      userInfo: this.$store.state.userInfo || {},
    };
  },
  methods: {
    reload() {
      window.location.reload();
    },
    changeLanguge() {
      this.$i18n.locale = "en";
    },
    quit() {
      this.$router.push("/index");
      localStorage.clear()
      logout()
    },
    checkLang(lang) {
      this.languge = lang;
      Local("lang", lang);
      this.$i18n.locale = lang;
      this.dialogTableVisible = false;
      location.reload();
    },
    open() {
      this.dialogTableVisible = true;
    },
  },
};
</script>
<style scoped lang="scss">
.lang_box {
  .item {
    text-align: center;
    font-size: 18px;
    padding: 10px 0;
    cursor: pointer;
    color: #3476ff;

    // &:hover {
    //     background: #3476FF;
    //     color: #fff;
    // }
    &.active {
      background: #3476ff;
      color: #fff;
    }
  }
}

header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  height: 88px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
  border-bottom: 1px solid #dcdfe6;
  background: #fff;
  z-index: 99;

  .logo {
    height: 88px;
  }

  .notice {
    width: 32px;
    height: 32px;
  }

  .right {
    padding-right: 24px;
  }

  .refresh {
    margin: 0 16px 0 24px;
    background: #f2f6ff;
    padding: 25px;
  }

  .language {
    cursor: pointer;
    font-size: 16px;
    color: #303133;

    .icon {
      width: 32px;
    }

    .txt {
      margin: 0 8px;
      font-size: 16px;
    }
  }

  .user_info {
    margin: 0 80px 0 40px;
    font-size: 16px;
    color: #909399;

    .avatar {
      margin-right: 8px;
      width: 48px;
      height: 48px;
    }
  }

  .quite {
    font-size: 16px;
    color: #303133;

    img {
      margin-right: 8px;
    }
  }
}
</style>