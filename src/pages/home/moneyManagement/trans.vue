
<template>
  <div class="user_withdrawmanagement_withdraw_contianer">
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
                :placeholder="$t('请选择要充值的币种')"
              >
                <el-option
                  style="padding: 0 20px"
                  v-for="item in inCoinList"
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
            <el-form-item :label="$t('汇款账号')" prop="sendBank">
              <el-select
                class="form-item-1"
                v-model="form.sendBank"
                :placeholder="$t('请选择汇款账号')"
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

            <el-form-item :label="$t('账号')" v-if="form.sendBank">
              <el-input
                class="form-item-1"
                :value="getBankInfo(form.sendBank, 'bankCode')"
              />
            </el-form-item>
            <el-form-item :label="$t('注册地址')" v-if="form.sendBank">
              <el-input
                class="form-item-1"
                :value="getBankInfo(form.sendBank, 'accountAdd')"
              />
            </el-form-item>
            <el-form-item :label="$t('充值金额')" prop="reqValue">
              <el-input
                v-model="form.reqValue"
                type="number"
                class="form-item-1"
                :placeholder="$t('srtcje3')"
              />
            </el-form-item>

            <!-- <div class="move">
              <div class="flex" style="gap: 20px">
                <div>
                  <div class="txt">{{ $t("tcbz3") }}</div>
                  <el-select
                    style="padding: 0 20px"
                    class="form-item-2"
                    v-model="value"
                    :placeholder="$t('xzdzbz')"
                  >
                    <el-option
                      v-for="item in outCoinList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div>
                  <div class="txt">{{ $t("tcje3") }}</div>
                  <el-input
                    v-model="form.reqValue"
                    class="form-item-3"
                    :placeholder="$t('srtcje3')"
                  />
                </div>
              </div>
              <img
                class="frame"
                src="@/assets/images/withdrawManage/frame.png"
                alt=""
              />
              <img
                class="left_line"
                src="@/assets/images/withdrawManage/left_line.png"
                alt=""
              />
              <div>
                <div class="txt">{{ $t("dzbz") }}</div>
                <el-select
                  class="form-item-2"
                  v-model="form.coinCode"
                  :placeholder="$t('xzdzbz')"
                >
                  <el-option
                    style="padding: 0 20px"
                    v-for="item in inCoinList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.coinCode"
                  >
                  </el-option>
                </el-select>
              </div>
            </div> -->
            <!-- <el-form-item :label="$t('tkfy3')" class="mt30">
              <el-input class="form-item-1" :placeholder="$t('xztkfy3')" />
            </el-form-item> -->
            <div class="bottom">
              <el-button class="primary hui" @click="handlePutDeposit" v-loading="loading"
                ><img src="@/assets/images/withdrawManage/tx.png" alt="" />{{
                  $t("fqtx3")
                }}</el-button
              >
            </div>
          </el-form>
          <el-form :model="usdtForm" label-width="120px" v-if="moneyType == 'usdt'">
            <el-form-item :label="$t('币种')" prop="coinCode">
              <el-select
                class="form-item-1"
                v-model="usdtForm.coinCode"
                :placeholder="$t('请选择要充值的币种')"
                @change="getUsdtAddress"
              >
                <el-option
                  style="padding: 0 20px"
                  v-for="item in szList"
                  :key="item.id"
                  :label="item.coinCode"
                  :value="item.coinCode"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('余额')" v-if="usdtForm.coinCode">
              <el-input
                class="form-item-1"
                :value="getBalanceNumber(usdtForm.coinCode)"
              />
            </el-form-item>
            <el-form-item :label="$t('钱包地址')" prop="cryptAdd" v-if="usdtForm.coinCode">
              <el-input
                class="form-item-1"
                :value="usdtForm.cryptAdd"
              />
            </el-form-item>

            <el-form-item :label="$t('充值金额')" prop="reqValue">
              <el-input
                v-model="usdtForm.reqValue"
                type="number"
                class="form-item-1"
                :placeholder="$t('srtcje3')"
              />
            </el-form-item>
            <el-form-item :label="$t('汇款地址')" prop="tid">
              <el-input
                v-model="usdtForm.tid"
                class="form-item-1"
                :placeholder="$t('请输入汇款地址')"
              />
            </el-form-item>
            <div class="bottom">
              <el-button class="primary hui" @click="handleUsdtPutDeposit" v-loading="loading"
                ><img src="@/assets/images/withdrawManage/tx.png" alt="" />{{
                  $t("fqtx3")
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
        <el-form-item :label="$t('汇款凭证')" class="mb12">
          <el-upload
              class="upload-demo"
              action="null"
              list-type="text"
              accept=".pdf, .zip, .rar, image/*"
              :before-upload="(e) => handlesuccess(e)"
              multiple
              v-if="currentSelectRow.reqStatus == 1 || !currentSelectRow.reqStatus"
            >
              <el-button size="small" type="primary" class="btn">
                {{ $t("上传汇款凭证") }}
              </el-button>
          </el-upload>
          <el-button style="padding: 4px 20px" size="small" type="primary" class="btn" v-else><a
              :href="'/api/file/downLoad?url=' + currentSelectRow.reqProof" target="_blank">点击下载</a></el-button>
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
        <el-form-item :label="$t('汇款凭证')" class="mb12">
          <el-upload
              class="upload-demo"
              action="null"
              list-type="text"
              accept=".pdf, .zip, .rar, image/*"
              :before-upload="(e) => handlesuccess(e)"
              multiple
              v-if="currentSelectRow.reqStatus == 1 || !currentSelectRow.reqStatus"
            >
              <el-button size="small" type="primary" class="btn">
                {{ $t("上传汇款凭证") }}
              </el-button>
          </el-upload>
          <el-button style="padding: 4px 20px" size="small" type="primary" class="btn" v-else><a
              :href="'/api/file/downLoad?url=' + currentSelectRow.reqProof" target="_blank">点击下载</a></el-button>
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
  putDeposit,
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
        sendBank: "",
        coinCode: "",
        reqValue: "",
      },
      usdtForm: {
        coinCode: "",
        reqValue: "",
        cryptAdd: "",
        tid: "",
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
    };
  },
  created() {
    this.getCjZh();
    this.getBalanceList();
    // this.getCJBZ();
    this.getRJBZ();
    this.getSzList();
    //   calculateRate({
    //       exFrom: 'CNY',
    //       exTarget: 'USDT',
    //       exValue: 100
    //   })
  },
  methods: {
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
    async handlesuccess(e) {
      const size = e.size
      if (size > 20 * 1024 * 1024) {
        Message({
          type: "error",
          message: this.$t('sizeOver'),
        });
        return
      }
      const formData = new FormData();
      formData.append("file", e);
      try {
        const req = await upload(formData);
        if (req.code === 200) {
          // data.reqProof = req.data[0];
          // data.reqStatus = 2
          this.currentSelectRow = {
            ...this.currentSelectRow,
            reqProof: req.data[0],
            reqStatus: 2
          }
          let res;
          if (this.moneyType == 'fabi') {
            res = await putDeposit(this.currentSelectRow)
          }
          if (this.moneyType == 'usdt') {
            res = await putCryptDeposit(this.currentSelectRow)
          }
          if (res.code === 200) {
            Message({
              type: "success",
              message: this.$t('sccg'),
            });
          }
        }
      } catch (error) {
        console.log(error)
      }
      return false;
    },
    async handleUsdtPutDeposit() {
      if (!this.usdtForm.coinCode || !this.usdtForm.reqValue || !this.usdtForm.tid) {
        Message({
          type: "warning",
          message: "请完善输入信息",
        });
        return
      }

      this.loading = true
      const res = await putCryptDeposit({...this.usdtForm})
      this.loading = false
      if (res.code === 200) {
        Message({
          type: "success",
          message: "发起充值成功，请尽快完成转账，并上传转账凭证",
        });
        this.currentSelectRow = {
          id: res.data.id,
          ...this.usdtForm,
        }
        this.dialogVisible = true
      }
    },
    async handlePutDeposit() {
      if (!this.form.coinCode || !this.form.reqValue || !this.form.sendBank) {
        Message({
          type: "warning",
          message: "请完善输入信息",
        });
        return
      }
      this.inCoinList.forEach(item => {
        if (item.coinCode == this.form.coinCode) {
          this.form.bankId = item.bankId
        }
      })
      this.loading = true
      const res = await putDeposit({...this.form})
      this.loading = false
      if (res.code === 200) {
        Message({
          type: "success",
          message: "发起充值成功，请尽快完成转账，并上传转账凭证",
        });
        const inlist = this.inCoinList.filter(item => {return item.coinCode == this.form.coinCode})
        const outlist = this.outZHList.filter(item => {return item.id == this.form.sendBank})
        if (inlist.length && outlist.length) {
          this.currentSelectRow = {
            ...this.form,
            id: res.data.id,
            accountName: inlist[0].bank.bankName,
            inbankAccount: inlist[0].bank.bankAccount,
            inbankCode: inlist[0].bank.bankCode,
            inbankCountry: inlist[0].bank.bankCountry,
            inbankAdd: inlist[0].bank.bankAdd,
            inswiftCode: inlist[0].bank.swiftCode,
            sendAccount: outlist[0].bankName,
            outbankAccount: outlist[0].bankAccount,
            outbankCode: outlist[0].bankCode,
            outbankCountry: outlist[0].bankCountry,
            outbankAdd: outlist[0].bankAdd,
            outswiftCode: outlist[0].swiftCode,
          }
          this.dialogVisible = true
        }
      }
      console.log(res)
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
  