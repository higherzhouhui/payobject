<template>
  <div class="headerWrapper">
    <header>
        <!-- <div
          class="language flex flex_align_center"
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
          <img class="xiala" src="@/assets/images/index/xiala.png" alt="arrow" />
        </div> -->
        <!-- <div class="user_info flex flex_align_center">
          <img
            class="avatar pointer"
            src="@/assets/images/home/user.png"
            alt="header"
          />
          <span class="nickName">{{
            userInfo.nickName || userInfo.phone || userInfo.email
          }}</span>
        </div> -->

        <el-dropdown trigger="click" @command="handleDropCommand">
          <span class="el-dropdown-link">
            <span class="nickName">{{userInfo.nickName || userInfo.phone || userInfo.email}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user" command="profile">
              {{$t("profile")}}
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-lock" command="reset">
              {{$t("resetPwd")}}
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button" command="logout">
              {{$t("quitLogin")}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- <div @click="quit" class="quite pointer flex flex_align_center">
          <img
            class="notice pointer"
            src="@/assets/images/home/exit.png"
            alt="quit"
          />
          <span>{{$t('quitLogin')}}</span>
        </div> -->
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
    handleDropCommand(command) {
      if (command == 'profile') {
        this.$router.push("/admin/info")
      }
      if (command == 'reset') {
        this.$router.push("/admin/reset")
      }
      if (command == 'logout') {
        this.quit()
      }
    },
    quit() {
      this.$confirm(this.$t("confirmQuit"), this.$t("hint"), {
          confirmButtonText: this.$t("queding"),
          cancelButtonText: this.$t("cancel"),
          type: "warning",
      }).then(() => {
        this.$store.commit("SET_Logout", {})
        this.$router.push("/index");
        logout()
      }).catch(() => {
        console.log('取消')
      })
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

.headerWrapper {
  background: $bgColor;  
}
header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  height: 62px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
  z-index: 99;
  padding: 0 1rem 0 $leftSideWidth;
  background: $bgColor;  
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media screen and (max-width: 800px) {
      width: 100vw;
      position: relative;
      padding: 0 1rem;
  }
  .notice {
    width: 32px;
    height: 32px;
  }

  .right {
    padding-right: 24px;
  }

  .language {
    cursor: pointer;
    font-size: 1rem;
    color: #fff;
    .xiala {
      width: 20px;
      object-fit: contain;
    }
    .icon {
      width: 32px;
      color: #fff;
    }

    .txt {
      margin: 0 8px;
      font-size: 16px;
    }
  }

  .user_info {
    font-size: 16px;
    color: #909399;

    .avatar {
      margin-right: 8px;
      width: 48px;
      height: 48px;
    }
  }
  .nickName {
    color: #fff;
    font-size: 14px;
  }
  .quite {
    font-size: 1rem;
    color: #fff;

    img {
      margin-right: 8px;
    }
  }
  .el-dropdown-link {
    cursor: pointer;
    font-size: 1rem;
    i::before{
      color: #fff;
      font-size: 1rem;
      margin-left: 4px;
    }
  }
}
::v-deep .el-dropdown-menu__item {
  padding: 4px 10px;
  font-size: 13px;
  line-height: 18jpx;
}
</style>