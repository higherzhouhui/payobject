<template>
  <div class="refer">
    <div class="refer-container">
      <div class="admin-title">{{ $store.state.title }}</div>
      <div class="list">
        <div class="list-left">{{ $t("wdyqm") }}</div>
        <div class="list-right" @click="copyText2(userInfo.providerId)" style="cursor: pointer">
          {{ userInfo.providerId }}
          <i class="el-icon-document-copy"></i>
        </div>
      </div>
    </div>
    <div class="table-wrapper">
      <div class="admin-title">{{$t('推荐列表')}}</div>
      <el-table
        class="tables"
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column
          prop="email"
          :label="$t('邮箱/手机号')"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.email || scope.row.phone }}
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          :label="$t('cjsj')"
          min-width="120"
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
      layout="prev, pager, next"
      small        :total="total"
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
      let textArea = document.createElement("textarea");
      textArea.value = word;
      // 使text area不在viewport，同时设置不可见
      textArea.style.position = "absolute";
      textArea.style.opacity = 0;
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      return new Promise((res, rej) => {
        // 执行复制命令并移除文本框
        document.execCommand("copy") ? res() : rej();
        this.$message.success(this.$t("fzcg"))
        textArea.remove();
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
.refer {
  display: grid;
  row-gap: 1rem;
  column-gap: 1rem;
  grid-template-columns: 1fr 2fr;
  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
}
.refer-container {
  padding: 1.5rem;
  width: 100%;
  background: $contentColor;
  border-radius: 6px;
  .list {
    background: $bgColor;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    font-weight: bold;
    margin-top: 8px;
    border-radius: 4px;
    padding: 8px 4px;
    .list-left::after {
      content: ':';
    }
  }
}
.table-wrapper {
  background: $contentColor;
  padding: 1.5rem;
  border-radius: 6px;
}
</style>