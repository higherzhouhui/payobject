<template>
  <div class="password-auth">
    <el-form-item :label="$t('验证方式')">
      <el-radio v-model="form.pwdType" label="payPass">支付密码</el-radio>
      <el-radio class="radio" v-model="form.pwdType" label="verCode"
        >手机或邮箱验证码</el-radio
      >
    </el-form-item>
    <el-form-item :label="$t('支付密码')" v-if="form.pwdType == 'payPass'">
      <el-input
        v-model="form.payPass"
        show-password
        :placeholder="$t('请输入支付密码')"
      ></el-input>
    </el-form-item>
    <el-form-item
      :label="$t('验证码')"
      v-if="form.pwdType == 'verCode'"
      class="form-wrapper"
    >
      <el-input
        v-model="form.verCode"
        :placeholder="$t('请输入验证码')"
      ></el-input>
      <el-button
        class="send"
        :class="loading && 'loading'"
        @click="sendSms"
        v-if="timer == '60'"
        >发送</el-button
      >
      <span class="send timer" v-else>{{ timer }}</span>
    </el-form-item>
  </div>
</template>
<script>
import { sendCheckCode } from "@/api/login";

export default {
  name: "passWord",
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      form: {
        pwdType: '',
        payPass: '',
        verCode: '',
      },
      params: {},
      loading: false,
      timer: 60,
    };
  },
  created() {},
  watch: {
    form: {
      deep: true,
      handler: function () {
        let param = {}
        if (this.form.pwdType == 'payPass') {
          param = {
            verCode: '',
            payPass: this.form.payPass
          }
        }
        if (this.form.pwdType == 'verCode') {
          param = {
            payPass: '',
            verCode: this.form.verCode
          }
        }
        this.$emit("changeData", param);
      },
    },
  },
  mounted() {
    const userInfo = this.$store.state.userInfo;
    if (userInfo.phone) {
      this.params = {
        phone: userInfo.phone,
      };
    } else {
      this.params = {
        email: userInfo.email,
      };
    }
  },
  methods: {
    async sendSms() {
      try {
        this.loading = true;
        const result = await sendCheckCode(this.params);
        this.loading = false;
        if (result.code === 200) {
          this.timer--;
          this.tt = setInterval(() => {
            this.timer--;
            if (this.timer <= 0) {
              clearInterval(this.tt);
              this.timer = 60;
            }
          }, 1000);
          this.$message({
            type: "success",
            message: this.$t("fscg"),
          });
        }
      } catch {
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.radio {
  margin-left: 12px;
}
.form-wrapper {
  position: relative;
  .send {
    position: absolute;
    right: 0;
    top: 0;
    padding: 0 16px;
    top: 0;
    height: 100%;
    color: #fff;
    display: flex;
    align-items: center;
    background: $baseColor;
    border: none;
    @media screen and (max-width: 500px) {
      height: calc(100% - 4px);
      top: 2px;
    }
  }
  .timer {
    color: #fff;
    background: #adadad;

  }
}
</style>
