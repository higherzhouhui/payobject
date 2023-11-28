<template>
  <div class="verified_type_1_contarner">
    <div class="process_box2 mt40" v-if="form.kycStatus !== 1">
      <el-steps :active="1" align-center>
        <el-step :title="$t('qyxx')"></el-step>
        <!-- <el-step :title="$t('frxx')"></el-step> -->
        <el-step :title="$t('wcrw')"></el-step>
      </el-steps>
    </div>
    <div class="content content-form">
      <div class="flex flex_align_center flex_nowrap">
        <span class="nowrap">{{ $t("qymc") }}：</span>
        <el-input
          size="small"
          v-model="form.companyName"
          :placeholder="$t('qsrqymc')"
        ></el-input>
      </div>
      <div class="flex flex_align_center flex_nowrap">
        <span class="nowrap">{{ $t("qygw") }}({{ $t("fbt") }})：</span>
        <el-input
          size="small"
          v-model="form.webSite"
          :placeholder="$t('qsrqygw')"
        ></el-input>
      </div>
      <div class="flex flex_align_center flex_nowrap">
        <span class="nowrap">{{ $t("qyjydz") }}：</span>
        <el-input
          type="textarea"
          size="small"
          v-model="form.businessAdd"
          :placeholder="$t('qsrqyjydz')"
        ></el-input>
      </div>
      <div class="flex flex_align_center flex_nowrap">
        <span class="nowrap">{{ $t("qylx") }}：</span>
        <el-select size="small" v-model="form.busType" style="width: 100%">
          <el-option
            style="padding: 0 10px"
            v-for="item in options"
            :key="item.value"
            :label="$t(item.label)"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="flex flex_align_center flex_nowrap">
        <span class="nowrap">{{ $t("qyzcszd") }}：</span>
        <!-- <el-input size="small" v-model="form.country"></el-input> -->

        <el-select
          v-model="form.country"
          size="small"
          style="width: 100%"
          :placeholder="$t('qxzqyzcszd')"
          filterable
        >
          <el-option
            style="padding: 0 10px"
            v-for="item in areaList"
            :key="item.id"
            :value="item.areaCode"
            :label="lang == 'zh' ? item.name : item.enName"
          >
            <span :class="`flag-icon ${getFlagIcon(item.coinCode)}`"></span>
            {{ lang == "zh" ? item.name : item.enName }}
          </el-option>
        </el-select>
      </div>
      <div class="flex flex_align_center flex_nowrap">
        <span class="nowrap">{{ $t("zcrq") }}：</span>
        <el-date-picker
          style="width: 100%"
          size="small"
          value-format="timestamp"
          v-model="form.regDate"
          type="date"
          :placeholder="$t('xzsj')"
        />
      </div>
      <div class="flex flex_align_center flex_nowrap">
        <span class="nowrap">{{ $t("qyyxq") }}：</span>
        <el-date-picker
          style="width: 100%"
          value-format="timestamp"
          size="small"
          v-model="form.period"
          type="date"
          :placeholder="$t('xzsj')"
        />
      </div>
      <div class="flex flex_align_center flex_nowrap">
        <span class="nowrap">{{ $t("ygyhkje") }}：</span>
        <el-input
          size="small"
          v-model="form.monthlyRemittance"
          :placeholder="$t('qsrygyhkje')"
        ></el-input>
      </div>
      <div class="flex flex_align_center flex_nowrap">
        <span class="nowrap">{{ $t("ygyjybs") }}：</span>
        <el-input
          size="small"
          v-model="form.transactionsMonth"
          :placeholder="$t('qsrygyjybs')"
        ></el-input>
      </div>
      <div class="flex flex_align_center flex_nowrap">
        <span class="nowrap">{{ $t("dbjyed") }}：</span>
        <el-input
          size="small"
          v-model="form.transactionLimit"
          :placeholder="$t('qsrdbjyed')"
        ></el-input>
      </div>
      <div class="flex flex_align_center flex_nowrap">
        <span class="nowrap">{{ $t("ywcjsm") }}：</span>
        <el-input
          type="textarea"
          size="small"
          v-model="form.businessScenario"
          :placeholder="$t('qsrywcjsm')"
        ></el-input>
      </div>
    </div>
    <div class="content">
      <div class="title">{{ $t("qtcl") }}</div>
      <div class="mb10">
        <label>
          {{ $t("t1") }}
          <a
            :href="'/api/file/downLoad?url=' + form.regCer"
            target="_blank"
            class="down-a"
            v-if="form.regCer"
            >{{ $t("yulan") }}</a
          >
        </label>
        <el-upload
          v-if="form.kycStatus != 1"
          class="upload-demo"
          action="null"
          list-type="text"
          accept=".pdf, .zip, .rar"
          :before-upload="(e) => handlesuccess(e, 'regCer')"
          multiple
        >
          <el-button size="small" type="primary" class="btn">{{
            form.regCer ? $t("ysccxsc") : $t("djsc")
          }}</el-button>
          <div slot="tip" class="el-upload__tip">
            {{ $t("scts") }}
          </div>
        </el-upload>
      </div>

      <div class="mb10">
        <label>
          {{ $t("t2") }}
          <a
            :href="'/api/file/downLoad?url=' + form.legal"
            target="_blank"
            class="down-a"
            v-if="form.legal"
            >{{ $t("yulan") }}</a
          >
        </label>
        <el-upload
          v-if="form.kycStatus != 1"
          class="upload-demo"
          action="null"
          list-type="text"
          accept=".pdf, .zip, .rar"
          :before-upload="(e) => handlesuccess(e, 'legal')"
          multiple
        >
          <el-button size="small" type="primary" class="btn">{{
            form.legal ? $t("ysccxsc") : $t("djsc")
          }}</el-button>
          <div slot="tip" class="el-upload__tip">
            {{ $t("scts") }}
          </div>
        </el-upload>
      </div>
      <div class="mb10" v-if="form.busType != 1">
        <label>
          {{ $t("t3") }}
          <a
            :href="'/api/file/downLoad?url=' + form.shareholder"
            target="_blank"
            class="down-a"
            v-if="form.shareholder"
            >{{ $t("yulan") }}</a
          >
        </label>
        <el-upload
          v-if="form.kycStatus != 1"
          class="upload-demo"
          action="null"
          list-type="text"
          accept=".pdf, .zip, .rar"
          :before-upload="(e) => handlesuccess(e, 'shareholder')"
          multiple
        >
          <el-button size="small" type="primary" class="btn">{{
            form.shareholder ? $t("ysccxsc") : $t("djsc")
          }}</el-button>
          <div slot="tip" class="el-upload__tip">
            {{ $t("scts") }}
          </div>
        </el-upload>
      </div>
    </div>
    <div class="mt16 flex flex_jc_sb_center" v-if="form.kycStatus !== 1">
      <el-button class="primary" @click="to()">{{ $t("cxxz") }}</el-button>
      <el-button
        class="primary normal-btn"
        :class="loading && 'loading'"
        type="primary"
        @click="sendForm"
        >{{ $t("done") }}</el-button
      >
    </div>
    <el-dialog
      :title="$t('done')"
      :visible.sync="dialogVisibleSuccess"
      width="500px"
      :before-close="
        () => {
          dialogVisibleSuccess = false;
        }
      "
    >
      <div class="dialog-content">
        <img src="@/assets/images/moneyManage/success.png" />
        <div class="desc">
          {{ $t("fqkyc") }}
        </div>
      </div>
      <el-button
        slot="footer"
        type="primary"
        class="normal-btn"
        @click="dialogVisibleSuccess = false"
        >{{ $t("done") }}</el-button
      >
    </el-dialog>
  </div>
</template>
<script>
import { upload } from "@/api/file";
import { SubKyc } from "@/api/user";
import { Message } from "element-ui";
import { Local } from "@/utils/index";
import { countries } from "@/api/login";
import { getFlagIcon } from "@/utils/common";
export default {
  name: "verifiedOne",
  props: ["type"],
  data() {
    return {
      dialogVisibleSuccess: false,
      getFlagIcon: getFlagIcon,
      loading: false,
      lang: Local("lang") || "zh",
      form: {
        busType: 1,
        shareholder: "",
        legal: "",
        regCer: "",
      },
      options: [
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
      areaList: [],
    };
  },
  created() {
    this.form.busType = this.type;
    this.getAreaCode();
    this.getAccountKyc();
  },
  methods: {
    async sendForm() {
      if (this.loading) return;
      try {
        this.loading = true;
        await SubKyc(this.form);
        this.dialogVisibleSuccess = true;
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    async handlesuccess(e, type) {
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
          this.form[type] = req.data[0];
          Message({
            type: "success",
            message: this.$t("sccg"),
          });
        }
      } catch (error) {}
      return false;
    },
    to() {
      this.$emit("to", 1);
    },
    async getAreaCode() {
      try {
        const list = Local("areaList");
        if (list && list.length) {
          return (this.areaList = list);
        }
        const res = await countries();
        this.areaList = res.data;
        Local("areaList", res.data);
      } catch (error) {}
    },
    getAccountKyc() {
      const accountKyc = this.$store.state.userInfo || {};
      if (accountKyc.kyc && accountKyc.kyc.kycStatus) {
        this.form = accountKyc.kyc;
      }
    },
  },
};
</script>
<style scoped lang="scss">
.verified_type_1_contarner {
  label {
    display: inline-block;
    margin-top: 5px;
    font-size: 14px;
  }
  .btn {
    margin: 4px 0;
    padding: 4px 10px;
  }
  .mb10 {
    margin-bottom: 20px;
  }
  .process_box2 {
    padding: 1.2rem 2rem;
    border-radius: 4px;
    border: 1px solid rgba($color: #fff, $alpha: 0.6);

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

  .content {
    margin-top: 16px;
    padding: 24px;
    background: rgba($color: #000, $alpha: 0.22);
    color: #fff;
    .title {
      font-size: 15px;
    }
  }
  .content-form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 1rem;
    column-gap: 0.8rem;
    @media screen and (max-width: 1200px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  .nowrap {
    color: #fff;
    font-size: 12px;
  }
  .down-btn {
    margin-top: 0.5rem;
    display: block;
    a {
      display: block;
      color: #fff;
    }
    &:hover {
      background: #fff;
      a {
        color: $baseColor;
      }
    }
  }
}
.el-upload__tip {
  color: #fff;
  opacity: 0.8;
}
.dialog-content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    width: 160px;
    object-fit: contain;
  }
  .desc {
    font-size: 1.2rem;
    margin: 6px 0;
    max-width: 80%;
    text-align: center;
    color: $baseColor;
  }
}
</style>
