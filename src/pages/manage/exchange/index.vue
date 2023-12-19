<template>
  <div class="user_transferAccountMangement_contianer">
    <!-- <LinkPath :linkList="linkList" /> -->
    <!-- <el-tabs v-model="type">
      <el-tab-pane :label="$t('skzh')" name="first"></el-tab-pane>
      <el-tab-pane :label="$t('hlgl')" name="second"></el-tab-pane>
    </el-tabs> -->
    <template v-if="type == 'first'">
      <div class="search-container">
        <div class="admin-title">
          {{ $store.state.title }}
          <el-button type="primary normal-btn" @click="showAdd1" class="primary"
            ><i class="el-icon-plus"></i>{{ $t("addskzh") }}</el-button
          >
        </div>
        <el-radio-group v-model="type">
          <el-radio-button label="first">{{ $t("skzh") }}</el-radio-button>
          <el-radio-button label="second">{{ $t("hlgl") }}</el-radio-button>
        </el-radio-group>
        <el-form
          v-model="form"
          :inline="true"
          label-position="top"
          class="search-form four-column"
        >
          <el-form-item :label="$t('bankname')">
            <el-input
              :placeholder="$t('bankname')"
              v-model="form.bankName"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('yhzh')">
            <el-input
              :placeholder="$t('yhzh')"
              v-model="form.bankAccount"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('kzt')">
            <el-select v-model="form.bankStatus" :placeholder="$t('zhbdzt')">
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
              @click="getlist"
              class="primary normal-btn"
            >
              <i class="el-icon-search"></i>{{ $t("search") }}
            </el-button>
            <!-- <el-button class="primary">
              <i class="el-icon-refresh"></i>{{ $t("reset") }}
            </el-button> -->
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
        >
          <el-table-column prop="coinCode" :label="$t('bz')" min-width="100" />
          <el-table-column
            prop="accountName"
            :label="$t('zhmc')"
            min-width="180"
            show-overflow-tooltip
          />
          <el-table-column
            prop="bankName"
            :label="$t('bankname')"
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
            min-width="180"
            show-overflow-tooltip
          />
          <el-table-column
            prop="createTime"
            :label="$t('cjsj')"
            min-width="180"
            show-overflow-tooltip
          />
          <el-table-column
            prop="name"
            :label="$t('cz')"
            width="70"
            fixed="right"
          >
            <template slot-scope="scope">
              <!-- <div
                class="operation-btn"
                @click="handleShowDetail(scope.row, 'detail')"
              >
                {{ $t("xq") }}
              </div> -->
              <div
                class="operation-btn edit-btn"
                @click.stop="toDetail(scope.row)"
              >
                {{ $t("xg") }}
              </div>
              <div
                class="operation-btn reject-btn"
                @click.stop="handleShowDetail(scope.row, 'del')"
              >
                {{ $t("del") }}
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
    <template v-if="type == 'second'">
      <div class="search-container">
        <div class="admin-title">
          {{ $store.state.title }}
          <el-button type="primary" @click="showAdd" class="primary normal-btn"
            ><i class="el-icon-plus"></i>{{ $t("zjhld") }}</el-button
          >
        </div>
        <el-radio-group v-model="type">
          <el-radio-button label="first">{{ $t("skzh") }}</el-radio-button>
          <el-radio-button label="second">{{ $t("hlgl") }}</el-radio-button>
        </el-radio-group>
      </div>
      <div class="content">
        <el-table
          class="tables"
          :data="tableData2"
          style="width: 100%"
          v-loading="loading"
          @row-click="(e) => handleShowDetail(e, 'detail')"
        >
          <el-table-column prop="exFrom" :label="$t('bdhbz')" min-width="100">
            <template slot-scope="scope">
              <div class="flag-warpper">
                <span
                  :class="`flag-icon flag-icon-${scope.row.fromCountry.toLocaleLowerCase()}`"
                  v-if="scope.row.exFrom != 'USDT'"
                ></span>
                <img src="@/assets/images/usdt.png" v-else class="usdt-inner" />
                {{ scope.row.exFrom }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="exRate" :label="$t('hl')" min-width="120" />
          <el-table-column prop="exTarget" :label="$t('dhbz')" min-width="100">
            <template slot-scope="scope">
              <div class="flag-warpper">
                <span
                  :class="`flag-icon flag-icon-${scope.row.targetCountry.toLocaleLowerCase()}`"
                  v-if="scope.row.exTarget != 'USDT'"
                ></span>
                <img src="@/assets/images/usdt.png" v-else class="usdt-inner" />
                {{ scope.row.exTarget }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            :label="$t('cjsj')"
            min-width="180"
          />
          <el-table-column
            prop="createTime"
            :label="$t('cz')"
            width="70"
            fixed="right"
          >
            <template slot-scope="scope">
              <!-- <div
                class="operation-btn"
                @click="handleShowDetail(scope.row, 'detail')"
              >
                {{ $t("xq") }}
              </div> -->
              <div
                class="operation-btn edit-btn"
                @click.stop="toDetail2(scope.row)"
              >
                {{ $t("xg") }}
              </div>
              <div
                class="operation-btn reject-btn"
                @click.stop="handleShowDetail(scope.row, 'del')"
              >
                {{ $t("del") }}
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
      :title="$t('xq')"
      :visible.sync="detailVisible"
      width="636px"
      :before-close="
        () => {
          detailVisible = false;
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
        <el-button class="qx" @click="detailVisible = false">{{
          $t("cancel")
        }}</el-button>
        <el-button
          v-if="operationType == 'del'"
          class="qd"
          @click="deleteRow"
          >{{ $t("del") }}</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      :title="bankForm.id ? $t('xg') : $t('add')"
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
        <el-form-item :label="$t('bz')">
          <el-select v-model="bankForm.coinCode" class="elSelect" filterable>
            <el-option
              style="padding: 0 10px"
              v-for="item in areaList"
              :key="item.value"
              :value="item.coinCode"
              :label="item.coinCode"
            >
            <div class="el-option">
              <div class="left">
                <span
                  :class="`flag-icon ${getFlagIcon(item.coinCode)}`"
                  v-if="item.coinCode != 'USDT'"
                ></span>
                <img
                  src="@/assets/images/usdt.png"
                  v-else
                  class="usdt-inner"
                />
                {{ lang == "zh" ? item.name : item.enName }}
              </div>
              <div class="right">{{ item.coinCode }}</div>
            </div>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('zhmc')">
          <el-input
            v-model="bankForm.accountName"
            :placeholder="$t('qsr')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('ssgj')">
          <!-- <el-input
            v-model="bankForm.country"
          ></el-input> -->
          <el-select v-model="bankForm.country" class="elSelect" filterable>
            <el-option
              style="padding: 0 10px"
              v-for="item in areaList"
              :key="item.value"
              :value="item.areaCode"
              :label="item.areaCode"
            >
            <div class="el-option">
              <div class="left">
                <span
                  :class="`flag-icon ${getFlagIcon(item.coinCode)}`"
                  v-if="item.coinCode != 'USDT'"
                ></span>
                <img
                  src="@/assets/images/usdt.png"
                  v-else
                  class="usdt-inner"
                />
                {{ lang == "zh" ? item.name : item.enName }}
              </div>
              <div class="right">{{ item.areaCode }}</div>
            </div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('jzdz')">
          <el-input
            v-model="bankForm.accountAdd"
            type="textarea"
            :rows="5"
            :placeholder="$t('qsr')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('bankname')">
          <el-input
            v-model="bankForm.bankName"
            :placeholder="$t('qsr')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('swift')">
          <el-input
            v-model="bankForm.swiftCode"
            :placeholder="$t('qsr')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('bankcode')">
          <el-input
            v-model="bankForm.bankCode"
            :placeholder="$t('qsr')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('bankcount')">
          <el-input
            v-model="bankForm.bankAccount"
            :placeholder="$t('qsr')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('khgj')">
          <!-- <el-input
            v-model="bankForm.bankCountry"
          ></el-input> -->
          <el-select v-model="bankForm.bankCountry" class="elSelect" filterable>
            <el-option
              style="padding: 0 10px"
              v-for="item in areaList"
              :key="item.value"
              :value="item.areaCode"
              :label="item.areaCode"
            >
            <div class="el-option">
              <div class="left">
                <span
                  :class="`flag-icon ${getFlagIcon(item.coinCode)}`"
                  v-if="item.coinCode != 'USDT'"
                ></span>
                <img
                  src="@/assets/images/usdt.png"
                  v-else
                  class="usdt-inner"
                />
                {{ lang == "zh" ? item.name : item.enName }}
              </div>
              <div class="right">{{ item.areaCode }}</div>
            </div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('khdz')">
          <el-input
            v-model="bankForm.bankAdd"
            type="textarea"
            :rows="5"
            :placeholder="$t('qsr')"
          ></el-input>
        </el-form-item>

        <el-form-item :label="$t('zl')">
          <div class="upload-item">
            <div class="item-left">
              <el-upload
                    action="/api/file/upload"
                list-type="text"
                accept=".pdf, .zip, .rar, image/*"
                :on-success="(e) => handlesuccess(e)"
              >
                <div class="load-cover">
                  <i class="el-icon-folder-add" v-if="!bankForm.accountCer"></i>
                  <i class="el-icon-folder-checked" v-else></i>
                </div>
                <div slot="tip" class="el-upload__tip">
                  {{ $t("scts") }}
                </div>
              </el-upload>
            </div>
            <div class="item-right">
              <div class="sub-title"><span>*</span>{{ $t("zzd") }}</div>
              <div class="desc">{{ $t("zmgr") }}</div>
              <a
                :href="'/api/file/downLoad?url=' + bankForm.accountCer"
                target="_blank"
                class="down"
                v-if="bankForm.accountCer"
                >{{ $t("download") }}</a
              >
            </div>
          </div>
          <!-- <el-upload
            class="upload-demo"
                action="/api/file/upload"
            list-type="text"
            accept=".pdf, .zip, .rar"
            :on-success="(e) => handlesuccess(e, 'shareholder')"
          >
            <el-button
              style="padding: 4px 20px"
              size="small"
              type="primary"
              class="btn"
              >{{ bankForm.accountCer ? $t("ysccxsc") : $t("djsc") }}</el-button
            >
            <div slot="tip" class="el-upload__tip">
              {{ $t("scts") }}
            </div>
          </el-upload>
          <a
            v-if="bankForm.accountCer"
            class="down-a"
            :href="'/api/file/downLoad?url=' + bankForm.accountCer"
            target="_blank"
            >{{ $t("yulan") }}</a
          > -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t("cancel") }}</el-button>
        <el-button
          type="primary"
          :class="bankloading && 'loading'"
          @click="sh"
          >{{ $t("sure") }}</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      :title="bankForm2.id ? $t('xg') : $t('zjhld')"
      :visible.sync="dialogVisible2"
      width="636px"
      :before-close="
        () => {
          dialogVisible2 = false;
        }
      "
    >
      <el-form label-position="top" ref="formss" :model="bankForm2">
        <el-form-item :label="$t('bdhbz')">
          <el-select
            v-model="bankForm2.exFrom"
            class="elSelect"
            @change="changeExformCoin"
            filterable
          >
            <el-option
              style="padding: 0 10px"
              v-for="item in getAllCoin()"
              :key="item.id"
              :value="item.coinCode"
              :label="item.coinCode"
            >
              <div class="el-option">
                <div class="left">
                  <span
                    :class="`flag-icon ${getFlagIcon(item.coinCode)}`"
                    v-if="item.coinCode != 'USDT'"
                  ></span>
                  <img
                    src="@/assets/images/usdt.png"
                    v-else
                    class="usdt-inner"
                  />
                  {{ lang == "zh" ? item.name : item.enName }}
                </div>
                <div class="right">{{ item.coinCode }}</div>
              </div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="mb24 duihuan">
          <!-- <i class="el-icon-sort" /> -->
          <svg-icon iconClass="rotate-solid" className="svg-icon" />
          {{ $t("duihuan") }}
        </el-form-item>
        <el-form-item :label="$t('dhbz')">
          <el-select v-model="bankForm2.exTarget" class="elSelect" filterable>
            <el-option
              style="padding: 0 10px"
              v-for="item in targetCoinList"
              :key="item.id"
              :value="item.coinCode"
              :label="item.coinCode"
            >
              <div class="el-option">
                <div class="left">
                  <span
                    :class="`flag-icon ${getFlagIcon(item.coinCode)}`"
                    v-if="item.coinCode != 'USDT'"
                  ></span>
                  <img
                    src="@/assets/images/usdt.png"
                    v-else
                    class="usdt-inner"
                  />
                  {{ lang == "zh" ? item.name : item.enName }}
                </div>
                <div class="right">{{ item.coinCode }}</div>
              </div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('hl')">
          <el-input
            v-model="bankForm2.exRate"
            type="number"
            :placeholder="$t('qsr')"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="preview"
          v-if="bankForm2.exFrom && bankForm2.exTarget && bankForm2.exRate"
        >
          {{
            `1(${bankForm2.exFrom}) = ${bankForm2.exRate}(${bankForm2.exTarget})`
          }}
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">{{
          $t("cancel")
        }}</el-button>
        <el-button
          type="primary"
          :class="bankloading && 'loading'"
          @click="sh2"
          >{{ $t("sure") }}</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getExchanges,
  setExchange,
  getDeposits,
  setDeposit,
  delDeposit,
  delExchange,
} from "@/api/exchange";
import { Message } from "element-ui";
import { upload } from "@/api/file";
import { Local } from "@/utils/index";
import { countries, cryptocurrencies } from "@/api/login";
import { getFlagIcon, getCountryName, pjDownUrl } from "@/utils/common";

export default {
  data() {
    return {
      detailVisible: false,
      detailList: [],
      operationType: "",
      currentSelectRow: {},
      getFlagIcon: getFlagIcon,
      dialogVisible2: false,
      lang: Local("lang") || "zh",
      bankloading: false,
      bankForm2: {
        exTarget: "",
        exFrom: "",
        exRate: "",
      },
      options2: ["", "gth", "qy", "hwgs"],
      type: "first",
      dialogVisible: false,
      tableData: [],
      szList: [],
      tableData2: [],
      areaList: [],
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
      loading: true,
      form: {
        // bankStatus: "",
      },
      bankForm: {},
      targetCoinList: [],
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
      size: 10,
      current: 1,
      total: 0,
    };
  },
  watch: {
    type() {
      this.current = 1;
      this.getInitData();
    },
  },
  methods: {
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
    getInitData() {
      if (this.type == "first") {
        this.getlist();
      } else {
        this.getlist2();
      }
    },
    handleShowDetail(row, type) {
      this.currentSelectRow = row;
      this.detailVisible = true;
      this.operationType = type;
      if (this.type == "first") {
        this.detailList = [
          { label: this.$t("bz"), value: row.coinCode },
          { label: this.$t("zhmc"), value: row.accountName },
          { label: this.$t("ssgj"), value: getCountryName(row.country) },
          { label: this.$t("jzdz"), value: row.accountAdd },
          { label: this.$t("yhzh"), value: row.bankAccount },
          { label: this.$t("khdz"), value: row.bankAdd },
          { label: this.$t("bankcode"), value: row.bankCode },
          { label: this.$t("khgj"), value: getCountryName(row.bankCountry) },
          { label: this.$t("swift"), value: row.swiftCode },
          { label: this.$t("cjsj"), value: row.createTime },
          { label: this.$t("xgsj"), value: row.modifiedTime },
          {
            label: this.$t("zmgr"),
            value: pjDownUrl(row.accountCer),
            type: "link",
          },
        ];
      } else {
        this.detailList = [
          { label: this.$t("bdhbz"), value: row.exFrom },
          { label: this.$t("bdhgj"), value: getCountryName(row.fromCountry) },
          { label: this.$t("dhbz"), value: row.exTarget },
          { label: this.$t("dhgj"), value: getCountryName(row.targetCountry) },
          { label: this.$t("hl"), value: row.exRate },
          { label: this.$t("cjsj"), value: row.createTime },
          { label: this.$t("xgsj"), value: row.modifiedTime },
        ];
      }
    },
    deleteRow() {
      if (this.type == "first") {
        this.del1(this.currentSelectRow.id);
      } else {
        this.del2(this.currentSelectRow.id);
      }
    },
    async del1(id) {
      try {
        await delDeposit({ id });
        Message({
          type: "success",
          message: this.$t("czcg"),
        });
        this.detailVisible = false;
        this.getlist();
      } catch (error) {}
    },
    async del2(id) {
      try {
        await delExchange({ id });
        Message({
          type: "success",
          message: this.$t("czcg"),
        });
        this.detailVisible = false;
        this.getlist2();
      } catch (error) {}
    },
    getNewareaList(list) {
      if (list.length) {
        const arr = list.filter((obj, index, self) => {
          return (
            self.findIndex((obj1) => obj1.coinCode === obj.coinCode) === index
          );
        });
        return arr;
      }
      return [];
    },
    getAllCoin() {
      if (this.areaList.length) {
        let arr = this.areaList.filter((obj, index, self) => {
          return (
            self.findIndex((obj1) => obj1.coinCode === obj.coinCode) === index
          );
        });
        arr = arr.concat(this.szList);
        return arr;
      }
      return [];
    },
    changeExformCoin() {
      // if (this.bankForm2.exFrom == "USDT") {
      //   this.targetCoinList = this.szList;
      // } else {
      //   const all = this.getNewareaList(this.areaList);
      //   this.targetCoinList = all.filter((item) => {
      //     return item.coinCode !== this.bankForm2.exFrom;
      //   });
      // }
      const all = this.getNewareaList(this.areaList);
      this.targetCoinList = all.filter((item) => {
        return item.coinCode !== this.bankForm2.exFrom;
      });
      if (this.bankForm2.exTarget) {
        this.bankForm2.exTarget = "";
      }
    },
    async getFbList() {
      try {
        let list = Local("areaList");
        if (list && list.length) {
          return (this.areaList = list);
        }
        let res = await countries();
        this.areaList = res.data;
        Local("areaList", res.data);
      } catch (error) {}
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
    showAdd() {
      this.dialogVisible2 = true;
      this.bankForm2 = {};
    },
    showAdd1() {
      this.dialogVisible = true;
      this.bankForm = {};
    },
    async handlesuccess(req) {
      try {
        if (req.code == 200) {
          this.bankForm = {
            ...this.bankForm,
            accountCer: req.data[0],
          };
          Message({
            type: "success",
            message: this.$t("sccg"),
          });
        }
      } catch (error) {}
      return false;
    },
    async sh2() {
      try {
        let fromCountry = getFlagIcon(this.bankForm2.exFrom) || "USDT";
        let targetCountry = getFlagIcon(this.bankForm2.exTarget) || "USDT";
        fromCountry = fromCountry.replace("flag-icon-", "").toLocaleUpperCase();
        targetCountry = targetCountry
          .replace("flag-icon-", "")
          .toLocaleUpperCase();
        const res = await setExchange({
          ...this.bankForm2,
          fromCountry,
          targetCountry,
        });
        this.dialogVisible2 = false;
        if (res.code === 200) {
          Message({
            type: "success",
            message: this.$t("czcg"),
          });
          this.getlist2();
        }
      } catch (error) {}
    },
    async sh() {
      try {
        await setDeposit(this.bankForm);
        Message({
          type: "success",
          message: this.$t("czcg"),
        });
        this.getlist();
        this.dialogVisible = false;
      } catch (error) {}
    },
    toDetail(data) {
      this.dialogVisible = true;
      this.$set(this, "bankForm", data);
    },
    toDetail2(data) {
      this.dialogVisible2 = true;
      this.$set(this, "bankForm2", data);
      const all = this.getNewareaList(this.areaList);
      this.targetCoinList = all.filter((item) => {
        return item.coinCode !== data.exFrom;
      });
    },
    async getlist() {
      try {
        this.loading = true;
        let req = await getDeposits({
          ...this.form,
          current: this.current,
          size: this.size,
        });
        this.loading = false;
        req.data.records.forEach((item) => {
          Object.keys(item.bank).forEach((key) => {
            if (key !== "coinCode") {
              item[key] = item.bank[key];
            }
          });
        });
        this.tableData = req.data.records;
        this.total = req.data.total;
      } catch (error) {}
    },
    async getlist2() {
      try {
        this.loading = true;
        let req = await getExchanges({
          current: this.current,
          size: this.size,
        });
        this.loading = false;
        this.tableData2 = req.data.records;
        this.total = req.data.total;
      } catch (error) {}
    },
  },
  created() {
    this.getlist();
    this.getFbList();
    this.getSzList();
  },
};
</script>
<style scoped lang="scss">
.user_transferAccountMangement_contianer {
  .content {
    padding: 1rem;
    background: $contentColor;
    border-radius: 4px;
  }
  .normal-btn {
    height: 40px;
  }
  .flag-warpper {
    display: flex;
    align-content: center;
  }
}
.duihuan {
  text-align: center;
  font-weight: bold;
  color: #fff;
  font-size: 1.5rem !important;
  .svg-icon {
    color: #fff;
  }
}
.preview {
  color: #fff;
  letter-spacing: 2px;
  text-align: center;
}
.elSelect {
  width: 100%;
}
.btn {
  padding: 4px 8px;
}
.el-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
  }
  .right {
    color: $baseColor;
    font-weight: bold;
  }
}
</style>