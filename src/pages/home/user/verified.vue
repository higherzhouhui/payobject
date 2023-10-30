<template>
  <div class="verified_container">
    <div class="content" :class="tips == 4 ? 'content_hui' : 'content_shadow'">
      <div class="s_title">{{ $t("verified") }}</div>
      <template v-if="tips == 4">
        <TypeOne @to="tips = 1" :type="qyType" />
      </template>
      <template v-else>
        <div class="process_box mt40">
          <el-steps :active="1" align-center>
            <el-step :title="$t('cpxz')" :description="$t('cpxz2')"></el-step>
            <el-step :title="$t('ksrz')" :description="$t('ksrz2')"></el-step>
          </el-steps>
        </div>
        <LinkPath
          :showHome="tips == 2"
          class="mt24"
          :linkList="linkList"
          v-if="tips != 1"
        >
          <el-button slot="right" @click="tips = 1" class="primary small"
            ><img src="@/assets/images/user/quit.png" alt="" />{{
              $t("cxxz")
            }}</el-button
          >
        </LinkPath>
        <div class="mt40 choice_box" v-if="tips == 1">
          <div class="title flex flex_align_center">
            <img src="@/assets/images/user/head_icon.png" alt="" />
            <span>{{ $t("wysk") }}</span>
          </div>
          <div class="txt">
            {{ $t("wysk2") }}
          </div>
          <el-button @click="checkTips(3)" class="primary" type="primary"
            ><img src="@/assets/images/user/to.png" alt="" />{{
              $t("ljkt")
            }}</el-button
          >
        </div>
        <div class="mt24 choice_box2 flex" v-if="tips == 2">
          <div class="item content_shadow">
            <div class="title">{{ $t("kjdssk") }}</div>
            <img src="@/assets/images/user/left.png" alt="" />
            <div class="txt">{{ $t("kjdssk2") }}</div>
            <el-button
              class="primary"
              @click="checkTips(3, 'kjdssk')"
              type="primary"
              >{{ $t("ksrz") }}</el-button
            >
          </div>
          <div class="item content_shadow">
            <div class="title">{{ $t("wmsk") }}</div>
            <img src="@/assets/images/user/right.png" alt="" />
            <div class="txt">{{ $t("wmsk2") }}</div>
            <el-button
              class="primary"
              @click="checkTips(3, 'wmsk')"
              type="primary"
              >{{ $t("ksrz") }}</el-button
            >
          </div>
        </div>
        <div class="mt24 choice_box3 flex" v-if="tips == 3">
          <div class="item content_shadow">
            <img src="@/assets/images/user/sh_1.png" alt="" />
            <div class="title">{{ $t("rz1") }}</div>
            <div class="txt">{{ $t("rz1-2") }}</div>
            <div class="info">
              <div class="val">1）{{ $t("rz1-3") }}</div>
              <div class="val">2）{{ $t("rz1-4") }}</div>
            </div>
            <el-button
              class="primary"
              @click="checkTips(4, '', 1)"
              type="primary"
              >{{ $t("ksrz") }}</el-button
            >
          </div>
          <div class="item content_shadow">
            <img src="@/assets/images/user/sh_1.png" alt="" />
            <div class="title">{{ $t("rz2") }}</div>
            <div class="txt">{{ $t("rz2-2") }}</div>
            <div class="info">
              <div class="val">1）{{ $t("rz2-3") }}</div>
              <div class="val">2）{{ $t("rz2-4") }}</div>
              <div class="val">3）{{ $t("rz2-5") }}</div>
            </div>
            <el-button
              class="primary"
              @click="checkTips(4, '', 2)"
              type="primary"
              >{{ $t("ksrz") }}</el-button
            >
          </div>
          <div class="item content_shadow">
            <img src="@/assets/images/user/sh_2.png" alt="" />
            <div class="title">{{ $t("rz3") }}</div>
            <div class="txt">{{ $t("rz3-2") }}</div>
            <div class="info">
              <div class="val">1）{{ $t("rz3-3") }}</div>
              <div class="val">2）{{ $t("rz3-4") }}</div>
              <div class="val">3）{{ $t("rz3-5") }}</div>
              <div class="val">4）{{ $t("rz3-6") }}</div>
            </div>
            <el-button
              class="primary"
              @click="checkTips(4, '', 3)"
              type="primary"
              >{{ $t("ksrz") }}</el-button
            >
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import LinkPath from "@/components/common/linkPath.vue";
import TypeOne from "./form/type1.vue";
import { Local } from "@/utils/index";

export default {
  components: { LinkPath, TypeOne },
  name: "userVerified",
  data() {
    return {
      tips: 1,
      linkList: [],
      qyType: 1,
    };
  },
  created() {
    this.calcCurrentStep()
  },
  methods: {
    calcCurrentStep() {
      const accountKyc = Local('accountKyc') || {}
      if (accountKyc.kyc && accountKyc.kyc.kycStatus == 2) {
        this.tips = 4
      } 
    },
    checkTips(index, type, qytype) {
      if (index == 2) {
        this.linkList = ["jxrz", "wysk"];
      } else {
        this.linkList = ["wysk", type];
      }
      this.qyType = qytype
      this.tips = index;
    },
  },
};
</script>
<style scoped lang="scss">
.verified_container {
  .content_hui {
    background: #f4f4f4;
  }

  .content {
    padding: 32px 40px;

    .choice_box {
      padding: 24px;
      width: 352px;
      border-radius: 4px;
      border: 1px solid var(--unnamed, #dcdfe6);
      background: var(--unnamed, #fff);

      .title {
        color: #303133;
        font-size: 20px;

        img {
          margin-right: 5px;
          height: 40px;
          width: 40px;
        }
      }

      .txt {
        margin: 24px 0;
        color: var(--unnamed, #909399);
        font-size: 14px;
      }
    }

    .choice_box3 {
      gap: 40px;
      justify-content: center;

      .item {
        position: relative;
        padding: 24px 24px 80px;
        width: 290px;
        text-align: center;
        color: #303133;

        .primary {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 24px;
          // margin-top: 40px;
          width: 152px;
        }

        .title {
          margin-top: 10px;
          font-size: 20px;
        }

        .info {
          margin-top: 20px;
          text-align: left;
          font-size: 14px;
          color: #606266;

          .val {
            margin-bottom: 4px;
          }
        }

        .txt {
          text-align: left;
          margin-top: 24px;
          font-size: 16px;
        }

        img {
          width: 72px;
          height: 72px;
        }
      }
    }

    .choice_box2 {
      gap: 56px;
      justify-content: center;

      .item {
        padding: 32px 40px;
        width: 352px;
        text-align: center;

        img {
          margin: 24px 0;
          width: 200px;
        }

        .title {
          padding: 13px 0;
          color: var(--unnamed, #303133);
          font-size: 20px;
          font-weight: 500;
          border-bottom: 1px solid var(--unnamed, #dcdfe6);
        }

        .primary {
          width: 152px;
        }

        .txt {
          margin: 0 auto 24px;
          width: 200px;
          color: var(--unnamed, #909399);
          text-align: center;
          font-family: PingFang SC;
          font-size: 14px;
        }
      }
    }

    .process_box {
      padding: 24px 40px;
      border-radius: 4px;
      border: 1px solid var(--unnamed, #dcdfe6);
    }

    .process_box {
      ::v-deep .el-step__icon {
        width: 48px;
        height: 48px;
      }

      ::v-deep .el-step__head {
        // width: 97%;

        .el-step__line {
          transform: translate(0, 11px) !important;
        }

        .el-step__icon {
          font-size: 28px;
          color: #909399;
          border-color: #909399;
          background: #f4f4f4;
        }

        &.is-finish {
          .el-step__icon {
            // transform: translateX(40px);
            color: #3476ff;
            border-color: #3476ff;
          }
        }
      }
    }

    .process_box {
      // width: 100%;

      ::v-deep .el-step__main {
        .el-step__title {
          color: #303133;
          // transform: translateX(-10px);
        }

        .el-step__description {
          color: #909399;
          // transform: translateX(-30px);
        }

        .is-finish {
          &.el-step__description {
            color: #3476ff;
            // transform: translateX(0);
          }

          &.el-step__title {
            color: #3476ff;
            // transform: translateX(30px);
          }
        }
      }

      ::v-deep .el-step__head {
        // width: 97%;

        .el-step__icon {
          font-size: 28px;
          color: #909399;
          border-color: #909399;
          background: #f4f4f4;
        }

        &.is-finish {
          .el-step__icon {
            // transform: translateX(40px);
            color: #3476ff;
            border-color: #3476ff;
          }
        }
      }
    }
  }
}
</style>