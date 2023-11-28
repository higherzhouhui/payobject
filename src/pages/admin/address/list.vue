<template>
  <div class="user_transferAccountMangement_contianer">
    <div class="content">
      <div class="s_title flex flex_align_center flex_jc_sb_end">
        <el-button type="primary" @click="showAdd" class="normal-btn"
          ><i class="el-icon-plus"></i>{{ $t("新增地址") }}</el-button
        >
      </div>
      <el-table
        class="tables"
        size="small"
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
      >
      <el-table-column
      prop="cryName"
      :label="$t('别名')"
      min-width="100"
      show-overflow-tooltip
    />
        <el-table-column
          prop="cryAdd"
          :label="$t('地址')"
          min-width="180"
          show-overflow-tooltip
        />
        <el-table-column
          prop="agreement"
          :label="$t('jmxy')"
          min-width="180"
          show-overflow-tooltip
        />
        <el-table-column
          prop="createTime"
          :label="$t('cjsj')"
          min-width="165"
          show-overflow-tooltip
        />
        <el-table-column
          prop="name"
          :label="$t('cz')"
          width="140"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              type="info"
              class="btn"
              size="small"
              @click="toDetail(scope.row, 'detail')"
            >
              {{ $t("xq") }}
            </el-button>
            <el-button
              type="primary"
              class="btn"
              size="small"
              @click="toDetail(scope.row, 'update')"
            >
              {{ $t("xg") }}
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
      width="600px"
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
        <el-form-item :label="$t('别名')">
          <el-input
            v-model="form.cryName"
            :placeholder="$t('请输入别名')"
          ></el-input>
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
        <el-form-item :label="$t('地址')">
          <el-input
            v-model="form.cryAdd"
            :placeholder="$t('请输入地址')"
          ></el-input>
        </el-form-item>
       <passwordVue @changeData="componentDataChange" v-if="showObj.title != $t('xq')"/>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t("cancel") }}</el-button>
        <el-button
          class="qd"
          :class="bankloading && 'loading'"
          @click="addAddress"
          >{{showObj.btn}}</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { outCryAccPage, setOutCryAcc, bankDel } from "@/api/bank";
import { countries } from "@/api/login";
import { Message } from "element-ui";
import { upload } from "@/api/file";
import { getHashParams, Local } from "@/utils/index";
import { getFlagIcon } from "@/utils/common";
import passwordVue from '@/components/common/password.vue';

export default {
  name: "addressList",
  components: {
    passwordVue,
  },
  data() {
    return {
      agreementList: [
        { label: "TRC20", value: "TRC20" },
        { label: "ERC20", value: "ERC20" },
      ],
      showObj: {
        title: this.$t('add'),
        btn: this.$t('sure')
      },
      getFlagIcon: getFlagIcon,
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
      total: 0
    };
  },
  created() {
    this.getInitData();
    // this.getAreaCode();
    const params = getHashParams();
    if (params.get("type") == "add") {
      this.showAdd();
    }
  },
  methods: {
    handleSizeChange(val) {
      this.size = val;
      this.getInitData();
    },
    handleCurrentChange(val) {
      this.current = val;
      this.getInitData();
    },
    handleChangeSearch() {
      this.current = 1
      this.getInitData();
    },
    componentDataChange(params) {
      this.form = {...this.form, ...params}
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
      if (type == 'detail') {
        this.showObj = {
          title: this.$t('xq'),
          btn: this.$t('sure')
        }
      } else {
        this.showObj = {
          title: this.$t('xg'),
          btn: this.$t('sure')
        }
      }

      this.$set(this, "form", data);
    },
    showAdd() {
      this.dialogVisible = true;
      this.form = {};
      this.showObj = {
          title: this.$t('add'),
          btn: this.$t('sure')
        }
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
          userId: this.$store.state.userInfo.id
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
        size: this.size
      }
      try {
        this.loading = true;
        let req = await outCryAccPage(searchParam);
        this.tableData = req.data.records;
        this.loading = false;
        this.total = req.data.total
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
