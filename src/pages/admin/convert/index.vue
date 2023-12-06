
<template>
  <div>
    <!-- <LinkPath :linkList="linkList" /> -->
    <div class="user_withdrawmanagement_withdraw_contianer">
      <div class="money-wrapper">
        <div class="money-left">
          <div class="admin-title">{{$t('duihuan')}}</div>
          <div class="form-item">
            <div class="label">{{ $t("dhje") }}</div>
            <div class="input-with-select">
              <el-input
                type="number"
                :placeholder="$t('enterAmount')"
                v-model="form.reqValue"
                class="input-amount"
                @input="changeReqValue"
                :disabled="!form.coinCode"
              >
              </el-input>
              <el-select
                v-model="form.coinCode"
                class="input-select"
                ref="selectRef"
              >
                <el-option
                  v-for="item in bankListBalance"
                  :label="item.coinCode"
                  :value="item.coinCode"
                  :key="item.coinCode"
                ></el-option>
              </el-select>
            </div>
            <div class="remain" v-if="form.coinCode">
              {{$t('ye')}}<span>{{getReamin()}}</span>{{form.coinCode}}
            </div>
          </div>
          <ul class="list">
            <li v-if="rateDetail">{{ rateDetail }}</li>
            <li>{{ $t("limitNum") }}{{form.coinCode}}</li>
          </ul>
          <div class="form-item" v-if="form.coinCode">
            <div class="label">{{ $t("dhmbbz") }}</div>
            <div class="input-with-select">
              <el-select
                class="input-transaction"
                v-model="form.targetCode"
                :placeholder="$t('qxzdhmbbz')"
                ref="targetselectRef"
              >
                <el-option
                  style="padding: 0 20px"
                  v-for="item in outCoinList"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="normal-btn" @click="handleWithDraw" v-loading="loading">
            {{ $t("ljdh") }}
          </div>
        </div>
        <div class="money-right">
          <h2>{{ $t("dhyl") }}</h2>
          <div class="divider" />
          <div class="column">
            <div class="column-left">
              {{ $t("dhje") }}
            </div>
            <div class="column-right">
              {{ form.reqValue || 0
              }}<span class="unit">{{ form.coinCode }}</span>
            </div>
          </div>
          <div class="divider" v-if="form.reqValue" />
          <div class="column" v-if="form.reqValue">
            <div class="column-left">
              {{ $t("yjdzje") }}
            </div>
            <div class="column-right">
              {{ rate * this.form.reqValue || 0
              }}<span class="unit">{{ form.targetCode }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :title="$t('done')"
      :visible.sync="dialogVisibleSuccess"
      width="636px"
      :before-close="
        () => {
          dialogVisibleSuccess = false;
        }
      "
    >
      <div class="dialog-content">
        <img src="@/assets/images/moneyManage/success.png" />
        <div class="desc">
          {{ $t("fqdhcg") }}
        </div>
      </div>
      <el-button
        slot="footer"
        class="qd"
        @click="dialogVisibleSuccess = false"
        >{{ $t("done") }}</el-button
      >
    </el-dialog>
  </div>
</template>
<script>
import LinkPath from "@/components/common/linkPath.vue";
import {
  withdrawAccounts,
  depCoins,
  withdrawCoins,
  calculateRate,
  balanceList,
} from "@/api/out";
import { Message } from "element-ui";
import { Local } from "@/utils/index";
import { cryptocurrencies } from "@/api/login";
import { changeReq } from "@/api/convert";
export default {
  name: "userConverntManagementWithdraw",
  components: { LinkPath },
  data() {
    return {
      dialogVisibleSuccess: false,
      form: {
        coinCode: "",
        reqValue: "",
        targetCode: "",
      },
      usdtForm: {
        coinCode: "",
        reqValue: "",
        cryptAdd: "",
        srcCode: "",
        tid: "default",
        agreement: "TRC20",
      },
      transactionTypeList: [
        { label: this.$t("fdhb"), value: "fabi" },
        { label: this.$t("jmhb"), value: "usdt" },
      ],
      tableData: [],
      options: [],
      type: "1",
      dialogVisible2: false,
      linkList: ["txgl", "duihuan"],
      outCoinList: [],
      inCoinList: [],
      outZHList: [],
      bankListBalance: [],
      loading: false,
      dialogVisible: false,
      currentSelectRow: {},
      szList: [],
      rate: 0,
      rateDetail: "",
    };
  },
  created() {
    // this.getCjZh();
    this.getBalanceList();
    // this.getRJBZ();
    // this.getSzList();
  },
  watch: {
    "form.coinCode": function () {
      this.form.targetCode = "";
      this.form.reqValue = ""
      this.form.rateDetail = ""
      this.rate = ""
      this.getCJBZ();
    },
    form: {
      deep: true,
      handler: function (newVal, oldVal) {
        if (this.form.coinCode && this.form.targetCode) {
          this.calculateRateMoney();
        } else {
          this.rate = 0
          this.rateDetail = ''
        }
      },
    },
  },
  methods: {
    changeReqValue(value) {
      const max = this.getReamin(this.form.coinCode)
      if (value * 1 > max) {
        this.form.reqValue = max
      }
    },
    getReamin() {
      const rarr = this.bankListBalance.filter(item => {
        return item.coinCode == this.form.coinCode
      })
      return rarr[0].balance
    },
    async calculateRateMoney() {
      try {
        const res = await calculateRate({
          exFrom: this.form.coinCode,
          exTarget: this.form.targetCode,
          exValue: 1,
        });
        this.rate = res.data.targetValue;
        this.rateDetail = `${this.$t('lastestRate')} 1 ${this.form.coinCode} = ${this.rate} ${this.form.targetCode}`;
      } catch {}
    },
    async getSzList() {
      try {
        let list = Local("szList");
        if (list && list.length) {
          return (this.szList = list);
        }
        let res = await cryptocurrencies();
        this.szList = res.data;
        Local("szList", res.data);
      } catch (error) {}
    },

    async handlePutWithDraw() {
      if (!this.form.coinCode || !this.form.reqValue || !this.form.targetCode) {
        Message({
          type: "warning",
          message: this.$t("qwsxx"),
        });
        return;
      }
      this.loading = true;
      try {
        await changeReq({
          depCoin: this.form.coinCode,
          targetCoin: this.form.targetCode,
          depValue: this.form.reqValue,
        });
        this.loading = false;
        this.dialogVisibleSuccess = true;
      } catch {
        this.loading = false;
      }
    },
    handleWithDraw() {
      this.handlePutWithDraw();
    },
    async getBalanceList() {
      const res = await balanceList();
      const arr = res.data.filter((obj, index, self) => {
        return (
          self.findIndex((obj1) => obj1.coinCode === obj.coinCode) === index
        );
      });
      this.bankListBalance = arr;
      this.$refs.selectRef.toggleMenu();
    },
    getBalanceNumber(coinCode) {
      let balance = 0;
      this.bankListBalance.forEach((item) => {
        if (item.coinCode == coinCode) {
          balance = item.balance;
        }
      });
      return balance;
    },

    // 获取提现账户
    async getCjZh() {
      try {
        let res = await withdrawAccounts();
        this.outZHList = res.data;
      } catch (error) {}
    },
    // 获取出金币种
    async getCJBZ() {
      try {
        let res;
        // let cn = getFlagIcon(this.form.coinCode);
        // if (cn) {
        //   cn = cn.replace("flag-icon-", "").toLocaleUpperCase();
        // }
        // res = await getTargetCoin({ source: cn });
        res = await withdrawCoins({ code: this.form.coinCode });
        this.outCoinList = res.data;
        this.$refs.targetselectRef.toggleMenu();
      } catch (error) {}
    },
    // 获取入金币种
    async getRJBZ() {
      try {
        let res = await depCoins();
        this.inCoinList = res.data;
      } catch (error) {}
    },
    handleClick() {},
  },
};
</script>
  <style scoped lang="scss">
.user_withdrawmanagement_withdraw_contianer {
  .content {
    margin-top: 40px;
    gap: 32px;

    .title {
      margin-bottom: 20px;
      font-size: 20px;
      color: #303133;
    }

    .content_shadow {
      padding: 24px;
      box-sizing: border-box;
      border-radius: 10px;
      height: 95%;
      display: flex;
      justify-content: center;
    }

    .left {
      width: 382px;

      .form-item {
        width: 100%;
      }
    }

    .right {
      width: 100%;

      .form-item-1 {
        width: 456px;
      }

      .form-item-2 {
        width: 186px;
      }

      .form-item-3 {
        width: 300px;
      }

      .move {
        position: relative;
        margin-left: 30px;

        .frame {
          margin: 40px 0;
          height: 112px;
        }
        .left_line {
          position: absolute;
          top: 48px;
          left: -30px;
          height: 270px;
        }
      }

      .txt {
        margin-bottom: 10px;
        font-size: 14px;
        color: #606266;
      }
      .bottom {
        padding-top: 30px;
        border-top: 1px solid #dcdfe6;
        text-align: center;
      }
    }
  }
}
.el-select-dropdown__item {
  padding: 6px 9px;
  display: flex;
  align-items: center;
  color: #000;
  &:hover {
    background: $baseColor;
  }
}
.dialog-content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    width: 160px;
    object-fit: contain;
  }
  .desc {
    font-size: 1.2rem;
    margin: 6px 0;
    max-width: 80%;
    text-align: center;
    color: $baseColor;
  }
}
.normal-btn {
  margin-top: 5rem;
}
.remain {
  font-size: 1rem;
  margin-top: 6px;
  span {
    font-weight: bold;
    color: $baseColor;
    margin: 0 6px;
    font-size: 1.2rem;
  }
}
</style>
  
