<template>
  <div class="login_box">
    <div class="top">
      <img src="@/assets/images/index/logo.png" alt="" />
      <div class="flex tabs">
        <div
          class="item"
          :class="type == 1 && 'baseColor active'"
          @click="type = 1"
        >
          {{ $t("phone") }}
        </div>
        <div
          class="item"
          :class="type == 2 && 'baseColor active'"
          @click="type = 2"
        >
          {{ $t("email") }}
        </div>
      </div>
      <div class="form">
        <div class="line">
          <img class="icon" src="@/assets/images/user/user.png" alt="" />
          <el-input
            class="input"
            :placeholder="type == 1 ? $t('qsrsjhm') : $t('qsryxhm')"
            v-model="form.phone"
          >
            <!-- :remote-method="remoteMethod"
                :loading="loading" -->
            <template v-if="type == 1" slot="prepend">
              <el-select
                style="width: 100px"
                v-model="form.areaCode"
                :placeholder="$t('qsr')"
              >
                <el-option
                  style="width: 100px; padding: 0 20px"
                  v-for="item in aereList"
                  :key="item.areaCode"
                  :label="item.areaCode"
                  :value="item.areaCode"
                >
                  {{ item.name }}
                </el-option>
              </el-select>
            </template>
          </el-input>
        </div>
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

        <div class="line">
          <img class="icon" src="@/assets/images/user/password.png" alt="" />
          <el-input
            class="input"
            show-password
            :placeholder="$t('qsrmm')"
            v-model="form.password"
          />
        </div>
        <div class="line">
          <img class="icon" src="@/assets/images/user/password.png" alt="" />
          <el-input
            class="input"
            show-password
            :placeholder="$t('qzcsrmm')"
            v-model="form.repassWord"
          />
        </div>
        <div class="line">
          <img class="icon" src="@/assets/images/user/tjr.png" alt="" />
          <el-input
            class="input"
            :placeholder="$t('qsryqm')"
            v-model="form.inviteCode"
          />
        </div>

        <div class="line flex flex_jc_sb flex_align_center">
          <img class="icon icon3" src="@/assets/images/user/txm.png" alt="" />
          <el-input
            class="input yzm"
            :placeholder="$t('qsrtxm')"
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

        <div class="flex agree_txt flex_align_center">
          <el-checkbox
            v-model="checked"
            style="margin-right: 5px"
          ></el-checkbox>
          {{ $t("tybzs") }}
          <span class="baseColor pointer">《{{ $t("wlptfwxy") }}》</span
          >{{ $t("he")
          }}<span class="baseColor pointer">《{{ $t("yszc") }}》</span>
        </div>
        <el-button
          class="btn"
          type="primary"
          :class="loading && 'loading'"
          @click="regester"
          >{{ $t("login") }}</el-button
        >

        <div class="txt flex flex_nowrap flex_align_center flex_jc_sb">
          <div
            class="pointer item baseColor flex flex_nowrap flex_align_center"
            @click="to('/user/login')"
          >
            <img src="@/assets/images/user/back.png" alt="" />{{ $t("login") }}
          </div>
          <el-dropdown class="item pointer" trigger="click">
            <div class="pointer flex flex_nowrap flex_align_center wd">
              {{ $t("nowLanguage")
              }}<img src="@/assets/images/user/down.png" alt="" />
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="down_line">
                <div @click="checkLang('zh')">中文</div>
              </el-dropdown-item>
              <el-dropdown-item class="down_line">
                <div @click="checkLang('en')">English</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Locol } from "@/utils/index";
import { sendCheckCode, reg, countries } from "@/api/login";
import { Message } from "element-ui";

export default {
  name: "userRegister",
  data() {
    return {
      input3: "",
      languge: Locol("lang") || "zh",
      t: Math.random(),
      imgLoading: true,
      loading: false,
      timer: 60,
      type: 1,
      checked: false,
      aereList: [],
      form: {
        phone: "",
        password: "",
        areaCode: "+86",
        repassWord: "",
        inviteCode: "",
        checkCode: "",
        code: "",
      },
    };
  },
  beforeDestroy() {
    clearInterval(this.tt);
  },
  created() {
    this.getAreaCode();
  },
  methods: {
    async getAreaCode() {
      try {
        let list = Locol("aereList");
        if (list && list.length) {
          return (this.aereList = list);
        }
        let res = await countries();
        this.aereList = res.data;
        Locol("aereList", res.data);
      } catch (error) {}
    },
    to(path) {
      this.$router.push(path);
    },
    checkLang(lang) {
      this.languge = lang;
      Locol("lang", lang);
      this.$i18n.locale = lang;
    },
    randomT() {
      if (this.imgLoading) return;
      this.imgLoading = true;
      this.t = Math.random();
    },
    valid() {
      let {
        phone,
        areaCode,
        password,
        repassWord,
        code,
        checkCode,
        inviteCode,
      } = this.form;
      let msg = "";
      if (!phone) {
        if (this.type == 1) {
          msg = "qsrsjhm";
        } else {
          msg = "qsryxhm";
        }
      } else if (!checkCode) {
        msg = "qsryzm";
      } else if (!password) {
        msg = "qsrmm";
      } else if (!repassWord) {
        msg = "qzcsrmm";
      } else if (password != repassWord) {
        msg = "repassError";
      } else if (!inviteCode) {
        msg = "qsryqm";
      } else if (!code) {
        msg = "qsrtxm";
      } else if (!this.checked) {
        msg = "qtyxy";
      }
      if (msg) {
        Message({
          type: "error",
          message: this.$t(msg),
        });
        return false;
      }
      let param = {
        code,
        checkCode,
        password,
        areaCode,
        inviteCode,
      };
      if (this.type == 1) {
        param.phone = phone;
      } else {
        param.email = phone;
      }
      return param;
    },
    async regester() {
      if (this.loading) return;
      let params = this.valid();
      if (!params) return;
      try {
        this.loading = true;
        await reg(params);
        Message({
          type: "success",
          message: this.$t("zccg"),
        });
        this.$router.push("/user/login");
        this.loading = false;
      } catch (error) {
        this.randomT();
        this.loading = false;
      }
    },
    async sendSms() {
      if (this.timer != 60) return;
      let { phone, areaCode } = this.form;
      if (!phone) {
        let msg = "qsrsjhm";
        if (this.type == 2) {
          msg = "qsryxhm";
        }
        return Message({
          type: "error",
          message: this.$t(msg),
        });
      }
      this.timer--;
      this.tt = setInterval(() => {
        this.timer--;
        if (this.timer <= 0) {
          clearInterval(this.tt);
          this.timer = 60;
        }
      }, 1000);
      try {
        let param = {
          areaCode,
        };
        if (this.type == 1) {
          param.phone = phone;
        } else {
          param.email = phone;
        }
        await sendCheckCode(param);
        Message({
          type: "success",
          message: this.$t("fscg"),
        });
      } catch (error) {}
    },
  },
};
</script>
<style scoped lang="scss">
.login_box {
  padding: 20px 40px;
  position: absolute;
  left: 50%;
  top: 44%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 56, 147, 0.25);
  width: 30%;
  max-width: 448px;
  min-width: 250px;
  .tabs {
    .item {
      cursor: pointer;
      margin-right: 10px;
      &.active {
        border-bottom: 1px solid;
      }
    }
  }
  .top {
    text-align: center;

    img {
      width: 62.5%;
    }
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
<style></style>
