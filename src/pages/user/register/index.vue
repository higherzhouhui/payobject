<template>
  <div class="login_box container-auto normal-content">
    <div class="left">
      <img
        class="leftImg"
        alt="money"
        src="@/assets/images/register/left.png"
      />
    </div>
    <div class="form">
      <h2>{{ $t("createProfile") }}</h2>
      <!-- <div class="flex tabs">
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
      </div> -->
      <div class="line" v-if="type == 1">
        <img class="icon" src="@/assets/images/user/area.png" alt="user" />
        <el-select
          class="input"
          v-model="form.areaCode"
          :placeholder="$t('qxzgj')"
          @change="changeAraeSelect"
          filterable
        >
          <el-option
            style="padding: 0 10px"
            v-for="item in tempList"
            :key="item.id"
            :value="item.areaCode"
          >
            <div class="country">
              <div class="left">
                <span :class="`flag-icon ${getFlagIcon(item.coinCode)}`"></span>
                {{ lang == "zh" ? item.name : item.enName }}
              </div>
              <div class="right">{{ item.areaCode }}</div>
            </div>
          </el-option>
        </el-select>
      </div>
      <div class="area-wrapper">
        <!-- <el-input
          class="input-areacode"
          :placeholder="$t('qsr')"
          v-model="form.areaCode"
          v-if="type == 1"
          @change="changeAraeCode"
        >
      </el-input> -->
        <div class="line">
          <img class="icon" src="@/assets/images/user/user.png" alt="user" />
          <el-input
            class="input"
            :placeholder="type == 1 ? $t('qsrsjhm') : $t('qsryxhm')"
            v-model="form.phone"
          >
          </el-input>
        </div>
      </div>

      <!-- <div class="line">
        <img class="icon" src="@/assets/images/user/user.png" alt="user" />
        <el-input
          class="input"
          :placeholder="type == 1 ? $t('qsrsjhm') : $t('qsryxhm')"
          v-model="form.phone"
          ref="myName"
        >
          <template v-if="type == 1" slot="prepend">
            <el-select
              style="width: 90px"
              v-model="form.areaCode"
              :placeholder="$t('qsr')"
            >
              <el-option
                style="padding: 0 10px"
                v-for="item in areaList"
                :key="item.id"
                :label="item.areaCode"
                :value="item.areaCode"
              >
                <span :class="`flag-icon ${getFlagIcon(item.coinCode)}`"></span>
                {{ lang == "zh" ? item.name : item.enName }}
              </el-option>
            </el-select>
          </template>
        </el-input>
      </div> -->
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
          @keyup.enter.native="regester"
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
        <el-checkbox v-model="checked" style="margin-right: 5px"></el-checkbox>
        <span @click="checked = !checked" style="cursor: pointer">{{
          $t("tybzs")
        }}</span>
        <span class="baseColor pointer" @click="to('/privacy')"
          >《{{ $t("wlptfwxy") }}》</span
        >{{ $t("he")
        }}<span class="baseColor pointer" @click="to('/service')"
          >《{{ $t("yszc") }}》</span
        >
      </div>
      <el-button
        class="btn normal-btn"
        type="primary"
        :class="loading && 'loading'"
        @click="regester"
        >{{ $t("register") }}</el-button
      >

      <div
        class="flex register-line flex_align_center pointer flex_jc_sb_center"
        @click="to('/user/login')"
      >
        {{ $t("hadAccount") }}
        <span class="register-btn">{{ $t("login") }}</span
        >-
      </div>
    </div>
  </div>
</template>
<script>
import { Local } from "@/utils/index";
import { sendCheckCode, reg, countries } from "@/api/login";
import { Message } from "element-ui";
import { getFlagIcon } from "@/utils/common";

export default {
  name: "userRegister",
  data() {
    return {
      getFlagIcon: getFlagIcon,
      input3: "",
      lang: Local("lang") || "zh",
      t: Math.random(),
      imgLoading: true,
      loading: false,
      timer: 60,
      type: 2,
      checked: true,
      areaList: [],
      tempList: [],
      form: {
        phone: "",
        password: "",
        areaCode: "+86",
        countries: "CN",
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
    const hash = location.hash;
    const hashArray = hash.split("=");
    if (hashArray.length == 2) {
      this.form.inviteCode = hashArray[1];
    }
  },
  methods: {
    changeAraeSelect(value) {
      this.tempList.forEach(item => {
        if (item.areaCode == value) {
          this.form.countries = item.code
        }
      })
    },
    changeAraeCode(newValue) {
      if (!newValue) {
        this.form.areaCode = "+";
      } else {
        const newList = this.areaList.filter((item) => {
          return item.areaCode.includes(newValue);
        });
        this.tempList = newList;
      }
    },
    async getAreaCode() {
      try {
        let list = Local("areaList");
        if (list && list.length) {
          this.areaList = list;
          this.tempList = list;
          return;
        }
        let res = await countries();
        this.areaList = res.data;
        this.tempList = res.data;
        Local("areaList", res.data);
      } catch (error) {}
    },
    to(path) {
      this.$router.push(path);
    },
    checkLang(lang) {
      this.lang = lang;
      Local("lang", lang);
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
        countries,
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
        countries,
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
        const res = await reg(params);
        Message({
          type: "success",
          message: this.$t("zccg"),
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
      } catch (error) {
        this.randomT();
        this.loading = false;
        this.form.code = "";
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

      try {
        let param = {
          areaCode,
        };
        if (this.type == 1) {
          param.phone = phone;
        } else {
          param.email = phone;
        }
        const result = await sendCheckCode(param);
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
  },
};
</script>
<style scoped lang="scss">
@import "@/pages/user/common.scss";

.login_box {
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
        padding-left: 26px !important;
        height: 48px;
        line-height: 48px;
      }

      &.yzm {
        width: 60.56% !important;
      }
    }
    .area-wrapper {
      display: flex;
      .input-areacode {
        width: 70px;
        min-width: 70px;
        ::v-deep .el-input__inner {
          height: 48px;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          border: none;
        }
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
.country {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    font-weight: bold;
  }
  .right {
    color: $baseColor;
  }
}
</style>
