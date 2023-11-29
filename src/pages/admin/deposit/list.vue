<template>
  <div class="user_moneymanagement_transfer_contianer">
    <!-- <LinkPath :linkList="linkList" v-if="!$store.state.userInfo.admin" style="margin-bottom: 1.5rem"/> -->
    <el-tabs v-model="moneyType">
      <el-tab-pane :label="$t('fdhb')" name="fabi"></el-tab-pane>
      <el-tab-pane :label="$t('jmhb')" name="usdt"></el-tab-pane>
    </el-tabs>
    <div class="search-container">
      <div class="admin-title">{{ $store.state.title }}</div>
      <el-form v-model="searchForm" :inline="true" label-position="top" class="search-form four-column">
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
        <el-table-column
          prop="accountName"
          :label="$t('skzhmc')"
          min-width="180"
        />
        <el-table-column prop="coinCode" :label="$t('bz')" min-width="200" />
        <el-table-column prop="reqValue" :label="$t('czje')" min-width="180" />
        <el-table-column
          prop="sendAccount"
          :label="$t('hkzh')"
          min-width="180"
        />
        <el-table-column prop="reqStatus" :label="$t('kzt')" min-width="180">
          <template slot-scope="scope">
            <el-tag :type="typeOption[scope.row.reqStatus]" class="elTag">
              {{ status[scope.row.reqStatus] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          :label="$t('cjsj')"
          min-width="180"
        />
        <el-table-column
          prop="name"
          :label="$t('cz')"
          width="125"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-upload
              class="upload-demo"
              action="null"
              list-type="text"
              accept=".pdf, .zip, .rar, image/*"
              :before-upload="(e) => handlesuccess(e, scope.row)"
              multiple
              v-if="scope.row.reqStatus == 1 && !$store.state.userInfo.admin"
            >
              <div class="operation-btn">
                {{ $t("schkpz") }}
              </div>
            </el-upload>
            <div
              class="operation-btn"
              @click="handleShowDetail(scope.row)"
            >
              {{ $t("xq") }}
            </div>
            <el-popconfirm
              v-if="scope.row.reqStatus == 2 && $store.state.userInfo.admin"
              :title="$t('qrtg')"
              @confirm="passDeposit(scope.row)"
            >
              <div
                slot="reference"
                class="operation-btn special-btn"
              >
                {{ $t("tg") }}
              </div>
            </el-popconfirm>
            <div
              class="operation-btn"
              @click="rejectDeposit(scope.row)"
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
        size="small"
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
        v-if="moneyType == 'usdt'"
      >
        <el-table-column
          prop="cryptAdd"
          :label="$t('skqbdz')"
          min-width="180"
        />
        <el-table-column prop="coinCode" :label="$t('bz')" min-width="80" />
        <el-table-column prop="reqValue" :label="$t('czje')" min-width="180" />
        <el-table-column prop="tid" :label="$t('hkqbdz')" min-width="180" />
        <el-table-column prop="agreement" :label="$t('jmxy')" min-width="80" />
        <el-table-column prop="reqStatus" :label="$t('kzt')" min-width="180">
          <template slot-scope="scope">
            <el-tag :type="usdttypeOption[scope.row.reqStatus]" class="elTag">
              {{ usdtstatus[scope.row.reqStatus] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          :label="$t('cjsj')"
          min-width="180"
        />
        <el-table-column
          prop="name"
          :label="$t('cz')"
          width="185"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-upload
              class="upload-demo"
              action="null"
              list-type="text"
              accept=".pdf, .zip, .rar, image/*"
              :before-upload="(e) => handlesuccess(e, scope.row)"
              multiple
              v-if="!scope.row.reqProof && !$store.state.userInfo.admin && scope.row.reqStatus == 1"
            >
              <el-button size="small" type="primary" class="btn">
                {{ $t("schkpz") }}
              </el-button>
            </el-upload>
            <el-button
              type="info"
              class="btn"
              size="small"
              @click="handleShowDetail(scope.row)"
            >
              {{ $t("xq") }}
            </el-button>
            <el-popconfirm
            v-if="scope.row.reqProof && $store.state.userInfo.admin && scope.row.reqStatus == 1"
            :title="$t('qrtg')"
            @confirm="passDeposit(scope.row)"
          >
            <el-button
              slot="reference"
              type="success"
              class="btn"
              size="small"
              style="margin: 0 10px"
            >
              {{ $t("tg") }}
            </el-button>
          </el-popconfirm>
          <el-button
            type="danger"
            class="btn"
            size="small"
            @click="rejectDeposit(scope.row)"
            v-if="scope.row.reqStatus == 1 && $store.state.userInfo.admin"
          >
            {{ $t("bh") }}
          </el-button>
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
      small        :total="total"
        class="elPagination"
      >
      </el-pagination>
    </div>

    <el-dialog
      :title="$t('xq')"
      :visible.sync="dialogVisible"
      width="1000px"
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
        <el-form-item
          :label="$t('bhly')"
          v-if="currentSelectRow.reqStatus == 5"
        >
          <el-input v-model="currentSelectRow.memo" :readOnly="true"></el-input>
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
        <el-form-item :label="$t('hkpz')" v-if="!$store.state.userInfo.admin">
          <el-upload
            class="upload-demo"
            action="null"
            list-type="text"
            accept=".pdf, .zip, .rar, image/*"
            :before-upload="(e) => handlesuccess(e, currentSelectRow)"
            multiple
            v-if="!currentSelectRow.reqProof"
          >
            <el-button size="small" type="primary" class="btn">
              {{ $t("schkpz") }}
            </el-button>
          </el-upload>
          <a
          :href="'/api/file/downLoad?url=' + currentSelectRow.reqProof"
          target="_blank"
          class="down-a"
          v-else
          >{{ $t("yulan") }}</a
        >
        </el-form-item>
        <el-form-item
          :label="$t('hkpz')"
          v-if="$store.state.userInfo.admin && currentSelectRow.reqProof"
        >
        <a
        :href="'/api/file/downLoad?url=' + currentSelectRow.reqProof"
        target="_blank"
        class="down-a"
        >{{ $t("yulan") }}</a
      >
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button class="qd" @click="dialogVisible = false">{{
          $t("queding")
        }}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="$t('xq')"
      :visible.sync="usdtdialogVisible"
      :before-close="
        () => {
          usdtdialogVisible = false;
        }
      "
    >
      <el-form
        label-position="top"
        ref="formss"
        :model="currentSelectRow"
        class="formStyle"
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
        <el-form-item :label="$t('czje')">
          <el-input
            v-model="currentSelectRow.reqValue"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('hkqbdz')">
          <el-input v-model="currentSelectRow.tid" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('bhly')"
          v-if="currentSelectRow.reqStatus == 5"
        >
          <el-input v-model="currentSelectRow.memo" :readOnly="true"></el-input>
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
        <el-form-item :label="$t('hkpz')" v-if="!$store.state.userInfo.admin">
          <el-upload
            class="upload-demo"
            action="null"
            list-type="text"
            accept=".pdf, .zip, .rar, image/*"
            :before-upload="(e) => handlesuccess(e, currentSelectRow)"
            multiple
            v-if="!currentSelectRow.reqProof && currentSelectRow.reqStatus == 1"
          >
            <el-button size="small" type="primary" class="btn">
              {{ $t("schkpz") }}
            </el-button>
          </el-upload>
          <a
            :href="'/api/file/downLoad?url=' + currentSelectRow.reqProof"
            target="_blank"
            class="down-a"
            v-if="currentSelectRow.reqProof"
            >{{ $t("yulan") }}</a
          >
          <span v-else>
            {{$t('noupload')}}
          </span>
        </el-form-item>
        <el-form-item
          :label="$t('hkpz')"
          v-if="$store.state.userInfo.admin && currentSelectRow.reqProof"
        >
        <a
        :href="'/api/file/downLoad?url=' + currentSelectRow.reqProof"
        target="_blank"
        class="down-a"
        >{{ $t("yulan") }}</a
      >
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button class="qd" @click="usdtdialogVisible = false">{{
          $t("queding")
        }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="$t('bh')" :visible.sync="rejectdialogVisible" width="650" :before-close="() => { rejectdialogVisible = false; }">
      <el-form label-position="top" ref="formss">
        <el-form-item :label="$t('bhly')">
          <el-input type="textarea" v-model="memo"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="info" class="qx" @click="rejectdialogVisible = false">{{$t('cancel')}}</el-button>
        <el-button type="primary" class="qr" @click="rejectConfirm">{{$t('sure')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import LinkPath from "@/components/common/linkPath.vue";
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
import { upload } from "@/api/file";
import { Message } from "element-ui";
import { getBankList } from "@/api/bank";
import { getHashParams } from "@/utils/index"
export default {
  name: "userMoneyManagementTransfer",
  components: { LinkPath },
  data() {
    return {
      rejectdialogVisible: false,
      tableData: [],
      options: [],
      type: "1",
      usdtdialogVisible: false,
      linkList: ["zjgl", "hh"],
      form: {
        name: "",
      },
      loading: true,
      selectOption: [],
      status: [this.$t('all'), this.$t('tjsq'), this.$t('qrhk'), this.$t('cwsh'), this.$t('done'), this.$t('bh')],
      typeOption: ['', 'info','warning','','success','danger'],
      usdtstatus: [this.$t('all'), this.$t('tjsq'), this.$t('done'), this.$t('bh')],
      usdttypeOption: ['', 'info','success','danger'],
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
      memo: '',
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
    };
  },
  created() {
    const params = getHashParams()
    if (params && params.get('type')) {
      const mt = params.get('type')
      this.moneyType = mt
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
    rejectDeposit(row) {
      this.currentSelectRow = row
      this.memo = ''
      this.rejectdialogVisible = true
    },
    async rejectConfirm() {
      let res;
      const param = {
        id: this.currentSelectRow.id,
        pass: false,
        depValue: this.currentSelectRow.reqValue,
        memo: this.memo
      }
      if (this.moneyType == 'fabi') {
        res = await perDeposit(param);
      } else {
        res = await perCryptDeposit(param)
      }
      if (res.code == 200) {
        Message({
          type: "success",
          message:  this.$t('czcg'),
        });
        this.getInitData()
        this.rejectdialogVisible = false
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
        } else {
          res = await perCryptDeposit(param);
        }
        if (res.code == 200) {
          Message({
            type: "success",
            message:  this.$t('czcg'),
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
      this.current = 1
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
    handleClick() {},
    handleShowDetail(row) {
      this.currentSelectRow = row;
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
              inbankAccount: inlist[0].bankAccount,
              inbankCode: inlist[0].bankCode,
              inbankCountry: inlist[0].bankCountry,
              inbankAdd: inlist[0].bankAdd,
              inswiftCode: inlist[0].swiftCode,
              outbankAccount: outlist[0].bankAccount,
              outbankCode: outlist[0].bankCode,
              outbankCountry: outlist[0].bankCountry,
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
              inbankAccount: inlist[0].bank.bankAccount,
              inbankCode: inlist[0].bank.bankCode,
              inbankCountry: inlist[0].bank.bankCountry,
              inbankAdd: inlist[0].bank.bankAdd,
              inswiftCode: inlist[0].bank.swiftCode,
              outbankAccount: outlist[0].bankAccount,
              outbankCode: outlist[0].bankCode,
              outbankCountry: outlist[0].bankCountry,
              outbankAdd: outlist[0].bankAdd,
              outswiftCode: outlist[0].swiftCode,
            };
          }
        }

        this.dialogVisible = true;
      }
      if (this.moneyType == "usdt") {
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
        res = await depositList({
          ...this.searchForm,
          current: this.current,
          size: this.size,
        });
        this.selectOption = this.status
      } else if (this.moneyType == "usdt") {
        res = await cryptDepositList({
          ...this.searchForm,
          current: this.current,
          size: this.size,
        });
        this.selectOption = this.usdtstatus
      }
      this.loading = false;
      if (res.code === 200) {
        this.tableData = res.data.records;
        this.total = res.data.total;
      }
    },
    async handlesuccess(e, row) {
      const data = row;
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
          data.reqProof = req.data[0];
          data.reqStatus = 2;
          let res;
          if (this.moneyType == "fabi") {
            res = await putDeposit(data);
          } else {
            res = await putCryptDeposit(data);
          }
          if (res.code === 200) {
            Message({
              type: "success",
              message: this.$t("sccg"),
            });
          }
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
