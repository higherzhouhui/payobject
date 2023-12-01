<template>
  <div class="user_moneymanagement_transfer_contianer">
    <!-- <LinkPath :linkList="linkList" style="margin-bottom: 1.5rem" v-if="!$store.state.userInfo.admin"/> -->
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
        size="small"
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
        v-if="moneyType == 'fabi'"
      >
       

        <el-table-column prop="coinCode" :label="$t('bz')" min-width="100" />
        <el-table-column prop="reqStatus" :label="$t('kzt')" min-width="120">
          <template slot-scope="scope">
            <el-tag :type="typeOption[scope.row.reqStatus]" class="elTag">
              {{ status[scope.row.reqStatus] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
        prop="accountName"
        :label="$t('skzhmc')"
        width="180"
        show-overflow-tooltip
      />
      <el-table-column prop="reqValue" :label="$t('ckje')" min-width="100" />
        <el-table-column
          prop="createTime"
          :label="$t('cjsj')"
          min-width="180"
        />
        <el-table-column
          prop="name"
          :label="$t('cz')"
          width="120"
          fixed="right"
        >
          <template slot-scope="scope">
            <div
              class="operation-btn"
              @click="handleShowDetail(scope.row, 'detail')"
            >
              {{ $t("xq") }}
            </div>
            <div
              class="operation-btn pass-btn"
              @click="
                currentSelectRow = scope.row;
                passConfirm();
              "
              v-if="scope.row.reqStatus == 1 && $store.state.userInfo.admin"
            >
              {{ $t("qrsq") }}
            </div>
            <div
              class="operation-btn reject-btn"
              @click="rejectWithdraw(scope.row)"
              v-if="scope.row.reqStatus == 1 && $store.state.userInfo.admin"
            >
              {{ $t("bh") }}
            </div>
            <div
              class="operation-btn pass-btn"
              @click="passWithdraw(scope.row)"
              v-if="scope.row.reqStatus == 2 && $store.state.userInfo.admin"
            >
              {{ $t("tg") }}
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
        size="small"
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
        v-if="moneyType == 'usdt'"
      >
        <el-table-column prop="srcCode" :label="$t('bz')" min-width="100" />
        <el-table-column prop="reqStatus" :label="$t('kzt')" min-width="100">
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
        <el-table-column prop="agreement" :label="$t('jmxy')" min-width="80" />
        <!-- <el-table-column prop="coinCode" :label="$t('mbbz')" min-width="100" /> -->
        <el-table-column prop="reqValue" :label="$t('ckje')" min-width="100" />
        <!-- <el-table-column prop="witValue" :label="$t('yjdzje')" min-width="120" /> -->
        <!-- <el-table-column prop="tid" :label="$t('汇款钱包地址')" width="180" /> -->

        <el-table-column
          prop="createTime"
          :label="$t('cjsj')"
          min-width="180"
        />
        <el-table-column
          prop="name"
          :label="$t('cz')"
          width="100"
          fixed="right"
        >
          <template slot-scope="scope">
            <div class="operation-btn" @click="handleShowDetail(scope.row)">
              {{ $t("xq") }}
            </div>
            <div
              class="operation-btn pass-btn"
              @click="passWithdraw(scope.row)"
              v-if="scope.row.reqStatus == 1 && $store.state.userInfo.admin"
            >
              {{ $t("tg") }}
            </div>
            <div
              class="operation-btn reject-btn"
              @click="rejectWithdraw(scope.row)"
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
      :title="$t('xq')"
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
              {{$t('download')}}
            </span>
          </a>
        </template>
        <template v-else>
          {{ item.value }}
        </template>
      </div>
      </div>
    </div>
      <!-- <el-form
        label-position="top"
        ref="formss"
        :model="currentSelectRow"
        class="formStyle moreDetail"
      >
        <el-form-item :label="$t('bz')">
          <el-input
            v-model="currentSelectRow.coinCode"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('ckje')">
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
        <el-form-item :label="$t('skzh')">
          <el-input
            v-model="currentSelectRow.outbankAccount"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('bankcode')">
          <el-input
            v-model="currentSelectRow.outbankCode"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('khgj')">
          <el-input
            v-model="currentSelectRow.outbankCountry"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('skyhszdz')">
          <el-input
            type="textarea"
            v-model="currentSelectRow.outbankAdd"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('sksdm')">
          <el-input
            v-model="currentSelectRow.outswiftCode"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('bhly')" v-if="currentSelectRow.memo">
          <el-input
            type="textarea"
            v-model="currentSelectRow.memo"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('cjsj')">
          <el-input
            v-model="currentSelectRow.createTime"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('xgsj')">
          <el-input
            v-model="currentSelectRow.modifiedTime"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('hkpz')" v-if="currentSelectRow.reqProof">
          <a
            :href="'/api/file/downLoad?url=' + currentSelectRow.reqProof"
            target="_blank"
            class="down-a"
            >{{ $t("yulan") }}</a
          >
        </el-form-item>
      </el-form> -->
      <div slot="footer">
        <el-button class="qx" @click="dialogVisible = false">{{
          $t("cancel")
        }}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="$t('xq')"
      :visible.sync="usdtdialogVisible"
      width="650"
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
              {{$t('download')}}
            </span>
          </a>
        </template>
        <template v-else>
          {{ item.value }}
        </template>
      </div>
      </div>
    </div>
      <!-- <el-form
        label-position="top"
        ref="formss"
        :model="currentSelectRow"
        class="formStyle"
      >
        <el-form-item :label="$t('bz')">
          <el-input
            v-model="currentSelectRow.srcCode"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('skqbdz')">
          <el-input
            v-model="currentSelectRow.cryptAdd"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('ckje')">
          <el-input
            v-model="currentSelectRow.reqValue"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('bhly')" v-if="currentSelectRow.memo">
          <el-input
            type="textarea"
            v-model="currentSelectRow.memo"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('cjsj')">
          <el-input
            v-model="currentSelectRow.createTime"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('xgsj')">
          <el-input
            v-model="currentSelectRow.modifiedTime"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('hkpz')" v-if="currentSelectRow.reqProof">
          <a
            :href="'/api/file/downLoad?url=' + currentSelectRow.reqProof"
            target="_blank"
            class="down-a"
            >{{ $t("yulan") }}</a
          >
        </el-form-item>
      </el-form> -->
      <div slot="footer">
        <el-button class="qx" @click="usdtdialogVisible = false">{{
          $t("cancel")
        }}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="$t('cjqr')"
      :visible.sync="passdialogVisible"
      width="650px"
      :before-close="
        () => {
          passdialogVisible = false;
        }
      "
    >
      <el-form label-position="top" ref="formss" :model="currentSelectRow">
        <el-form-item :label="$t('sjdzje')" v-if="moneyType == 'fabi'">
          <el-input
            type="number"
            v-model="currentSelectRow.withdrawValue"
            :placeholder="$t('qsr')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('sxfei')" v-if="moneyType == 'fabi'">
          <el-input
            type="number"
            v-model="currentSelectRow.commission"
            :placeholder="$t('qsr')"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item :label="$t('hkqbdz')" v-if="moneyType == 'usdt'">
          <el-input
            v-model="currentSelectRow.tid"
            :placeholder="$t('qsr')"
          ></el-input>
        </el-form-item> -->
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
                  <i class="el-icon-folder-add" v-if="!currentSelectRow.withdrawProof"></i>
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
                :href="'/api/file/downLoad?url=' + currentSelectRow.withdrawProof"
                target="_blank"
                class="down"
                v-if="currentSelectRow.withdrawProof"
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
            multiple
            v-if="currentSelectRow.withdrawProof == null"
          >
            <el-button size="small" type="primary" class="btn">
              {{ $t("schkpz") }}
            </el-button>
          </el-upload>
          <a
            :href="'/api/file/downLoad?url=' + currentSelectRow.withdrawProof"
            target="_blank"
            v-else
            class="down-a"
            >{{ $t("yulan") }}</a
          > -->
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="info" class="qx" @click="passdialogVisible = false">{{
          $t("cancel")
        }}</el-button>
        <el-button
          type="primary"
          class="qd"
          @click="passConfirm"
          v-loading="operationLoading"
          >{{ $t("sure") }}</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      :title="$t('bh')"
      :visible.sync="rejectdialogVisible"
      width="650"
      :before-close="
        () => {
          rejectdialogVisible = false;
        }
      "
    >
      <el-form label-position="top" ref="formss" :model="currentSelectRow">
        <el-form-item :label="$t('bhly')">
          <el-input type="textarea" v-model="currentSelectRow.memo" :placeholder="$t('qsr')"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button
          type="info"
          size="large"
          class="qx"
          @click="rejectdialogVisible = false"
          >{{ $t("cancel") }}</el-button
        >
        <el-button
          type="primary"
          size="large"
          class="qd"
          @click="rejectConfirm"
          v-loading="operationLoading"
          >{{ $t("sure") }}</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
  <script>
import LinkPath from "@/components/common/linkPath.vue";
import {
  withdrawList,
  cryptWithdrawList,
  perWithdraw,
  depCoins,
  withdrawAccounts,
  perCryptWithdraw,
} from "@/api/out.js";
import { upload } from "@/api/file";
import { Message } from "element-ui";
import { getBankList } from "@/api/bank.js";
import { getHashParams } from "@/utils/index";
import { pjDownUrl, getCountryName } from "@/utils/common";
export default {
  name: "widthDrawl",
  components: { LinkPath },
  data() {
    return {
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
      tableData: [],
      options: [],
      type: "1",
      usdtdialogVisible: false,
      linkList: ["txgl", "txzhgl"],
      form: {
        name: "",
      },
      loading: true,
      selectOption: [],
      usdtstatus: [
        this.$t("all"),
        this.$t("shz"),
        this.$t("done"),
        this.$t("bh"),
      ],
      usdttypeOption: ["", "info", "success", "danger", "danger", "danger"],
      status: [
        this.$t("all"),
        this.$t("shz"),
        this.$t("clz"),
        this.$t("done"),
        this.$t("qrdz"),
        this.$t("bh"),
      ],
      typeOption: ["", "info", "warning", "success", "danger", "danger"],
      dialogVisible: false,
      currentSelectRow: {},
      inCoinList: [],
      outCoinList: [],
      current: 1,
      size: 10,
      total: 0,
      searchForm: {},
      moneyType: "fabi",
      passdialogVisible: false,
      rejectdialogVisible: false,
      operationLoading: false,
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
    this.getRJBZ();
    this.getCJZH();
  },
  watch: {
    moneyType() {
      this.current = 1;
      this.getInitData();
    },
  },
  methods: {
    async passConfirm() {
      try {
        const data = {
          id: this.currentSelectRow.id,
          withdrawValue: this.currentSelectRow.withdrawValue,
          commission: this.currentSelectRow.commission,
          proof: this.currentSelectRow.withdrawProof,
          pass: true,
        };
        this.operationLoading = true;
        if (this.moneyType == "fabi") {
          await perWithdraw(data);
        } else {
          await perCryptWithdraw(data);
        }
        Message({
          type: "success",
          message: this.$t("czcg"),
        });
        this.operationLoading = false;
        this.passdialogVisible = false;
        this.getInitData();
      } catch {
        this.operationLoading = false;
      }
    },
    async rejectConfirm() {
      try {
        const data = {
          id: this.currentSelectRow.id,
          memo: this.currentSelectRow.memo,
          pass: false,
        };
        this.operationLoading = true;
        if (this.moneyType == "fabi") {
          await perWithdraw(data);
        } else {
          await perCryptWithdraw(data);
        }
        Message({
          type: "success",
          message: this.$t("czcg"),
        });
        this.operationLoading = false;
        this.rejectdialogVisible = false;
        this.getInitData();
      } catch {
        this.operationLoading = false;
      }
    },
    passWithdraw(row) {
      this.currentSelectRow = row;
      this.passdialogVisible = true;
    },
    rejectWithdraw(row) {
      this.currentSelectRow = row;
      this.rejectdialogVisible = true;
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
        if (this.$store.state.userInfo.admin) {
          const res = await getBankList();
          this.outCoinList = res.data;
        } else {
          const res = await withdrawAccounts();
          this.outCoinList = res.data;
        }
      } catch (error) {}
    },
    handleShowDetail(row, type) {
      this.currentSelectRow = row;
      this.operationType = type
      if (this.moneyType == "fabi") {
        const outlist = this.outCoinList.filter((item) => {
          return item.id == row.bankId;
        });
        if (outlist.length) {
          this.currentSelectRow = {
            ...this.currentSelectRow,
            outbankAccount: outlist[0].bankAccount,
            outbankCode: outlist[0].bankCode,
            outbankCountry: outlist[0].bankCountry,
            outbankAdd: outlist[0].bankAdd,
            outswiftCode: outlist[0].swiftCode,
          };
        }
        this.detailList = [
          {label: this.$t("bz"), value: this.currentSelectRow.coinCode},
          {label: this.$t("ckje"), value: this.currentSelectRow.reqValue},
          {label: this.$t("userId"), value: this.currentSelectRow.userId},
          {label: this.$t("skzhmc"), value: this.currentSelectRow.accountName},
          {label: this.$t("skzh"), value: this.currentSelectRow.outbankAccount},
          {label: this.$t("bankcode"), value: this.currentSelectRow.outbankCode},
          {label: this.$t("skyhszdz"), value: this.currentSelectRow.outbankAdd},
          {label: this.$t("khgj"), value: getCountryName(this.currentSelectRow.outbankCountry)},
          {label: this.$t("sksdm"), value: this.currentSelectRow.outswiftCode},
          {label: this.$t("sxfei"), value: this.currentSelectRow.commission},
          {label: this.$t("kzt"), value: this.status[this.currentSelectRow.reqStatus]},
          {label: this.$t("bhly"), value: this.currentSelectRow.memo},
          {label: this.$t("cjsj"), value: this.currentSelectRow.createTime},
          {label: this.$t("xgsj"), value: this.currentSelectRow.modifiedTime},
          {label: this.$t("hkpz"), value: pjDownUrl(this.currentSelectRow.reqProof), type: "link"},
        ]
        this.dialogVisible = true;
      }
      if (this.moneyType == "usdt") {
        this.detailList = [
          {label: this.$t("bz"), value: this.currentSelectRow.coinCode},
          {label: this.$t("czje"), value: this.currentSelectRow.reqValue},
          {label: this.$t("jmxy"), value: this.currentSelectRow.agreement},
          {label: this.$t("skqbdz"), value: this.currentSelectRow.cryptAdd},
          // {label: this.$t("hkqbdz"), value: this.currentSelectRow.tid},
          {label: this.$t("kzt"), value: this.usdtstatus[this.currentSelectRow.reqStatus]},
          {label: this.$t("bhly"), value: this.currentSelectRow.memo},
          {label: this.$t("cjsj"), value: this.currentSelectRow.createTime},
          {label: this.$t("xgsj"), value: this.currentSelectRow.modifiedTime},
          {label: this.$t("hkpz"), value: pjDownUrl(this.currentSelectRow.reqProof), type: "link"},

        ]
        this.usdtdialogVisible = true;
      }
    },
    async getInitData() {
      this.loading = true;
      let res;
      if (this.searchForm.status == 0) {
        delete this.searchForm.status;
      }
      if (this.moneyType == "fabi") {
        res = await withdrawList({
          ...this.searchForm,
          current: this.current,
          size: this.size,
        });
        this.selectOption = this.status;
      } else if (this.moneyType == "usdt") {
        res = await cryptWithdrawList({
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
          this.currentSelectRow = {
            ...this.currentSelectRow,
            withdrawProof: req.data[0],
          };
          Message({
            type: "success",
            message: this.$t("sccg"),
          });
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
  margin-right: 12px;
}
</style>
  