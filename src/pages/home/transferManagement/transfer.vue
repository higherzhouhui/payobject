<template>
  <div class="user_transactionInquiry_transfer_contianer">
    <LinkPath :linkList="linkList" />
    <template v-if="!visible">
      <div class="content flex">
        <div class="content_shadow">
          <img src="@/assets/images/transfer/left.png" alt="" />
          <div class="title">{{ $t("gyskk") }}</div>
          <div class="info">
            <div class="key">{{ $t("lyk1") }}：</div>
            <div class="value">{{ $t("lyv1") }}</div>
            <div class="key">{{ $t("lyk1") }}：</div>
            <div class="value">{{ $t("lyv2") }}</div>
          </div>
          <el-button type="primary" class="primary">{{ $t("kszz") }}</el-button>
        </div>
        <div class="content_shadow">
          <img src="@/assets/images/transfer/right.png" alt="" />
          <div class="title">{{ $t("zffwf") }}</div>
          <div class="info">
            <div class="key">{{ $t("lyk1") }}：</div>
            <div class="value">{{ $t("ryv1") }}/个人转账</div>
            <div class="key">{{ $t("lyk1") }}：</div>
            <div class="value">{{ $t("ryv2") }}</div>
          </div>
          <el-button type="primary" class="primary" @click="toTX">{{
            $t("kszz")
          }}</el-button>
        </div>
      </div>
    </template>
    <Trans v-else />
  </div>
</template>
<script>
import LinkPath from "@/components/common/linkPath.vue";
import Trans from "./trans.vue";
import { Local } from "@/utils/index";

export default {
  name: "userTransfers",
  components: { LinkPath, Trans },
  data() {
    return {
      visible: false,
      linkList: ["zzgl", "zz"],
    };
  },
  methods: {
    toTX() {
      if (Local("isSMZ")) {
        this.visible = true;
      } else {
        this.$confirm("当前交易需要完成实名认证，请先完成认证！", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.$router.push("/home/verified");
        });
      }
    },
  },
};
</script>
<style scoped lang="scss">
.user_transactionInquiry_transfer_contianer {
  .content {
    margin-top: 40px;
    padding: 40px 0;
    border-radius: 4px;
    border: 1px solid var(--unnamed, #dcdfe6);
    background: #fff;
    gap: 59px;
    justify-content: center;

    .content_shadow {
      padding: 24px;
      text-align: center;
      width: 344px;
      border-radius: 4px;
      border: 1px solid var(--unnamed, #dcdfe6);
      font-weight: 400;
      img {
        width: 64px;
        height: 64px;
      }

      .title {
        margin-top: 8px;
        font-size: 18px;
        color: #303133;
      }

      .info {
        margin-top: 56px;
        text-align: left;

        .key {
          font-size: 16px;
          color: #303133;
        }

        .value {
          margin: 16px 0;
          font-size: 14px;
          color: #909399;
        }
      }
      .primary {
        margin-top: 56px;
        width: 152px;
      }
    }
  }
}
</style>
