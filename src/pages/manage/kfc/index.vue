<template>
  <div class="user_transferAccountMangement_contianer">
    <!-- <LinkPath :linkList="linkList" /> -->
    <el-tabs v-model="type">
      <el-tab-pane label="银行卡" name="first"></el-tab-pane>
      <el-tab-pane label="KYC认证" name="second"></el-tab-pane>
    </el-tabs>
    <template v-if="type == 'first'">
      <div class="content">
        <el-form ref="form2" :inline="true">
          <el-form-item>
            <el-input :placeholder="$t('bankname')" v-model="form.bankName" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-input :placeholder="$t('yhzhh')" v-model="form.bankAccount" clearable></el-input>
          </el-form-item>
          <!-- <el-form-item>
                    <el-select v-model="value" :placeholder="$t('yhzhlx')">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item> -->
          <el-form-item>
            <el-select v-model="form.bankStatus" :placeholder="$t('zhbdzt')" clearable>
              <el-option style="padding: 0 20px" v-for="item in options" :key="item.value" :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getlist" class="primary">
              <i class="el-icon-search"></i>{{ $t("search") }}
            </el-button>
            <!-- <el-button class="primary">
              <i class="el-icon-refresh"></i>{{ $t("reset") }}
            </el-button> -->
          </el-form-item>
        </el-form>
        <el-table class="tables" size="small" :data="tableData" style="width: 100%" v-loading="loading">
          <el-table-column prop="accountName" :label="$t('zhmc')" width="180" show-overflow-tooltip/>
          <el-table-column prop="bankAccount" :label="$t('yhzh')" width="200" show-overflow-tooltip/>
          <el-table-column prop="accountAdd" :label="$t('jzdz')" min-width="300" show-overflow-tooltip/>
          <el-table-column prop="bankStatus" :label="$t('kzt')" width="120">
            <template slot-scope="scope">
              <el-tag :type="typeOption[scope.row.bankStatus]" class="elTag">
                {{ status[scope.row.bankStatus] }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" :label="$t('cjrq')" min-width="180" show-overflow-tooltip/>
          <el-table-column :label="$t('cz')" width="210" fixed="right">
            <template slot-scope="scope">
              <span @click="toDetail(scope.row)" class="baseColor cursor" style="cursor: pointer">详情</span>
              <span v-if="scope.row.bankStatus == 1" class="cursor" style="cursor: pointer; margin-left: 10px; color: red"
                @click="showUsdtForm(scope.row)">
                加密货币地址
              </span>
              <span v-if="scope.row.bankStatus == 0" class="cursor" style="cursor: pointer; margin-left: 10px; color: green"
                @click="sh(scope.row.id, true)">
                审核通过
              </span>
              <span v-if="scope.row.bankStatus == 0" class="cursor" style="cursor: pointer; margin-left: 10px; color: red"
                @click="sh(scope.row.id, false)">
                驳回
              </span>
            </template>
          </el-table-column>
          <div slot="empty">
            <el-empty :description="$t('nodata')" style="padding: 50px"></el-empty>
          </div>
        </el-table>
      </div>
    </template>
    <template v-else>
      <div class="content">
        <el-table class="tables" :data="tableData2" style="width: 100%" v-loading="loading">
          <el-table-column prop="companyName" :label="$t('qymc')" width="180" show-overflow-tooltip/>
          <el-table-column prop="businessAdd" :label="$t('qyjydz')" width="200" show-overflow-tooltip/>
          <el-table-column prop="businessScenario" :label="$t('ywcjsm')" min-width="280" show-overflow-tooltip/>
          <el-table-column prop="kycStatus" :label="$t('kzt')" width="120">
            <template slot-scope="scope">
              <el-tag :type="typeOption[scope.row.kycStatus]" class="elTag">
                {{ status[scope.row.kycStatus] }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" :label="$t('cjrq')" min-width="180" show-overflow-tooltip/>


          <el-table-column :label="$t('cz')" width="210" fixed="right">
            <template slot-scope="scope">
              <div>
                <span @click="toDetail2(scope.row)" class="baseColor cursor" style="cursor: pointer">详情</span>
                <span v-if="scope.row.kycStatus == 0" class="cursor" style="cursor: pointer; margin-left: 10px; color: green"
                  @click="sh2(scope.row.id, true)">
                  通过
                </span>
                <span v-if="scope.row.kycStatus == 0" class="cursor" style="cursor: pointer; margin-left: 10px; color: red"
                  @click="rejectKyc(scope.row)">
                  驳回
                </span>
              </div>
            </template>
          </el-table-column>
          <div slot="empty">
            <el-empty :description="$t('nodata')" style="padding: 50px"></el-empty>
          </div>
        </el-table>
      </div>
    </template>

    <el-dialog :title="'详情'" :visible.sync="dialogVisible" width="636px" :before-close="() => {
      dialogVisible = false;
    }
      ">
      <el-form label-width="160px" ref="formss" :model="bankForm" class="formStyle">
        <el-form-item :label="$t('zhmc')" class="mb24">
          <el-input v-model="bankForm.accountName" :disabled="!!bankForm.id"></el-input>
        </el-form-item>
        <el-form-item :label="$t('ssgj')" class="mb24">
          <el-input v-model="bankForm.country" :disabled="!!bankForm.id"></el-input>
        </el-form-item>
        <el-form-item :label="$t('jzdz')" class="mb24">
          <el-input type="textarea" v-model="bankForm.accountAdd" :disabled="!!bankForm.id"></el-input>
        </el-form-item>
        <el-form-item :label="$t('bankname')" class="mb24">
          <el-input v-model="bankForm.bankName" :disabled="!!bankForm.id"></el-input>
        </el-form-item>
        <el-form-item :label="$t('swift')" class="mb24">
          <el-input v-model="bankForm.swiftCode" :disabled="!!bankForm.id"></el-input>
        </el-form-item>
        <el-form-item :label="$t('bankcode')" class="mb24">
          <el-input v-model="bankForm.bankCode" :disabled="!!bankForm.id"></el-input>
        </el-form-item>
        <el-form-item :label="$t('bankcount')" class="mb24">
          <el-input v-model="bankForm.bankAccount" :disabled="!!bankForm.id"></el-input>
        </el-form-item>
        <el-form-item :label="$t('khgj')" class="mb24">
          <el-input v-model="bankForm.bankCountry" :disabled="!!bankForm.id"></el-input>
        </el-form-item>
        <el-form-item :label="$t('khdz')" class="mb24">
          <el-input type="textarea" v-model="bankForm.bankAdd" :disabled="!!bankForm.id"></el-input>
        </el-form-item>
        <el-form-item :label="$t('scwj')" class="mb24">
          <label style="font-size: 12px">
            {{ $t("zzd") }}
          </label>
          <el-button style="padding: 4px 20px" size="small" type="primary" class="btn"><a
              :href="'/api/file/downLoad?url=' + bankForm.accountCer" target="_blank">点击下载</a></el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :title="'详情'" :visible.sync="dialogVisible2" width="636px" :before-close="() => {
      dialogVisible2 = false;
    }
      ">
      <el-form label-width="160px" ref="formss" :model="bankForm2" class="formStyle">
        <el-form-item :label="$t('qymc')" class="mb24">
          <el-input v-model="bankForm2.companyName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('qyjydz')" class="mb24">
          <el-input type="textarea" v-model="bankForm2.businessAdd" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('qylx')" class="mb24">
          <el-select v-model="bankForm2.busType" :disabled="true" class="elSelect">
            <el-option style="padding: 0 10px" v-for="item in options3" :key="item.value" :label="$t(item.label)"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('qyzcszgj')" class="mb24">
          <el-input v-model="bankForm2.country" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('zcrq')" class="mb24">
          <el-date-picker style="width: 100%" size="small" :disabled="true" value-format="timestamp"
            v-model="bankForm2.regDate" type="date" :placeholder="$t('xzsj')" />
        </el-form-item>
        <el-form-item :label="$t('qyyxq')" class="mb24">
          <el-date-picker :disabled="true" style="width: 100%" value-format="timestamp" size="small"
            v-model="bankForm2.period" type="date" :placeholder="$t('xzsj')" />
        </el-form-item>
        <el-form-item :label="$t('ygyhkje')" class="mb24">
          <el-input v-model="bankForm2.monthlyRemittance" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('ygyjybs')" class="mb24">
          <el-input v-model="bankForm2.transactionsMonth" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('dbjyed')" class="mb24">
          <el-input v-model="bankForm2.transactionLimit" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('ywcjsm')" class="mb24">
          <el-input type="textarea" v-model="bankForm2.businessScenario" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('qygw')" class="mb24">
          <el-input v-model="bankForm2.webSite" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('驳回理由')" class="mb24" v-if="bankForm2.reason">
          <el-input type="textarea" v-model="bankForm2.reason" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('scwj')" class="mb24">
          <label style="font-size: 12px">
            {{ $t("t1") }}
          </label>
          <el-button style="padding: 4px 20px" size="small" type="primary" class="btn"><a
              :href="'/api/file/downLoad?url=' + bankForm2.regCer" target="_blank">点击下载</a></el-button>
        </el-form-item>
        <el-form-item :label="$t('scwj')" class="mb24">
          <label style="font-size: 12px">
            {{ $t("t2") }}
          </label>
          <el-button style="padding: 4px 20px" size="small" type="primary" class="btn"><a
              :href="'/api/file/downLoad?url=' + bankForm2.legal" target="_blank">点击下载</a></el-button>
        </el-form-item>
        <el-form-item :label="$t('scwj')" class="mb24" v-if="bankForm2.busType != 1">
          <label style="font-size: 12px">
            {{ $t("t3") }}
          </label>
          <el-button style="padding: 4px 20px" size="small" type="primary" class="btn"><a
              :href="'/api/file/downLoad?url=' + bankForm2.shareholder" target="_blank">点击下载</a></el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :title="'加密货币地址'" :visible.sync="dialogVisible3" width="636px" :before-close="() => {
      dialogVisible2 = false;
    }
      ">
      <el-form label-width="160px">
        <el-form-item label="币种" class="mb24">
          <el-select v-model="addressForm.cryCode" class="elSelect">
            <el-option style="padding: 0 10px" v-for="item in szList" :key="item.id" :label="item.name" :value="item.coinCode" />
          </el-select>
        </el-form-item>
        <el-form-item label="地址" class="mb24">
          <el-input v-model="addressForm.cryAdd"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">{{ $t("cancel") }}</el-button>
        <el-button type="primary" :class="bankloading && 'loading'" @click="addAddress">{{ $t("sure")
        }}</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="'驳回'" :visible.sync="rejectdialogVisible" width="636px" :before-close="() => {
      rejectdialogVisible = false;
    }
      ">
      <el-form label-width="160px">
        <el-form-item label="驳回理由" class="mb24">
          <el-input type="textarea" v-model="currentSelectRow.reason"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rejectdialogVisible = false">{{ $t("cancel") }}</el-button>
        <el-button type="primary" :class="bankloading && 'loading'" @click="rejectConfirm">{{ $t("sure")
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getBankList, perBank, kycList, perKyc } from "@/api/bank";
import { setCryAcc, getCryAdd } from "@/api/exchange";

import { Message } from "element-ui";
import { cryptocurrencies } from "@/api/login";
import { Local } from "@/utils/index";

export default {
  name: "KYCPage",
  data() {
    return {
      typeOption: ["warning", "success", "danger"],
      szList: [],
      dialogVisible3: false,
      dialogVisible2: false,
      bankForm2: {},
      addressForm: {},
      options2: ["", "gth", "qy", "hwgs"],
      type: "first",
      dialogVisible: false,
      tableData: [],
      tableData2: [],
      loading: false,
      bankloading: false,
      currentSelectRow: false,
      rejectdialogVisible: false,
      options: [
        {
          label: "审核中",
          value: 0,
        },
        {
          label: "已通过",
          value: 1,
        },
        {
          label: "驳回",
          value: 2,
        },
      ],
      status: ["审核中", "已通过", "驳回"],

      form: {
        bankStatus: "",
      },
      bankForm: {},
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
      dialogVisible3Loading: false,
    };
  },
  watch: {
    type() {
      if (this.type == "first") {
        this.getlist();
      } else {
        this.getlist2();
      }
    },
  },
  methods: {
    rejectKyc(row) {
      this.currentSelectRow = row
      this.rejectdialogVisible = true
    },
    async rejectConfirm() {
      try {
        this.bankloading = true
        await perKyc({ id: this.currentSelectRow.id, pass: false, reason: this.currentSelectRow.reason });
        Message({
          type: "success",
          message: "操作成功",
        });
        this.getlist2();
        this.bankloading = false
        this.rejectdialogVisible = false
      } catch {
        this.bankloading = false
      }

    },
    async addAddress() {
      try {
        this.dialogVisible3Loading = true
        const res = await setCryAcc(this.addressForm)
        this.dialogVisible3Loading = false
        if (res.code === 200) {
          Message({
            type: "success",
            message: "操作成功",
          });
          this.dialogVisible3 = false
        }
      } catch (error) {

      }

    },
    async showUsdtForm(list) {
      this.addressForm = {
          userId: list.userId,
          accountName: list.accountName,
        }
      this.dialogVisible3 = true
      this.dialogVisible3Loading = true
      const res = await getCryAdd({cryCode: 'USDT',  userId: list.userId})
      this.dialogVisible3Loading = false
      if (res.code === 200) {
        this.addressForm = {
          userId: list.userId,
          accountName: list.accountName,
          cryCode: res.data.cryCode,
          cryAdd: res.data.cryAdd,
          id: res.data.id
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
      } catch (error) { }
    },
    sh2(id, type) {
      this.$confirm(type ? "确认通过？" : "确认驳回？")
        .then(async (_) => {
          try {
            await perKyc({ id, pass: type, reason: "123" });
            Message({
              type: "success",
              message: "操作成功",
            });
            this.getlist2();
          } catch (error) { }
        })
        .catch((_) => { });
    },
    sh(id, type) {
      this.$confirm(type ? "确认通过？" : "确认驳回？")
        .then(async (_) => {
          try {
            await perBank({ id, pass: type, reason: "123" });
            Message({
              type: "success",
              message: "操作成功",
            });
            this.getlist();
          } catch (error) { }
        })
        .catch((_) => { });
    },
    toDetail(data) {
      this.dialogVisible = true;
      this.$set(this, "bankForm", data);
    },
    toDetail2(data) {
      this.dialogVisible2 = true;
      this.$set(this, "bankForm2", data);
    },
    async getlist() {
      try {
        this.loading = true
        let req = await getBankList(this.form);
        this.tableData = req.data;
        this.loading = false
      } catch (error) { }
    },
    async getlist2() {
      try {
        this.loading = true
        let req = await kycList();
        this.tableData2 = req.data;
        this.loading = false
      } catch (error) { }
    },
  },
  created() {
    this.getlist();
    this.getSzList();
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

.btn a{
  color: #fff;
}
.elSelect {
  width: 100%;
}
</style>