<template>
  <div class="user_moneymanagement_transfer_contianer">
    <!-- <LinkPath :linkList="linkList" style="margin-bottom: 1.5rem" v-if="!$store.state.userInfo.admin"/> -->
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
        <el-form-item :label="$t('kzt')">
          <el-select
            v-model="searchForm.status"
            :placeholder="$t('kzt')"
            clearable
          >
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
      <el-table
        class="tables"
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
        @row-click="(e) => handleShowDetail(e, 'detail')"
      >
        <el-table-column prop="depCoin" :label="$t('bz')" min-width="100" />
        <el-table-column prop="changeStatus" :label="$t('kzt')" min-width="120">
          <template slot-scope="scope">
            <el-tag :type="typeOption[scope.row.changeStatus]" class="elTag">
              {{ status[scope.row.changeStatus] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="depValue" :label="$t('dhje')" min-width="100" />
        <el-table-column
          prop="targetCoin"
          :label="$t('mbbz')"
          min-width="100"
        />
        <el-table-column
          prop="targetValue"
          :label="$t('yjdzje')"
          min-width="130"
        />

        <el-table-column
          prop="createTime"
          :label="$t('cjsj')"
          min-width="180"
        />
        <el-table-column
          prop="name"
          :label="$t('cz')"
          width="70"
          fixed="right"
        >
          <template slot-scope="scope">
            <!-- <div
              class="operation-btn"
              @click="handleShowDetail(scope.row, 'detail')"
            >
              {{ $t("xq") }}
            </div> -->

            <div
              v-if="scope.row.changeStatus == 0 && !$store.state.userInfo.admin"
              @click.stop="handleShowDetail(scope.row, 'cancel')"
              class="operation-btn reject-btn"
            >
              {{ $t("cancel") }}
            </div>

            <div
              v-if="scope.row.changeStatus == 0 && $store.state.userInfo.admin"
              class="operation-btn pass-btn"
              @click.stop="handleShowDetail(scope.row, 'pass')"
            >
              {{ $t("tg") }}
            </div>
            <div
              v-if="scope.row.changeStatus == 0 && $store.state.userInfo.admin"
              class="operation-btn reject-btn"
              @click.stop="rejectConfirm(scope.row)"
            >
              {{ $t("bh") }}
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
      :title="operationType == 'detail' ? $t('xq') : operationType == 'pass' ? $t('sh') : $t('cancel')"
      :visible.sync="dialogVisible"
      width="636px"
      :before-close="
        () => {
          dialogVisible = false;
        }
      "
    >
    <div class="formStyle">
      <div
        class="list"
        v-for="(item, index) in detailList.filter((item) => {
          return item.value;
        })"
        :key="index"
      >
        <div class="list-left">{{ item.label }}</div>
        <div class="list-right">
          <template v-if="item.type == 'link'">
            <a :href="item.value" target="_blank">
              {{ $t("yulan") }}
            </a>
          </template>
          <template v-else>
            {{ item.value }}
          </template>
        </div>
      </div>
    </div>
      <!-- <el-form
        label-position="top"
        ref="formss"
        :model="currentSelectRow"
        class="formStyle"
      >
        <el-form-item :label="$t('bz')">
          <el-input
            v-model="currentSelectRow.depCoin"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('dhje')">
          <el-input
            v-model="currentSelectRow.depValue"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('mbbz')">
          <el-input
            v-model="currentSelectRow.targetCoin"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('yjdzje')">
          <el-input
            v-model="currentSelectRow.targetValue"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('bhly')" v-if="currentSelectRow.memo">
          <el-input
            type="textarea"
            v-model="currentSelectRow.memo"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('cjsj')">
          <el-input
            v-model="currentSelectRow.createTime"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('xgsj')">
          <el-input
            v-model="currentSelectRow.modifiedTime"
            :readOnly="true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('hkpz')" v-if="currentSelectRow.reqProof">
          <el-button
            style="padding: 4px 20px"
            size="small"
            type="primary"
            class="btn"
            ><a
              :href="'/api/file/downLoad?url=' + currentSelectRow.reqProof"
              target="_blank"
              >{{ $t("yulan") }}</a
            ></el-button
          >
        </el-form-item>
      </el-form> -->
      <div slot="footer">
        <el-button class="qx" @click="dialogVisible = false">{{
          $t("cancel")
        }}</el-button>
        <el-button class="qd" @click="handleDialogQd" v-if="operationType !== 'detail'">
          {{ operationType == 'pass' ?  $t("tg") : $t('queding') }}
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="$t('bh')"
      :visible.sync="rejectdialogVisible"
      width="636px"
      :before-close="
        () => {
          rejectdialogVisible = false;
        }
      "
    >
      <el-form label-position="top" ref="formss">
        <el-form-item :label="$t('bhly')">
          <el-input type="textarea" v-model="mime" :placeholder="$t('qsr')"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button
          type="info"
          size="large"
          class="qx"
          @click="rejectdialogVisible = false"
          >{{ $t("cancel") }}</el-button
        >
        <el-button
          type="primary"
          size="large"
          class="qd"
          @click="rejectCertin"
          >{{ $t("sure") }}</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
  <script>
import LinkPath from "@/components/common/linkPath.vue";
import { perWithdraw, depCoins, withdrawAccounts } from "@/api/out.js";
import { changeCancel, changeDetails, changePer } from "@/api/convert.js";
import { upload } from "@/api/file";
import { Message } from "element-ui";

export default {
  name: "userMoneyManagementTransfer",
  components: { LinkPath },
  data() {
    return {
      operationType: "",
      detailList: [],
      rejectdialogVisible: false,
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
      tableData: [],
      options: [],
      type: "1",
      usdtdialogVisible: false,
      linkList: ["txgl", "duihuanls"],
      form: {
        name: "",
      },
      loading: true,
      status: [this.$t("dsh"), this.$t("ytg"), this.$t("yqx"), this.$t("bh")],
      typeOption: ["", "success", "warning", "danger"],
      dialogVisible: false,
      currentSelectRow: {},
      inCoinList: [],
      outCoinList: [],
      current: 1,
      size: 10,
      total: 0,
      searchForm: {},
      mime: "",
    };
  },
  created() {
    this.getInitData();
    this.getRJBZ();
    this.getCJZH();
    console.log(this.$store.state);
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
      this.current = 1;
      this.getInitData();
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
    rejectConfirm(row) {
      this.currentSelectRow = row;
      this.mime = "";
      this.rejectdialogVisible = true;
    },
    async rejectCertin() {
      try {
        const param = {
          id: this.currentSelectRow.id,
          pass: false,
          mime: this.mime,
        };
        changePer(param);
        Message({
          type: "success",
          message: this.$t("czcg"),
        });
        this.getInitData();
        this.rejectdialogVisible = false;
      } catch {}
    },
    handleDialogQd() {
      if (this.operationType == 'pass') {
        this.confirmPass(this.currentSelectRow)
      } else {
        this.cancelReq(this.currentSelectRow)
      }
    },
    confirmPass(row) {
      try {
        this.loading = true;
        changePer({ id: row.id, pass: true });
        this.loading = false;
        row.changeStatus = 1;
        Message({
          type: "success",
          message: this.$t("czcg"),
        });
        this.dialogVisible = false
      } catch (err) {
        this.loading = false;
      }
    },
    cancelReq(row) {
      try {
        this.loading = true;
        changeCancel({ id: row.id });
        this.loading = false;
        row.changeStatus = 2;
        this.dialogVisible = false
      } catch (err) {
        this.loading = false;
      }
    },
    handleShowDetail(row, type) {
      this.currentSelectRow = row;
      this.operationType = type
      this.dialogVisible = true;
      this.detailList = [
        {label: this.$t('bz'), value: row.depCoin},
        {label: this.$t('dhje'), value: row.depValue},
        {label: this.$t('mbbz'), value: row.targetCoin},
        {label: this.$t('kzt'), value: this.status[row.changeStatus]},
        {label: this.$t('hl'), value: row.changeRate},
        {label: this.$t('yjdzje'), value: row.targetValue},
        {label: this.$t('cjsj'), value: row.createTime},
        {label: this.$t('xgsj'), value: row.modifiedTime},
      ]
    },
    async getInitData() {
      this.loading = true;
      let res;
      res = await changeDetails({
        ...this.searchForm,
        current: this.current,
        size: this.size,
      });
      this.loading = false;
      if (res.code === 200) {
        this.tableData = [...res.data.records];
        this.total = res.data.total;
      }
    },
    async handlesuccess(e, row) {
      const data = row;
      const size = e.size;
      if (size > 20 * 1024 * 1024) {
        Message({
          type: "error",
          message: this.$t("sizeOver"),
        });
        return;
      }
      const formData = new FormData();
      formData.append("file", e);
      try {
        const req = await upload(formData);
        if (req.code === 200) {
          data.reqProof = req.data[0];
          data.reqStatus = 2;
          let res;
          res = await perWithdraw(data);
          if (res.code === 200) {
            Message({
              type: "success",
              message: this.$t("sccg"),
            });
          }
        }
      } catch (error) {
        console.log(error);
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
    border-radius: 4px;
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
  