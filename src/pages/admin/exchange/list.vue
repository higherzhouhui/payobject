<template>
  <div class="user_transferAccountMangement_contianer">
    <div class="search-container">
      <div class="admin-title">
        <span>{{ $store.state.title }}</span>
        <el-button type="primary" @click="showAdd" class="normal-btn"
          ><i class="el-icon-plus"></i>{{ $t("zjzzzh") }}</el-button
        >
      </div>
      <el-form
        v-model="searchForm"
        :inline="true"
        label-position="top"
        class="search-form four-column"
      >
        <el-form-item>
          <el-input
            :placeholder="$t('bankname')"
            v-model="searchForm.bankName"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            :placeholder="$t('yhzh')"
            v-model="searchForm.bankAccount"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="searchForm.bankStatus"
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
          <el-button type="primary" @click="getlist" class="normal-btn primary">
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
          min-width="165"
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
            <div class="operation-btn edit-btn" @click.stop="toDetail(scope.row)">
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
    <el-dialog
      :title="bankForm.id ? `${$t('xq')}` : $t('zjzzzh')"
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
          <el-input v-model="bankForm.accountName" :placeholder="$t('qsr')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('ssgj')">
          <el-select
            style="width: 100%"
            v-model="bankForm.country"
            filterable
          >
            <el-option
              style="padding: 0 10px"
              v-for="item in areaList"
              :key="item.id"
              :value="item.areaCode"
              :label="lang == 'zh' ? item.name : item.enName"
            >
              <span :class="`flag-icon ${getFlagIcon(item.coinCode)}`"></span>
              {{ lang == "zh" ? item.name : item.enName }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('jzdz')">
          <el-input
            v-model="bankForm.accountAdd"
            type="textarea"
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
          <el-select
            style="width: 100%"
            v-model="bankForm.bankCountry"
            filterable
          >
            <el-option
              style="padding: 0 10px"
              v-for="item in areaList"
              :key="item.id"
              :value="item.areaCode"
              :label="lang == 'zh' ? item.name : item.enName"
            >
              <span :class="`flag-icon ${getFlagIcon(item.coinCode)}`"></span>
              {{ lang == "zh" ? item.name : item.enName }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('khdz')">
          <el-input
            v-model="bankForm.bankAdd"
            type="textarea"
            :placeholder="$t('qsr')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('bhly')" v-if="bankForm.bankStatus == 2">
          <el-input
            v-model="bankForm.reason"
            type="textarea"
            :rows="8"
            :placeholder="$t('qsr')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('zl')">
          <div class="upload-item">
            <div class="item-left">
              <el-upload
                action="null"
                list-type="text"
                accept=".pdf, .zip, .rar, image/*"
                :before-upload="(e) => handlesuccess(e)"
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
              <div class="sub-title"><span>*</span>{{ $t("zmgr") }}</div>
              <div class="desc">{{ $t("zzd") }}</div>
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
            action="null"
            list-type="text"
            accept=".pdf, .zip, .rar"
            :before-upload="(e) => handlesuccess(e, 'shareholder')"
            multiple
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
        <passwordVue
          @changeData="componentDataChange"
        />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t("cancel") }}</el-button>
        <el-button
          class="qd"
          :class="bankloading && 'loading'"
          @click="addBank"
          >{{ $t("sure") }}</el-button
        >
      </div>
    </el-dialog>
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
        <div class="list-left">
          {{ item.label }}
        </div>
        <div class="list-right" v-if="item.type == 'link'">
          <a :href="item.value" target="_blank">
            <span>
              <i class="el-icon-folder-checked"></i>
              {{$t('download')}}
            </span>
          </a>
        </div>
        <div class="list-right" v-else>
            {{ item.value }}
        </div>
        </div>
        <el-form v-if="operationType == 'del'">
          <passwordVue
          @changeData="componentDataChangedel"
        />
        </el-form>
      </div>
      <div slot="footer">
        <el-button class="qx" @click="detailVisible = false">{{
          $t("cancel")
        }}</el-button>
        <el-button
          v-if="operationType == 'del'"
          class="qd"
          @click="delBank(currentSelectRow)"
          >{{ $t("del") }}</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getBankListPage, subBank, bankDel } from "@/api/bank";
import { countries } from "@/api/login";
import { Message } from "element-ui";
import { upload } from "@/api/file";
import { getHashParams, Local } from "@/utils/index";
import { getCountryName, getFlagIcon, pjDownUrl } from "@/utils/common";
import passwordVue from "@/components/common/password.vue"

export default {
  name: "exchangeList",
  components: {passwordVue},
  data() {
    return {
      detailVisible: false,
      detailList: [],
      operationType: "",
      currentSelectRow: {},
      getFlagIcon: getFlagIcon,
      lang: Local("lang") || "zh",
      dialogVisible: false,
      bankloading: false,
      loading: true,
      current: 1,
      size: 10,
      total: 0,
      tableData: [],
      status: [this.$t("shz"), this.$t("ytg"), this.$t("bh")],
      typeOption: ["warning", "success", "danger"],
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
      type: "1",
      linkList: ["zzgl", "zzzhgl"],
      form: {
        bankStatus: "",
        email: "",
        swiftCode: "",
        bankName: "",
        bankAccount: "",
      },
      searchForm: {},
      default: {
        accountName: "",
        country: "",
        accountAdd: "",
        bankName: "",
        swiftCode: "",
        bankCode: "",
        bankAccount: "",
        bankCountry: "",
        bankAdd: "",
        accountCer: null,
      },
      bankForm: {
        accountName: "",
        country: "",
        accountAdd: "",
        bankName: "",
        swiftCode: "",
        bankCode: "",
        bankAccount: "",
        bankCountry: "",
        bankAdd: "",
        accountCer: null,
      },
      areaList: [],
    };
  },
  created() {
    this.getlist();
    this.getAreaCode();
    const params = getHashParams();
    if (params.get("type") == "add") {
      this.showAdd();
    }
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
    handleShowDetail(row, type) {
      this.currentSelectRow = row;
      this.detailVisible = true;
      this.operationType = type;
      this.detailList = [
        { label: this.$t("zhmc"), value: row.accountName },
        { label: this.$t("jzdz"), value: row.accountAdd },
        { label: this.$t("ssgj"), value: getCountryName(row.country) },
        { label: this.$t("bankname"), value: row.bankName },
        { label: this.$t("yhzh"), value: row.bankAccount },
        { label: this.$t("khdz"), value: row.bankAdd },
        { label: this.$t("bankcode"), value: row.bankCode },
        { label: this.$t("khgj"), value: getCountryName(row.bankCountry) },
        { label: this.$t("swift"), value: row.swiftCode },
        { label: this.$t("kzt"), value: this.status[row.bankStatus] },
        { label: this.$t("bhly"), value: row.reason },
        { label: this.$t("cjsj"), value: row.createTime },
        { label: this.$t("xgsj"), value: row.modifiedTime },
        {
          label: this.$t("zmgr"),
          value: pjDownUrl(row.accountCer),
          type: "link",
        },
      ];
    },
    async getAreaCode() {
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
    toDetail(data) {
      this.dialogVisible = true;
      this.$set(this, "bankForm", data);
      //   this.bankForm = dat ;
    },
    showAdd() {
      this.dialogVisible = true;
      this.bankForm = {};
    },
    handleClick() {},
    async handlesuccess(e) {
      const formData = new FormData();
      formData.append("file", e);
      try {
        let req = await upload(formData);
        this.bankForm = {
          ...this.bankForm,
          accountCer: req.data[0],
        };
        Message({
          type: "success",
          message: this.$t("czcg"),
        });
      } catch (error) {}
      return false;
    },
    async delBank(data) {
      try {
        const delParams = {
          id: data.id,
          payPass: data.payPass,
          verCode: data.verCode
        }
        await bankDel(delParams);
        Message({
          type: "success",
          message: this.$t("czcg"),
        });
        this.detailVisible = false
        this.getlist();
      } catch (error) {}
    },
    componentDataChangedel(params) {
      this.currentSelectRow = {
        ...this.currentSelectRow,
        ...params
      }
    },
    componentDataChange(params) {
      this.bankForm = {
        ...this.bankForm,
        ...params
      }
    },
    async addBank() {
      if (this.bankloading) return;
      try {
        this.bankloading = true;
        if (this.bankForm.id) {
          this.bankForm.bankStatus = 0;
        }
        await subBank(this.bankForm);
        Message({
          type: "success",
          message: this.$t("czcg"),
        });
        this.getlist();
        this.dialogVisible = false;
        this.bankloading = false;
      } catch (error) {
        this.bankloading = false;
      }
    },
    async getlist() {
      try {
        this.loading = true;
        let req = await getBankListPage(this.searchForm);
        this.tableData = req.data.records;
        this.total = req.data.total;
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
  },
};
</script>
<style scoped lang="scss">
.user_transferAccountMangement_contianer {
  .content {
    padding: 1rem;
    border-radius: 4px;
    background: $contentColor;
    .form {
      margin-top: 40px;
    }
    .normal-btn {
      height: 40px;
      i {
        margin-right: 4px;
      }
    }
  }
}

.deleteColor {
  color: red;
}

.btn {
  padding: 4px 10px;
}
</style>
