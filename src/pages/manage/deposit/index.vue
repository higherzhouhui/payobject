<template>
  <div class="user_moneymanagement_transfer_contianer">
    <el-tabs v-model="moneyType">
      <el-tab-pane label="法定货币" name="fabi"></el-tab-pane>
      <el-tab-pane label="数字货币" name="usdt"></el-tab-pane>
    </el-tabs>
    <div class="content">
      <el-form ref="form2" :inline="true" class="mt12">
        <el-form-item>
          <el-select v-model="searchForm.reqStatus" :placeholder="$t('状态')" clearable>
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
          <el-button type="primary" @click="handleChangeSearch" class="primary">
            <i class="el-icon-search"></i>{{ $t("search") }}
          </el-button>
        </el-form-item>
      </el-form>
      <el-table class="tables" :data="tableData" style="width: 100%" v-loading="loading" v-if="moneyType == 'fabi'">
        <el-table-column prop="accountName" :label="$t('收款账户名称')" width="180" />
        <el-table-column prop="coinCode" :label="$t('币种')" width="200" />
        <el-table-column prop="reqValue" :label="$t('充值金额')" width="180" />
        <el-table-column prop="sendAccount" :label="$t('汇款账户')" width="180" />
        <el-table-column prop="reqStatus" :label="$t('状态')" width="180">
          <template slot-scope="scope">
            <el-tag :type="typeOption[scope.row.reqStatus]" class="elTag">
              {{ status[scope.row.reqStatus] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" :label="$t('创建时间')" minWidth="180" />
        <el-table-column
          prop="name"
          :label="$t('cz')"
          width="190"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button  type="info" class="btn" size="small" @click="handleShowDetail(scope.row)">
              {{ $t("详情") }}
            </el-button>
            <el-button  type="success" class="btn" size="small" @click="passDeposit(scope.row)" v-if="scope.row.reqStatus == 2">
              {{ $t("通过") }}
            </el-button>
            <el-button  type="danger" class="btn" size="small" @click="rejectDeposit(scope.row)" v-if="scope.row.reqStatus == 2">
              {{ $t("驳回") }}
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
      <el-table class="tables" :data="tableData" style="width: 100%" v-loading="loading" v-if="moneyType == 'usdt'">
        <el-table-column prop="cryptAdd" :label="$t('收款钱包地址')" width="180" />
        <el-table-column prop="coinCode" :label="$t('币种')" width="200" />
        <el-table-column prop="reqValue" :label="$t('充值金额')" width="180" />
        <el-table-column prop="tid" :label="$t('汇款钱包地址')" width="180" />
        <el-table-column prop="reqStatus" :label="$t('状态')" width="180">
          <template slot-scope="scope">
            <el-tag :type="typeOption[scope.row.reqStatus]" class="elTag">
              {{ usdtstatus[scope.row.reqStatus] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" :label="$t('创建时间')" minWidth="180" />
        <el-table-column
          prop="name"
          :label="$t('cz')"
          width="180"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button  type="info" class="btn" size="small" @click="handleShowDetail(scope.row)">
              {{ $t("详情") }}
            </el-button>
            <el-button  type="success" class="btn" size="small" @click="passDeposit(scope.row)" v-if="scope.row.reqStatus == 1">
              {{ $t("通过") }}
            </el-button>
            <!-- <el-button  type="danger" class="btn" size="small" @click="rejectDeposit(scope.row)" v-if="scope.row.reqStatus == 2">
              {{ $t("驳回") }}
            </el-button> -->
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

    <el-dialog :title="`详情`" :visible.sync="dialogVisible" width="1000px" :before-close="() => {
      dialogVisible = false;
    }
      ">
      <el-form label-width="160px" ref="formss" :model="currentSelectRow" class="formStyle moreDetail">
        <el-form-item :label="$t('币种')" class="mb12">
          <el-input v-model="currentSelectRow.coinCode" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('充值金额')" class="mb12">
          <el-input v-model="currentSelectRow.reqValue" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('收款账户名称')" class="mb12">
          <el-input v-model="currentSelectRow.accountName" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('汇款账号名称')" class="mb12">
          <el-input v-model="currentSelectRow.sendAccount" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('收款账号')" class="mb12">
          <el-input v-model="currentSelectRow.inbankAccount" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('汇款账号')" class="mb12">
          <el-input v-model="currentSelectRow.outbankAccount" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('代码')" class="mb12">
          <el-input v-model="currentSelectRow.inbankCode" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('代码')" class="mb12">
          <el-input v-model="currentSelectRow.outbankCode" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('所属国家')" class="mb12">
          <el-input v-model="currentSelectRow.inbankCountry" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('所属国家')" class="mb12">
          <el-input v-model="currentSelectRow.outbankCountry" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('所在地址')" class="mb12">
          <el-input type="textarea" v-model="currentSelectRow.inbankAdd" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('所在地址')" class="mb12">
          <el-input type="textarea" v-model="currentSelectRow.outbankAdd" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('SWIFT')" class="mb12">
          <el-input v-model="currentSelectRow.inswiftCode" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('SWIFT')" class="mb12">
          <el-input v-model="currentSelectRow.outswiftCode" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('拒绝理由')" class="mb12" v-if="currentSelectRow.reqStatus == 5">
          <el-input v-model="currentSelectRow.momo" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('创建时间')" class="mb12">
          <el-input v-model="currentSelectRow.createTime" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('修改时间')" class="mb12">
          <el-input v-model="currentSelectRow.modifiedTime" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('汇款凭证')" class="mb12">
          <el-upload
              class="upload-demo"
              action="null"
              list-type="text"
              accept=".pdf, .zip, .rar, image/*"
              :before-upload="(e) => handlesuccess(e, currentSelectRow)"
              multiple
              v-if="currentSelectRow.reqStatus == 1"
            >
              <el-button size="small" type="primary" class="btn">
                {{ $t("上传汇款凭证") }}
              </el-button>
          </el-upload>
          <el-button style="padding: 4px 20px" size="small" type="primary" class="btn" v-else><a
              :href="'/api/file/downLoad?url=' + currentSelectRow.reqProof" target="_blank">点击下载</a></el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :title="`详情`" :visible.sync="usdtdialogVisible" width="650" :before-close="() => { usdtdialogVisible = false; }">
      <el-form label-width="160px" ref="formss" :model="currentSelectRow" class="formStyle">
        <el-form-item :label="$t('币种')" class="mb12">
          <el-input v-model="currentSelectRow.coinCode" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('收款钱包地址')" class="mb12">
          <el-input v-model="currentSelectRow.cryptAdd" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('充值金额')" class="mb12">
          <el-input v-model="currentSelectRow.reqValue" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('汇款钱包地址')" class="mb12">
          <el-input v-model="currentSelectRow.tid" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('拒绝理由')" class="mb12" v-if="currentSelectRow.reqStatus == 5">
          <el-input v-model="currentSelectRow.memo" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('创建时间')" class="mb12">
          <el-input v-model="currentSelectRow.createTime" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('修改时间')" class="mb12">
          <el-input v-model="currentSelectRow.modifiedTime" :readOnly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('汇款凭证')" class="mb12">
          <el-upload
              class="upload-demo"
              action="null"
              list-type="text"
              accept=".pdf, .zip, .rar, image/*"
              :before-upload="(e) => handlesuccess(e, currentSelectRow)"
              multiple
              v-if="currentSelectRow.reqStatus == 1"
            >
              <el-button size="small" type="primary" class="btn">
                {{ $t("上传汇款凭证") }}
              </el-button>
          </el-upload>
          <el-button style="padding: 4px 20px" size="small" type="primary" class="btn" v-else><a
              :href="'/api/file/downLoad?url=' + currentSelectRow.reqProof" target="_blank">点击下载</a></el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :title="`驳回`" :visible.sync="rejectdialogVisible" width="650" :before-close="() => { rejectdialogVisible = false; }">
      <el-form label-width="90px" ref="formss">
        <el-form-item :label="$t('驳回')" class="mb12">
          <el-input type="textarea" v-model="reson"></el-input>
        </el-form-item>
        <div class="operationBtn">
          <el-button type="info" size="large" class="mbtn" @click="rejectdialogVisible = false">取消</el-button>
          <el-button type="primary" size="large" class="mbtn" @click="rejectConfirm">确认</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { depositList, cryptDepositList, putDeposit, putCryptDeposit, perDeposit, perCryptDeposit } from "@/api/out.js"
import { upload } from "@/api/file";
import { Message } from "element-ui";
import { getBankList } from "@/api/bank";

export default {
  name: "userMoneyManagementTransfer",
  data() {
    return {
      tableData: [],
      options: [],
      type: "1",
      usdtdialogVisible: false,
      linkList: ["zjgl", "hh"],
      form: {
        name: "",
      },
      loading: true,
      status: ['全部', '提交申请', '确认汇款', '财务审核', '完成', '驳回'],
      usdtstatus: ['全部', '提交申请', '完成'],
      typeOption: ['', 'info','warning','','success','danger'],
      dialogVisible: false,
      currentSelectRow: {},
      bankList: [],
      current: 1,
      size: 10,
      total: 0,
      searchForm: {},
      moneyType: 'fabi',
      rejectdialogVisible: false,
      reson: ''
    };
  },
  created() {
    this.getInitData()
    this.getRequestBankList()
  },
  watch: {
    moneyType() {
      this.current = 1
      this.getInitData()
    },
  },
  methods: {
    async getRequestBankList() {
      const res = await getBankList()
      this.bankList = res.data
    },
    async rejectConfirm() {
      let res;
      const param = {
        id: this.currentSelectRow.id,
        pass: false,
        depValue: this.currentSelectRow.reqValue,
        memo: this.reson
      }
      if (this.moneyType == 'fabi') {
        res = await perDeposit(param);
      } else {
        res = await perCryptDeposit(param)
      }
      if (res.code == 200) {
        Message({
          type: "success",
          message: "操作成功",
        });
        this.getInitData()
        this.rejectdialogVisible = false
      }
    },
    rejectDeposit(row) {
      this.currentSelectRow = row
      this.reson = ''
      this.rejectdialogVisible = true
    },
    passDeposit(row) {
      this.$confirm("确认通过？")
        .then(async (_) => {
          try {
            let res;
            const param = {
              id: row.id,
              pass: true,
              depValue: row.reqValue
            }
            if (this.moneyType == 'fabi') {
              res = await perDeposit(param);
            } else {
              res = await perCryptDeposit(param)
            }
            if (res.code == 200) {
              Message({
                type: "success",
                message: "操作成功",
              });
              this.getInitData()
            }
          } catch (error) { }
        })
        .catch((_) => { });
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
    handleShowDetail(row) {
      this.currentSelectRow = row
      if (this.moneyType == 'fabi') {
        const inlist = this.bankList.filter(item => {return item.id == row.bankId})
        const outlist = this.bankList.filter(item => {return item.id == row.sendBank})
        if (inlist.length && outlist.length) {
          this.currentSelectRow = {
            ...this.currentSelectRow,
            inbankAccount: inlist[0].bankAccount,
            inbankCode: inlist[0].bankCode,
            inbankCountry: inlist[0].bankCountry,
            inbankAdd: inlist[0].bankAdd,
            inswiftCode: inlist[0].swiftCode,
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
      if (this.moneyType == 'fabi') {
        res = await depositList({...this.searchForm, current: this.current, size: this.size })
      } else if (this.moneyType == 'usdt') {
        res = await cryptDepositList({...this.searchForm, current: this.current, size: this.size })
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
            res = await putDeposit(data)
          } else {
            res = await putCryptDeposit(data)
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
    padding: 24px;
    border-radius: 4px;
    border: 1px solid var(--unnamed, #dcdfe6);
    background: #fff;
    // box-shadow: 0px 0px 10px 0px rgba(52, 118, 255, 0.25);

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
.operationBtn {
  display: flex;
  justify-content: flex-end;
  .mbtn {
    padding: 8px 14px;
    font-size: 15px;
  }
}
</style>
