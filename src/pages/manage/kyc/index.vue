<template>
  <div class="user_transferAccountMangement_contianer">
    <!-- <LinkPath :linkList="linkList" /> -->
    <el-tabs v-model="type">
      <el-tab-pane :label="$t('bankcard')" name="first"></el-tab-pane>
      <el-tab-pane :label="$t('kycyz')" name="second"></el-tab-pane>
    </el-tabs>
    <template v-if="type == 'first'">
      <div class="content">
        <el-form ref="form2" :inline="true">
          <el-form-item>
            <el-input
              :placeholder="$t('bankname')"
              v-model="form.bankName"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              :placeholder="$t('yhzh')"
              v-model="form.bankAccount"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="form.bankStatus"
              :placeholder="$t('zhbdzt')"
              clearable
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
          <el-form-item>
            <el-button type="primary" @click="getlist" class="primary">
              <i class="el-icon-search"></i>{{ $t("search") }}
            </el-button>
          </el-form-item>
        </el-form>
        <el-table
          class="tables"
          size="small"
          :data="tableData"
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column
            prop="accountName"
            :label="$t('zhmc')"
            min-width="180"
            show-overflow-tooltip
          />
          <el-table-column
            prop="bankAccount"
            :label="$t('yhzh')"
            min-width="200"
            show-overflow-tooltip
          />
          <el-table-column
            prop="accountAdd"
            :label="$t('jzdz')"
            min-width="300"
            show-overflow-tooltip
          />
          <el-table-column prop="bankStatus" :label="$t('kzt')" min-width="120">
            <template slot-scope="scope">
              <el-tag :type="typeOption[scope.row.bankStatus]" class="elTag">
                {{ status[scope.row.bankStatus] }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            :label="$t('cjsj')"
            min-width="180"
            show-overflow-tooltip
          />
          <el-table-column :label="$t('cz')" width="190" fixed="right">
            <template slot-scope="scope">
              <el-button
                type="info"
                class="btn"
                size="small"
                @click="toDetail(scope.row)"
              >
                {{$t('xq')}}
              </el-button>
              <el-button
                type="primary"
                class="btn"
                size="small"
                @click="showUsdtForm(scope.row)"
              >
                <i class="el-icon-plus" />
                {{$t('jmhb')}}
              </el-button>
              <el-button
                v-if="scope.row.bankStatus == 0"
                class="btn"
                type="success"
                size="small"
                @click="sh(scope.row.id, true)"
              >
                {{$t('tg')}}
              </el-button>
              <el-button
                v-if="scope.row.bankStatus == 0"
                class="btn"
                type="danger"
                size="small"
                @click="rejectKyc(scope.row)"
              >
                {{$t('bh')}}
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
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          class="elPagination"
        >
        </el-pagination>
      </div>
    </template>
    <template v-else>
      <el-form ref="form2" :inline="true">
        <el-form-item>
          <el-select
            v-model="form.kycStatus"
            :placeholder="$t('zhbdzt')"
            clearable
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
        <el-form-item>
          <el-button type="primary" @click="getInitData" class="primary">
            <i class="el-icon-search"></i>{{ $t("search") }}
          </el-button>
        </el-form-item>
      </el-form>
      <div class="content">
        <el-table
          class="tables"
          size="small"
          :data="tableData2"
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column
            prop="companyName"
            :label="$t('qymc')"
            min-width="180"
            show-overflow-tooltip
          />
          <el-table-column
            prop="businessAdd"
            :label="$t('qyjydz')"
            min-width="200"
            show-overflow-tooltip
          />
          <el-table-column
            prop="businessScenario"
            :label="$t('ywcjsm')"
            min-width="280"
            show-overflow-tooltip
          />
          <el-table-column prop="kycStatus" :label="$t('kzt')" min-width="120">
            <template slot-scope="scope">
              <el-tag :type="typeOption[scope.row.kycStatus]" class="elTag">
                {{ status[scope.row.kycStatus] }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            :label="$t('cjsj')"
            min-width="160"
            show-overflow-tooltip
          />

          <el-table-column :label="$t('cz')" width="180" fixed="right">
            <template slot-scope="scope">
              <div>
                <el-button
                  type="info"
                  class="btn"
                  size="small"
                  @click="toDetail2(scope.row)"
                >
                  {{$t('xq')}}
                </el-button>
                <el-button
                  v-if="scope.row.kycStatus == 0"
                  type="success"
                  class="btn"
                  size="small"
                  @click="sh2(scope.row.id, true)"
                >
                  {{$t('tg')}}
                </el-button>
                <el-button
                  v-if="scope.row.kycStatus == 0"
                  type="danger"
                  class="btn"
                  size="small"
                  @click="rejectKyc(scope.row)"
                >
                  {{$t('bh')}}
                </el-button>
                <el-button
                v-if="scope.row.kycStatus == 1"
                class="btn"
                type="primary"
                size="small"
                @click="showUserBalance(scope.row)"
              >
                {{$t('ye')}}
              </el-button>
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
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          class="elPagination"
        >
        </el-pagination>
      </div>
    </template>

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
      <el-form
        label-position="top"
        ref="formss"
        :model="bankForm"
        class="formStyle"
      >
        <el-form-item :label="$t('zhmc')">
          <el-input
            v-model="bankForm.accountName"
            :disabled="!!bankForm.id"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('ssgj')">
          <el-input
            v-model="bankForm.country"
            :disabled="!!bankForm.id"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('jzdz')">
          <el-input
            type="textarea"
            v-model="bankForm.accountAdd"
            :disabled="!!bankForm.id"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('bankname')">
          <el-input
            v-model="bankForm.bankName"
            :disabled="!!bankForm.id"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('swift')">
          <el-input
            v-model="bankForm.swiftCode"
            :disabled="!!bankForm.id"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('bankcode')">
          <el-input
            v-model="bankForm.bankCode"
            :disabled="!!bankForm.id"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('bankcount')">
          <el-input
            v-model="bankForm.bankAccount"
            :disabled="!!bankForm.id"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('khgj')">
          <el-input
            v-model="bankForm.bankCountry"
            :disabled="!!bankForm.id"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('khdz')">
          <el-input
            type="textarea"
            v-model="bankForm.bankAdd"
            :disabled="!!bankForm.id"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('scwj')">
          <label style="font-size: 12px">
            {{ $t("zzd") }}
          </label>
          <a
            :href="'/api/file/downLoad?url=' + bankForm.accountCer"
            target="_blank"
            class="down-a"
            >{{$t('yulan')}}</a
          >
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button class="qd" size="small" @click="dialogVisible = false">
          完成
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="$t('xq')"
      :visible.sync="dialogVisible2"
      width="636px"
      :before-close="
        () => {
          dialogVisible2 = false;
        }
      "
    >
      <el-form
        ref="formss"
        :model="bankForm2"
        class="formStyle"
        label-position="top"
      >
        <el-form-item :label="$t('qymc')">
          <el-input v-model="bankForm2.companyName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('qyjydz')">
          <el-input
            type="textarea"
            v-model="bankForm2.businessAdd"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('qylx')">
          <el-select
            v-model="bankForm2.busType"
            :disabled="true"
            class="elSelect"
          >
            <el-option
              style="padding: 0 10px"
              v-for="item in options3"
              :key="item.value"
              :label="$t(item.label)"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('qyzcszgj')">
          <el-input v-model="bankForm2.country" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('zcrq')">
          <el-date-picker
            style="width: 100%"
            size="small"
            :disabled="true"
            value-format="timestamp"
            v-model="bankForm2.regDate"
            type="date"
            :placeholder="$t('xzsj')"
          />
        </el-form-item>
        <el-form-item :label="$t('qyyxq')">
          <el-date-picker
            :disabled="true"
            style="width: 100%"
            value-format="timestamp"
            size="small"
            v-model="bankForm2.period"
            type="date"
            :placeholder="$t('xzsj')"
          />
        </el-form-item>
        <el-form-item :label="$t('ygyhkje')">
          <el-input
            v-model="bankForm2.monthlyRemittance"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('ygyjybs')">
          <el-input
            v-model="bankForm2.transactionsMonth"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('dbjyed')">
          <el-input
            v-model="bankForm2.transactionLimit"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('ywcjsm')">
          <el-input
            type="textarea"
            v-model="bankForm2.businessScenario"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('qygw')">
          <el-input v-model="bankForm2.webSite" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('bhly')" v-if="bankForm2.reason">
          <el-input
            type="textarea"
            v-model="bankForm2.reason"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('scwj')">
          <label style="font-size: 12px">
            {{ $t("t1") }}
          </label>
          <a
            :href="'/api/file/downLoad?url=' + bankForm2.regCer"
            target="_blank"
            class="down-a"
            >{{$t('yulan')}}</a
          >
        </el-form-item>
        <el-form-item :label="$t('scwj')">
          <label style="font-size: 12px">
            {{ $t("t2") }}
          </label>
          <a
            :href="'/api/file/downLoad?url=' + bankForm2.legal"
            target="_blank"
            class="down-a"
            >{{$t('yulan')}}</a
          >
        </el-form-item>
        <el-form-item :label="$t('scwj')" v-if="bankForm2.busType != 1">
          <label style="font-size: 12px">
            {{ $t("t3") }}
          </label>
          <a
            :href="'/api/file/downLoad?url=' + bankForm2.shareholder"
            target="_blank"
            class="down-a"
            >{{$t('yulan')}}</a
          >
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button class="qd" size="small" @click="dialogVisible2 = false">
          {{$t('done')}}
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="$t('jmhb')"
      :visible.sync="dialogVisible3"
      :before-close="
        () => {
          dialogVisible3 = false;
        }
      "
    >
      <el-form label-position="top">
        <el-form-item :label="$t('bz')">
          <el-select v-model="addressForm.cryCode" class="elSelect">
            <el-option
              style="padding: 0 10px"
              v-for="item in szList"
              :key="item.id"
              :label="item.name"
              :value="item.coinCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('jmxy')">
          <el-select
          class="elSelect"
          v-model="addressForm.agreement"
          :placeholder="$t('qsz')"
        >
          <el-option
            style="padding: 0 20px"
            v-for="item in agreementList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item :label="$t('qbdz')">
          <el-input v-model="addressForm.cryAdd" :placeholder="$t('qsr')"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">{{
          $t("cancel")
        }}</el-button>
        <el-button
          type="primary"
          :class="bankloading && 'loading'"
          @click="addAddress"
          >{{ $t("sure") }}</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      :title="$t('bh')"
      :visible.sync="rejectdialogVisible"
      :before-close="
        () => {
          rejectdialogVisible = false;
        }
      "
    >
      <el-form label-position="top">
        <el-form-item :label="$t('bhly')">
          <el-input
            type="textarea"
            v-model="currentSelectRow.reason"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rejectdialogVisible = false">{{
          $t("cancel")
        }}</el-button>
        <el-button
          type="primary"
          :class="bankloading && 'loading'"
          @click="rejectConfirm"
          >{{ $t("sure") }}</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      :title="$t('yhqb')"
      :visible.sync="userBalanceDialog"
      :before-close="
        () => {
          userBalanceDialog = false;
        }
      "
    >
    <div class="formStyle">
      <div class="dialog-input" v-for="item in userBalanceDetail" :key="item.coinCode">
          <el-input
            :value="item.balance"
          >
          <template slot="append">
            {{ item.coinCode }}
          </template>
        </el-input>
      </div>
      <el-empty v-if="!userBalanceDetail.length"/>
    </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="qd" @click="userBalanceDialog = false">{{
          $t("sure")
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getBankListPage,
  perBank,
  kycList,
  perKyc,
  userBalanceList,
} from "@/api/bank";
import { setCryAcc, getCryAdd } from "@/api/exchange";
import { cryptocurrencies } from "@/api/login";
import { Local, getHashParams } from "@/utils/index";
import { Message } from "element-ui";

export default {
  name: "KYCPage",
  data() {
    return {
      agreementList: [
        { label: "TRC20", value: "TRC" },
        { label: "ERC20", value: "ERC" },
      ],
      typeOption: ["warning", "success", "danger"],
      szList: [],
      dialogVisible3: false,
      dialogVisible2: false,
      bankForm2: {},
      addressForm: {},
      options2: ["", "gth", "qy", "hwgs"],
      type: "first",
      dialogVisible: false,
      tableData: [],
      tableData2: [],
      loading: false,
      bankloading: false,
      currentSelectRow: false,
      rejectdialogVisible: false,
      userBalanceDialog: false,
      options: [
        {
          label: this.$t('shz'),
          value: 0,
        },
        {
          label: this.$t('ytg'),
          value: 1,
        },
        {
          label: this.$t("bh"),
          value: 2,
        },
      ],
      status: [this.$t('shz'), this.$t('ytg'), this.$t("bh")],

      form: {
        bankStatus: "",
      },
      current: 1,
      size: 10,
      total: 0,
      bankForm: {},
      options3: [
        {
          label: "gth",
          value: 1,
        },
        {
          label: "qy",
          value: 2,
        },
        {
          label: "hwgs",
          value: 3,
        },
      ],
      dialogVisible3Loading: false,
      userBalanceDetail: [],
    };
  },
  watch: {
    type() {
      this.current = 1;
      this.form = {};
      this.getInitData();
    },
  },
  methods: {
    async showUserBalance(row) {
      try {
        this.loading = true
        const res = await userBalanceList({id: row.id})
        this.loading = false
        this.userBalanceDetail = res.data
        this.userBalanceDialog = true
      } catch {
      this.loading = false

      }

    },
    getInitData() {
      if (this.type == "first") {
        this.getlist();
      } else {
        this.getlist2();
      }
    },
    rejectKyc(row) {
      this.currentSelectRow = row;
      this.rejectdialogVisible = true;
    },
    async rejectConfirm() {
      try {
        this.bankloading = true;
        if (this.type == "first") {
          await perBank({
            id: this.currentSelectRow.id,
            pass: false,
            reason: this.currentSelectRow.reason,
          });
        } else {
          await perKyc({
            id: this.currentSelectRow.id,
            pass: false,
            reason: this.currentSelectRow.reason,
          });
        }
        Message({
          type: "success",
          message:  this.$t('czcg'),
        });
        this.getInitData();
        this.bankloading = false;
        this.rejectdialogVisible = false;
      } catch {
        this.bankloading = false;
      }
    },
    async addAddress() {
      try {
        this.dialogVisible3Loading = true;
        const res = await setCryAcc(this.addressForm);
        this.dialogVisible3Loading = false;
        if (res.code === 200) {
          Message({
            type: "success",
            message:  this.$t('czcg'),
          });
          this.dialogVisible3 = false;
        }
      } catch (error) {}
    },
    async showUsdtForm(list) {
      this.addressForm = {
        userId: list.userId,
        accountName: list.accountName,
      };
      this.dialogVisible3 = true;
      this.dialogVisible3Loading = true;
      const res = await getCryAdd({ cryCode: "USDT", userId: list.userId });
      this.dialogVisible3Loading = false;
      if (res.code === 200) {
        this.addressForm = {
          userId: list.userId,
          accountName: list.accountName,
          cryCode: res.data.cryCode,
          cryAdd: res.data.cryAdd,
          id: res.data.id,
          agreement: res.data.agreement,
        };
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
    sh2(id, type) {
      this.$confirm(type ? this.$t('qrtg') : this.$t('qrbh'), this.$t("hint"))
        .then(async (_) => {
          try {
            await perKyc({ id, pass: type, reason: "123" });
            Message({
              type: "success",
              message:  this.$t('czcg'),
            });
            this.getlist2();
          } catch (error) {}
        })
        .catch((_) => {});
    },
    sh(id, type) {
      this.$confirm(type ? this.$t('qrtg') : this.$t('qrbh'), this.$t("hint"))
        .then(async (_) => {
          try {
            await perBank({ id, pass: type });
            Message({
              type: "success",
              message:  this.$t('czcg'),
            });
            this.getlist();
          } catch (error) {}
        })
        .catch((_) => {});
    },
    toDetail(data) {
      this.dialogVisible = true;
      this.$set(this, "bankForm", data);
    },
    toDetail2(data) {
      this.dialogVisible2 = true;
      this.$set(this, "bankForm2", data);
    },
    async getlist() {
      try {
        this.loading = true;
        let req = await getBankListPage({
          ...this.form,
          current: this.current,
          size: this.size,
        });
        this.tableData = req.data.records;
        this.total = req.data.total;
        this.loading = false;
      } catch (error) {}
    },
    async getlist2() {
      try {
        this.loading = true;
        let req = await kycList({
          ...this.form,
          current: this.current,
          size: this.size,
        });
        this.tableData2 = req.data.records;
        this.total = req.data.total;
        this.loading = false;
      } catch (error) {}
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
      this.getInitData();
    },
  },
  created() {
    const params = getHashParams();
    this.type = params.get("type") || "first";
    this.getlist();
    this.getSzList();
  },
};
</script>
<style scoped lang="scss">
.user_transferAccountMangement_contianer {
  .content {
    padding: 1rem;
    border-radius: 4px;
    background: $contentColor;
  }
}
.btn {
  padding: 4px 10px;
}
.btn a {
  text-decoration: none;
  color: #fff;
}
.elSelect {
  width: 100%;
}
.dialog-input {
  margin-bottom: 12px;
}
</style>