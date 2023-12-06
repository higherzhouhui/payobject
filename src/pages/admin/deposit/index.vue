
<template>
  <div class="user_withdrawmanagement_withdraw_contianer">
    <!-- <LinkPath :linkList="linkList" style="margin-bottom: 1.5rem" /> -->
    <div class="money-wrapper">
      <div class="money-left">
        <div class="admin-title">{{$t('chongzhi')}}</div>
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
            <el-select v-model="form.coinCode" class="input-select">
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
        <ul class="list">
          <li>{{ $t("limitNum") }}{{moneyType == 'fabi' ? form.coinCode : usdtForm.coinCode}}</li>
        </ul>
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
                  <div class="left">{{item.cryAdd}}</div>
                  <div class="right">{{item.agreement}}</div>
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
                  <div class="left">{{item.cryAdd}}</div>
                  <div class="right">{{item.agreement}}</div>
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
            {{ form.reqValue || 0
            }}<span class="unit">{{ form.coinCode }}</span>
          </div>
        </div>
        <div class="divider" v-if="form.sendBank" />
        <div class="column" v-if="form.sendBank">
          <div class="column-left">
            {{ $t("hkzhao") }}
          </div>
          <div class="column-right">
            {{ getBankInfo(form.sendBank, "bankCode") }}
          </div>
        </div>
        <div class="divider" v-if="form.sendBank" />
        <div class="column" v-if="form.sendBank">
          <div class="column-left">
            {{ $t("zhmc") }}
          </div>
          <div class="column-right">
            {{ getBankInfo(form.sendBank, "accountName") }}
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
            {{ usdtForm.reqValue || 0 }}<span class="unit">{{ usdtForm.coinCode }}</span>
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
            {{ $t("dqr") }}
          </div>
        </div>
      </div>
    </div>
    <!-- 
    <div class="content flex">
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
        <el-form-item :label="$t('bz')">
          <el-input
            v-model="currentSelectRow.coinCode"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('czje')">
          <el-input
            v-model="currentSelectRow.reqValue"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('skzhmc')">
          <el-input
            v-model="currentSelectRow.accountName"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('hkzhmc')">
          <el-input
            v-model="currentSelectRow.sendAccount"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('skzh')">
          <el-input
            v-model="currentSelectRow.inbankAccount"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('hkzhao')">
          <el-input
            v-model="currentSelectRow.outbankAccount"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('skbankcode')">
          <el-input
            v-model="currentSelectRow.inbankCode"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('hkbankcode')">
          <el-input
            v-model="currentSelectRow.outbankCode"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('skyhssgj')">
          <el-input
            v-model="currentSelectRow.inbankCountry"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('hkyhssgj')">
          <el-input
            v-model="currentSelectRow.outbankCountry"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('skyhszdz')">
          <el-input
            type="textarea"
            v-model="currentSelectRow.inbankAdd"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('hkyhssdz')">
          <el-input
            type="textarea"
            v-model="currentSelectRow.outbankAdd"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('sksdm')">
          <el-input
            v-model="currentSelectRow.inswiftCode"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('hksdm')">
          <el-input
            v-model="currentSelectRow.outswiftCode"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('hkpz')">
          <div class="upload-item">
            <div class="item-left">
              <el-upload
                action="null"
                list-type="text"
                accept=".pdf, .zip, .rar, image/*"
                :before-upload="(e) => handlesuccess(e)"
              >
                <div class="load-cover">
                  <i class="el-icon-folder-add" v-if="!form.reqProof"></i>
                  <i class="el-icon-folder-checked" v-else></i>
                </div>
                <div slot="tip" class="el-upload__tip">
                  {{ $t("scts") }}
                </div>
              </el-upload>
            </div>
            <div class="item-right">
              <div class="sub-title"><span>*</span>{{ $t("hkzmcl") }}</div>
              <div class="desc">{{ $t("hkzmdes") }}</div>
              <a
                :href="'/api/file/downLoad?url=' + form.reqProof"
                target="_blank"
                class="down"
                v-if="form.reqProof"
                >{{ $t("download") }}</a
              >
            </div>
          </div>
          <!-- <div class="upload-item">
            <div class="item-left">
              <el-upload
                action="null"
                list-type="text"
                accept=".pdf, .zip, .rar, image/*"
                :before-upload="(e) => handlesuccess(e)"
              >
                <div class="load-cover">
                  <i class="el-icon-folder-add" v-if="!form.reqProof"></i>
                  <i class="el-icon-folder-checked" v-else></i>
                </div>
                <div slot="tip" class="el-upload__tip">
                  {{ $t("scts") }}
                </div>
              </el-upload>
            </div>
            <div class="item-right">
              <div class="sub-title"><span>*</span>{{ $t("hkzmcl") }}</div>
              <div class="desc">{{ $t("hkzmdes") }}</div>
              <a
                :href="'/api/file/downLoad?url=' + form.reqProof"
                target="_blank"
                class="down"
                v-if="form.reqProof"
                >{{ $t("download") }}</a
              >
            </div> 
          </div> -->
        </el-form-item>
      </el-form>
      <el-form
        label-position="top"
        ref="formss"
        :model="currentSelectRow"
        v-if="moneyType == 'usdt'"
      >
        <el-form-item :label="$t('bz')">
          <el-input
            v-model="currentSelectRow.coinCode"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('skqbdz')">
          <el-input
            v-model="currentSelectRow.cryptAdd"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('je')">
          <el-input
            v-model="currentSelectRow.reqValue"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('jmxy')">
          <el-input
            v-model="currentSelectRow.agreement"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('hkqbdz')">
          <el-input v-model="currentSelectRow.tid" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('hkpz')">
          <div class="upload-item">
            <div class="item-left">
              <el-upload
                action="null"
                list-type="text"
                accept=".pdf, .zip, .rar, image/*"
                :before-upload="(e) => handlesuccess(e)"
              >
                <div class="load-cover">
                  <i class="el-icon-folder-add" v-if="!currentSelectRow.reqProof"></i>
                  <i class="el-icon-folder-checked" v-else></i>
                </div>
                <div slot="tip" class="el-upload__tip">
                  {{ $t("scts") }}
                </div>
              </el-upload>
            </div>
            <div class="item-right">
              <div class="sub-title"><span>*</span>{{ $t("hkzmcl") }}</div>
              <div class="desc">{{ $t("hkzmdes") }}</div>
              <a
                :href="'/api/file/downLoad?url=' + currentSelectRow.reqProof"
                target="_blank"
                class="down"
                v-if="currentSelectRow.reqProof"
                >{{ $t("download") }}</a
              >
            </div>
          </div>
          <!-- <el-upload
            class="upload-demo"
            action="null"
            list-type="text"
            accept=".pdf, .zip, .rar, image/*"
            :before-upload="(e) => handlesuccess(e)"
            v-if="
              currentSelectRow.reqStatus == 1 || !currentSelectRow.reqStatus
            "
          >
            <el-button size="small" type="primary" class="normal-btn">
              {{ $t("schkpz") }}
            </el-button>
          </el-upload>
          <el-button
            style="padding: 4px 20px"
            size="small"
            type="primary"
            class="normal-btn"
            v-else
            ><a
              :href="'/api/file/downLoad?url=' + currentSelectRow.reqProof"
              target="_blank"
              >{{ $t("yulan") }}</a
            ></el-button
          > -->
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" class="qd" @click="dialogVisible = false">
          {{ $t("done") }}
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
import { upload } from "@/api/file";
import { Message } from "element-ui";
import { Local } from "@/utils/index";
import { cryptocurrencies } from "@/api/login";
import { outCryAccPage } from "@/api/bank";

export default {
  name: "userWithdrawManagementWithdraw",
  components: { LinkPath },
  data() {
    return {
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
    };
  },
  created() {
    this.getCjZh();
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
      const list = this.skqbList.filter(item => {
        return item.cryAdd == value
      })
      this.usdtForm.agreement = list[0].agreement
    },
    changeAgreement(value) {
      const list = this.skqbList.filter(item => {
        return item.agreement == value
      })
      this.usdtForm.cryptAdd = list[0].cryAdd
    },
    async getAddressList() {
      try {
        const res = await outCryAccPage({current: 1, size: 50})
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
    changehkAccount(id) {
      if (id == "add") {
        this.$router.push("/admin/exchange/list?type=add");
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
      this.skqbList = res.data
      this.$refs.changeAgreementRef.toggleMenu();

      // this.usdtForm.cryptAdd = res.data.cryAdd;
      // this.usdtForm.hkAgreement = res.data.agreement;
      // this.usdtForm.userId = res.data.userId;
    },
    async handlesuccess(e) {
      const size = e.size;
      if (size > 20 * 1024 * 1024) {
        Message({
          type: "error",
          message: this.$t("sizeOver"),
        });
        return;
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
            reqStatus: 2,
          };
          let res;
          if (this.moneyType == "fabi") {
            res = await putDeposit(this.currentSelectRow);
          }
          if (this.moneyType == "usdt") {
            res = await putCryptDeposit(this.currentSelectRow);
          }
          if (res.code === 200) {
            this.dialogVisible = false;
            this.dialogVisibleSuccess = true;
          }
        }
      } catch (error) {
        console.log(error);
      }
      return false;
    },
    async handleUsdtPutDeposit() {
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
      const res = await putCryptDeposit({ ...this.usdtForm });
      this.loading = false;
      if (res.code === 200) {
        this.currentSelectRow = {
          id: res.data.id,
          ...this.usdtForm,
        };
        this.dialogVisible = true;
      }
    },
    async handlePutDeposit() {
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
      const res = await putDeposit({ ...this.form });
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
          };
          this.dialogVisible = true;
        }
      }
      console.log(res);
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
    // 获取汇款账户
    async getCjZh() {
      try {
        const res = await withdrawAccounts();
        res.data.push({
          id: "add",
          bankName: this.$t("add"),
        });
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
</style>
  