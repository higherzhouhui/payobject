<template>
  <div class="user_transferAccountMangement_contianer">
    <!-- <LinkPath :linkList="linkList" /> -->
    <el-tabs v-model="type">
      <el-tab-pane label="收款账户" name="first"></el-tab-pane>
      <el-tab-pane label="汇率设置" name="second"></el-tab-pane>
    </el-tabs>
    <template v-if="type == 'first'">
      <div class="content">
        <el-form ref="form2" v-model="form" :inline="true">
          <el-form-item>
            <el-input
              :placeholder="$t('bankname')"
              v-model="form.bankName"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              :placeholder="$t('yhzhh')"
              v-model="form.bankAccount"
            ></el-input>
          </el-form-item>
          <el-form-item>
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
            <el-button type="primary" @click="getlist" class="primary normal-btn">
              <i class="el-icon-search"></i>{{ $t("search") }}
            </el-button>
            <!-- <el-button class="primary">
                <i class="el-icon-refresh"></i>{{ $t("reset") }}
              </el-button> -->
          </el-form-item>
        </el-form>
        <el-button type="primary normal-btn" @click="showAdd1" class="primary"
          ><i class="el-icon-plus"></i>增加收款账户</el-button
        >
        <el-table
          class="tables"
          :data="tableData"
          style="width: 100%; margin-top: 16px"
          v-loading="loading"
          size="small"
        >
          <el-table-column prop="coinCode" :label="$t('币种')" width="100" />
          <el-table-column prop="accountName" :label="$t('zhmc')" width="180" show-overflow-tooltip/>
          <el-table-column prop="bankName" :label="$t('bankname')" width="180" show-overflow-tooltip	/>
          <el-table-column prop="bankAccount" :label="$t('yhzh')" width="200" show-overflow-tooltip/>
          <el-table-column prop="accountAdd" :label="$t('jzdz')" min-width="180" show-overflow-tooltip/>
          <el-table-column prop="createTime" :label="$t('cjrq')" width="180" show-overflow-tooltip/>
          <el-table-column
            prop="name"
            :label="$t('cz')"
            width="130"
            fixed="right"
          >
            <template slot-scope="scope">
              <span
                @click="toDetail(scope.row)"
                class="baseColor cursor"
                style="cursor: pointer"
                >修改</span
              >
              <span
                class="cursor"
                style="cursor: pointer; margin-left: 10px; color: red"
                @click="del1(scope.row.id)"
              >
                删除
              </span>
            </template>
          </el-table-column>
          <div slot="empty">
            <el-empty
              :description="$t('nodata')"
              style="padding: 50px"
            ></el-empty>
          </div>
        </el-table>
      </div>
    </template>
    <template v-if="type == 'second'">
      <div class="content">
        <el-button type="primary" @click="showAdd" class="primary normal-btn"
          ><i class="el-icon-plus"></i>增加汇率</el-button
        >
        <el-table
          class="tables"
          :data="tableData2"
          style="width: 100%; margin-top: 16px"
          v-loading="loading"
          size="small"
        >
          <el-table-column prop="exFrom" label="被兑换币种" min-width="100" />
          <el-table-column prop="exTarget" label="兑换币种" min-width="100" />
          <el-table-column prop="exRate" label="汇率" width="120" />
          <el-table-column prop="createTime" :label="$t('cjrq')" min-width="180" />
          <el-table-column
            prop="createTime"
            :label="$t('cz')"
            width="130"
            fixed="right"
          >
            <template slot-scope="scope">
              <div>
                <span
                  @click="toDetail2(scope.row)"
                  class="baseColor cursor"
                  style="cursor: pointer"
                  >修改</span
                >
                <span
                  class="cursor"
                  style="cursor: pointer; margin-left: 10px; color: red"
                  @click="del2(scope.row.id)"
                >
                  删除
                </span>
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
      </div>
    </template>

    <el-dialog
      :title="bankForm.id ? '修改' : '新增'"
      :visible.sync="dialogVisible"
      width="636px"
      top="3%"
      :before-close="
        () => {
          dialogVisible = false;
        }
      "
    >
      <el-form label-width="160px" ref="formss" :model="bankForm" class="formStyle">
        <el-form-item :label="$t('币种')" class="mb24">
          <el-select v-model="bankForm.coinCode" class="elSelect">
            <el-option
              style="padding: 0 10px"
              v-for="item in getNewaereList(aereList)"
              :key="item.value"
              :label="item.coinCode"
              :value="item.coinCode"
            />
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('zhmc')" class="mb24">
          <el-input
            v-model="bankForm.accountName"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('ssgj')" class="mb24">
          <!-- <el-input
            v-model="bankForm.country"
          ></el-input> -->
          <el-select v-model="bankForm.country" class="elSelect">
            <el-option
              style="padding: 0 10px"
              v-for="item in aereList"
              :key="item.value"
              :label="language === 'zh' ? item.name : item.enName"
              :value="item.areaCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('jzdz')" class="mb24">
          <el-input
            v-model="bankForm.accountAdd"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('bankname')" class="mb24">
          <el-input
            v-model="bankForm.bankName"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('swift')" class="mb24">
          <el-input
            v-model="bankForm.swiftCode"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('bankcode')" class="mb24">
          <el-input
            v-model="bankForm.bankCode"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('bankcount')" class="mb24">
          <el-input
            v-model="bankForm.bankAccount"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('khgj')" class="mb24">
          <!-- <el-input
            v-model="bankForm.bankCountry"
          ></el-input> -->
          <el-select v-model="bankForm.bankCountry" class="elSelect">
            <el-option
              style="padding: 0 10px"
              v-for="item in aereList"
              :key="item.value"
              :label="language === 'zh' ? item.name : item.enName"
              :value="item.areaCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('khdz')" class="mb24">
          <el-input
            v-model="bankForm.bankAdd"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('scwj')" class="mb24">
          <label style="font-size: 12px">
            {{ $t("zzd") }}
          </label>
          <el-upload
            v-if="!bankForm.id"
            class="upload-demo"
            action="null"
            list-type="text"
            accept=".pdf, .zip, .rar"
            :before-upload="(e) => handlesuccess(e, 'shareholder')"
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
          <el-button
            v-else
            style="padding: 4px 20px"
            size="small"
            type="primary"
            class="btn"
            ><a :href="'/api/file/downLoad?url=' + bankForm.accountCer" target="_blank"
              >点击下载</a
            ></el-button
          >
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
      :title="!bankForm2.id ? '新增汇率' : '修改'"
      :visible.sync="dialogVisible2"
      width="636px"
      :before-close="
        () => {
          dialogVisible2 = false;
        }
      "
    >
      <el-form label-width="160px" ref="formss" :model="bankForm2">
        <el-form-item label="被兑换币种" class="mb24">
          <el-select v-model="bankForm2.exFrom" class="elSelect">
            <el-option
              style="padding: 0 10px"
              v-for="item in getAllCoin()"
              :key="item.id"
              :label="item.coinCode"
              :value="item.coinCode"
              @change="getTargetCoin"
            />
          </el-select>
        </el-form-item>
        <el-form-item class="mb24 duihuan"><i class="el-icon-sort" />兑换</el-form-item>
      

        <el-form-item label="兑换币种" class="mb24">
          <el-select v-model="bankForm2.exTarget"  class="elSelect">
            <el-option
              style="padding: 0 10px"
              v-for="item in targetCoinList"
              :key="item.id"
              :label="item.coinCode"
              :value="item.coinCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="兑换汇率" class="mb24">
          <el-input
            v-model="bankForm2.exRate"
          ></el-input>
        </el-form-item>
        <el-form-item class="preview" v-if="bankForm2.exFrom && bankForm2.exTarget && bankForm2.exRate">
          {{ `1${bankForm2.exFrom} = ${bankForm2.exRate}${bankForm2.exTarget}` }}
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
export default {
  data() {
    return {
      dialogVisible2: false,
      language: Local('lang') || 'zh',
      bankloading: false,
      bankForm2: {},
      options2: ["", "gth", "qy", "hwgs"],
      type: "first",
      dialogVisible: false,
      tableData: [],
      szList: [],
      tableData2: [],
      aereList: [],
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
    async del1(id) {
      this.$confirm("确认删除？")
        .then(async (_) => {
          try {
            await delDeposit({ id });
            Message({
              type: "success",
              message: "操作成功",
            });
            this.getlist();
          } catch (error) {}
        })
        .catch((_) => {});
    },
    async del2(id) {
      this.$confirm("确认删除？")
        .then(async (_) => {
          try {
            await delExchange({ id });
            Message({
              type: "success",
              message: "操作成功",
            });
            this.dialogVisible2()
            this.getlist2();
          } catch (error) {}
        })
        .catch((_) => {});
    },
    getNewaereList(list) {
      if (list.length) {
        const arr = list.filter((obj, index, self) => {  
          return self.findIndex(obj1 => obj1.coinCode === obj.coinCode) === index;  
        })
        return arr
      }
      return []
    },
    getAllCoin() {
      if (this.aereList.length) {
        let arr = this.aereList.filter((obj, index, self) => {  
          return self.findIndex(obj1 => obj1.coinCode === obj.coinCode) === index;  
        })
        arr = arr.concat(this.szList)
        return arr
      }
      return []
    },
    getTargetCoin(item) {
      console.log(item, 222222222)
    },
    async getFbList() {
      try {
        let list = Local("aereList");
        if (list && list.length) {
          return (this.aereList = list);
        }
        let res = await countries();
        this.aereList = res.data;
        Local("aereList", res.data);
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
      this.bankForm2 = {}
    },
    showAdd1() {
      this.dialogVisible = true;
      this.bankForm = {}
    },
    async handlesuccess(e) {
      //   this.$refs["form"].resetFields();
      const formData = new FormData();
      formData.append("file", e);
      try {
        let req = await upload(formData);
        if (req.code == 200) {
          this.bankForm.accountCer = req.data[0];
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
        const res = await setExchange({ ...this.bankForm2 });
        this.dialogVisible2 = false;
        if (res.code === 200) {
          Message({
            type: "success",
            message: "操作成功！",
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
          message: "添加成功",
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
    },
    async getlist() {
      try {
        this.loading = true
        let req = await getDeposits(this.form);
        this.loading = false
        req.data.forEach(item => {
          Object.keys(item.bank).forEach(key => {
            if (key !== 'coinCode') {
              item[key] = item.bank[key]
            }
          })
        })
        this.tableData = req.data;
      } catch (error) {}
    },
    async getlist2() {
      try {
        this.loading = true
        let req = await getExchanges();
        this.loading = false
        this.tableData2 = req.data;
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
}
.duihuan {
  text-align: center;
  font-weight: bold;
  color: $baseColor;
  font-size: 1.3rem!important;
}
.preview {
  color: #f99000;
}
.elSelect {
  width: 100%;
}
</style>