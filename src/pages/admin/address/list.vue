<template>
  <div class="user_transferAccountMangement_contianer">
    <div class="search-container">
      <div class="admin-title">
        <span>{{ $t($store.state.title) }}</span>
        <el-button type="primary" @click="showAdd" class="normal-btn"
          ><i class="el-icon-plus"></i>{{ $t("xzdd") }}</el-button
        >
      </div>
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
          prop="cryName"
          :label="$t('bieming')"
          min-width="80"
          show-overflow-tooltip
        />
        <el-table-column
          prop="cryCode"
          :label="$t('bz')"
          min-width="80"
          show-overflow-tooltip
        />
        <el-table-column
          prop="cryAdd"
          :label="$t('qbdz')"
          min-width="120"
          show-overflow-tooltip
        />
        <el-table-column
          prop="agreement"
          :label="$t('jmxy')"
          min-width="200"
          show-overflow-tooltip
        />
        <el-table-column
          prop="createTime"
          :label="$t('cjsj')"
          min-width="165"
          show-overflow-tooltip
        />
        <el-table-column
        prop="modifiedTime"
        :label="$t('xgsj')"
        min-width="165"
        show-overflow-tooltip
      />
        <el-table-column
          prop="name"
          :label="$t('cz')"
          :width="lang == 'zh' ? '60' : '90'"
          fixed="right"
        >
          <template slot-scope="scope">
            <div
              class="operation-btn edit-btn"
              @click.stop="toDetail(scope.row, 'update')"
            >
              {{ $t("xg") }}
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
      :title="showObj.title"
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
        :model="form"
        class="formStyle"
      >
        <el-form-item :label="$t('bieming')">
          <el-input
            v-model="form.cryName"
            :placeholder="$t('qsrbieming')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('bz')">
          <el-select style="width: 100%" v-model="form.cryCode">
            <el-option
              style="padding: 0 10px"
              v-for="item in szList"
              :key="item.label"
              :label="item.name"
              :value="item.coinCode"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('jmxy')">
          <el-select style="width: 100%" v-model="form.agreement">
            <el-option
              style="padding: 0 10px"
              v-for="item in agreementList"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('qbdz')">
          <el-input
            v-model="form.cryAdd"
            :placeholder="$t('qsrqbdz')"
          ></el-input>
        </el-form-item>
        <passwordVue
          @changeData="componentDataChange"
          v-if="showObj.title != $t('xq')"
        />
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t("cancel") }}</el-button>
        <el-button
          class="qd"
          :class="bankloading && 'loading'"
          @click="addAddress"
          >{{ showObj.btn }}</el-button
        >
      </span>
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
        <div class="list-left list-link" v-if="item.type == 'link'">
          <a :href="item.value" target="_blank">
            {{ item.label }}
            <span>
              <i class="el-icon-folder-checked"></i>
              {{ $t("download") }}
            </span>
          </a>
        </div>
        <div class="list-left" v-else>
          {{ item.label }}
        </div>
        <div class="list-right" v-if="!item.type">
          {{ item.value }}
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
        @click="delBank(currentSelectRow.id)"
        >{{ $t("del") }}</el-button
      >
    </div>
  </el-dialog>
  </div>
</template>
<script>
import { outCryAccPage, setOutCryAcc, bankDel } from "@/api/bank";
import { countries, cryptocurrencies } from "@/api/login";
import { Message } from "element-ui";
import { upload } from "@/api/file";
import { getHashParams, Local } from "@/utils/index";
import passwordVue from "@/components/common/password.vue";

export default {
  name: "addressList",
  components: {
    passwordVue,
  },
  data() {
    return {
      lang: this.$i18n.locale,
      agreementList: [
        { label: "TRC20", value: "TRC20" },
        { label: "ERC20", value: "ERC20" },
      ],
      showObj: {
        title: this.$t("add"),
        btn: this.$t("sure"),
      },
      languge: Local("lang") || "zh",
      dialogVisible: false,
      bankloading: false,
      loading: true,
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
      areaList: [],
      current: 1,
      size: 10,
      total: 0,
      detailVisible: false,
      detailList: [],
      operationType: '',
      szList: [],
    };
  },
  created() {
    this.getInitData();
    this.getSzList()
    // this.getAreaCode();
    const params = getHashParams();
    if (params.get("type") == "add") {
      this.showAdd();
    }
  },
  methods: {
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
    handleShowDetail(row, type) {
      this.detailVisible = true;
      this.operationType = type;
      this.detailList = [
        { label: this.$t("bieming"), value: row.cryName },
        { label: this.$t("bz"), value: row.cryCode },
        { label: this.$t("qbdz"), value: row.cryAdd },
        { label: this.$t("jmxy"), value: row.agreement},
        { label: this.$t("cjsj"), value: row.createTime },
        { label: this.$t("xgsj"), value: row.modifiedTime },
      ];
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
    componentDataChange(params) {
      this.form = { ...this.form, ...params };
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
    toDetail(data, type) {
      this.dialogVisible = true;
      if (type == "detail") {
        this.showObj = {
          title: this.$t("xq"),
          btn: this.$t("sure"),
        };
      } else {
        this.showObj = {
          title: this.$t("xg"),
          btn: this.$t("sure"),
        };
      }

      this.$set(this, "form", data);
    },
    showAdd() {
      this.dialogVisible = true;
      this.form = {};
      this.showObj = {
        title: this.$t("add"),
        btn: this.$t("sure"),
      };
    },
    async handlesuccess(e) {
      //   this.$refs["form"].resetFields();
      const formData = new FormData();
      formData.append("file", e);
      try {
        let req = await upload(formData);
        this.form.accountCer = req.data[0];
        Message({
          type: "success",
          message: this.$t("czcg"),
        });
      } catch (error) {}
      return false;
    },
    delBank(id) {
      this.$confirm(this.$t("qrsc"), this.$t("hint"))
        .then(async (_) => {
          try {
            await bankDel({ bankId: id });
            Message({
              type: "success",
              message: this.$t("czcg"),
            });
            this.getInitData();
          } catch (error) {}
        })
        .catch((_) => {});
    },
    async addAddress() {
      if (this.bankloading) return;
      try {
        this.bankloading = true;
        await setOutCryAcc({
          ...this.form,
          userId: this.$store.state.userInfo.id,
        });
        Message({
          type: "success",
          message: this.$t("czcg"),
        });
        this.getInitData();
        this.dialogVisible = false;
        this.bankloading = false;
      } catch (error) {
        this.bankloading = false;
      }
    },
    async getInitData() {
      const searchParam = {
        current: this.current,
        size: this.size,
      };
      try {
        this.loading = true;
        let req = await outCryAccPage(searchParam);
        this.tableData = req.data.records;
        this.loading = false;
        this.total = req.data.total;
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
