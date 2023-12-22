<template>
  <div class="user_transferAccountMangement_contianer">
    <!-- <LinkPath :linkList="linkList" /> -->
    <!-- <el-tabs v-model="type">
      <el-tab-pane :label="$t('bankcard')" name="first"></el-tab-pane>
      <el-tab-pane :label="$t('kycyz')" name="second"></el-tab-pane>
    </el-tabs> -->
    <template v-if="type == 'first'">
      <div class="search-container">
        <div class="admin-title">{{ $store.state.title }}</div>
        <el-radio-group v-model="type">
          <el-radio-button label="first">{{ $t("bankcard") }}</el-radio-button>
          <el-radio-button label="second">{{ $t("kycyz") }}</el-radio-button>
        </el-radio-group>
        <el-form
          v-model="searchForm"
          :inline="true"
          label-position="top"
          class="search-form four-column"
        >
          <el-form-item :label="$t('bankname')">
            <el-input
              :placeholder="$t('bankname')"
              v-model="form.bankName"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('yhzh')">
            <el-input
              :placeholder="$t('yhzh')"
              v-model="form.bankAccount"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('kzt')">
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
            <label class="el-form-item__label"></label>
            <el-button
              type="primary"
              @click="handleChangeSearch"
              class="primary normal-btn"
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
          @row-click="(e) => passBankDialog(e, 'detail')"
        >
          <el-table-column
            prop="accountName"
            :label="$t('zhmc')"
            min-width="180"
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
            prop="bankAccount"
            :label="$t('yhzh')"
            min-width="200"
            show-overflow-tooltip
          />
          <el-table-column
            prop="accountAdd"
            :label="$t('jzdz')"
            min-width="250"
            show-overflow-tooltip
          />
          <el-table-column
            prop="createTime"
            :label="$t('cjsj')"
            min-width="160"
            show-overflow-tooltip
          />
          <el-table-column :label="$t('cz')" width="70" fixed="right">
            <template slot-scope="scope">
              <!-- <div
                class="operation-btn"
                @click="passBankDialog(scope.row, 'detail')"
              >
                {{ $t("xq") }}
              </div> -->
              <div
                v-if="scope.row.bankStatus == 0"
                class="operation-btn pass-btn"
                @click.stop="passBankDialog(scope.row, 'pass')"
              >
                {{ $t("tg") }}
              </div>
              <div
                v-if="scope.row.bankStatus == 0"
                class="operation-btn reject-btn"
                @click.stop="rejectKyc(scope.row)"
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
    </template>
    <template v-else>
      <div class="search-container">
        <div class="admin-title">{{ $store.state.title }}</div>
        <el-radio-group v-model="type">
          <el-radio-button label="first">{{ $t("bankcard") }}</el-radio-button>
          <el-radio-button label="second">{{ $t("kycyz") }}</el-radio-button>
        </el-radio-group>
        <el-form
          v-model="searchForm"
          :inline="true"
          label-position="top"
          class="search-form two-column"
        >
          <el-form-item :label="$t('kzt')">
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
            <label class="el-form-item__label"></label>
            <el-button
              type="primary"
              @click="handleChangeSearch"
              class="primary normal-btn"
            >
              <i class="el-icon-search"></i>{{ $t("search") }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="content">
        <el-table
          class="tables"
          :data="tableData2"
          style="width: 100%"
          v-loading="loading"
          @row-click="(e) => passKycDialog(e, 'detail')"

        >
          <el-table-column
            prop="companyName"
            :label="$t('qymc')"
            min-width="180"
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

          <el-table-column
            prop="createTime"
            :label="$t('cjsj')"
            min-width="160"
            show-overflow-tooltip
          />

          <el-table-column :label="$t('cz')" width="90" fixed="right">
            <template slot-scope="scope">
              <div>
                <!-- <div
                  class="operation-btn"
                  @click="passKycDialog(scope.row, 'detail')"
                >
                  {{ $t("xq") }}
                </div> -->
                <div
                  v-if="scope.row.kycStatus == 0"
                  class="operation-btn pass-btn"
                  @click.stop="passKycDialog(scope.row, 'pass')"
                >
                  {{ $t("tg") }}
                </div>
                <div
                  v-if="scope.row.kycStatus == 0"
                  class="operation-btn reject-btn"
                  @click.stop="rejectKyc(scope.row)"
                >
                  {{ $t("bh") }}
                </div>
                <div
                  class="operation-btn edit-btn"
                  @click.stop="showUsdtForm(scope.row)"
                  v-if="scope.row.kycStatus == 1"
                >
                  {{ $t("jmhb") }}
                </div>
                <div
                  v-if="scope.row.kycStatus == 1"
                  class="operation-btn"
                  @click.stop="showUserBalance(scope.row)"
                >
                  {{ $t("qb") }}
                </div>
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
    </template>

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
          <div class="list-right" v-if="item.type == 'link'">
            <a :href="item.value" target="_blank">
              <span>
                <i class="el-icon-folder-checked"></i>
                {{ $t("download") }}
              </span>
            </a>
          </div>
          <div class="list-right" v-else>
            {{ item.value }}
          </div>
        </div>
      </div>
      <!-- <el-form
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
          <el-select
            v-model="bankForm.country"
            style="width: 100%"
            :disabled="!!bankForm.id"
          >
            <el-option
              style="padding: 0 10px"
              v-for="item in areaList"
              :key="item.id"
              :label="lang == 'zh' ? item.name : item.enName"
              :value="item.areaCode"
            >
            </el-option>
          </el-select>
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
          <el-select
            v-model="bankForm.bankCountry"
            style="width: 100%"
            :disabled="!!bankForm.id"
          >
            <el-option
              style="padding: 0 10px"
              v-for="item in areaList"
              :key="item.id"
              :label="lang == 'zh' ? item.name : item.enName"
              :value="item.areaCode"
            >
            </el-option>
          </el-select>
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
            >{{ $t("yulan") }}</a
          >
        </el-form-item>
      </el-form> -->
      <div slot="footer">
        <el-button class="qx" size="small" @click="dialogVisible = false">
          {{ $t("cancel") }}
        </el-button>
        <el-button
          v-if="operationType == 'pass'"
          class="qd"
          size="small"
          @click="sh(bankForm.id, true)"
        >
          {{ $t("tg") }}
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
      <div class="formStyle">
        <div
          class="list"
          v-for="(item, index) in detailList.filter((item) => {
            return item.value;
          })"
          :key="index"
        >
          <div class="list-left">{{ item.label }}</div>
          <div class="list-right" v-if="item.type == 'link'">
            <a :href="item.value" target="_blank">
              <span>
                <i class="el-icon-folder-checked"></i>
                {{ $t("download") }}
              </span>
            </a>
          </div>
          <div class="list-right" v-else>
            {{ item.value }}
          </div>
        </div>
      </div>
      <!-- <el-form
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
            :rows="5"
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
            >{{ $t("yulan") }}</a
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
            >{{ $t("yulan") }}</a
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
            >{{ $t("yulan") }}</a
          >
        </el-form-item>
      </el-form> -->
      <div slot="footer">
        <el-button class="qx" size="small" @click="dialogVisible2 = false">
          {{ $t("cancel") }}
        </el-button>
        <el-button
          v-if="operationType == 'pass'"
          class="qd"
          size="small"
          @click="sh2(bankForm2.id, true)"
        >
          {{ $t("tg") }}
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="$t('jmhb')"
      :visible.sync="dialogVisible3"
      width="636px"
      :before-close="
        () => {
          dialogVisible3 = false;
        }
      "
    >
      <el-form label-position="top" :class="dialogVisible3Loading && 'loading'">
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
        <el-form-item :label="$t('ERC20钱包地址')">
          <el-input
            v-model="addressForm.ercAdd"
            :placeholder="$t('qsr')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('TRC20钱包地址')">
          <el-input
            v-model="addressForm.trcAdd"
            :placeholder="$t('qsr')"
          ></el-input>
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
      width="636px"
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
            :rows="8"
            :placeholder="$t('qsr')"
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
      width="636px"
      :before-close="
        () => {
          userBalanceDialog = false;
        }
      "
    >
      <div class="formStyle">
        <div
          class="list-wrapper"
          v-for="(item, index) in userBalanceDetail"
          :key="index"
        >
          <div class="list">
            <div class="list-left">
              <flagIconVue :code="userBalanceDetail[index].coinCode"/>
              {{ userBalanceDetail[index].coinCode }}
            </div>
            <div class="list-right">
              {{ userBalanceDetail[index].balance }}
            </div>
          </div>
          <div class="list">
            <div class="list-left">{{ $t("cjsj") }}</div>
            <div class="list-right">
              {{ userBalanceDetail[index].createTime }}
            </div>
          </div>
          <div class="list">
            <div class="list-left">{{ $t("xgsj") }}</div>
            <div class="list-right">
              {{ userBalanceDetail[index].modifiedTime }}
            </div>
          </div>
        </div>

        <el-empty v-if="!userBalanceDetail.length" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="qx" @click="userBalanceDialog = false">{{
          $t("cancel")
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
import { cryptocurrencies, countries } from "@/api/login";
import { Local, getHashParams } from "@/utils/index";
import { Message } from "element-ui";
import { getCountryName, pjDownUrl } from "@/utils/common";
import flagIconVue from "@/components/common/flagicon.vue";

export default {
  name: "KYCPage",
  components: {
    flagIconVue
  },
  data() {
    return {
      searchForm: {},
      agreementList: [
        { label: "TRC20", value: "TRC20" },
        { label: "ERC20", value: "ERC20" },
      ],
      lang: this.$i18n.locale,
      areaList: [],
      typeOption: ["warning", "success", "danger"],
      szList: [],
      dialogVisible3: false,
      dialogVisible2: false,
      bankForm2: {},
      addressForm: {},
      options2: ["", this.$t("gth"), this.$t("qy"), this.$t("hwgs")],
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
          label: this.$t("shz"),
          value: 0,
        },
        {
          label: this.$t("ytg"),
          value: 1,
        },
        {
          label: this.$t("bh"),
          value: 2,
        },
      ],
      status: [this.$t("shz"), this.$t("ytg"), this.$t("bh")],

      form: {
        bankStatus: "",
      },
      current: 1,
      size: 10,
      total: 0,
      bankForm: {},
      options3: [
        {
          label: this.$t("gth"),
          value: 1,
        },
        {
          label: this.$t("qy"),
          value: 2,
        },
        {
          label: this.$t("hwgs"),
          value: 3,
        },
      ],
      dialogVisible3Loading: false,
      userBalanceDetail: [],
      operationType: "",
      detailList: [],
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
    handleChangeSearch() {
      this.current = 1;
      this.getInitData();
    },
    async getAreaCode() {
      try {
        let list = Local("areaList");
        if (list && list.length) {
          this.areaList = list;
          return;
        }
        let res = await countries();
        this.areaList = res.data;
        Local("areaList", res.data);
      } catch (error) {}
    },
    async showUserBalance(row) {
      try {
        this.loading = true;
        const res = await userBalanceList({ id: row.userId });
        this.loading = false;
        this.userBalanceDetail = res.data;
        this.userBalanceDialog = true;
      } catch {
        this.loading = false;
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
          message: this.$t("czcg"),
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
            message: this.$t("czcg"),
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
        if (res.data.length) {
          this.addressForm = {
            userId: list.userId,
            accountName: list.accountName,
            cryCode: res.data[0].cryCode,
          };
          res.data.forEach((item) => {
            if (item.agreement == "TRC20") {
              this.addressForm = {
                ...this.addressForm,
                trcAdd: item.cryAdd,
              };
            }
            if (item.agreement == "ERC20") {
              this.addressForm = {
                ...this.addressForm,
                ercAdd: item.cryAdd,
              };
            }
          });
        }
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
    async sh2(id, type) {
      try {
        await perKyc({ id, pass: type });
        this.dialogVisible2 = false;
        Message({
          type: "success",
          message: this.$t("czcg"),
        });
        this.getInitData();
      } catch (error) {}
    },
    async sh(id, type) {
      try {
        await perBank({ id, pass: type });
        this.dialogVisible = false;
        Message({
          type: "success",
          message: this.$t("czcg"),
        });
        this.getInitData();
      } catch (error) {}
    },
    passBankDialog(data, type) {
      this.dialogVisible = true;
      this.$set(this, "bankForm", data);
      this.operationType = type;
      this.detailList = [
        { label: this.$t("zhmc"), value: data.accountName },
        { label: this.$t("yhzh"), value: data.bankCode },
        { label: this.$t("bankname"), value: data.bankName },
        { label: this.$t("khgj"), value: getCountryName(data.bankCountry) },
        { label: this.$t("khdz"), value: data.bankAdd },
        { label: this.$t("jzdz"), value: data.accountAdd },
        { label: this.$t("ssgj"), value: getCountryName(data.country) },
        { label: this.$t("kzt"), value: this.status[data.bankStatus] },
        { label: this.$t("bhly"), value: data.reason },
        { label: this.$t("swiftCode"), value: data.swiftCode },

        { label: this.$t("cjsj"), value: data.createTime },
        { label: this.$t("xgsj"), value: data.modifiedTime },
        {
          label: this.$t("zmgr"),
          value: pjDownUrl(data.accountCer),
          type: "link",
        },
      ];
    },
    passKycDialog(data, type) {
      this.dialogVisible2 = true;
      this.$set(this, "bankForm2", data);
      this.operationType = type;
      try {
        this.detailList = [
        { label: this.$t("qymc"), value: data.companyName },
        { label: this.$t("qyjydz"), value: data.businessAdd },
        { label: this.$t("qylx"), value: this.options2[data.busType] },
        { label: this.$t("ywcjsm"), value: data.businessScenario },
        { label: this.$t("ssgj"), value: getCountryName(data.country) },
        { label: this.$t("kzt"), value: this.status[data.kycStatus] },
        { label: this.$t("zcrq"), value: data.regDate },
        { label: this.$t("qyyxq"), value: data.period },
        { label: this.$t("qygw"), value: data.webSite },
        { label: this.$t("dbjyed"), value: data.transactionLimit },
        { label: this.$t("ygyjybs"), value: data.transactionsMonth },
        { label: this.$t("bhly"), value: data.reason },
        { label: this.$t("cjsj"), value: data.createTime },
        { label: this.$t("xgsj"), value: data.modifiedTime },
        {
          label: this.$t("qycl"),
          value: pjDownUrl(data.regCer),
          type: "link",
        },
        {
          label: this.$t("frcl"),
          value: pjDownUrl(data.legal),
          type: "link",
        },
        {
          label: this.$t("gqcl"),
          value: pjDownUrl(data.shareholder),
          type: "link",
        },
      ];
      } catch (error) {
        console.error(error)
      }
   
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
  },
  created() {
    const params = getHashParams();
    this.type = params.get("type") || "first";
    this.getlist();
    this.getSzList();
    this.getAreaCode();
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