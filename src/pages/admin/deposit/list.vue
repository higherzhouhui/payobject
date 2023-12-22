<template>
  <div class="user_moneymanagement_transfer_contianer">
    <!-- <LinkPath :linkList="linkList" v-if="!$store.state.userInfo.admin" style="margin-bottom: 1.5rem"/> -->
    <!-- <el-tabs v-model="moneyType">
      <el-tab-pane :label="$t('fdhb')" name="fabi"></el-tab-pane>
      <el-tab-pane :label="$t('jmhb')" name="usdt"></el-tab-pane>
    </el-tabs> -->
    <div class="search-container">
      <div class="admin-title">{{ $store.state.title }}</div>
      <el-radio-group v-model="moneyType">
        <el-radio-button label="fabi">{{ $t("fdhb") }}</el-radio-button>
        <el-radio-button label="usdt">{{ $t("jmhb") }}</el-radio-button>
      </el-radio-group>
      <el-form
        v-model="searchForm"
        :inline="true"
        label-position="top"
        class="search-form four-column"
      >
        <el-form-item :label="$t('kssj')">
          <el-date-picker
            v-model="searchForm.startTime"
            align="right"
            type="datetime"
            :placeholder="$t('timeplace')"
            value-format="timestamp"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('jssj')">
          <el-date-picker
            v-model="searchForm.endTime"
            align="right"
            type="datetime"
            :placeholder="$t('timeplace')"
            value-format="timestamp"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('kzt')">
          <el-select
            v-model="searchForm.status"
            :placeholder="$t('kzt')"
            clearable
          >
            <el-option
              style="padding: 0 20px"
              v-for="(item, index) in selectOption"
              :key="item"
              :label="item"
              :value="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <label class="el-form-item__label"></label>
          <el-button
            type="primary"
            @click="handleChangeSearch"
            class="normal-btn"
            style="height: 40px"
          >
            <i class="el-icon-search"></i>{{ $t("search") }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content">
      <el-table
        class="tables"
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
        @row-click="(e) => handleShowDetail(e, 'detail')"
        v-if="moneyType == 'fabi'"
      >
        <el-table-column prop="coinCode" :label="$t('bz')" min-width="80" />

        <el-table-column prop="reqStatus" :label="$t('kzt')" min-width="120">
          <template slot-scope="scope">
            <el-tag :type="typeOption[scope.row.reqStatus]" class="elTag">
              {{ status[scope.row.reqStatus] }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="sendAccount"
          :label="$t('hkzh')"
          min-width="120"
        />
        <el-table-column prop="reqValue" :label="$t('czje')" min-width="100" />
        <el-table-column
          prop="accountName"
          :label="$t('skzhmc')"
          min-width="100"
        />
        <el-table-column
          prop="createTime"
          :label="$t('cjsj')"
          min-width="180"
        />
        <el-table-column prop="name" :label="$t('cz')" width="70" fixed="right">
          <template slot-scope="scope">
            <!-- <div @click.stop>
              <el-upload
              class="upload-demo"
              action="/api/file/upload"
              list-type="text"
              accept=".pdf, image/*"
              :on-success="(res) => handlesuccess(res, scope.row)"
              v-if="scope.row.reqStatus == 1 && !$store.state.userInfo.admin"
            >
              <div class="operation-btn edit-btn">
                {{ $t("schkpz") }}
              </div>
            </el-upload>
            </div> -->
            <div
              class="operation-btn edit-btn"
              v-if="scope.row.reqStatus == 1 && !$store.state.userInfo.admin"
              @click.stop="handleShowDetail(scope.row, 'upload')"
            >
              {{ $t("schkpz") }}
            </div>
            <div
              slot="reference"
              class="operation-btn pass-btn"
              v-if="scope.row.reqStatus == 2 && $store.state.userInfo.admin"
              @click.stop="handleShowDetail(scope.row, 'pass')"
            >
              {{ $t("tg") }}
            </div>
            <div
              class="operation-btn reject-btn"
              @click.stop="rejectDeposit(scope.row)"
              v-if="scope.row.reqStatus == 2 && $store.state.userInfo.admin"
            >
              {{ $t("bh") }}
            </div>
          </template>
        </el-table-column>
        <div slot="empty">
          <el-empty
            :description="$t('nodata')"
            style="padding: 50px"
          ></el-empty>
        </div>
      </el-table>
      <el-table
        class="tables"
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
        @row-click="(e) => handleShowDetail(e, 'detail')"
        v-if="moneyType == 'usdt'"
      >
        <el-table-column prop="coinCode" :label="$t('bz')" min-width="80" />
        <el-table-column prop="reqStatus" :label="$t('kzt')" min-width="120">
          <template slot-scope="scope">
            <el-tag :type="usdttypeOption[scope.row.reqStatus]" class="elTag">
              {{ usdtstatus[scope.row.reqStatus] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="cryptAdd"
          :label="$t('skqbdz')"
          min-width="180"
        />
        <el-table-column prop="reqValue" :label="$t('czje')" min-width="180" />
        <el-table-column prop="tid" :label="$t('hkqbdz')" min-width="180" />
        <el-table-column prop="agreement" :label="$t('jmxy')" min-width="80" />
        <el-table-column
          prop="createTime"
          :label="$t('cjsj')"
          min-width="180"
        />
        <el-table-column prop="name" :label="$t('cz')" width="70" fixed="right">
          <template slot-scope="scope">
            <!-- <div @click.stop>
            <el-upload
            class="upload-demo"
            action="/api/file/upload"
            list-type="text"
            accept=".pdf, .zip, .rar, image/*"
            :on-success="(res) => handlesuccess(res, scope.row)"
            multiple
            v-if="
              !scope.row.reqProof &&
              !$store.state.userInfo.admin &&
              scope.row.reqStatus == 1
            "
          >
            <div class="operation-btn edit-btn">
              {{ $t("schkpz") }}
            </div>
          </el-upload>
          </div> -->
            <div
              class="operation-btn edit-btn"
              @click.stop="handleShowDetail(scope.row, 'upload')"
              v-if="
                !scope.row.reqProof &&
                !$store.state.userInfo.admin &&
                scope.row.reqStatus == 1
              "
            >
              {{ $t("schkpz") }}
            </div>

            <div
              class="operation-btn pass-btn"
              v-if="
                scope.row.reqProof &&
                $store.state.userInfo.admin &&
                scope.row.reqStatus == 1
              "
              @click.stop="handleShowDetail(scope.row, 'pass')"
            >
              {{ $t("tg") }}
            </div>
            <div
              class="operation-btn reject-btn"
              @click.stop="rejectDeposit(scope.row)"
              v-if="scope.row.reqStatus == 1 && $store.state.userInfo.admin"
            >
              {{ $t("bh") }}
            </div>
          </template>
        </el-table-column>
        <div slot="empty">
          <el-empty
            :description="$t('nodata')"
            style="padding: 50px"
          ></el-empty>
        </div>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="current"
        :page-sizes="[10, 50, 100, 500]"
        :page-size="size"
        layout="prev, pager, next"
        small
        :total="total"
        class="elPagination"
      >
      </el-pagination>
    </div>

    <el-dialog
      :title="operationType == 'detail' ? $t('xq') : $t('sh')"
      :visible.sync="dialogVisible"
      width="636px"
      :before-close="
        () => {
          dialogVisible = false;
        }
      "
    >
      <div class="formStyle">
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
              {{ item.value }}
            </template>
          </div>
        </div>
      </div>
      <div slot="footer">
        <el-button class="qx" @click="dialogVisible = false">{{
          $t("cancel")
        }}</el-button>
        <el-button
          v-if="operationType == 'pass'"
          class="qd"
          @click="passDeposit(currentSelectRow)"
          >{{ $t("tg") }}</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      :title="$t('sqtjcg')"
      :visible.sync="uploaddialogVisible"
      width="636px"
      :before-close="
        () => {
          uploaddialogVisible = false;
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
              {{ $t("hkdes") }}
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
            return item.value && !item.upHide;
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
              {{ item.value }}
            </template>
          </div>
        </div>
        <!-- <el-form-item :label="$t('bz')">
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
      <h2>{{$t('pleaseuse')}}</h2>
      <el-form-item :label="$t('hkzh')">
        <el-input
          v-model="currentSelectRow.outbankAccount"
          :readOnly="true"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('hkyh')">
        <el-input
          v-model="currentSelectRow.outbankName"
          :readOnly="true"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('hkzhao')">
        <el-input
          v-model="currentSelectRow.outbankCode"
          :readOnly="true"
        ></el-input>
      </el-form-item>
      <h2>{{$t('pleaseusedes')}}</h2>
      <el-form-item :label="$t('skzhmc')">
        <el-input
          v-model="currentSelectRow.inAccount"
          :readOnly="true"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('skyh')">
        <el-input
          v-model="currentSelectRow.inbankName"
          :readOnly="true"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('skzh')">
        <el-input
          v-model="currentSelectRow.inbankAccount"
          :readOnly="true"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('skbankcode')">
        <el-input
          v-model="currentSelectRow.inbankCode"
          :readOnly="true"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('sksdm')">
        <el-input
          v-model="currentSelectRow.inswiftCode"
          :readOnly="true"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('skyhssgj')">
        <el-input
          v-model="currentSelectRow.inbankCountry"
          :readOnly="true"
        ></el-input>
      </el-form-item> 
      <el-form-item :label="$t('skyhszdz')">
        <el-input
          type="textarea"
          v-model="currentSelectRow.inbankAdd"
          :readOnly="true"
        ></el-input>
      </el-form-item>-->
      </el-form>
      <!-- <el-form
      label-position="top"
      ref="formss"
      class="formStyle"
      :model="currentSelectRow"
      v-if="moneyType == 'usdt'"
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
      <el-form-item :label="$t('jmxy')">
        <el-input
          v-model="currentSelectRow.agreement"
          :readOnly="true"
        ></el-input>
      </el-form-item>
      <h2>{{$t('pleaseuse')}}</h2>
      <el-form-item :label="$t('hkqbdz')">
        <el-input v-model="currentSelectRow.tid" :readOnly="true"></el-input>
      </el-form-item>
      <h2>{{$t('pleaseuseusdt')}}</h2>
      <el-form-item :label="$t('skqbdz')">
        <el-input
          v-model="currentSelectRow.cryptAdd"
          :readOnly="true"
        ></el-input>
      </el-form-item>
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
              {{ $t("hksdjtdes") }}
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
    </el-form> -->
      <div slot="footer">
        <el-button class="qx" @click="uploaddialogVisible = false">
          {{ $t("cancel") }}
        </el-button>
        <el-button class="qd" :class="loading && 'loading'" @click="confirmPz">
          {{ $t("sure") }}
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="operationType == 'detail' ? $t('xq') : $t('sh')"
      :visible.sync="usdtdialogVisible"
      width="636px"
      :before-close="
        () => {
          usdtdialogVisible = false;
        }
      "
    >
      <div class="formStyle">
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
              {{ item.value }}
            </template>
          </div>
        </div>
      </div>
      <div slot="footer">
        <el-button class="qx" @click="usdtdialogVisible = false">{{
          $t("cancel")
        }}</el-button>
        <el-button
          v-if="operationType == 'pass'"
          class="qd"
          @click="passDeposit(currentSelectRow)"
          >{{ $t("tg") }}</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      :title="$t('bh')"
      :visible.sync="rejectdialogVisible"
      width="636px"
      :before-close="
        () => {
          rejectdialogVisible = false;
        }
      "
    >
      <el-form label-position="top" ref="formss">
        <el-form-item :label="$t('bhly')">
          <el-input
            type="textarea"
            v-model="memo"
            :rows="8"
            :placeholder="$t('qsr')"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button
          type="info"
          class="qx"
          @click="rejectdialogVisible = false"
          >{{ $t("cancel") }}</el-button
        >
        <el-button type="primary" class="qr" @click="rejectConfirm">{{
          $t("sure")
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  depositList,
  cryptDepositList,
  putDeposit,
  depCoins,
  withdrawAccounts,
  putCryptDeposit,
  perDeposit,
  perCryptDeposit,
} from "@/api/out.js";
import { Message } from "element-ui";
import { getBankList } from "@/api/bank";
import { getHashParams } from "@/utils/index";
import { getCountryName, pjDownUrl } from "@/utils/common";

export default {
  name: "userMoneyManagementTransfer",
  data() {
    return {
      rejectdialogVisible: false,
      tableData: [],
      options: [],
      type: "1",
      usdtdialogVisible: false,
      uploaddialogVisible: false,
      linkList: ["zjgl", "hh"],
      form: {
        name: "",
      },
      loading: true,
      selectOption: [],
      status: [
        this.$t("all"),
        this.$t("tjsq"),
        this.$t("qrhk"),
        this.$t("cwsh"),
        this.$t("done"),
        this.$t("bh"),
      ],
      typeOption: ["", "info", "warning", "", "success", "danger"],
      usdtstatus: [
        this.$t("all"),
        this.$t("tjsq"),
        this.$t("done"),
        this.$t("bh"),
      ],
      usdttypeOption: ["", "info", "success", "danger"],
      dialogVisible: false,
      currentSelectRow: {},
      inCoinList: [],
      outCoinList: [],
      current: 1,
      size: 10,
      total: 0,
      searchForm: {},
      moneyType: "fabi",
      bankList: [],
      memo: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: this.$t("today"),
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: this.$t("yestoday"),
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: this.$t("yzq"),
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      operationType: "",
      detailList: [],
    };
  },
  created() {
    const params = getHashParams();
    if (params && params.get("type")) {
      const mt = params.get("type");
      this.moneyType = mt;
    }
    this.getInitData();
    if (this.$store.state.userInfo.admin) {
      this.getRequestBankList();
    } else {
      this.getRJBZ();
      this.getCJZH();
    }
  },
  watch: {
    moneyType() {
      this.current = 1;
      this.getInitData();
    },
  },
  methods: {
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
          this.uploaddialogVisible = false;
          Message({
            type: "success",
            message: this.$t("czcg"),
          });
        }
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },
    rejectDeposit(row) {
      this.currentSelectRow = row;
      this.memo = "";
      this.rejectdialogVisible = true;
    },
    async rejectConfirm() {
      let res;
      const param = {
        id: this.currentSelectRow.id,
        pass: false,
        depValue: this.currentSelectRow.reqValue,
        memo: this.memo,
      };
      if (this.moneyType == "fabi") {
        res = await perDeposit(param);
      } else {
        res = await perCryptDeposit(param);
      }
      if (res.code == 200) {
        Message({
          type: "success",
          message: this.$t("czcg"),
        });
        this.getInitData();
        this.rejectdialogVisible = false;
      }
    },
    async passDeposit(row) {
      try {
        let res;
        const param = {
          id: row.id,
          pass: true,
          depValue: row.reqValue,
        };
        if (this.moneyType == "fabi") {
          res = await perDeposit(param);
          this.dialogVisible = false;
        } else {
          res = await perCryptDeposit(param);
          this.usdtdialogVisible = false;
        }
        if (res.code == 200) {
          Message({
            type: "success",
            message: this.$t("czcg"),
          });
          this.getInitData();
        }
      } catch (error) {}
    },
    async getRequestBankList() {
      const res = await getBankList();
      this.bankList = res.data;
    },
    handleSizeChange(val) {
      this.size = val;
      this.getInitData();
    },
    handleCurrentChange(val) {
      this.current = val;
      this.getInitData();
    },
    handleChangeSearch() {
      this.current = 1;
      this.getInitData();
    },
    async getRJBZ() {
      try {
        let res = await depCoins();
        this.inCoinList = res.data;
      } catch (error) {}
    },
    async getCJZH() {
      try {
        let res = await withdrawAccounts();
        this.outCoinList = res.data;
      } catch (error) {}
    },
    handleShowDetail(row, type) {
      this.currentSelectRow = row;
      this.operationType = type;
      if (this.moneyType == "fabi") {
        if (this.$store.state.userInfo.admin) {
          const inlist = this.bankList.filter((item) => {
            return item.id == row.bankId;
          });
          const outlist = this.bankList.filter((item) => {
            return item.id == row.sendBank;
          });
          if (inlist.length && outlist.length) {
            this.currentSelectRow = {
              ...this.currentSelectRow,
              inbankName: inlist[0].bankName,
              inAccount: inlist[0].accountName,
              inbankAccount: inlist[0].bankAccount,
              inbankCode: inlist[0].bankCode,
              inbankCountry: inlist[0].bankCountry,
              inbankAdd: inlist[0].bankAdd,
              inswiftCode: inlist[0].swiftCode,
              outbankAccount: outlist[0].bankAccount,
              outbankCode: outlist[0].bankCode,
              outbankCountry: outlist[0].bankCountry,
              outbankName: outlist[0].bankName,
              outbankAdd: outlist[0].bankAdd,
              outswiftCode: outlist[0].swiftCode,
            };
          }
        } else {
          const inlist = this.inCoinList.filter((item) => {
            return item.coinCode == row.coinCode;
          });
          const outlist = this.outCoinList.filter((item) => {
            return item.id == row.sendBank;
          });
          if (inlist.length && outlist.length) {
            this.currentSelectRow = {
              ...this.currentSelectRow,
              inbankName: inlist[0].bank.bankName,
              inAccount: inlist[0].bank.accountName,
              inbankAccount: inlist[0].bank.bankAccount,
              inbankCode: inlist[0].bank.bankCode,
              inbankCountry: inlist[0].bank.bankCountry,
              inbankAdd: inlist[0].bank.bankAdd,
              inswiftCode: inlist[0].bank.swiftCode,
              outbankAccount: outlist[0].bankAccount,
              outbankCode: outlist[0].bankCode,
              outbankName: outlist[0].bankName,
              outbankCountry: outlist[0].bankCountry,
              outbankAdd: outlist[0].bankAdd,
              outswiftCode: outlist[0].swiftCode,
            };
          }
        }
        this.detailList = [
          { label: this.$t("bz"), value: this.currentSelectRow.coinCode },
          { label: this.$t("czje"), value: this.currentSelectRow.reqValue },
          {
            label: this.$t("kzt"),
            value: this.status[this.currentSelectRow.reqStatus],
            upHide: true,
          },
          {
            label: this.$t("bhly"),
            value: this.status[this.currentSelectRow.memo],
            upHide: true,
          },

          { label: this.$t("hkzh"), value: this.currentSelectRow.sendAccount },
          { label: this.$t("hkyh"), value: this.currentSelectRow.outbankName },
          {
            label: this.$t("hkzhao"),
            value: this.currentSelectRow.outbankAccount,
          },
          {
            label: this.$t("hkbankcode"),
            value: this.currentSelectRow.outbankCode,
            upHide: true,
          },
          {
            label: this.$t("hkyhssgj"),
            value: getCountryName(this.currentSelectRow.outbankCountry),
            upHide: true,
          },
          {
            label: this.$t("hkyhssdz"),
            value: this.currentSelectRow.outbankAdd,
            upHide: true,
          },
          {
            label: this.$t("hksdm"),
            value: this.currentSelectRow.outswiftCode,
            upHide: true,
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
            value: getCountryName(this.currentSelectRow.inbankCountry),
          },
          {
            label: this.$t("skyhszdz"),
            value: this.currentSelectRow.inbankAdd,
          },
          { label: this.$t("sksdm"), value: this.currentSelectRow.inswiftCode },
          { label: this.$t("cjsj"), value: this.currentSelectRow.createTime },
          {
            label: this.$t("xgsj"),
            value: this.currentSelectRow.modifiedTime,
            upHide: true,
          },
          {
            label: this.$t("hkpz"),
            value: pjDownUrl(this.currentSelectRow.reqProof),
            type: "link",
          },
        ];
        if (type == "detail") {
          this.dialogVisible = true;
        } else if (type == "upload") {
          this.uploaddialogVisible = true;
        } else if (type == "pass") {
          this.dialogVisible = true
        }
      }
      if (this.moneyType == "usdt") {
        this.detailList = [
          { label: this.$t("bz"), value: this.currentSelectRow.coinCode },
          { label: this.$t("czje"), value: this.currentSelectRow.reqValue },
          {
            label: this.$t("kzt"),
            value: this.usdtstatus[this.currentSelectRow.reqStatus],
            upHide: true,
          },
          { label: this.$t("bhly"), value: this.currentSelectRow.memo },
          { label: this.$t("jmxy"), value: this.currentSelectRow.agreement },
          { label: this.$t("hkqbdz"), value: this.currentSelectRow.tid },
          { label: this.$t("skqbdz"), value: this.currentSelectRow.cryptAdd },
          { label: this.$t("cjsj"), value: this.currentSelectRow.createTime },
          {
            label: this.$t("xgsj"),
            value: this.currentSelectRow.modifiedTime,
            upHide: true,
          },
          {
            label: this.$t("hkpz"),
            value: pjDownUrl(this.currentSelectRow.reqProof),
            type: "link",
          },
        ];
        if (type == "detail") {
          this.usdtdialogVisible = true;
        } else if (type == "upload") {
          this.uploaddialogVisible = true;
        } else if (type == "pass") {
          this.usdtdialogVisible = true
        }
      }
    },
    async getInitData() {
      this.loading = true;
      let res;
      if (this.searchForm.status == 0) {
        delete this.searchForm.status;
      }
      if (this.moneyType == "fabi") {
        res = await depositList({
          ...this.searchForm,
          current: this.current,
          size: this.size,
        });
        this.selectOption = this.status;
      } else if (this.moneyType == "usdt") {
        res = await cryptDepositList({
          ...this.searchForm,
          current: this.current,
          size: this.size,
        });
        this.selectOption = this.usdtstatus;
      }
      this.loading = false;
      if (res.code === 200) {
        this.tableData = res.data.records;
        this.total = res.data.total;
      }
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
  },
};
</script>
<style scoped lang="scss">
.user_moneymanagement_transfer_contianer {
  .content {
    background: $contentColor;
    padding: 1rem;
    border-radius: 4px;
    // box-shadow: 0px 0px 10px 0px rgba(52, 118, 255, 0.25);

    .empty_box {
      margin-top: 40px;
      padding: 56px 0;
      border-radius: 4px;
      border: 1px solid var(--unnamed, #dcdfe6);
      background: var(--unnamed, #fff);
      box-shadow: 0px 0px 10px 0px rgba(52, 118, 255, 0.25);
      text-align: center;
    }
  }
}
.btn {
  padding: 4px 10px;
}
.btn a {
  color: #fff;
}
.upload-demo {
  display: inline-block;
}
</style>
