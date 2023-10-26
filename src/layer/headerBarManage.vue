<template>
  <div>
    <header>
      <div class="inner flex flex_align_center flex_jc_sb flex_nowrap">
        <div class="flex flex_align_center">
          <img class="logo" src="@/assets/images/manage/logo.png" alt="" />
          <div class="refresh">
            <img
              @click="
                () => {
                  reload();
                }
              "
              class="notice pointer"
              src="@/assets/images/manage/refresh.png"
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
            <img
              class="icon"
              v-else
              src="@/assets/images/index/en.png"
              alt=""
            />
            <span class="txt">{{ $t("languageChange") }}</span>
            <img class="icon" src="@/assets/images/manage/down.png" alt="" />
          </div>
        </div>

        <div class="right flex flex_align_center">
          <img
            class="notice pointer"
            src="@/assets/images/manage/notice.png"
            alt=""
          />
          <div @click="quit" class="quite pointer flex flex_align_center">
            <img
              class="notice pointer"
              src="@/assets/images/manage/quit.png"
              alt=""
            />
            <span>退出登录</span>
          </div>
        </div>
      </div>

      <div class="top_title">{{ $t("welcome") }}reliance-pay!</div>
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
  name: "headerIndexManage",
  data() {
    return {
      languge: Local("lang") || "zh",
      dialogTableVisible: false,
    };
  },
  methods: {
    changeLanguge() {
      this.$i18n.locale = "en";
    },
    checkLang(lang) {
      this.languge = lang;
      Local("lang", lang);
      this.$i18n.locale = lang;
      this.dialogTableVisible = false;
      location.reload();
    },
    quit() {
      this.$router.push("/index");
      Local("userInfo", "");
      logout();
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
  height: 224px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
  border-bottom: 1px solid #dcdfe6;
  background: url("@/assets/images/manage/bg.png");
  background-size: 100% 100%;
  z-index: 99;

  .inner {
    height: 88px;
  }

  .top_title {
    padding-left: 280px;
    text-align: center;
    font-size: 40px;
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
    color: #ffffff;
  }

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
    // background: #F2F6FF;
    padding: 25px;
  }

  .language {
    cursor: pointer;
    font-size: 16px;
    color: #fff;

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
    margin-left: 20px;
    font-size: 16px;
    color: #fff;

    img {
      margin-right: 8px;
    }
  }
}
</style>