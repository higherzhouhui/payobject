<template>
  <div class="record-container">
    <LinkPath :linkList="linkList" v-if="!$store.state.userInfo.admin" />
    <div class="content">
      <el-form ref="form2" :inline="true" class="mt12">
        <el-form-item>
          <el-select
            v-model="searchForm.bizType"
            :placeholder="$t('qxzywlx')"
            clearable
          >
            <el-option
              style="padding: 0 20px"
              v-for="(item, index) in bizTypeList"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="searchForm.coinCode"
            :placeholder="$t('qxzhbzl')"
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
          <el-date-picker
            v-model="searchForm.startTime"
            align="right"
            type="datetime"
            :placeholder="$t('kssj')"
            value-format="timestamp"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="searchForm.endTime"
            align="right"
            type="datetime"
            :placeholder="$t('jssj')"
            value-format="timestamp"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleChangeSearch"
            class="normal-btn"
          >
            <i class="el-icon-search"></i>{{ $t("search") }}
          </el-button>
        </el-form-item>
      </el-form>
      <el-table
        class="tables"
        size="small"
        :data="tableData"
        v-loading="loading"
      >
        <el-table-column
          prop="depCoin"
          :label="$t('bz')"
          min-width="100"
          show-overflow-tooltip
        />
        <el-table-column
          prop="targetCoin"
          :label="$t('dhbz')"
          min-width="100"
        />
        <el-table-column
          prop="changeRate"
          :label="$t('hl')"
          min-width="100"
        />
        <el-table-column prop="depValue" :label="$t('je')" min-width="100" />
        <el-table-column
          prop="targetValue"
          :label="$t('dzje')"
          width="130"
        />
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
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="elPagination"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import LinkPath from "@/components/common/linkPath.vue";
import { getchangeDetails } from "@/api/manage";
import { depCoins } from "@/api/out";
export default {
  name: "transactionInquiry",
  components: { LinkPath },
  data() {
    return {
      tableData: [],
      options: [],
      type: "1",
      dialogVisible2: false,
      linkList: ["jycx", "jymx"],
      form: {
        name: "",
      },
      loading: true,
      current: 1,
      size: 10,
      total: 0,
      searchForm: {},
      bizTypeList: [
        { label: this.$t("fdhb"), value: 1 },
        { label: this.$t("jmhb"), value: 2 },
      ],
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
      res = await getchangeDetails(param);
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
.record-container {
  .content {
    margin-top: 1rem;
    padding: 1.5rem;
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
</style>
