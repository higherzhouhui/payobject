<template>
  <div class="user_transferAccountMangement_contianer">
    <LinkPath :linkList="linkList" />
    <div class="content">
      <div class="s_title flex flex_align_center flex_jc_sb_end">
        <!-- <div>{{ $t("zzzhgl") }}</div> -->
        <el-button type="primary" @click="showAdd" class="normal-btn"
          ><i class="el-icon-plus"></i>{{ $t("zjzzzh") }}</el-button
        >
      </div>
      <el-form ref="form2" :inline="true" class="mt12">
        <el-form-item>
          <el-input
            :placeholder="$t('bankname')"
            v-model="form.bankName"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            :placeholder="$t('yhzhh')"
            v-model="form.bankAccount"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.bankStatus" :placeholder="$t('zhbdzt')" clearable>
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
          <!-- <el-button class="primary">
            <i class="el-icon-refresh"></i>{{ $t("reset") }}
          </el-button> -->
        </el-form-item>
      </el-form>
      <el-table class="tables" :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column prop="accountName" :label="$t('zhmc')" width="180" show-overflow-tooltip	/>
        <el-table-column prop="bankName" :label="$t('bankname')" width="180" show-overflow-tooltip	/>
        <el-table-column prop="bankAccount" :label="$t('yhzh')" width="200" show-overflow-tooltip	/>
        <el-table-column prop="accountAdd" :label="$t('jzdz')" min-width="180" show-overflow-tooltip/>
        <el-table-column prop="bankStatus" :label="$t('kzt')" width="120">
          <template slot-scope="scope">
            <el-tag :type="typeOption[scope.row.bankStatus]" class="elTag">
              {{ status[scope.row.bankStatus] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" :label="$t('cjrq')" min-width="165" show-overflow-tooltip/>
        <el-table-column
          prop="name"
          :label="$t('cz')"
          width="140"
          fixed="right"
        >
          <template slot-scope="scope">
            <span
              @click="toDetail(scope.row)"
              class="baseColor cursor"
              style="cursor: pointer"
              >详情</span
            >
            <span
              class="deleteColor cursor"
              style="cursor: pointer; margin-left: 10px;"
              @click="delBank(scope.row.id)"
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
    <el-dialog
      :title="bankForm.id ? `${$t('详情')}` : $t('zjzzzh')"
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
        <el-form-item :label="$t('zhmc')" class="mb24">
          <el-input
            v-model="bankForm.accountName"
            :disabled="!!bankForm.id"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('ssgj')" class="mb24">
          <!-- <el-input
            v-model="bankForm.country"
            :disabled="!!bankForm.id"
          ></el-input> -->
          <el-select
            style="width: 100%"
            v-model="bankForm.country"
            :disabled="!!bankForm.id"
          >
            <el-option
              style="padding: 0 10px"
              v-for="item in aereList"
              :key="item.id"
              :label="languge == 'zh' ? item.name : item.enName"
              :value="item.areaCode"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('jzdz')" class="mb24">
          <el-input
            v-model="bankForm.accountAdd"
            :disabled="!!bankForm.id"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('bankname')" class="mb24">
          <el-input
            v-model="bankForm.bankName"
            :disabled="!!bankForm.id"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('swift')" class="mb24">
          <el-input
            v-model="bankForm.swiftCode"
            :disabled="!!bankForm.id"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('bankcode')" class="mb24">
          <el-input
            v-model="bankForm.bankCode"
            :disabled="!!bankForm.id"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('bankcount')" class="mb24">
          <el-input
            v-model="bankForm.bankAccount"
            :disabled="!!bankForm.id"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('khgj')" class="mb24">
          <!-- <el-input
            v-model="bankForm.bankCountry"
            :disabled="!!bankForm.id"
          ></el-input> -->
          <el-select
            style="width: 100%"
            v-model="bankForm.bankCountry"
            :disabled="!!bankForm.id"
          >
            <el-option
              style="padding: 0 10px"
              v-for="item in aereList"
              :key="item.id"
              :label="languge == 'zh' ? item.name : item.enName"
              :value="item.areaCode"
            >
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item :label="$t('khdz')" class="mb24">
          <el-input
            v-model="bankForm.bankAdd"
            :disabled="!!bankForm.id"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('驳回理由')" class="mb24" v-if="bankForm.bankStatus == 2">
          <el-input
            v-model="bankForm.reason"
            :disabled="!!bankForm.id"
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
          <el-button
            v-else
            style="padding: 4px 20px"
            
            size="small"
            type="primary"
            class="btn"
            ><a :href="'/api/file/downLoad?url=' + bankForm.accountCer" target="_blank">点击下载</a></el-button
          >
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer" v-if="!bankForm.id">
        <el-button @click="dialogVisible = false">{{ $t("cancel") }}</el-button>
        <el-button
          type="primary"
          :class="bankloading && 'loading'"
          @click="addBank"
          >{{ $t("sure") }}</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import LinkPath from "@/components/common/linkPath.vue";
import { getBankList, subBank, bankDel } from "@/api/bank";
import { countries } from "@/api/login";
import { Message } from "element-ui";
import { upload, downLoad } from "@/api/file";
import { Local } from "@/utils/index"
export default {
  name: "transferAccountMangement",
  components: { LinkPath },
  data() {
    return {
      languge: Local("lang") || "zh",
      dialogVisible: false,
      bankloading: false,
      loading: true,
      tableData: [],
      status: ["审核中", "已通过", "驳回"],
      typeOption: ["warning", "success", "danger"],
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
      aereList: [],
    };
  },
  created() {
    this.getlist();
    this.getAreaCode()
  },
  methods: {
    async getAreaCode() {
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
    toDetail(data) {
      this.dialogVisible = true;
      this.$set(this, "bankForm", data);
      //   this.bankForm = dat ;
    },
    downLoad,
    showAdd() {
      this.dialogVisible = true;
      this.bankForm = this.default;
    },
    handleClick() {},
    async handlesuccess(e) {
      //   this.$refs["form"].resetFields();
      const formData = new FormData();
      formData.append("file", e);
      try {
        let req = await upload(formData);
        this.bankForm.accountCer = req.data[0];
        Message({
          type: "success",
          message: this.$t("sccg"),
        });
      } catch (error) {}
      return false;
    },
    delBank(id) {
      this.$confirm("确认删除？")
        .then(async (_) => {
          try {
            await bankDel({ bankId: id });
            Message({
              type: "success",
              message: "删除成功",
            });
            this.getlist();
          } catch (error) {}
        })
        .catch((_) => {});
    },
    async addBank() {
      if (this.bankloading) return;
      try {
        this.bankloading = true;
        await subBank(this.bankForm);
        Message({
          type: "success",
          message: this.$t("fscg"),
        });
        this.getlist()
        this.dialogVisible = false;
        this.bankloading = false;
      } catch (error) {
        this.bankloading = false;
      }
    },
    async getlist() {
      try {
        this.loading = true
        let req = await getBankList(this.form);
        this.tableData = req.data;
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
  },
};
</script>
<style scoped lang="scss">
.user_transferAccountMangement_contianer {
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
      i {
        margin-right: 4px;
      }
    }
  }
}

.deleteColor {
  color: red
}
</style>
