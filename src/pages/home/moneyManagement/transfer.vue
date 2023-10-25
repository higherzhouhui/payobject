<template>
  <div class="user_moneymanagement_transfer_contianer">
    <LinkPath :linkList="linkList" />
    <div class="content">
      <div class="s_title">{{ $t("hh") }}</div>
      <!-- <div class="empty_box">
                <el-empty description=" "></el-empty>
                <el-button type="primary" class="primary"><img src="@/assets/images/moneyManage/ljkh.png">{{ $t('ljkh') }}</el-button>
            </div> -->
      <el-table class="tables" :data="tableData" style="width: 100%">
        <el-table-column prop="name" :label="$t('skrq')" width="180" />
        <el-table-column prop="name" :label="$t('skdh')" width="200" />
        <el-table-column prop="name" :label="$t('zhbmbh')" width="180" />
        <el-table-column prop="name" :label="$t('skje')" width="180" />
        <el-table-column prop="name" :label="$t('sxfje')" width="180" />
        <el-table-column prop="name" :label="$t('ddzt')" width="180" />
        <el-table-column prop="name" :label="$t('skrxx')" width="180" />
        <el-table-column
          prop="name"
          :label="$t('cz')"
          width="180"
          fixed="right"
        />
        <div slot="empty">
          <el-empty
            :description="$t('nodata')"
            style="padding: 50px"
          ></el-empty>
        </div>
      </el-table>
    </div>
  </div>
</template>
<script>
import LinkPath from "@/components/common/linkPath.vue";
export default {
  name: "userMoneyManagementTransfer",
  components: { LinkPath },
  data() {
    return {
      tableData: [],
      options: [],
      type: "1",
      dialogVisible2: false,
      linkList: ["zjgl", "hh"],
      form: {
        name: "",
      },
    };
  },
  methods: {
    handleClick() {},
  },
};
</script>
<style scoped lang="scss">
.user_moneymanagement_transfer_contianer {
  .content {
    margin-top: 40px;
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
</style>
