
<template>
  <div class="user_withdrawmanagement_withdraw_contianer">
    <!-- <LinkPath :linkList="linkList" style="margin-bottom: 1.5rem" /> -->
    <div class="money-wrapper">
      <div class="money-left">
        <div class="admin-title">{{$t($store.state.title)}}</div>
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
          <div class="label">{{ $t("czje") }}</div>
          <div class="input-with-select">
            <el-input
              type="number"
              :placeholder="$t('enterAmount')"
              v-model="form.reqValue"
              class="input-amount"
              :disabled="!form.coinCode"
            >
            </el-input>
            <el-select
              v-model="form.coinCode"
              class="input-select"
              @change="getCjZh"
            >
              <el-option
                v-for="item in inCoinList"
                :label="item.coinCode"
                :value="item.coinCode"
                :key="item.coinCode"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="form-item" v-else>
          <div class="label">{{ $t("czje") }}</div>
          <div class="input-with-select">
            <el-input
              type="number"
              :placeholder="$t('enterAmount')"
              v-model="usdtForm.reqValue"
              class="input-amount"
              :disabled="!usdtForm.coinCode"
            >
            </el-input>
            <el-select
              class="input-select"
              v-model="usdtForm.coinCode"
              :placeholder="$t('qsz')"
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
          </div>
        </div>
        <ul
          class="list"
          v-if="
            (moneyType == 'fabi' && form.coinCode) ||
            (moneyType == 'usdt' && usdtForm.coinCode)
          "
        >
          <li v-if="limitObj.coinMin">
            {{ $t("limitdepositmin") }}&nbsp;&nbsp;{{ shiftNumberToPrice(limitObj.coinMin)
            }}{{ moneyType == "fabi" ? form.coinCode : usdtForm.coinCode }}
          </li>
          <li v-if="limitObj.coinMax">
            {{ $t("limitdepositmax") }}&nbsp;&nbsp;{{ shiftNumberToPrice(limitObj.coinMax)
            }}{{ moneyType == "fabi" ? form.coinCode : usdtForm.coinCode }}
          </li>
          <li v-if="limitObj.noSub">
            {{ $t("zwkf") }}
          </li>
        </ul>
        <div class="form-item" v-if="moneyType == 'fabi' && form.coinCode">
          <div class="label">{{ $t("hkzh") }}</div>
          <div class="input-with-select">
            <el-select
              class="input-transaction"
              v-model="form.sendBank"
              :placeholder="$t('qszhkzh')"
              @change="changehkAccount"
            >
              <el-option
                v-for="item in outZHList"
                :key="item.id"
                :label="item.bankName"
                :value="item.id.toString()"
              >
                <div class="el-option">
                  <span class="left">{{ item.bankName }}</span>
                  <span class="right">{{ item.bankCode }}</span>
                </div>
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="form-item" v-if="moneyType == 'usdt' && usdtForm.coinCode">
          <div class="label">{{ $t("skqbdz") }}</div>
          <div class="input-with-select">
            <el-select
              class="input-transaction"
              v-model="usdtForm.cryptAdd"
              @change="changeskAddress"
              :placeholder="$t('qxzskqbdz')"
              ref="changeAgreementRef"
            >
              <el-option
                v-for="item in skqbList"
                :key="item.id"
                :label="item.cryAdd"
                :value="item.cryAdd"
              >
                <div class="el-option">
                  <div class="left">{{ item.cryAdd }}</div>
                  <div class="right">{{ item.agreement }}</div>
                </div>
              </el-option>
            </el-select>
          </div>
          <!-- <div class="input-with-select">
            <el-input :value="usdtForm.cryptAdd" class="input-amount" readonly/>
            <el-select
              class="input-select"
              v-model="usdtForm.agreement"
              :placeholder="$t('qsz')"
              @change="changeAgreement"
              ref="changeAgreementRef"
            >
              <el-option
                style="padding: 0 20px"
                v-for="item in skqbList"
                :key="item.agreement"
                :label="item.agreement"
                :value="item.agreement"
              >
              </el-option>
            </el-select>
          </div> -->
        </div>
        <div class="form-item" v-if="moneyType == 'usdt'">
          <div class="label">{{ $t("hkqbdz") }}</div>
          <div class="input-with-select">
            <el-select
              class="input-transaction"
              v-model="usdtForm.tid"
              @change="changehkAddress"
              :placeholder="$t('qxzhkqbdz')"
            >
              <el-option
                v-for="item in hkAddressList"
                :key="item.id"
                :label="item.cryAdd"
                :value="item.cryAdd"
              >
                <div class="el-option">
                  <div class="left">{{ item.cryAdd }}</div>
                  <div class="right">{{ item.agreement }}</div>
                </div>
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="normal-btn" @click="handleDeposit" v-loading="loading">
          {{ $t("fqtx3") }}
        </div>
      </div>
      <div class="money-right" v-if="moneyType == 'fabi'">
        <h2>{{ $t("czyl") }}</h2>
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
            {{ $t("czje") }}
          </div>
          <div class="column-right">
            {{ shiftNumberToPrice(form.reqValue || 0)
            }}<span class="unit">{{ form.coinCode }}</span>
          </div>
        </div>
        <template v-if="form.coinCode && moneyType == 'fabi'">
          <div class="divider" />
          <div class="column">
            <div class="column-left">
              {{ $t("skzhmc") }}
            </div>
            <div class="column-right">
              {{ getBankInfo(form.coinCode, "accountName") }}
            </div>
          </div>
          <div class="divider" />
          <div class="column">
            <div class="column-left">
              {{ $t("bankname") }}
            </div>
            <div class="column-right">
              {{ getBankInfo(form.coinCode, "bankName") }}
            </div>
          </div>
          <div class="divider" />
          <div class="column">
            <div class="column-left">
              {{ $t("bankcount") }}
            </div>
            <div class="column-right">
              {{ getBankInfo(form.coinCode, "bankAccount") }}
            </div>
          </div>
          <div class="divider" />
          <div class="column">
            <div class="column-left">
              {{ $t("khdz") }}
            </div>
            <div class="column-right">
              {{ getBankInfo(form.coinCode, "bankAdd") }}
            </div>
          </div>
        </template>
        <div class="divider" />
        <div class="column">
          <div class="column-left">
            {{ $t("sxfei") }}
          </div>
          <div class="column-right">
            {{ form.coinCode ? limitObj.commission || $t("nosxf") : $t("dqr")
            }}<span class="unit" v-if="limitObj.commission">{{
              form.coinCode
            }}</span>
          </div>
        </div>
      </div>
      <div class="money-right" v-else>
        <h2>{{ $t("czyl") }}</h2>
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
            {{ $t("czje") }}
          </div>
          <div class="column-right">
            {{ shiftNumberToPrice(usdtForm.reqValue || 0)
            }}<span class="unit">{{ usdtForm.coinCode }}</span>
          </div>
        </div>
        <div class="divider" v-if="usdtForm.cryptAdd" />
        <div class="column" v-if="usdtForm.cryptAdd">
          <div class="column-left">
            {{ $t("skqbdz") }}
          </div>
          <div class="column-right">
            {{ usdtForm.cryptAdd }}
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
        <div class="qrcode"  v-if="usdtForm.agreement && usdtForm.coinCode">
          <div class="divider" />
          <img :src="`/api/depositWalletQrCode?cryCode=${usdtForm.coinCode}&agreement=${usdtForm.agreement}`" />
          <div class="hint">{{`${$t('gdzkjs')} ${usdtForm.agreement} ${$t('db')}`}}</div>
          <a class="normal-btn btn" :href="`/api/depositWalletQrCode?cryCode=${usdtForm.coinCode}&agreement=${usdtForm.agreement}`" download>{{$t('xzewm')}}</a>
        </div>
        <div class="divider" v-if="usdtForm.tid" />
        <div class="column" v-if="usdtForm.tid">
          <div class="column-left">
            {{ $t("hkqbdz") }}
          </div>
          <div class="column-right">
            {{ usdtForm.tid }}
          </div>
        </div>
        <div class="divider" />
        <div class="column">
          <div class="column-left">
            {{ $t("sxfei") }}
          </div>
          <div class="column-right">
            {{
              usdtForm.coinCode
                ? limitObj.commission || $t("nosxf")
                : $t("dqr")
            }}<span class="unit" v-if="limitObj.commission">{{
              usdtForm.coinCode
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :title="$t('sqtjcg')"
      :visible.sync="dialogVisible"
      width="636px"
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
        class="formStyle"
      >
        <el-form-item :label="$t('hkpz')">
          <div class="upload-item">
            <div class="item-left">
              <el-upload
                action="/api/file/upload"
                list-type="text"
                accept=".pdf, image/*"
                :on-success="(e) => handlesuccess(e)"
              >
                <div class="load-cover">
                  <i class="el-icon-folder-add" v-if="!form.reqProof"></i>
                  <i class="el-icon-folder-checked" v-else></i>
                </div>
                <div slot="tip" class="el-upload__tip">
                  {{ $t("uploaddes") }}
                </div>
              </el-upload>
            </div>
            <div class="item-right">
              <div class="sub-title"><span>*</span>{{ $t("hksdjt") }}</div>
              <div class="desc" style="color: #ff4d39">
                *{{ $t("hkdes") }} <br/>
                *{{ $t("hksdjtdes") }}
              </div>
              <a
                :href="'/api/file/downLoad?url=' + form.reqProof"
                target="_blank"
                class="down"
                v-if="form.reqProof"
                >{{ $t("download") }}</a
              >
            </div>
          </div>
        </el-form-item>
        <div
        class="list"
        v-for="(item, index) in detailList.filter((item) => {
          return item.value;
        })"
        :key="index"
      >
        <div class="list-left">{{ item.label }}</div>
        <div class="list-right">
          <template v-if="item.type == 'link'">
            <a :href="item.value" target="_blank">
              <span>
                <i class="el-icon-folder-checked"></i>
                {{ $t("download") }}
              </span>
            </a>
          </template>
          <template v-else>
            {{ item.value }}<span class="unit" v-if="item.unit">{{ item.unit }}</span>
          </template>
        </div>
      </div>
      </el-form>
      <div slot="footer">
        <el-button class="qx" @click="dialogVisible = false">
          {{ $t("cancel") }}
        </el-button>
        <el-button class="qd" :class="loading && 'loading'" @click="confirmPz">
          {{ $t("sure") }}
        </el-button>
      </div>
    </el-dialog>
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
          {{ $t("fqczcg") }}
        </div>
      </div>
      <el-button
        slot="footer"
        type="primary"
        class="normal-btn"
        @click="dialogVisibleSuccess = false"
        >{{ $t("queding") }}</el-button
      >
    </el-dialog>
  </div>
</template>
  <script>
import {
  coinBanks,
  depCoins,
  withdrawCoins,
  balanceList,
  putWithdraw,
  putDeposit,
  putCryptDeposit,
} from "@/api/out";
import { getCryAdd, getLimit } from "@/api/exchange";
import { Message } from "element-ui";
import { Local, shiftNumberToPrice } from "@/utils/index";
import { cryptocurrencies } from "@/api/login";
import { outCryAccPage } from "@/api/bank";
import { getCountryName } from "@/utils/common";

export default {
  name: "userWithdrawManagementWithdraw",
  data() {
    return {
      shiftNumberToPrice: shiftNumberToPrice,
      agreementList: [
        { label: "TRC20", value: "TRC20" },
        { label: "ERC20", value: "ERC20" },
      ],
      moneyType: "fabi",
      linkList: ["zjgl", "chongzhi"],
      transactionTypeList: [
        { label: this.$t("fdhb"), value: "fabi" },
        { label: this.$t("jmhb"), value: "usdt" },
      ],
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
        agreement: "",
        hkAgreement: "",
      },
      tableData: [],
      options: [],
      type: "1",
      outCoinList: [],
      inCoinList: [],
      outZHList: [],
      hkAddressList: [],
      bankListBalance: [],
      loading: false,
      dialogVisible: false,
      dialogVisibleSuccess: false,
      currentSelectRow: {},
      szList: [],
      skqbList: [],
      limitObj: {
        coinMax: 0,
        coinMin: 0,
        commission: 0,
      },
      detailList: [],
    };
  },
  created() {
    this.getBalanceList();
    // this.getCJBZ();
    this.getRJBZ();
    this.getSzList();
    this.getAddressList();
    //   calculateRate({
    //       exFrom: 'CNY',
    //       exTarget: 'USDT',
    //       exValue: 100
    //   })
  },
  methods: {
    changeskAddress(value) {
      const list = this.skqbList.filter((item) => {
        return item.cryAdd == value;
      });
      this.usdtForm.agreement = list[0].agreement;
    },
    changeAgreement(value) {
      const list = this.skqbList.filter((item) => {
        return item.agreement == value;
      });
      this.usdtForm.cryptAdd = list[0].cryAdd;
    },
    async getAddressList() {
      try {
        const res = await outCryAccPage({ current: 1, size: 50 });
        const list = res.data.records;
        list.push({
          id: "add",
          cryAdd: this.$t("add"),
        });
        this.hkAddressList = list;
      } catch {
        console.log("error");
      }
    },
    changehkAccount(id) {
      if (id == "add") {
        this.$router.push("/admin/exchange/list?type=add");
      }
    },
    changehkAddress(id) {
      if (id == this.$t("add")) {
        this.$router.push("/admin/address/list?type=add");
      } else {
        // const list = this.hkAddressList.filter((item) => {
        //   return item.cryAdd == id;
        // });
        // this.usdtForm.agreement = list[0].agreement;
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
      const res = await getCryAdd({ cryCode: this.usdtForm.coinCode });
      this.skqbList = res.data.filter(item => {
        return !item.cryName
      });
      this.$refs.changeAgreementRef.toggleMenu();
      const limitRes = await getLimit({
        coin: this.usdtForm.coinCode,
        act: "dp",
      });
      // 如果没有数据就不能提交
      this.limitObj = limitRes.data || { noSub: true };
      // this.usdtForm.cryptAdd = res.data.cryAdd;
      // this.usdtForm.hkAgreement = res.data.agreement;
      // this.usdtForm.userId = res.data.userId;
    },
    async handlesuccess(req) {
      try {
        if (req.code === 200) {
          this.currentSelectRow = {
            ...this.currentSelectRow,
            reqProof: req.data[0],
            reqStatus: 2,
          };
          Message({
            type: "success",
            message: this.$t("sccg"),
          });
        } else {
          this.$message.error(req.msg);
        }
      } catch (error) {
        console.log(error);
      }
      return false;
    },
    async confirmPz() {
      if (this.loading) {
        return;
      }
      try {
        let res;
        this.loading = true;
        if (this.moneyType == "fabi") {
          res = await putDeposit(this.currentSelectRow);
        }
        if (this.moneyType == "usdt") {
          res = await putCryptDeposit(this.currentSelectRow);
        }
        this.loading = false;
        if (res.code === 200) {
          this.dialogVisible = false;
          this.dialogVisibleSuccess = true;
        }
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },
    async handleUsdtPutDeposit() {
      try {
        if (
          !this.usdtForm.coinCode ||
          !this.usdtForm.reqValue ||
          !this.usdtForm.tid
        ) {
          Message({
            type: "warning",
            message: this.$t("qwsxx"),
          });
          return;
        }

        this.loading = true;
        const res = await putCryptDeposit({
          ...this.usdtForm,
          reqValue: this.usdtForm.reqValue * 1,
        });
        this.loading = false;
        if (res.code === 200) {
          this.currentSelectRow = {
            id: res.data.id,
            ...this.usdtForm,
          };
          this.dialogVisible = true;
          this.detailList = [
          { label: this.$t("czje"), value: this.shiftNumberToPrice(this.currentSelectRow.reqValue), unit: this.currentSelectRow.coinCode },
          { label: this.$t("jmxy"), value: this.currentSelectRow.agreement },
          { label: this.$t("hkqbdz"), value: this.currentSelectRow.tid },
          { label: this.$t("skqbdz"), value: this.currentSelectRow.cryptAdd },
        ];
        }
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },
    async handlePutDeposit() {
      try {
        if (!this.form.coinCode || !this.form.reqValue || !this.form.sendBank) {
          Message({
            type: "warning",
            message: this.$t("qwsxx"),
          });
          return;
        }
        this.inCoinList.forEach((item) => {
          if (item.coinCode == this.form.coinCode) {
            this.form.bankId = item.bankId;
          }
        });
        this.loading = true;
        const res = await putDeposit({
          ...this.form,
          reqValue: this.form.reqValue * 1,
        });
        this.loading = false;
        if (res.code === 200) {
          const inlist = this.inCoinList.filter((item) => {
            return item.coinCode == this.form.coinCode;
          });
          const outlist = this.outZHList.filter((item) => {
            return item.id == this.form.sendBank;
          });
          if (inlist.length && outlist.length) {
            this.currentSelectRow = {
              ...this.form,
              id: res.data.id,
              inbankName: inlist[0].bank.bankName,
              inbankAccount: inlist[0].bank.bankAccount,
              inAccount: inlist[0].bank.accountName,
              inbankCode: inlist[0].bank.bankCode,
              inbankCountry: getCountryName(inlist[0].bank.bankCountry),
              inbankAdd: inlist[0].bank.bankAdd,
              inswiftCode: inlist[0].bank.swiftCode,
              outbankName: outlist[0].bankName,
              outbankAccount: outlist[0].bankAccount,
              outbankCode: outlist[0].bankCode,
              outbankCountry: outlist[0].bankCountry,
              outbankAdd: outlist[0].bankAdd,
              outswiftCode: outlist[0].swiftCode,
            };
            this.detailList = [
              { label: this.$t("czje"), value: this.shiftNumberToPrice(this.currentSelectRow.reqValue), unit: this.currentSelectRow.coinCode },
              {
                label: this.$t("hkzh"),
                value: this.currentSelectRow.outbankAccount,
              },
              {
                label: this.$t("hkyh"),
                value: this.currentSelectRow.outbankName,
              },
              {
                label: this.$t("hkbankcode"),
                value: this.currentSelectRow.outbankCode,
              },
              {
                label: this.$t("skzhmc"),
                value: this.currentSelectRow.accountName,
              },
              {
                label: this.$t("skyh"),
                value: this.currentSelectRow.inbankName,
              },
              {
                label: this.$t("skzh"),
                value: this.currentSelectRow.inbankAccount,
              },
              {
                label: this.$t("skbankcode"),
                value: this.currentSelectRow.inbankCode,
              },
              {
                label: this.$t("skyhssgj"),
                value: this.currentSelectRow.inbankCountry,
              },
              {
                label: this.$t("skyhszdz"),
                value: this.currentSelectRow.inbankAdd,
              },
              {
                label: this.$t("sksdm"),
                value: this.currentSelectRow.inswiftCode,
              },
            ];
            this.dialogVisible = true;
          }
        }
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },
    handleDeposit() {
      if (this.moneyType == "fabi") {
        this.handlePutDeposit();
      } else {
        this.handleUsdtPutDeposit();
      }
    },
    async getBalanceList() {
      const res = await balanceList();
      this.bankListBalance = res.data;
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
    getBankInfo(coinCode, attr) {
      let info = {};
      const newArr = this.inCoinList.filter((item) => {
        return item.coinCode == coinCode;
      });
      if (newArr.length) {
        info = newArr[0].bank;
      }
      return info[attr];
    },
    async send() {
      try {
        await putWithdraw(this.form);
      } catch (error) {}
    },
    // 获取指定汇款账户
    async getCjZh() {
      try {
        const res = await coinBanks({ coin: this.form.coinCode });
        res.data.push({
          id: "add",
          bankName: this.$t("add"),
        });
        this.form.sendBank = "";
        this.outZHList = res.data;
        const limitRes = await getLimit({
          coin: this.form.coinCode,
          act: "dp",
        });
        // 如果没有数据就不能提交
        this.limitObj = limitRes.data || { noSub: true };
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
.qrcode {
  text-align: center;
  img {
    width: 80%;
    max-width: 200px;
    margin-bottom: 12px;
  }
  .hint {
    color: #e3d2d2;
    font-size: 12px;
  }
  .btn {
    display: block;
    text-decoration: none;
    width: fit-content;
    margin: 12px auto 0 auto;
  }
}
</style>
  