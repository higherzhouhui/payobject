<template>
  <div class="login_box">
    <div class="form">
      <div class="admin-title">
        {{ $t("xgybdyx") }}
      </div>
      <div class="line">
        <img class="icon" src="@/assets/images/user/user.png" alt="user" />
        <el-input
          class="input"
          :value="$store.state.userInfo.email"
          disabled
        >
        </el-input>
      </div>
      <div class="line">
        <img class="icon" src="@/assets/images/user/user.png" alt="user" />
        <el-input
          class="input"
          v-model="form.email"
          :placeholder="$t('qsryxhm')"
          clearable
        >
        </el-input>
      </div>
      <div class="line flex flex_jc_sb flex_align_center">
        <img class="icon" src="@/assets/images/user/yzm.png" alt="" />
        <el-input
          class="input yzm"
          :placeholder="$t('qsryzm')"
          v-model="form.checkCode"
        />
        <el-button class="send_btn" :class="codeloading && 'loading'" type="primary" @click="sendSms">
          {{ timer == 60 ? $t("send") : timer }}
        </el-button>
      </div>

      <el-button
        class="btn normal-btn"
        type="primary"
        :class="loading && 'loading'"
        @click="resetEmail"
        >{{ $t("queding") }}</el-button
      >
    </div>
  </div>
</template>
<script>
import { sendCheckCode, resetEmailReq } from "@/api/login";
import { Message } from "element-ui";

export default {
  name: "changeEmail",
  data() {
    return {
      t: Math.random(),
      imgLoading: true,
      loading: false,
      codeloading: false,
      timer: 60,
      type: 2,
      checked: true,
      areaList: [],
      form: {
        email: "",
        checkCode: "",
      },
    };
  },
  beforeDestroy() {
    clearInterval(this.tt);
  },
  created() {
  },
  mounted() {
    if (this.$store.state.userInfo.email.includes('@')) {
      this.type = 2
    } else {
      this.type = 1
    }
  }, 
  methods: {
    to(path) {
      this.$router.push(path);
    },
    randomT() {
      if (this.imgLoading) return;
      this.imgLoading = true;
      this.t = Math.random();
    },
    valid() {
      let {
        email,
        checkCode,
      } = this.form;
      let msg = "";
      if (!email) {
        msg = "qsryxhm";
      } else if (!checkCode) {
        msg = "qsryzm";
      }
      if (msg) {
        Message({
          type: "error",
          message: this.$t(msg),
        });
        return false;
      }
      return this.form;
    },
    async resetEmail() {
      if (this.loading) return;
      let params = this.valid();
      if (!params) return;
      try {
        this.loading = true;
        await resetEmailReq(params);
        this.loading = false
        const userInfo = this.$store.state.userInfo
        userInfo.email = params.email
        this.$store.commit("SET_USERINFO", userInfo);
        Message({
          type: "success",
          message: this.$t("czcg"),
        });
      } catch (error) {
        this.randomT();
        this.loading = false;
      }
    },
    async sendSms() {
      if (this.timer != 60) return;
      let { email } = this.form;
      if (!email) {
        let msg = "qsrsjhm";
        if (this.type == 2) {
          msg = "qsryxhm";
        }
        return Message({
          type: "error",
          message: this.$t(msg),
        });
      }
      this.codeloading = true
      try {
        let param = {email: email};
        const result = await sendCheckCode(param);
        this.codeloading = false
        if (result.code === 200) {
          this.timer--;
          this.tt = setInterval(() => {
            this.timer--;
            if (this.timer <= 0) {
              clearInterval(this.tt);
              this.timer = 60;
            }
          }, 1000);
          Message({
          type: "success",
          message: this.$t("fscg"),
        });
        // eslint-disable-next-line no-empty
        } else {
        }
      } catch (error) {
        this.codeloading = false
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import "@/pages/user/common.scss";

.login_box {
  width: 700px;
  margin: 0 auto;
  .admin-title {
    span {
      font-size: 12px;
      color: #eee;
    }
  }
  @media screen and (max-width: 900px) {
    width: 100%;
    padding: 0!important;
    .form {
      padding: 1rem 6px!important;
    }
  }
  .tabs {
    margin-bottom: 1.2rem;
    .item {
      font-weight: bold;
      font-size: 16px;
      cursor: pointer;
      margin-right: 20px;
      
      &.active {
        border-bottom: 2px solid;
      }
    }
  }
  @media screen and (max-width: 700px) {
    min-width: 100%;
    left: 0;
    top: 0;
    transform: translate(0, 0);
    padding: 24px 12px;
  }
  .form {
    margin-top: 10px;

    .line {
      position: relative;
      width: 100%;
    }

    .send_btn {
      margin-bottom: 14px;
      padding: 15px 0;
      width: 34.7%;
    }
    .ecode {
      margin-bottom: 14px;
      width: 37%;
      //   transform: translateY(5px);
      img {
        width: 100%;
        height: 48px;
        object-fit: contain;
      }
    }
    .input {
      margin-bottom: 14px;
      width: 100% !important;

      /* width: 30%!important; */
      ::v-deep input {
        padding-left: 30px !important;
        height: 48px;
        line-height: 48px;
      }

      &.yzm {
        width: 60.56% !important;
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
      margin-top: 20px;
      font-size: 14px;
      font-weight: 400;
      color: #606266;

      img {
        margin-right: 4px;
        width: 16px;
        height: 16px;
      }

      .item {
        text-align: center;
        justify-content: center;
        display: flex;
      }
    }

    .txt2 {
      margin-top: 20px;
    }
  }

  .agree_txt {
    font-size: 12px;
    margin: 10px 0 20px;
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
