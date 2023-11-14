<template>
  <div class="login_box">
    <div class="form">
      <h2>{{$t("重置密码")}}</h2>
      <div class="line">
        <img class="icon" src="@/assets/images/user/user.png" alt="" />
        <el-input
          class="input"
          :placeholder="type == 1 ? $t('qsrsjhm') : $t('qsryxhm')"
          v-model="form.phone"
          ref="myName"
          disabled
        >
          <template v-if="type == 1" slot="prepend">
            <el-select
              style="width: 100px"
              v-model="form.areaCode"
              :placeholder="$t('qsr')"
            >
              <el-option
                style="padding: 0 10px"
                v-for="item in aereList"
                :key="item.id"
                :label="item.areaCode"
                :value="item.areaCode"
              >
                {{ languge == 'zh' ? item.name : item.enName}}
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
          :placeholder="$t('请输入原密码')"
          v-model="form.oldPass"
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
      <div class="line">
        <img class="icon" src="@/assets/images/user/password.png" alt="" />
        <el-input
          class="input"
          show-password
          :placeholder="$t('qzcsrmm')"
          v-model="form.repassWord"
          @keyup.enter.native="regester"
        />
      </div>

      <el-button
        class="btn normal-btn"
        type="primary"
        :class="loading && 'loading'"
        @click="regester"
        >{{ $t("确认") }}</el-button
      >
    </div>
  </div>
</template>
<script>
import { Local } from "@/utils/index";
import { sendCheckCode, resetPwd, countries } from "@/api/login";
import { Message } from "element-ui";

export default {
  name: "userRegister",
  data() {
    return {
      input3: "",
      languge: Local("lang") || "zh",
      t: Math.random(),
      imgLoading: true,
      loading: false,
      timer: 60,
      type: 2,
      checked: true,
      aereList: [],
      form: {
        phone: this.$store.state.userInfo.email,
        password: "",
        areaCode: "+86",
        repassWord: "",
        inviteCode: "SUPER-PAY",
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
  mounted() {  
    // this.$refs.myName.focus();  
  }, 
  methods: {
    async getAreaCode() {
      try {
        let list = Local("aereList");
        if (list && list.length) {
          return (this.aereList = list);
        }
        let res = await countries();
        this.aereList = res.data;
        Local("aereList", res.data);
      } catch (error) {}
    },
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
        phone,
        areaCode,
        password,
        repassWord,
        code,
        checkCode,
        oldPass,
      } = this.form;
      let msg = "";
      if (!checkCode) {
        msg = "qsryzm";
      } else if (!oldPass) {
        msg = "请输入原密码";
      } else if (!password) {
        msg = "qsrmm";
      } else if (!repassWord) {
        msg = "qzcsrmm";
      } else if (password != repassWord) {
        msg = "repassError";
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
    async regester() {
      if (this.loading) return;
      let params = this.valid();
      if (!params) return;
      try {
        this.loading = true;
        const res = await resetPwd({
          email: params.phone,
          checkCode: params.checkCode,
          oldPass: params.oldPass,
          newPass: params.password
        });
        Message({
          type: "success",
          message: this.$t("zccg"),
        });
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
      } catch (error) {
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
  h2 {
    color: #fff;
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
