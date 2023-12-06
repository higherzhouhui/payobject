<template>
  <div class="user_transactionInquiry_transactionDetails_contianer">
    <div class="search-container">
      <div class="admin-title">{{ $store.state.title }}</div>
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
        <el-form-item :label="$t('bz')">
          <el-select
            v-model="searchForm.coinCode"
            :placeholder="$t('qszyhbzl')"
            clearable
          >
            <el-option
              style="padding: 0 20px"
              v-for="(item, index) in coinCodeList"
              :key="index"
              :label="item.coinCode"
              :value="item.coinCode"
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
      <el-table class="tables" :data="tableData" v-loading="loading" @row-click="(e) => handleShowDetail(e, 'detail')">
        <el-table-column prop="coinCode" :label="$t('bz')" min-width="100" />
        <el-table-column prop="billValue" :label="$t('je')" min-width="100" />
        <el-table-column prop="balance" :label="$t('ye')" min-width="100" />
        <el-table-column prop="billType" :label="$t('lx')" min-width="100">
          <template slot-scope="scope">
            <el-tag class="elTag" :type="typeStyle[scope.row.billType]">
              {{ typeOption[scope.row.billType] }}
            </el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="commission" :label="$t('sxfei')" min-width="100">
          <template slot-scope="scope">
            {{ scope.row.commission || 0 }}
          </template>
        </el-table-column> -->
        <el-table-column
          prop="createTime"
          :label="$t('cjsj')"
          min-width="180"
          show-overflow-tooltip
        />
        <el-table-column
          prop="modifiedTime"
          :label="$t('xgsj')"
          min-width="180"
          show-overflow-tooltip
        />
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
          v-for="(item, index) in detailList"
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
import { getBillDetails } from "@/api/manage";
import { depCoins } from "@/api/out";
export default {
  name: "transactionInquiry",
  data() {
    return {
      detailVisible: false,
      detailList: [],
      operationType: [],
      tableData: [],
      options: [],
      type: "1",
      dialogVisible2: false,
      form: {
        name: "",
      },
      typeOption: [
        "",
        this.$t("ruzhang"),
        this.$t("chuzhang"),
        this.$t("duihuan"),
        this.$t("duihuandrz"),
      ],
      typeStyle: ["", "success", "danger", "info", "warning"],
      loading: true,
      current: 1,
      size: 10,
      total: 0,
      searchForm: {},
      coinCodeList: [],
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
    this.getInitData();
    this.getCoinCodeList();
  },
  methods: {
    handleShowDetail(row, type) {
      this.detailVisible = true;
      this.operationType = type;
      this.detailList = [
        { label: this.$t("bz"), value: row.coinCode },
        { label: this.$t("je"), value: row.billValue },
        { label: this.$t("ye"), value: row.balance || 0},
        { label: this.$t("lx"), value: this.typeOption[row.billType] },
        { label: this.$t("cjsj"), value: row.createTime },
        { label: this.$t("xgsj"), value: row.modifiedTime },
      ];
    },
    async getCoinCodeList() {
      try {
        const res = await depCoins();
        this.coinCodeList = res.data;
      } catch {}
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
    async getInitData() {
      this.loading = true;
      let res;
      const param = {
        ...this.searchForm,
        current: this.current,
        size: this.size,
      };
      res = await getBillDetails(param);
      this.loading = false;
      if (res.code === 200) {
        this.tableData = res.data.records;
        this.total = res.data.total;
      }
    },
  },
};
</script>
<style scoped lang="scss">
.user_transactionInquiry_transactionDetails_contianer {
  .content {
    padding: 1rem;
    border-radius: 4px;
    background: $contentColor;

    .form {
      margin-top: 40px;
    }
    .normal-btn {
      height: 40px;
    }
  }
}
.btn {
  padding: 4px 6px;
  color: #fff;
}
</style>
