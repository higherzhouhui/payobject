<template>
    <div class="container-auto normal-content">
      <div class="left">
        <img class="leftImg" alt="money" src="@/assets/images/login/left.png" />
      </div>
      <div class="form">
        <h2>{{$t('welecomBack')}}</h2>
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
          class="normal-btn btn"
          :class="loading && 'loading'"
          type="primary"
          @click="toLogin"
          >{{ $t("login") }}</el-button
        >
        <div class="txt flex flex_nowrap flex_align_center flex_jc_sb">
          <div class="forget-btn" @click="to('/user/forget')">
            {{ $t("forgetpw") }}？
          </div>
        </div>
        <div
          class="flex register-line flex_align_center pointer flex_jc_sb_center"
          @click="to('/user/register')"
        >
          {{$t("noAccount")}}
          <span class="register-btn">{{$t("register")}}</span>-
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
          return this.$router.push("/admin");
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
@import "../common.scss";
</style>