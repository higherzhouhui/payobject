<template>
  <div class="user_transactionInquiry_transactionDetails_contianer">
    <LinkPath :linkList="linkList" v-if="!$store.state.userInfo.admin" />
    <div class="content">
      <el-form ref="form2" :inline="true" class="mt12">
        <el-form-item>
          <el-select
            v-model="searchForm.fromCode"
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
          <el-select
            v-model="searchForm.targetCode"
            :placeholder="$t('qxzdhhbzl')"
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
        <el-table-column prop="coinCode" :label="$t('bz')" min-width="100" />
        <el-table-column prop="billValue" :label="$t('je')" min-width="100" />
        <el-table-column prop="billType" :label="$t('lx')" min-width="100">
          <template slot-scope="scope">

      
            <el-tag class="elTag" :type="typeStyle[scope.row.billType]"> {{typeOption[scope.row.billType]}} </el-tag>

          </template>
        </el-table-column>
        <el-table-column
          prop="commission"
          :label="$t('sxfei')"
          min-width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.commission || 0 }}
          </template>
        </el-table-column>
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
import { getBillDetails } from "@/api/manage";
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
      linkList: ["jycx", "zjmx"],
      form: {
        name: "",
      },
      typeOption: ['', '入账', '出账', '换汇', '换汇的入账'],
      typeStyle: ['', 'success', 'danger', 'info', 'warning'],
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
            text: this.$t('today'),
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: this.$t('yestoday'),
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: this.$t('yzq'),
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
    margin-top: 1.5rem;
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
.btn {
  padding: 4px 6px;
  color: #fff;
}
</style>
