<template>
  <div class="verified_type_1_contarner">
    <div class="process_box2 mt40">
      <el-steps :active="1" align-center>
        <el-step :title="$t('qyxx')"></el-step>
        <!-- <el-step :title="$t('frxx')"></el-step> -->
        <el-step :title="$t('wcrw')"></el-step>
      </el-steps>
    </div>
    <div class="content">
      <el-form :inline="true">
        <el-row :gutter="42">
          <el-col :span="12">
            <div class="flex flex_align_center flex_nowrap">
              <span class="nowrap">{{ $t("qymc") }}：</span>
              <el-input size="small" v-model="form.companyName"></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="flex flex_align_center flex_nowrap">
              <span class="nowrap">{{ $t("qyywmc") }}：</span>
              <el-input size="small" v-model="form.companyEnName"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="42" class="mt16">
          <el-col :span="12">
            <div class="flex flex_align_center flex_nowrap">
              <span class="nowrap">{{ $t("qyjydz") }}：</span>
              <el-input size="small" v-model="form.businessAdd"></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="flex flex_align_center flex_nowrap">
              <span class="nowrap">{{ $t("qylx") }}：</span>
              <el-select
                size="small"
                v-model="form.busType"
                style="width: 100%"
              >
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
          </el-col>
        </el-row>

        <el-row :gutter="42" class="mt16">
          <el-col :span="12">
            <div class="flex flex_align_center flex_nowrap">
              <span class="nowrap">{{ $t("qyzcszgj") }}：</span>
              <el-input size="small" v-model="form.country"></el-input>
            </div>
          </el-col>
          <el-col :span="12">
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
          </el-col>
        </el-row>

        <el-row :gutter="42" class="mt16">
          <el-col :span="12">
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
          </el-col>
          <el-col :span="12">
            <div class="flex flex_align_center flex_nowrap">
              <span class="nowrap">{{ $t("ygyhkje") }}：</span>
              <el-input
                size="small"
                v-model="form.monthlyRemittance"
              ></el-input>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="42" class="mt16">
          <el-col :span="12">
            <div class="flex flex_align_center flex_nowrap">
              <span class="nowrap">{{ $t("ygyjybs") }}：</span>
              <el-input
                size="small"
                v-model="form.transactionsMonth"
              ></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="flex flex_align_center flex_nowrap">
              <span class="nowrap">{{ $t("dbjyed") }}：</span>
              <el-input size="small" v-model="form.transactionLimit"></el-input>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="42" class="mt16">
          <el-col :span="12">
            <div class="flex flex_align_center flex_nowrap">
              <span class="nowrap">{{ $t("ywcjsm") }}：</span>
              <el-input size="small" v-model="form.businessScenario"></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="flex flex_align_center flex_nowrap">
              <span class="nowrap">{{ $t("qygw") }}：</span>
              <el-input size="small" v-model="form.webSite"></el-input>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="content">
      <div class="title">{{ $t("qtcl") }}</div>
      <div class="mb10">
        <label>{{ $t("t1") }}</label>
        <el-upload
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
        <label>{{ $t("t2") }}</label>
        <el-upload
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
        <label>{{ $t("t3") }}</label>
        <el-upload
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
    <div class="mt16 flex flex_jc_sb_center">
      <el-button class="primary" @click="to('/home/verified')">{{
        $t("cxxz")
      }}</el-button>
      <el-button
        class="primary"
        :class="loading && 'loading'"
        type="primary"
        @click="sendForm"
        >{{ $t("next") }}</el-button
      >
    </div>
  </div>
</template>
<script>
import { upload } from "@/api/file";
import { SubKyc, getAccountKyc } from "@/api/user";
import { Message } from "element-ui";
import { countries } from "@/api/login";

export default {
  name: "verifiedOne",
  props: ["type"],
  data() {
    return {
      loading: false,
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
    };
  },
  created() {
    this.form.busType = this.type;
    // getAccountKyc()
  },
  methods: {
    async sendForm() {
      if (this.loading) return;
      try {
        this.loading = true;
        await SubKyc(this.form);
        Message({
          type: "success",
          message: this.$t('tjcg'),
        });
        this.$router.push("/home");
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    async handlesuccess(e, type) {
      const formData = new FormData();
      formData.append("file", e);
      try {
        let req = await upload(formData);
        this.form[type] = req.data[0];
        Message({
          type: "success",
          message: this.$t('sccg'),
        });
      } catch (error) {}
      return false;
    },
    to() {
      this.$emit("to", 1);
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
    background: #fff;
    padding: 24px 40px;

    ::v-deep .el-step__main {
      .el-step__title {
        &.is-process {
          font-weight: 400;
        }

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
    background: #fff;

    .title {
      font-size: 16px;
    }
  }
}
</style>
