<template>
  <div class="login_box">
    <div class="top">
      <img src="@/assets/images/index/logo.png" alt="" @click="routerToIndex" style="cursor: pointer"/>
      <div class="form">
        <div class="line">
          <img class="icon" src="@/assets/images/user/user.png" alt="" />
          <el-input
            class="input"
            :placeholder="$t('qsrsjhyx')"
            v-model="form.username"
            ref="myName"
          />
        </div>
        <div class="line">
          <img class="icon" src="@/assets/images/user/password.png" alt="" />
          <el-input
            class="input"
            show-password
            :placeholder="$t('qsrmm')"
            v-model="form.password"
          />
        </div>
        <div class="line flex flex_jc_sb flex_align_center">
          <img class="icon icon3" src="@/assets/images/user/txm.png" alt="" />
          <el-input
            class="input yzm"
            :placeholder="$t('qsrtxm')"
            @keyup.enter.native="toLogin"
            v-model="form.code"
          />
          <div class="ecode pointer" :class="imgLoading && 'loading'">
            <img
              width="100%"
              @load="() => (imgLoading = false)"
              @error="
                () => {
                  imgLoading = false;
                  randomT();
                }
              "
              :src="'/api/assets/captcha?t=' + t"
              @click="randomT"
            />
          </div>
        </div>
        <el-button
          class="btn"
          :class="loading && 'loading'"
          type="primary"
          @click="toLogin"
          >{{ $t("login") }}</el-button
        >
        <div class="txt flex flex_nowrap flex_align_center flex_jc_sb">
          <div
            class="baseColor flex flex_nowrap flex_align_center pointer"
            @click="to('/user/register')"
          >
            <img src="@/assets/images/user/user_active.png" alt="" />{{
              $t("register")
            }}
          </div>
          <div class="pointer" @click="to('/user/forget')">
            {{ $t("forgetpw") }}？
          </div>
        </div>
        <div class="txt txt2 flex flex_nowrap flex_align_center flex_jc_sb">
          <div></div>
          <el-dropdown trigger="click">
            <div class="pointer flex flex_nowrap flex_align_center wd">
              {{ $t("nowLanguage")
              }}<img src="@/assets/images/user/down.png" alt="" />
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="down_line"
                ><div @click="checkLang('zh')">中文</div></el-dropdown-item
              >
              <el-dropdown-item class="down_line"
                ><div @click="checkLang('en')">English</div></el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Local } from "@/utils/index";
import { login } from "@/api/login";
import { Message } from "element-ui";

export default {
  name: "userLogin",
  data() {
    return {
      loading: false,
      imgLoading: true,
      t: Math.random(),
      languge: Local("lang") || "zh",
      form: {
        username: "",
        password: "",
        code: "",
      },
    };
  },
  mounted() {  
    this.$refs.myName.focus();  
  }, 
  methods: {
    routerToIndex() {
      this.$router.push('/index');
    },
    async toLogin() {
      if (this.loading) return;
      let { username, password, code } = this.form;
      let msg = "";
      if (!username) {
        msg = "qsrsjhyx";
      } else if (!password) {
        msg = "qsrmm";
      } else if (!code) {
        msg = "qsrtxm";
      }
      if (msg) {
        return Message({
          type: "error",
          message: this.$t(msg),
        });
      }
      try {
        this.loading = true;
        let res = await login({ username, password, code });
        Message({
          type: "success",
          message: this.$t("dlcg"),
        });
        // Local("userInfo", res.data);
        this.$store.commit('SET_USERINFO', res.data)
        this.loading = false;

        if (!res.data.admin) {
          return this.$router.push("/home");
        }
        this.$router.push("/manage");
      } catch (error) {
        this.loading = false;
        this.form.code = ''
        this.randomT();
      }
    },
    to(path) {
      this.$router.push(path);
    },
    randomT() {
      if (this.imgLoading) return;
      this.imgLoading = true;
      this.t = Math.random();
    },
    checkLang(lang) {
      this.languge = lang;
      Local("lang", lang);
      this.$i18n.locale = lang;
    },
  },
};
</script>
<style scoped lang="scss">
.login_box {
  padding: 24px 40px;
  position: absolute;
  left: 50%;
  top: 42%;
  box-sizing: border-box;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 56, 147, 0.25);
  width: 30%;
  max-width: 700px;
  min-width: 500px;
  @media screen and (max-width: 700px) {
    min-width: 100%;
    padding: 24px 12px;
  }
  .top {
    text-align: center;

    img {
      width: 62.5%;
    }
  }

  .form {
    margin-top: 16px;

    .line {
      position: relative;
    }

    .input {
      margin-bottom: 24px;
      width: 100% !important;

      /* width: 30%!important; */
      ::v-deep input {
        padding-left: 30px !important;
        height: 48px;
        line-height: 48px;
      }
      &.yzm {
        width: 63.56% !important;
      }
    }

    .icon {
      position: absolute;
      width: 16px;
      height: 16px;
      left: 10px;
      top: 16px;
      z-index: 1;
      &.icon3 {
        top: 19px;
      }
    }

    .btn {
      margin-top: 16px;
      padding: 16px 0;
      width: 100%;
    }

    .txt {
      margin-top: 12px;
      font-size: 14px;
      font-weight: 400;
      color: #606266;

      img {
        margin-right: 4px;
        width: 16px;
        height: 16px;
      }
    }

    .txt2 {
      margin-top: 20px;
    }
  }
}
.ecode {
  margin-bottom: 24px;
  width: 32%;
  img {
    width: 100%!important;
    height: 48px;
    object-fit: scale-down;
  }
}
.down_line {
  padding: 4px 20px;
  text-align: center;
}
.wd {
  font-size: 14px;
  color: #606266;
}
</style>
<style></style>
