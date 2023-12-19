<template>
  <div class="password-auth">
    <el-form-item :label="$t('验证方式')">
      <el-radio v-model="form.pwdType" label="payPass">支付密码</el-radio>
      <el-radio class="radio" v-model="form.pwdType" label="verCode"
        >电子邮箱验证码</el-radio
      >
    </el-form-item>
    <el-form-item :label="$t('支付密码')" v-if="form.pwdType == 'payPass'">
      <el-input
        v-model="form.payPass"
        show-password
        :placeholder="$t('请输入支付密码')"
        class="form-wrapper"
      >
      <el-button slot="append" class="send" @click="to('/admin/paypass')">{{ $store.state.userInfo.hasPayPass ? $t("忘记支付密码？") : $t("去设置") }}</el-button>
    </el-input>
    </el-form-item>
    <el-form-item
      :label="$t('验证码')"
      v-if="form.pwdType == 'verCode'"
      class="form-wrapper"
    >
      <el-input
        v-model="form.verCode"
        :placeholder="$t('qsryzm')"
      >
      <el-button
      slot="append"
      class="send"
      :class="loading && 'loading'"
      @click="sendSms"
      v-if="timer == '60'"
      >{{$t('send')}}</el-button
    >
    <el-button slot="append" class="send" v-else>{{ timer }}</el-button>
    </el-input>
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
    to(path) {
      this.$router.push(path)
    }, 
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
    padding: 0 16px;
    color: #fff;
  }
  .timer {
    color: #fff;
  }
}
::v-deep .el-input-group__append {
  background: $baseColor;
  border: 1px solid $baseColor;
}
::v-deep .el-form-item__label {
  color: #fff;
  font-size: 1rem;
}
::v-deep .el-radio__label {
  color: #fff;
  font-size: 1rem;
}
</style>
