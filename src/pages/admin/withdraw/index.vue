
<template>
  <div>
    <!-- <LinkPath :linkList="linkList" /> -->

    <div class="user_withdrawmanagement_withdraw_contianer">
      <div class="money-wrapper">
        <div class="money-left">
          <div class="admin-title">{{$t('tx')}}</div>
          <div class="form-item">
            <div class="label">{{ $t("hblx") }}</div>
            <div class="input-with-select">
              <el-select v-model="moneyType" class="input-transaction">
                <el-option
                  v-for="item in transactionTypeList"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="form-item" v-if="moneyType == 'fabi'">
            <div class="label">{{ $t("txje") }}</div>
            <div class="input-with-select">
              <el-input
                :placeholder="$t('enterAmount')"
                type="number"
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
                  v-for="item in filterBalanceList()"
                  :label="item.coinCode"
                  :value="item.coinCode"
                  :key="item.coinCode"
                ></el-option>
              </el-select>
            </div>
            <div class="remain" v-if="form.coinCode">
              {{ $t("ye") }}<span>{{ getReamin(form.coinCode) }}</span>{{form.coinCode}}
            </div>
          </div>
          <div class="form-item" v-else>
            <div class="label">{{ $t("txje") }}</div>
            <div class="input-with-select">
              <el-input
                type="number"
                :placeholder="$t('enterAmount')"
                v-model="usdtForm.reqValue"
                @input="changeUsdtReqValue"
                class="input-amount"
                :disabled="!usdtForm.srcCode"
              >
              </el-input>
              <el-select
                class="input-select"
                v-model="usdtForm.srcCode"
                @change="getAddressList"
                :placeholder="$t('qsz')"
              >
                <el-option
                  style="padding: 0 20px"
                  v-for="item in filterBalanceList()"
                  :key="item.id"
                  :label="item.coinCode"
                  :value="item.coinCode"
                >
                </el-option>
              </el-select>
            </div>
            <div class="remain" v-if="usdtForm.srcCode">
              {{ $t("ye") }}<span>{{ getReamin(usdtForm.srcCode) }}</span>{{usdtForm.srcCode}}
            </div>
          </div>
          <!-- <div class="form-item" v-if="moneyType == 'fabi' && form.coinCode">
            <div class="label">{{ $t("txmbbz") }}</div>
            <div class="input-with-select">
              <el-select
                class="input-transaction"
                v-model="form.targetCode"
                :placeholder="$t('qsztxmbbz')"
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
          </div> -->
          <!-- <div class="form-item" v-if="moneyType == 'usdt' && usdtForm.srcCode">
            <div class="label">{{ $t("txmbbz") }}</div>
            <div class="input-with-select">
              <el-select
                class="input-transaction"
                v-model="usdtForm.coinCode"
                :placeholder="$t('qsztxmbbz')"
              >
                <el-option
                  style="padding: 0 20px"
                  v-for="item in szList"
                  :key="item.coinCode"
                  :label="item.coinCode"
                  :value="item.coinCode"
                >
                </el-option>
              </el-select>
            </div>
          </div> -->
          <ul class="list">
            <li>{{ $t("limitNum") }}{{moneyType == 'fabi' ? form.coinCode : usdtForm.srcCode}}</li>
          </ul>
          <div class="form-item" v-if="moneyType == 'fabi'">
            <div class="label">{{ $t("txzh") }}</div>
            <div class="input-with-select">
              <el-select
                class="input-transaction"
                v-model="form.bankId"
                :placeholder="$t('qsztxzh')"
                @change="changehkAccount"
                >
                <el-option
                  v-for="item in outZHList"
                  :key="item.id"
                  :label="item.bankName"
                  :value="item.id.toString()"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="form-item" v-if="moneyType == 'usdt'">
            <div class="label">{{ $t("txdqbdz") }}</div>
            <div class="input-with-select">
              <el-select
                class="input-transaction"
                v-model="usdtForm.cryptAdd"
                @change="changehkAddress"
                :placeholder="$t('qsxtxqbdz')"
              >
                <el-option
                  v-for="item in hkAddressList"
                  :key="item.id"
                  :label="item.cryAdd"
                  :value="item.cryAdd"
                >
                  <div class="el-option">
                    <div class="left">{{item.cryAdd}}</div>
                    <div class="right">{{item.agreement}}</div>
                  </div>
                </el-option>
              </el-select>
            </div>
          </div>
          <el-form
            label-position="top"
            ref="forms"
            :model="form"
            class="withdraw-password">
            <passwordVue @changeData="componentDataChange" />
          </el-form>
          <div class="normal-btn" @click="handleWithDraw" v-loading="loading">
            {{ $t("fqtx") }}
          </div>
        </div>
        <div class="money-right" v-if="moneyType == 'fabi'">
          <h2>{{ $t("txyl") }}</h2>
          <div class="divider" />
          <div class="column">
            <div class="column-left">
              {{ $t("hblx") }}
            </div>
            <div class="column-right">
              {{ $t("fdhb") }}
            </div>
          </div>
          <div class="divider" />
          <div class="column">
            <div class="column-left">
              {{ $t("txje") }}
            </div>
            <div class="column-right">
              {{ form.reqValue || 0 }}<span class="unit">{{ form.coinCode }}</span>
            </div>
          </div>
          <div class="divider" v-if="form.bankId" />
          <div class="column" v-if="form.bankId">
            <div class="column-left">
              {{ $t("txzh") }}
            </div>
            <div class="column-right">
              {{ getBankInfo(form.bankId, "bankCode") }}
            </div>
          </div>
          <div class="divider" v-if="form.bankId" />
          <div class="column" v-if="form.bankId">
            <div class="column-left">
              {{ $t("txyh") }}
            </div>
            <div class="column-right">
              {{ getBankInfo(form.bankId, "accountAdd") }}
            </div>
          </div>
          <div class="divider" />
          <div class="column">
            <div class="column-left">
              {{ $t("sxfei") }}
            </div>
            <div class="column-right">
              {{ $t("dqr") }}
            </div>
          </div>
          <div class="divider" v-if="calculateMoney" />
          <div class="column" v-if="calculateMoney">
            <div class="column-left">
              {{ $t("yjdzje") }}
            </div>
            <div class="column-right">
              {{ calculateMoney || 0 }}
            </div>
          </div>
        </div>
        <div class="money-right" v-else>
          <h2>{{ $t("txyl") }}</h2>
          <div class="divider" />
          <div class="column">
            <div class="column-left">
              {{ $t("hblx") }}
            </div>
            <div class="column-right">
              {{ $t("jmhb") }}
            </div>
          </div>
          <div class="divider" />
          <div class="column">
            <div class="column-left">
              {{ $t("txje") }}
            </div>
            <div class="column-right">
              {{ usdtForm.reqValue || 0 }}<span class="unit">{{ usdtForm.srcCode }}</span>
            </div>
          </div>
          <div class="divider" v-if="usdtForm.agreement" />
          <div class="column" v-if="usdtForm.agreement">
            <div class="column-left">
              {{ $t("jmxy") }}
            </div>
            <div class="column-right">
              {{ usdtForm.agreement }}
            </div>
          </div>
          <div class="divider" v-if="usdtForm.cryptAdd" />
          <div class="column" v-if="usdtForm.cryptAdd">
            <div class="column-left">
              {{ $t("txdqbdz") }}
            </div>
            <div class="column-right">
              {{ usdtForm.cryptAdd }}
            </div>
          </div>
          <div class="divider" />
          <div class="column">
            <div class="column-left">
              {{ $t("sxfei") }}
            </div>
            <div class="column-right">
              {{ $t("dqr") }}
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="content flex">
        <div class="right">
          <el-tabs v-model="moneyType">
            <el-tab-pane label="法定货币" name="fabi"></el-tab-pane>
            <el-tab-pane label="加密货币" name="usdt"></el-tab-pane>
          </el-tabs>
          <div class="content_shadow">
            <el-form :model="form" label-width="120px" v-if="moneyType == 'fabi'">
              <el-form-item :label="$t('币种')" prop="coinCode">
                <el-select
                  class="form-item-1"
                  v-model="form.coinCode"
                  :placeholder="$t('请选择要提现的币种')"
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
              <el-form-item :label="$t('提现目标货币')" prop="targetCode">
                <el-select
                  class="form-item-1"
                  v-model="form.targetCode"
                  :placeholder="$t('请选择要提现目标币种')"
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
                  v-model="form.reqValue"
                  type="number"
                  class="form-item-1"
                  :placeholder="$t('请输入提现金额')"
                />
              </el-form-item>
              <el-form-item :label="$t('预计金额')" v-if="form.coinCode && form.reqValue">
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
                  :placeholder="$t('请选择提现账号')"
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
                <el-button class="primary hui" @click="handleWithDraw" v-loading="loading"
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
                  :placeholder="$t('请选择要提现的币种')"
                  disabled
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
              <el-form-item :label="$t('提现目标货币')" prop="coinCode">
                <el-select
                  class="form-item-1"
                  v-model="usdtForm.coinCode"
                  :placeholder="$t('请选择要提现目标币种')"
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
      </div> -->
      <el-dialog
        :title="$t('xq')"
        :visible.sync="dialogVisible"
        :width="moneyType === 'fabi' ? '1000px' : '600px'"
        :before-close="
          () => {
            dialogVisible = false;
          }
        "
      >
        <el-form
          label-position="top"
          ref="formss"
          :model="currentSelectRow"
          class="formStyle moreDetail"
          v-if="moneyType == 'fabi'"
        >
          <el-form-item :label="$t('bz')" class="mb12">
            <el-input
              v-model="currentSelectRow.coinCode"
              :readOnly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('txje')" class="mb12">
            <el-input
              v-model="currentSelectRow.reqValue"
              :readOnly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('skzhmc')" class="mb12">
            <el-input
              v-model="currentSelectRow.accountName"
              :readOnly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('hkzhmc')" class="mb12">
            <el-input
              v-model="currentSelectRow.sendAccount"
              :readOnly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('skzh')" class="mb12">
            <el-input
              v-model="currentSelectRow.inbankAccount"
              :readOnly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('txzh')" class="mb12">
            <el-input
              v-model="currentSelectRow.outbankAccount"
              :readOnly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('skbankcode')" class="mb12">
            <el-input
              v-model="currentSelectRow.inbankCode"
              :readOnly="true"
            ></el-input>
          </el-form-item>

          <el-form-item :label="$t('hkbankcode')" class="mb12">
            <el-input
              v-model="currentSelectRow.outbankCode"
              :readOnly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('skyhssgj')" class="mb12">
            <el-input
              v-model="currentSelectRow.inbankCountry"
              :readOnly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('hkyhssgj')" class="mb12">
            <el-input
              v-model="currentSelectRow.outbankCountry"
              :readOnly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('skyhszdz')" class="mb12">
            <el-input
              type="textarea"
              v-model="currentSelectRow.inbankAdd"
              :readOnly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('hkyhssdz')" class="mb12">
            <el-input
              type="textarea"
              v-model="currentSelectRow.outbankAdd"
              :readOnly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('sksdm')" class="mb12">
            <el-input
              v-model="currentSelectRow.inswiftCode"
              :readOnly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('hksdm')" class="mb12">
            <el-input
              v-model="currentSelectRow.outswiftCode"
              :readOnly="true"
            ></el-input>
          </el-form-item>
        </el-form>

        <el-form
          label-position="top"
          ref="formss"
          :model="currentSelectRow"
          class="formStyle"
          v-if="moneyType == 'usdt'"
        >
          <el-form-item :label="$t('bz')" class="mb12">
            <el-input
              v-model="currentSelectRow.coinCode"
              :readOnly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('qbdz')" class="mb12">
            <el-input
              v-model="currentSelectRow.cryptAdd"
              :readOnly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('je')" class="mb12">
            <el-input
              v-model="currentSelectRow.reqValue"
              :readOnly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('txqbdz')" class="mb12">
            <el-input
              v-model="currentSelectRow.cryptAdd"
              :readOnly="true"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <el-dialog
      :title="$t('done')"
      :visible.sync="dialogVisibleSuccess"
      width="500px"
      :before-close="
        () => {
          dialogVisibleSuccess = false;
        }
      "
    >
      <div class="dialog-content">
        <img src="@/assets/images/moneyManage/success.png" />
        <div class="desc">
          {{ $t("fqtxcg") }}
        </div>
      </div>
      <el-button
        slot="footer"
        type="primary"
        class="normal-btn"
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
  balanceList,
  putWithdraw,
  calculateRate,
  putCryptWithdraw,
} from "@/api/out";
import { getCryAdd } from "@/api/exchange";
import { Message } from "element-ui";
import { Local } from "@/utils/index";
import { cryptocurrencies } from "@/api/login";
import { outCryAccPage } from "@/api/bank";
import passwordVue from '@/components/common/password.vue';

export default {
  name: "userWithdrawManagementWithdraw",
  components: { LinkPath, passwordVue },
  data() {
    return {
      agreementList: [
        { label: "TRC20", value: "TRC20" },
        { label: "ERC20", value: "ERC20" },
      ],
      dialogVisibleSuccess: false,
      form: {
        coinCode: "",
        reqValue: "",
        targetCode: "",
      },
      usdtForm: {
        coinCode: "USDT",
        reqValue: "",
        cryptAdd: "",
        srcCode: "",
        tid: "0x",
        agreement: "",
      },
      moneyType: "fabi",
      transactionTypeList: [
        { label: this.$t("fdhb"), value: "fabi" },
        { label: this.$t("jmhb"), value: "usdt" },
      ],
      tableData: [],
      options: [],
      type: "1",
      dialogVisible2: false,
      linkList: ["txgl", "tx"],
      outCoinList: [],
      inCoinList: [],
      outZHList: [],
      bankListBalance: [],
      loading: false,
      dialogVisible: false,
      currentSelectRow: {},
      szList: [],
      calculateMoney: 0,
      hkAddressList: [],
    };
  },
  created() {
    this.getCjZh();
    this.getBalanceList();
    // this.getCJBZ();
    // this.getRJBZ();
    this.getSzList();
    // this.getAddressList()
    //   calculateRate({
    //       exFrom: 'CNY',
    //       exTarget: 'USDT',
    //       exValue: 100
    //   })
  },
  watch: {
    "form.coinCode": function () {
      this.form.targetCode = "";
      // this.getCJBZ();
    },
    form: {
      deep: true,
      handler: function (newVal, oldVal) {
        if (this.form.coinCode && this.form.targetCode && this.form.reqValue) {
          this.calculateRateMoney();
        }
      },
    },
    moneyType() {
      this.getCJBZ();
    },
  },
  methods: {
    componentDataChange(params) {
      if (this.moneyType == 'fabi') {
        this.form = {
          ...this.form,
          ...params
        }
      } else {
        this.usdtForm = {...this.usdtForm, ...params}
      }
    },
    changehkAddress(id) {
      if (id == this.$t('add')) {
        this.$router.push("/admin/address/list?type=add");
      } else {
        const list = this.hkAddressList.filter(item => {
          return item.cryAdd == id
        })
        this.usdtForm.agreement = list[0].agreement
      }
    },
    async getAddressList() {
      try {
        const res = await outCryAccPage({current: 1, size: 50, cryCode: this.usdtForm.srcCode})
        const list = res.data.records
        list.push({
          id: 'add',
          cryAdd: this.$t('add')
        })
        this.hkAddressList = list
      } catch {
        console.log('error')
      }
    },
    changeUsdtReqValue(value) {
      const max = this.getReamin(this.usdtForm.coinCode)
      if (value * 1 > max) {
        this.usdtForm.reqValue = max
      }
    },
    changeReqValue(value) {
      const max = this.getReamin(this.form.coinCode)
      if (value * 1 > max) {
        this.form = {
          ...this.form,
          reqValue: max
        }
      }
    },
    filterBalanceList() {
      let arr = []
      if (this.moneyType == 'fabi') {
        arr = this.bankListBalance.filter(item => {
          return item.balType == 1
        })
      } else {
        arr = this.bankListBalance.filter(item => {
          return item.balType == 2
        })
      }
      return arr
    },
    changehkAccount(id) {
      if (id == 'add') {
        this.$router.push('/admin/exchange/list?type=add')
      }
    },
    getReamin(coinCode) {
      const rarr = this.bankListBalance.filter((item) => {
        return item.coinCode == coinCode;
      });
      return rarr[0].balance;
    },
    async calculateRateMoney() {
      try {
        const res = await calculateRate({
          exFrom: this.form.coinCode,
          exTarget: this.form.targetCode,
          exValue: this.form.reqValue,
        });
        this.calculateMoney = res.data.targetValue;
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
    async getUsdtAddress() {
      const res = await getCryAdd({ cryCode: this.usdtForm.coinCode });
      this.usdtForm.cryptAdd = res.data.cryAdd;
      this.usdtForm.userId = res.data.userId;
    },

    async handleUsdtPutDeposit() {
      console.log(this.usdtForm)
      if (
        !this.usdtForm.reqValue ||
        !this.usdtForm.cryptAdd ||
        !this.usdtForm.srcCode
      ) {
        Message({
          type: "warning",
          message: this.$t("qwsxx"),
        });
        return;
      }
      this.loading = true;
      try {
        await putCryptWithdraw({ ...this.usdtForm });
        this.dialogVisibleSuccess = true;
        this.loading = false;
      } catch {
        this.loading = false;
      }
    },
    async handlePutWithDraw() {
      if (!this.form.coinCode || !this.form.reqValue || !this.form.bankId) {
        Message({
          type: "warning",
          message: this.$t("qwsxx"),
        });
        return;
      }
      this.loading = true;
      try {
        await putWithdraw({ ...this.form });
        this.loading = false;
        this.dialogVisibleSuccess = true;
      } catch {
        this.loading = false;
      }
    },
    handleWithDraw() {
      if (this.moneyType == "fabi") {
        this.handlePutWithDraw();
      } else {
        this.handleUsdtPutDeposit();
      }
    },
    async getBalanceList() {
      const res = await balanceList();
      this.bankListBalance = res.data;
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
    getBankInfo(bankId, attr) {
      let info = {};
      const newArr = this.outZHList.filter((item) => {
        return item.id == bankId;
      });
      if (newArr.length) {
        info = newArr[0];
      }
      return info[attr];
    },
    async send() {
      try {
        await putWithdraw(this.form);
      } catch (error) {}
    },
    // 获取提现账户
    async getCjZh() {
      try {
        const res = await withdrawAccounts();
        res.data.push({
          id: 'add',
          bankName: this.$t('add'),
        })
        this.outZHList = res.data;
      } catch (error) {}
    },
    // 获取出金币种
    async getCJBZ() {
      try {
        let res;
        if (this.moneyType == "fabi") {
          res = await withdrawCoins({ code: this.form.coinCode });
        } else {
          res = await withdrawCoins({ code: this.usdtForm.srcCode });
        }
        this.outCoinList = res.data;
        // this.$refs.targetselectRef.toggleMenu();
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
.el-option {
  display: flex;
  justify-content: space-between;
  width: 100%;
  .left {
    font-weight: bold;
  }
  .right {
    color: #333;
  }
}
.withdraw-password {
  margin-bottom: 1.6rem;
  ::v-deep .el-input__inner {
    height: 3rem;
  }
}
</style>
  
