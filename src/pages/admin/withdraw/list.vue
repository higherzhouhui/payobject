<template>
    <div class="user_moneymanagement_transfer_contianer">
      <LinkPath :linkList="linkList" style="margin-bottom: 1.5rem"/>
      <el-tabs v-model="moneyType">
        <el-tab-pane :label="$t('fdhb')" name="fabi"></el-tab-pane>
        <el-tab-pane :label="$t('jmhb')" name="usdt"></el-tab-pane>
      </el-tabs>
      <div class="content">
        <el-form v-model="searchForm" :inline="true">
          <el-form-item>
            <el-date-picker
              v-model="searchForm.startTime"
              align="right"
              type="datetime"
              :placeholder="$t('kssj')"
              value-format="timestamp"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="searchForm.endTime"
              align="right"
              type="datetime"
              :placeholder="$t('jssj')"
              value-format="timestamp"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.status" :placeholder="$t('kzt')" clearable>
              <el-option
                style="padding: 0 20px"
                v-for="(item, index) in status"
                :key="item"
                :label="item"
                :value="index"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleChangeSearch" class="normal-btn" style="height: 40px">
              <i class="el-icon-search"></i>{{ $t("search") }}
            </el-button>
          </el-form-item>
        </el-form>
        <el-table class="tables" size="small" :data="tableData" style="width: 100%" v-loading="loading" v-if="moneyType == 'fabi'">
          <el-table-column prop="accountName" :label="$t('skzhmc')" width="180" show-overflow-tooltip/>
          <el-table-column prop="coinCode" :label="$t('bz')" min-width="100" />
          <el-table-column prop="reqValue" :label="$t('ckje')" min-width="100" />
          <el-table-column prop="targetCode" :label="$t('mbbz')" min-width="100" />
          <el-table-column prop="changeValue" :label="$t('yjdzje')" min-width="130" />
          <el-table-column prop="reqStatus" :label="$t('kzt')" min-width="120">
            <template slot-scope="scope">
              <el-tag :type="typeOption[scope.row.reqStatus]" class="elTag">
                {{ status[scope.row.reqStatus] }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" :label="$t('cjsj')" min-width="180" />
          <el-table-column
            prop="name"
            :label="$t('cz')"
            width="100"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button  type="info" class="btn" size="small" @click="handleShowDetail(scope.row)">
                {{ $t("xq") }}
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
        <el-table class="tables" size="small" :data="tableData" style="width: 100%" v-loading="loading" v-if="moneyType == 'usdt'">
          <el-table-column prop="srcCode" :label="$t('bz')" min-width="100" />
          <el-table-column prop="cryptAdd" :label="$t('skqbdz')" min-width="180" />
          <el-table-column prop="coinCode" :label="$t('mbbz')" min-width="100" />
          <el-table-column prop="reqValue" :label="$t('ckje')" min-width="100" />
          <el-table-column prop="witValue" :label="$t('yjdzje')" min-width="120" />
          <!-- <el-table-column prop="tid" :label="$t('汇款钱包地址')" width="180" /> -->
          <el-table-column prop="reqStatus" :label="$t('kzt')" min-width="100">
            <template slot-scope="scope">
              <el-tag :type="usdttypeOption[scope.row.reqStatus]" class="elTag">
                {{ usdtstatus[scope.row.reqStatus] }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" :label="$t('cjsj')" min-width="180" />
          <el-table-column
            prop="name"
            :label="$t('cz')"
            width="100"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button  type="info" class="btn" size="small" @click="handleShowDetail(scope.row)">
                {{ $t("xq") }}
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
  
      <el-dialog :title="$t('xq')" :visible.sync="dialogVisible" width="1000px" :before-close="() => {
        dialogVisible = false;
      }
        ">
        <el-form label-position="top" ref="formss" :model="currentSelectRow" class="formStyle moreDetail">
          <el-form-item :label="$t('bz')">
            <el-input v-model="currentSelectRow.coinCode" :readOnly="true"></el-input>
          </el-form-item>
          <el-form-item :label="$t('ckje')">
            <el-input v-model="currentSelectRow.reqValue" :readOnly="true"></el-input>
          </el-form-item>
          <el-form-item :label="$t('skzhmc')">
            <el-input v-model="currentSelectRow.accountName" :readOnly="true"></el-input>
          </el-form-item>
          <el-form-item :label="$t('yjdzje')">
            <el-input v-model="currentSelectRow.changeValue" :readOnly="true"></el-input>
          </el-form-item>

          <el-form-item :label="$t('skzh')">
            <el-input v-model="currentSelectRow.outbankAccount" :readOnly="true"></el-input>
          </el-form-item>
          <el-form-item :label="$t('bankcode')">
            <el-input v-model="currentSelectRow.outbankCode" :readOnly="true"></el-input>
          </el-form-item>
          <el-form-item :label="$t('khgj')">
            <el-input v-model="currentSelectRow.outbankCountry" :readOnly="true"></el-input>
          </el-form-item>
          <el-form-item :label="$t('skyhszdz')">
            <el-input type="textarea" v-model="currentSelectRow.outbankAdd" :readOnly="true"></el-input>
          </el-form-item>
          <el-form-item :label="$t('sksdm')">
            <el-input v-model="currentSelectRow.outswiftCode" :readOnly="true"></el-input>
          </el-form-item>
          <el-form-item :label="$t('bhly')" v-if="currentSelectRow.memo">
            <el-input type="textarea" v-model="currentSelectRow.memo" :readOnly="true"></el-input>
          </el-form-item>
          <el-form-item :label="$t('cjsj')">
            <el-input v-model="currentSelectRow.createTime" :readOnly="true"></el-input>
          </el-form-item>
          <el-form-item :label="$t('xgsj')">
            <el-input v-model="currentSelectRow.modifiedTime" :readOnly="true"></el-input>
          </el-form-item>
          <el-form-item :label="$t('hkpz')" v-if="currentSelectRow.reqProof">
            <el-button style="padding: 4px 20px" size="small" type="primary" class="btn"><a
                :href="'/api/file/downLoad?url=' + currentSelectRow.reqProof" target="_blank">{{$t('djxz')}}</a></el-button>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button class="qd" @click="dialogVisible = false"
            >{{$t('done')}}</el-button>
        </div>
      </el-dialog>
      <el-dialog :title="$t('xq')" :visible.sync="usdtdialogVisible" width="650" :before-close="() => { usdtdialogVisible = false; }">
        <el-form label-position="top" ref="formss" :model="currentSelectRow" class="formStyle">
          <el-form-item :label="$t('bz')">
            <el-input v-model="currentSelectRow.srcCode" :readOnly="true"></el-input>
          </el-form-item>
          <el-form-item :label="$t('skqbdz')">
            <el-input v-model="currentSelectRow.cryptAdd" :readOnly="true"></el-input>
          </el-form-item>
          <el-form-item :label="$t('mbbz')">
            <el-input v-model="currentSelectRow.coinCode" :readOnly="true"></el-input>
          </el-form-item>
          <el-form-item :label="$t('ckje')">
            <el-input v-model="currentSelectRow.reqValue" :readOnly="true"></el-input>
          </el-form-item>
          <el-form-item :label="$t('yjdzje')">
            <el-input v-model="currentSelectRow.witValue" :readOnly="true"></el-input>
          </el-form-item>
          <el-form-item :label="$t('bhly')" v-if="currentSelectRow.reqStatus == 5">
            <el-input v-model="currentSelectRow.memo" :readOnly="true"></el-input>
          </el-form-item>
          <el-form-item :label="$t('cjsj')">
            <el-input v-model="currentSelectRow.createTime" :readOnly="true"></el-input>
          </el-form-item>
          <el-form-item :label="$t('xgsj')">
            <el-input v-model="currentSelectRow.modifiedTime" :readOnly="true"></el-input>
          </el-form-item>
          <el-form-item :label="$t('hkpz')" v-if="currentSelectRow.reqProof">
            <el-button style="padding: 4px 20px" size="small" type="primary" class="btn"><a
                :href="'/api/file/downLoad?url=' + currentSelectRow.reqProof" target="_blank">{{$t('djxz')}}</a></el-button>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button class="qd" @click="usdtdialogVisible = false"
            >{{$t('done')}}</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  <script>
  import LinkPath from "@/components/common/linkPath.vue";
  import { withdrawList, cryptWithdrawList, perWithdraw, depCoins, withdrawAccounts, perCryptWithdraw } from "@/api/out.js"
  import { upload } from "@/api/file";
  import { Message } from "element-ui";
  
  export default {
    name: "userMoneyManagementTransfer",
    components: { LinkPath },
    data() {
      return {
        tableData: [],
        options: [],
        type: "1",
        usdtdialogVisible: false,
        linkList: ["txgl", "txzhgl"],
        form: {
          name: "", 
        },
        loading: true,
        usdtstatus: [this.$t('all'), this.$t('shz'), this.$t('done'), this.$t('bh')],
        usdttypeOption: ['', 'info','success','danger','danger', 'danger'],
        status: [this.$t('all'), this.$t('shz'), this.$t('clz'), this.$t('done'), this.$t('done'), this.$t('bh')],
        typeOption: ['', 'info','warning','success','danger', 'danger'],
        dialogVisible: false,
        currentSelectRow: {},
        inCoinList: [],
        outCoinList: [],
        current: 1,
        size: 10,
        total: 0,
        searchForm: {},
        moneyType: 'fabi',
      };
    },
    created() {
      this.getInitData()
      this.getRJBZ()
      this.getCJZH()
    },
    watch: {
      moneyType() {
        this.current = 1
        this.getInitData()
      },
    },
    methods: {
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
        this.currentSelectRow = row
        if (this.moneyType == 'fabi') {
          const outlist = this.outCoinList.filter(item => {return item.id == row.bankId})
          if (outlist.length) {
            this.currentSelectRow = {
              ...this.currentSelectRow,
              outbankAccount: outlist[0].bankAccount,
              outbankCode: outlist[0].bankCode,
              outbankCountry: outlist[0].bankCountry,
              outbankAdd: outlist[0].bankAdd,
              outswiftCode: outlist[0].swiftCode,
            }
          }
          this.dialogVisible = true
        }
        if (this.moneyType == 'usdt') {
          this.usdtdialogVisible = true
        }
  
      },
      async getInitData() {
        this.loading = true
        let res;
        if (this.searchForm.status == 0) {
          delete this.searchForm.status
        }
        if (this.moneyType == 'fabi') {
          res = await withdrawList({...this.searchForm, current: this.current, size: this.size })
        } else if (this.moneyType == 'usdt') {
          res = await cryptWithdrawList({...this.searchForm, current: this.current, size: this.size })
        }
        this.loading = false
        if (res.code === 200) {
          this.tableData = res.data.records
          this.total = res.data.total
        }
      },
      async handlesuccess(e, row) {
        const data = row
        const size = e.size
        if (size > 20 * 1024 * 1024) {
          Message({
            type: "error",
            message: this.$t('sizeOver'),
          });
          return
        }
        const formData = new FormData();
        formData.append("file", e);
        try {
          const req = await upload(formData);
          if (req.code === 200) {
            data.reqProof = req.data[0];
            data.reqStatus = 2
            let res;
            if (this.moneyType == 'fabi') {
              res = await perWithdraw(data)
            } else {
              res = await perCryptWithdraw(data)
            }
            if (res.code === 200) {
              Message({
                type: "success",
                message: this.$t('sccg'),
              });
            }
          }
        } catch (error) {
          console.log(error)
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
      border-radius: 0.5rem;
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
    margin-right: 12px;
  }
  </style>
  