
<template>
  <div class="user_withdrawmanagement_withdraw_contianer">
    <LinkPath :linkList="linkList" />
    <div class="content flex">
      <!-- <div class="left">
        <div class="title">1、{{ $t("tczhybz3") }}</div>
        <div class="content_shadow">
          <el-form label-position="top">
            <el-form-item :label="$t('tczh3')">
              <el-select
                class="form-item"
                v-model="value"
                :placeholder="$t('xztcz3')"
              >
                <el-option
                  style="padding: 0 20px"
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('xztczh3')">
              <el-select
                class="form-item"
                v-model="value"
                :placeholder="$t('xzdzbz')"
              >
                <el-option
                  style="padding: 0 20px"
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div> -->
      <div class="right">
        <!-- <div class="title">2、{{ $t("txddxx3") }}</div> -->
        <el-tabs v-model="moneyType">
          <el-tab-pane label="法定货币" name="fabi"></el-tab-pane>
          <el-tab-pane label="数字货币" name="usdt"></el-tab-pane>
        </el-tabs>
        <div class="content_shadow">
          <el-form :model="form" label-width="120px" v-if="moneyType == 'fabi'">
            <el-form-item :label="$t('币种')" prop="coinCode">
              <el-select
                class="form-item-1"
                v-model="form.coinCode"
                :placeholder="$t('请选择要出款的币种')"
              >
                <el-option
                  style="padding: 0 20px"
                  v-for="item in bankListBalance"
                  :key="item.id"
                  :label="item.coinCode"
                  :value="item.coinCode"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('余额')" v-if="form.coinCode">
              <el-input
                class="form-item-1"
                :value="getBalanceNumber(form.coinCode)"
              />
            </el-form-item>
            <el-form-item :label="$t('出款目标货币')" prop="targetCode">
              <el-select
                class="form-item-1"
                v-model="form.targetCode"
                :placeholder="$t('请选择要出款目标币种')"
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
            </el-form-item>
            <el-form-item :label="$t('出款金额')" prop="reqValue">
              <el-input
                v-model="form.reqValue"
                type="number"
                class="form-item-1"
                :placeholder="$t('请输入出款金额')"
              />
            </el-form-item>
            <el-form-item :label="$t('预计金额')" v-if="form.bankId && form.coinCode && form.reqValue">
              <el-input
                class="form-item-1"
                v-model="calculateMoney"
                readOnly
              />
            </el-form-item>
            <el-form-item :label="$t('收款账号')" prop="bankId">
              <el-select
                class="form-item-1"
                v-model="form.bankId"
                :placeholder="$t('请选择出款账号')"
              >
                <el-option
                  style="padding: 0 20px"
                  v-for="item in outZHList"
                  :key="item.id"
                  :label="item.bankName"
                  :value="item.id.toString()"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('账号')" v-if="form.bankId">
              <el-input
                class="form-item-1"
                :value="getBankInfo(form.bankId, 'bankCode')"
              />
            </el-form-item>
            <el-form-item :label="$t('注册地址')" v-if="form.bankId">
              <el-input
                class="form-item-1"
                :value="getBankInfo(form.bankId, 'accountAdd')"
              />
            </el-form-item>
            <div class="bottom">
              <el-button class="primary hui" @click="handlePutWithDraw" v-loading="loading"
                ><img src="@/assets/images/withdrawManage/tx.png" alt="" />{{
                  $t("发起提现")
                }}</el-button
              >
            </div>
          </el-form>
          <el-form :model="usdtForm" label-width="120px" v-if="moneyType == 'usdt'">
            <el-form-item :label="$t('币种')" prop="srcCode">
              <el-select
                class="form-item-1"
                v-model="usdtForm.srcCode"
                :placeholder="$t('请选择要出款的币种')"
              >
                <el-option
                  style="padding: 0 20px"
                  v-for="item in bankListBalance"
                  :key="item.id"
                  :label="item.coinCode"
                  :value="item.coinCode"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('余额')" v-if="usdtForm.srcCode">
              <el-input
                class="form-item-1"
                :value="getBalanceNumber(usdtForm.srcCode)"
              />
            </el-form-item>
            <el-form-item :label="$t('出款目标货币')" prop="coinCode">
              <el-select
                class="form-item-1"
                v-model="usdtForm.coinCode"
                :placeholder="$t('请选择要出款目标币种')"
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
            </el-form-item>

            <el-form-item :label="$t('提现金额')" prop="reqValue">
              <el-input
                v-model="usdtForm.reqValue"
                type="number"
                class="form-item-1"
                :placeholder="$t('提现金额')"
              />
            </el-form-item>
            <el-form-item :label="$t('收款地址')" prop="cryptAdd">
              <el-input
                v-model="usdtForm.cryptAdd"
                class="form-item-1"
                :placeholder="$t('请输入收款地址')"
              />
            </el-form-item>
            <div class="bottom">
              <el-button class="primary hui" @click="handleUsdtPutDeposit" v-loading="loading"
                ><img src="@/assets/images/withdrawManage/tx.png" alt="" />{{
                  $t("发起提现")
                }}</el-button
              >
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <el-dialog :title="`详情`" :visible.sync="dialogVisible" :width="moneyType === 'fabi' ? '1000px' : '600px'" :before-close="() => {
      dialogVisible = false;
    }
      ">
      <el-form label-width="160px" ref="formss" :model="currentSelectRow" class="formStyle moreDetail" v-if="moneyType == 'fabi'">
        <el-form-item :label="$t('币种')" class="mb12">
          <el-input v-model="currentSelectRow.coinCode" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('充值金额')" class="mb12">
          <el-input v-model="currentSelectRow.reqValue" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('收款账户名称')" class="mb12">
          <el-input v-model="currentSelectRow.accountName" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('汇款账号名称')" class="mb12">
          <el-input v-model="currentSelectRow.sendAccount" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('收款账号')" class="mb12">
          <el-input v-model="currentSelectRow.inbankAccount" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('汇款账号')" class="mb12">
          <el-input v-model="currentSelectRow.outbankAccount" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('代码')" class="mb12">
          <el-input v-model="currentSelectRow.inbankCode" :readOnly="true"></el-input>
        </el-form-item>
        
        <el-form-item :label="$t('代码')" class="mb12">
          <el-input v-model="currentSelectRow.outbankCode" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('所属国家')" class="mb12">
          <el-input v-model="currentSelectRow.inbankCountry" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('所属国家')" class="mb12">
          <el-input v-model="currentSelectRow.outbankCountry" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('所在地址')" class="mb12">
          <el-input type="textarea" v-model="currentSelectRow.inbankAdd" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('所在地址')" class="mb12">
          <el-input type="textarea" v-model="currentSelectRow.outbankAdd" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('SWIFT')" class="mb12">
          <el-input v-model="currentSelectRow.inswiftCode" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('SWIFT')" class="mb12">
          <el-input v-model="currentSelectRow.outswiftCode" :readOnly="true"></el-input>
        </el-form-item>
      </el-form>

      <el-form label-width="160px" ref="formss" :model="currentSelectRow" class="formStyle" v-if="moneyType == 'usdt'">
        <el-form-item :label="$t('币种')" class="mb12">
          <el-input v-model="currentSelectRow.coinCode" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('钱包地址')" class="mb12">
          <el-input v-model="currentSelectRow.cryptAdd" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('金额')" class="mb12">
          <el-input v-model="currentSelectRow.reqValue" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('汇款地址')" class="mb12">
          <el-input v-model="currentSelectRow.tid" :readOnly="true"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
  <script>
import LinkPath from "@/components/common/linkPath.vue";
import {
  withdrawAccounts,
  depCoins,
  withdrawCoins,
  balanceList,
  putWithdraw,
  calculateRate,
  putCryptWithdraw,
  putCryptDeposit,
} from "@/api/out";
import { getCryAdd } from "@/api/exchange";
import { upload } from "@/api/file"
import { Message } from 'element-ui';
import { Local } from "@/utils/index";
import { cryptocurrencies } from "@/api/login";

export default {
  name: "userWithdrawManagementWithdraw",
  components: { LinkPath },
  data() {
    return {
      form: {
        coinCode: "",
        reqValue: "",
      },
      usdtForm: {
        coinCode: "",
        reqValue: "",
        cryptAdd: "",
        srcCode: "",
      },
      moneyType: 'fabi',
      tableData: [],
      options: [],
      type: "1",
      dialogVisible2: false,
      linkList: ["txgl", "tx"],
      rules: {
        coinCode: [{ required: true, message: "请选择充值币种", tigger: "blur" }],
        reqValue: [{ required: true, message: "请输入充值金额", tigger: "blur" }],
        sendBank: [{ required: true, message: "请选择汇款账号", tigger: "blur" }],
      },
      usdtRules: {
        coinCode: [{ required: true, message: "请选择充值币种", tigger: "blur" }],
        tid: [{ required: true, message: "请输入汇款地址", tigger: "blur" }],
        reqValue: [{ required: true, message: "请输入充值金额", tigger: "blur" }],
      },
      outCoinList: [],
      inCoinList: [],
      outZHList: [],
      bankListBalance: [],
      loading: false,
      dialogVisible: false,
      currentSelectRow: {},
      szList: [],
      calculateMoney: 0
    };
  },
  created() {
    this.getCjZh();
    this.getBalanceList();
    this.getCJBZ();
    this.getRJBZ();
    this.getSzList();
    //   calculateRate({
    //       exFrom: 'CNY',
    //       exTarget: 'USDT',
    //       exValue: 100
    //   })
  },
  watch: {
    'form': {
      deep: true,
      handler: function(newVal, oldVal) {  
        if (this.form.coinCode && this.form.targetCode && this.form.reqValue) {
          this.calculateRateMoney()
        }
      }, 
    }
  },
  methods: {
    async calculateRateMoney() {
      try {
          const res = await calculateRate({
            exFrom: this.form.coinCode,
            exTarget: this.form.targetCode,
            exValue: this.form.reqValue
          })
          this.calculateMoney = res.data.targetValue
      } catch {
      }
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
    async getUsdtAddress() {
      const res = await getCryAdd({cryCode: this.usdtForm.coinCode})
      this.usdtForm.cryptAdd = res.data.cryAdd
      this.usdtForm.userId = res.data.userId
    },

    async handleUsdtPutDeposit() {
      if (!this.usdtForm.coinCode || !this.usdtForm.reqValue || !this.usdtForm.cryptAdd || !this.usdtForm.srcCode) {
        Message({
          type: "warning",
          message: "请完善输入信息",
        });
        return
      }
      this.usdtForm.tid = this.usdtForm.cryptAdd
      this.loading = true
      try {
         await putCryptWithdraw({...this.usdtForm})
          Message({
            type: "success",
            message: "发起提现成功！",
          });
          this.loading = false
      } catch {
        this.loading = false
      }
    },
    async handlePutWithDraw() {
      if (!this.form.coinCode || !this.form.reqValue || !this.form.targetCode || !this.form.bankId) {
        Message({
          type: "warning",
          message: "请完善输入信息",
        });
        return
      }
      this.loading = true
      try {
        await putWithdraw({...this.form})
        this.loading = false
        Message({
          type: "success",
          message: "发起提现成功！",
        });
      } catch {
        this.loading = false
      }
    },
    async getBalanceList() {
      const res = await balanceList()
      this.bankListBalance = res.data
    },
    getBalanceNumber(coinCode) {
      let balance = 0
      this.bankListBalance.forEach(item => {
        if (item.coinCode == coinCode) {
          balance =  item.balance
        }
      })
      return balance
    },
    getBankInfo(bankId, attr) {
      let info = {}
      const newArr = this.outZHList.filter(item => {return item.id == bankId})
      if (newArr.length) {
        info = newArr[0]
      }
      return info[attr]
    },
    async send() {
      try {
        await putWithdraw(this.form);
      } catch (error) {}
    },
    // 获取汇款账户
    async getCjZh() {
      try {
        let res = await withdrawAccounts();
        this.outZHList = res.data;
      } catch (error) {}
    },
    // 获取出金币种
    async getCJBZ() {
      try {
        let res = await withdrawCoins();
        this.outCoinList = res.data;
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
.yue {
  line-height: 17px;
  font-weight: bold;
  color: #e92424;
  margin-bottom: 12px;
}
.btn {
  padding: 4px 10px;
}
.btn a {
  color: #fff;
}
</style>
  
