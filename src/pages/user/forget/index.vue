<template>
  <div class="login_box container-auto normal-content">
    <div class="left">
      <img class="leftImg" alt="money" src="@/assets/images/login/left.png" />
    </div>
    <el-form class="form" :rules="rules" :model="form" ref="form">
      <h2>{{ $t("zhmm") }}</h2>
      <el-form-item :label="$t('account')" prop="email">
        <div class="line">
          <img class="icon icon2" src="@/assets/images/user/email.png" alt="" />
          <el-input
            class="input"
            :placeholder="$t('qsrsjhyx')"
            v-model="form.email"
          />
        </div>
      </el-form-item>
      <el-form-item :label="$t('yzm')" prop="checkCode">
        <div class="line flex flex_jc_sb flex_align_center">
          <img class="icon" src="@/assets/images/user/yzm.png" alt="" />
          <el-input
            class="input yzm"
            :placeholder="$t('qsryzm')"
            v-model="form.checkCode"
          />

          <el-button class="send_btn" type="primary" @click="sendSms">
            {{ timer == 60 ? $t("send") : timer }}
          </el-button>
        </div>
      </el-form-item>

      <el-form-item :label="$t('xdlmm')" prop="newPassword">
        <el-dropdown class="item pointer" style="width: 100%" trigger="click">
          <div class="line">
            <img class="icon" src="@/assets/images/user/password.png" alt="" />
            <el-input
              show-password
              class="input"
              :placeholder="$t('qsrmm')"
              v-model="form.newPassword"
            />
            <el-dropdown-menu slot="dropdown">
              {{ $t("qsrmm") }}
            </el-dropdown-menu>
          </div>
        </el-dropdown>
      </el-form-item>
      <el-form-item :label="$t('zcxdlmm')" prop="renewPassword">
        <div class="line">
          <img
            class="icon icon2"
            src="@/assets/images/user/password.png"
            alt=""
          />
          <el-input
            show-password
            class="input"
            :placeholder="$t('qzcsrmm')"
            v-model="form.renewPassword"
            @keyup.enter.native="submitForm('form')"
          />
        </div>
      </el-form-item>
      <!-- <el-form-item :label="$t('qsrtxm')" prop="ecode">
        <div class="line flex flex_jc_sb flex_align_center">
          <img class="icon icon3" src="@/assets/images/user/txm.png" alt="" />
          <el-input
            class="input yzm"
            :placeholder="$t('qsrtxm')"
            v-model="form.ecode"
            @keyup.enter.native="submitForm('form')"
          />
          <div class="ecode pointer" :class="imgLoading && 'loading'">
            <img
              width="100%"
              @load="() => (imgLoading = false)"
              class="captchaImg"
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
      </el-form-item> -->
      <div class="flex btn_group">
        <el-button
          class="btn normal-btn"
          type="primary"
          @click="submitForm('form')"
          >{{ $t("sure") }}</el-button
        >
        <el-button class="btn" @click="to('/user/login')">{{
          $t("back")
        }}</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { Local } from "@/utils/index";
import { forgotPwd, sendCheckCode } from "@/api/login";
import { Message } from "element-ui";
import Ecode from "@/components/common/ecode.vue";
export default {
  name: "userRegister",
  components: { Ecode },
  data() {
    return {
      imgLoading: true,
      input3: "",
      timer: 60,
      t: Math.random(),
      languge: Local("lang") || "zh",
      identifyCodes: "123456789abcdwerwshdjeJKDHRJHKPLMKQ", //绘制的随机数
      identifyCode: "",
      rules: {
        email: [
          {
            required: true,
            message: this.$t("qsrsjhyx"),
            trigger: "blur",
          },
        ],
        checkCode: [
          {
            required: true,
            message: this.$t("qsryzm"),
            trigger: "blur",
          },
        ],
        newPassword: [
          {
            required: true,
            message: this.$t("qsrmm"),
            trigger: "blur",
          },
        ],
        renewPassword: [
          {
            required: true,
            message: this.$t("qzcsrmm"),
            trigger: "blur",
          },
        ],
        ecode: [
          {
            required: true,
            message: this.$t("qsrtxm"),
            trigger: "blur",
          },
        ],
      },
      form: {},
    };
  },
  mounted() {
    // this.refreshCode()
  },
  methods: {
    async sendSms() {
      if (this.timer != 60) return;
      let { email } = this.form;
      if (!email) {
        const msg = "qsryxhm";
        return Message({
          type: "error",
          message: this.$t(msg),
        });
      }
      try {
        const result = await sendCheckCode({ email: email });
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
      } catch (error) {}
    },
    randomT() {
      if (this.imgLoading) return;
      this.imgLoading = true;
      this.t = Math.random();
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    randomNum(min, max) {
      max = max + 1;
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 随机生成验证码字符串
    makeCode(data, len) {
      for (let i = 0; i < len; i++) {
        this.identifyCode += data[this.randomNum(0, data.length - 1)];
      }
    },
    to(path) {
      this.$router.push(path);
    },
    checkLang(lang) {
      this.languge = lang;
      Local("lang", lang);
      this.$i18n.locale = lang;
    },
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.loading) return;
          let params = {
            checkCode: this.form.checkCode,
            password: this.form.newPassword,
          };
          if (this.form.email.includes("@")) {
            params.email = this.form.email;
          } else {
            params.phone = this.form.email;
          }
          if (!params) return;
          try {
            this.loading = true;
            const res = await forgotPwd(params);
            Message({
              type: "success",
              message: this.$t("czcg"),
            });
            this.$store.commit("SET_USERINFO", res.data);
            this.loading = false;
            // 非管理员，未认证的话只能去KYC认证
            if (!res.data.admin) {
              if (res.data.userStatus) {
                this.$router.push("/admin");
              } else {
                this.$router.push("/admin/kycverification");
              }
            } else {
              this.$router.push("/manage");
            }
          } catch {
            this.randomT();
            this.loading = false;
            this.form.code = "";
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
@import "../common.scss";

.login_box {
  .form {
    display: block;
    .line {
      position: relative;
      width: 100%;
    }

    .send_btn {
      // margin-bottom: 24px;
      padding: 15px 0;
      width: 27%;
    }

    .ecode {
      // margin-bottom: 24px;
      width: 27%;
      transform: translateY(5px);
      margin-bottom: 0;
    }

    .input {
      // margin-bottom: 14px;
      width: 100% !important;
      margin-bottom: 0;
      /* width: 30%!important; */
      ::v-deep input {
        padding-left: 30px !important;
        height: 48px;
        line-height: 48px;
      }

      &.yzm {
        width: 70% !important;
      }
    }

    .icon {
      position: absolute;
      width: 16px;
      height: 16px;
      left: 10px;
      top: 16px;
      z-index: 1;

      &.icon2 {
        top: 56px;
      }
      &.icon3 {
        top: 24px;
      }
    }

    .btn {
      margin-top: 16px;
      padding: 16px 0;
      width: 26.58%;
    }

    .btn_group {
      gap: 40px;
      justify-content: center;
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
        width: 50%;
        text-align: center;
        flex: 1;
        justify-content: center;
        display: flex;
      }
    }

    .txt2 {
      margin-top: 20px;
    }
  }
}
::v-deep .el-form-item__label {
  color: #fff;
}
</style>
