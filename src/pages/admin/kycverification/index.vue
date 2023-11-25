<template>
  <div class="verified_container" v-loading="loading">
    <div class="content" :class="tips == 4 ? 'content_hui' : 'content_shadow'">
      <div class="s_title">
        {{ status }}
        <span class="hint_title">{{reason}}</span>
      </div>
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
        <!-- <LinkPath
          :showHome="tips == 2"
          class="mt24"
          :linkList="linkList"
          v-if="tips != 1"
        >
          <el-button slot="right" @click="tips = 1" class="small primary normal-btn"
            ><img src="@/assets/images/user/quit.png" alt="" />{{
              $t("cxxz")
            }}</el-button
          >
        </LinkPath> -->
        <div class="choice_box" v-if="tips == 1">
          <div class="title flex flex_align_center">
            <img src="@/assets/images/user/head_icon.png" alt="" />
            <span>{{ $t("wysk") }}</span>
          </div>
          <div class="txt">
            {{ $t("wysk2") }}
          </div>
          <el-button @click="checkTips(3)" class="primary normal-btn" type="primary"
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
              class="primary normal-btn"
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
            class="primary normal-btn"
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
            class="primary normal-btn"
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
import TypeOne from "./typeone.vue";
import { Local } from "@/utils/index";
import {getAccountKyc} from '@/api/user'
export default {
  components: { LinkPath, TypeOne },
  name: "userVerified",
  data() {
    return {
      tips: 1,
      linkList: [],
      qyType: 1,
      userInfo: this.$store.state.userInfo,
      loading: false,
      status: '',
      reason: '',
    };
  },
  created() {
    this.initKycData()
  },
  methods: {
    calcCurrentStep() {
      const accountKyc = this.$store.state.userInfo || {}
      if (accountKyc.kyc) {
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
    getBaseKycInfo() {
        let status = this.$t('smrz')
        if (this.userInfo.kyc) {
            status = this.$t('zzshz')
            if (this.userInfo.kyc.kycStatus == 1) {
                status = this.$t('yrzcg')
            }
            if (this.userInfo.kyc.kycStatus === 2) {
                status = this.$t('csrz')
            }
        }
        this.status = status
        let reason = ''
        if (this.userInfo.kyc) {
          if (this.userInfo.kyc.kycStatus === 0) {
                reason = this.$t('zzshzloading')
            }
            if (this.userInfo.kyc.kycStatus === 1) {
                reason = this.$t('rxxgqlxwm')
            }
            if (this.userInfo.kyc.kycStatus === 2) {
                reason = this.userInfo.kyc.reason
            }
        }
        this.reason = reason
    },
    initKycData() {
        this.loading = true
        getAccountKyc().then(rt=>{
            const userInfo = this.$store.state.userInfo
            this.loading = false
            try {
                Object.keys(rt.data).map(key => {
                    userInfo[key] = rt.data[key]
                })
                this.$store.commit('SET_USERINFO', userInfo)
                this.userInfo = userInfo
                this.calcCurrentStep()
                this.getBaseKycInfo()
            } catch {
                if(rt.data && rt.data.kyc && rt.data.kyc.kycStatus == 1) {
                    Local('isSMZ',  true)
                }
            }
        }).catch(() => {
          this.loading = false
        })
    },
  },
};
</script>
<style scoped lang="scss">
.verified_container {
  .content_hui {
    background: $contentColor;
  }

  .content {
    padding: 1rem;
    .s_title {
      color: #fff;
      font-size: 1.2rem;
      animation: bounceln 0.8s forwards 0.75s;
    }
    .hint_title {
        font-size: 15px;
        color: rgb(201, 127, 127);
      }
    .choice_box {
      padding: 24px;
      width: 352px;
      border-radius: 4px;
      background: rgba($color: #000000, $alpha: 0.22);
      margin: 36px auto 0 auto;
      .title {
        color: #fff;
        font-size: 1.2rem;

        img {
          margin-right: 5px;
          height: 40px;
          width: 40px;
        }
      }
      .primary {
        margin: 0 auto;
      }
      .txt {
        margin: 24px 0;
        color: rgba($color: #fff, $alpha: 0.8);
        font-size: 14px;
      }
    }

    .choice_box3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      column-gap: 1rem;
      @media screen and (max-width: 800px) {
        flex-direction: column;
        align-items: center;
        row-gap: 1rem;
        grid-template-columns: repeat(1, 1fr);
      }
      .item {
        position: relative;
        padding: 24px 24px 80px;
        text-align: center;
        color: #fff;
        background: rgba($color: #000000, $alpha: 0.22);
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
          color: rgba($color: #fff, $alpha: 0.8);

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
      padding: 1.2rem 2rem;
      border-radius: 4px;
      border: 1px solid rgba($color: #fff, $alpha: 0.6);
    }

    .process_box {
      // width: 100%;
      ::v-deep .el-step__icon {
        width: 2.8rem;
        height: 2.8rem;
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
      ::v-deep .el-step__main {
        .el-step__title {
          color: rgba($color: #fff, $alpha: 0.8);
          // transform: translateX(-10px);
        }

        .el-step__description {
          color: rgba($color: #fff, $alpha: 0.7);
          // transform: translateX(-30px);
        }

        .is-finish {
          &.el-step__icon {
            color: $baseColor;
          }
          &.el-step__description {
            color: rgba($color: #fff, $alpha: 0.9);
            // transform: translateX(0);
          }

          &.el-step__title {
            color: rgba($color: #fff, $alpha: 1);
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