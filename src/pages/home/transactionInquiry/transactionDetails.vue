<template>
    <div class="user_transactionInquiry_transactionDetails_contianer">
        <LinkPath :linkList="linkList" />
        <div class="content">
            <el-form ref="form2" :inline="true" class="mt12">
              <el-form-item>
                <el-select v-model="searchForm.bizType" :placeholder="$t('请选择业务类型')" clearable>
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
                <el-select v-model="searchForm.coinCode" :placeholder="$t('请选择货币种类')" clearable>
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
                  placeholder="开始时间"
                  value-format="timestamp"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-date-picker
                  v-model="searchForm.endTime"
                  align="right"
                  type="datetime"
                  placeholder="结束时间"
                  value-format="timestamp"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleChangeSearch" class="normal-btn">
                  <i class="el-icon-search"></i>{{ $t("search") }}
                </el-button>
              </el-form-item>
            </el-form>
            <el-table class="tables" :data="tableData" style="width: 100%" v-loading="loading">
              <el-table-column prop="depCoin" :label="$t('币种')" width="100" show-overflow-tooltip/>
              <el-table-column prop="targetCoin" :label="$t('兑换币种')" width="100" />
              <el-table-column prop="changeRate" :label="$t('汇率')" width="100" />
              <el-table-column prop="depValue" :label="$t('金额')" width="100" />
              <el-table-column prop="targetValue" :label="$t('到账金额')" width="130" />
              <el-table-column prop="createTime" :label="$t('创建时间')" minWidth="180" show-overflow-tooltip/>
              <el-table-column prop="modifiedTime" :label="$t('更新时间')" minWidth="180" show-overflow-tooltip/>
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
import LinkPath from '@/components/common/linkPath.vue'
import { getchangeDetails } from "@/api/manage"
import {
  depCoins,
} from "@/api/out";
export default {
    name: 'transactionInquiry',
    components: { LinkPath },
    data() {
        return {
            tableData: [],
            options: [],
            type: '1',
            dialogVisible2: false,
            linkList: ['jycx', '兑换记录'],
            form: {
                name: ''
            },
            loading: true,
            current: 1,
            size: 10,
            total: 0,
            searchForm: {},
            bizTypeList: [
              {label: '法币', value: 1},
              {label: '加密货币', value: 2},
            ],
            coinCodeList: [],
            pickerOptions: {
              disabledDate(time) {
                return time.getTime() > Date.now();
              },
              shortcuts: [{
                text: '今天',
                onClick(picker) {
                  picker.$emit('pick', new Date());
                }
              }, {
                text: '昨天',
                onClick(picker) {
                  const date = new Date();
                  date.setTime(date.getTime() - 3600 * 1000 * 24);
                  picker.$emit('pick', date);
                }
              }, {
                text: '一周前',
                onClick(picker) {
                  const date = new Date();
                  date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', date);
                }
              }]
            },
        }
    },
    created() {
        this.getInitData()
        this.getCoinCodeList()
    },
    methods: {
      async getCoinCodeList() {
        try {
          const res = await depCoins()
          this.coinCodeList = res.data
        } catch {
        }
      },
      handleSizeChange(val) {
        this.size = val
        this.getInitData()
      },
      handleCurrentChange(val) {
        this.current = val
        this.getInitData()
      },
      handleChangeSearch() {
        this.getInitData()
      },
      async getInitData() {
        this.loading = true
        let res;
        const param = {
            ...this.searchForm,
            current: this.current,
            size: this.size
        }
        res = await getchangeDetails(param)
        this.loading = false
        if (res.code === 200) {
          this.tableData = res.data.records
          this.total = res.data.total
        }
      },
    }
}
</script>
<style scoped lang="scss">
.user_transactionInquiry_transactionDetails_contianer {
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
.btn {
    padding: 4px 6px;
    color: #fff;
}
</style>
