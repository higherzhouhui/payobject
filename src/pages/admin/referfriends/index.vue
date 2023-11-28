<template>
  <div class="refer">
    <div class="refer-container">
      <h1>{{ $t("tjgpy") }}</h1>
      <div class="label">{{ $t("wdyqm") }}</div>
      <div class="code" @click="copyText2(userInfo.providerId)">
        <div class="number">{{ userInfo.providerId }}</div>
        <img src="@/assets/images/home/copy.png" />
      </div>
      <!-- <div class="label">{{$t("yqlj")}}</div>
      <div class="code"  @click="copyText2(shareLink)">
        <div class="number">{{shareLink}}</div>
        <img src="@/assets/images/home/copy.png"/>
      </div> -->
    </div>
    <div class="table-wrapper">
      <el-table
        class="tables"
        size="small"
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column
          prop="email"
          :label="$t('邮箱/手机号')"
          min-width="180"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.email || scope.row.phone }}
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          :label="$t('cjsj')"
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
import { getInviteUser } from "@/api/common";
export default {
  name: "referMfrend",
  props: {
    msg: String,
  },
  data() {
    return {
      userInfo: this.$store.state.userInfo,
      shareLink: "",
      tableData: [],
      loading: true,
      current: 1,
      size: 10,
      total: 0,
    };
  },
  created() {
    this.getShareLink();
    this.getInitData();
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
    getShareLink() {
      const href = `${location.origin}#/user/register?inviteCode=${this.userInfo.providerId}`;
      this.shareLink = href;
    },
    copyText2(word) {
      navigator.clipboard
        .writeText(word)
        .then(() => {
          this.$message.success(this.$t("copysuccess"));
        })
        .catch(() => {
          console.error("copy fail");
        });
    },
    async getInitData() {
      try {
        this.loading = true;
        const res = await getInviteUser({
          current: this.current,
          size: this.size,
        });
        this.tableData = res.data.records;
        this.total = res.data.total;
        this.loading = false;
      } catch {
        this.loading = false;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.refer-container {
  margin: 2rem auto;
  padding: 1.5rem;
  width: fit-content;
  background: $contentColor;
  border-radius: 8px;
  @media screen and (max-width: 800px) {
    padding: 1rem;
    .code {
      width: 330px !important;
    }
  }
  h1 {
    font-size: 1.6rem;
    color: #fff;
    margin: 1rem 0;
  }
  .label {
    color: #fff;
    margin-bottom: 8px;
  }
  .code {
    display: flex;
    background: #fff;
    align-items: center;
    justify-content: space-between;
    width: 550px;
    padding: 4px 8px;
    border-radius: 6px;
    margin-bottom: 1rem;
    .number {
      border-radius: 6px;
      word-break: break-all;
    }
    img {
      width: 30px;
      min-width: 30px;
      margin-left: 6px;
      cursor: pointer;
    }
  }
}
.table-wrapper {
  background: $contentColor;
  padding: 1rem;
  border-radius: 0.5rem;
}
</style>