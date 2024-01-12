<template>
  <div class="kyc-container">
    <div class="verified_type_1_contarner" v-if="showEditForm">
      <div class="process_box2">
        <el-steps :active="1" align-center>
          <el-step :title="$t('qyxx')"></el-step>
          <!-- <el-step :title="$t('frxx')"></el-step> -->
          <el-step :title="$t('wcrw')"></el-step>
        </el-steps>
      </div>
      <div class="content">
        <div class="list-item">
          <div class="label">{{ $t("qymc") }}：</div>
          <el-input
            size="small"
            v-model="form.companyName"
            :placeholder="$t('qsrqymc')"
          ></el-input>
        </div>
        <div class="list-item">
          <div class="label">{{ $t("qygw") }}({{ $t("fbt") }})：</div>
          <el-input
            size="small"
            v-model="form.webSite"
            :placeholder="$t('qsrqygw')"
          ></el-input>
        </div>
        <div class="list-item">
          <div class="label">{{ $t("qyjydz") }}：</div>
          <el-input
            type="textarea"
            size="small"
            :rows="8"
            v-model="form.businessAdd"
            :placeholder="$t('qsrqyjydz')"
          ></el-input>
        </div>
        <div class="list-item">
          <div class="label">{{ $t("qylx") }}：</div>
          <el-select size="small" v-model="form.busType" style="width: 100%">
            <el-option
              style="padding: 0 10px"
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="list-item">
          <div class="label">{{ $t("qyzcszd") }}：</div>
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
              :value="item.code"
              :label="lang == 'zh' ? item.name : item.enName"
            >
              <flagIconVue :code="item.coinCode" />
              {{ lang == "zh" ? item.name : item.enName }}
            </el-option>
          </el-select>
        </div>
        <div class="list-item">
          <div class="label">{{ $t("zcrq") }}：</div>
          <el-date-picker
            style="width: 100%"
            size="small"
            value-format="yyyy/MM/dd"
            v-model="form.regDate"
            type="date"
            :placeholder="$t('xzsj')"
          />
        </div>
        <div class="list-item">
          <div class="label">{{ $t("qyyxq") }}：</div>
          <el-date-picker
            style="width: 100%"
            value-format="yyyy/MM/dd"
            size="small"
            v-model="form.period"
            type="date"
            :placeholder="$t('xzsj')"
          />
        </div>
        <div class="list-item">
          <div class="label">{{ $t("ygyhkje") }}：</div>
          <el-input
            size="small"
            v-model="form.monthlyRemittance"
            :placeholder="$t('qsrygyhkje')"
          ></el-input>
        </div>
        <div class="list-item">
          <div class="label">{{ $t("ygyjybs") }}：</div>
          <el-input
            size="small"
            v-model="form.transactionsMonth"
            :placeholder="$t('qsrygyjybs')"
          ></el-input>
        </div>
        <div class="list-item">
          <div class="label">{{ $t("dbjyed") }}：</div>
          <el-input
            size="small"
            v-model="form.transactionLimit"
            :placeholder="$t('qsrdbjyed')"
          ></el-input>
        </div>
        <div class="list-item">
          <div class="label">{{ $t("ywcjsm") }}：</div>
          <el-input
            type="textarea"
            size="small"
            :rows="8"
            v-model="form.businessScenario"
            :placeholder="$t('qsrywcjsm')"
          ></el-input>
        </div>
      </div>
      <div class="ziliao-wrapper">
        <div class="title">{{ $t("xgcl") }}</div>
        <div class="upload-wrapper">
        <div class="upload-item">
          <div class="item-left">
            <el-upload
                  action="/api/file/upload"
              list-type="text"
              accept=".pdf, .zip, .rar"
              :on-success="(e) => handlesuccess(e, 'regCer')"
            >
              <div class="load-cover">
                <i class="el-icon-folder-add" v-if="!form.regCer"></i>
                <i class="el-icon-folder-checked" v-else></i>
              </div>
              <div slot="tip" class="el-upload__tip">
                {{ $t("scts") }}
              </div>
            </el-upload>
          </div>
          <div class="item-right">
            <div class="sub-title"><span>*</span>{{ $t("qycl") }}</div>
            <div class="desc">{{ $t("t1") }}</div>
            <a
              :href="'/api/file/downLoad?url=' + form.regCer"
              target="_blank"
              class="down"
              v-if="form.regCer"
              >{{ $t("download") }}</a
            >
          </div>
        </div>
        <div class="upload-item">
          <div class="item-left">
            <el-upload
                  action="/api/file/upload"
              list-type="text"
              accept=".pdf, .zip, .rar"
              :on-success="(e) => handlesuccess(e, 'legal')"
            >
              <div class="load-cover">
                <i class="el-icon-folder-add" v-if="!form.legal"></i>
                <i class="el-icon-folder-checked" v-else></i>
              </div>
              <div slot="tip" class="el-upload__tip">
                {{ $t("scts") }}
              </div>
            </el-upload>
          </div>
          <div class="item-right">
            <div class="sub-title"><span>*</span>{{ $t("frcl") }}</div>
            <div class="desc">{{ $t("t2") }}</div>
            <a
              :href="'/api/file/downLoad?url=' + form.legal"
              target="_blank"
              class="down"
              v-if="form.legal"
              >{{ $t("download") }}</a
            >
          </div>
        </div>
        <div class="upload-item" v-if="form.busType != 1">
          <div class="item-left">
            <el-upload
                  action="/api/file/upload"
              list-type="text"
              accept=".pdf, .zip, .rar"
              :on-success="(e) => handlesuccess(e, 'shareholder')"
            >
              <div class="load-cover">
                <i class="el-icon-folder-add" v-if="!form.shareholder"></i>
                <i class="el-icon-folder-checked" v-else></i>
              </div>
              <div slot="tip" class="el-upload__tip">
                {{ $t("scts") }}
              </div>
            </el-upload>
          </div>
          <div class="item-right">
            <div class="sub-title"><span>*</span>{{ $t("gqcl") }}</div>
            <div class="desc">{{ $t("t3") }}</div>
            <a
              :href="'/api/file/downLoad?url=' + form.shareholder"
              target="_blank"
              class="down"
              v-if="form.shareholder"
              >{{ $t("download") }}</a
            >
          </div>
        </div>
      </div>
      </div>
      <div class="operation-group">
        <div class="csxz" @click="to">{{$t('cxxz')}}</div>
        <div class="qd" @click="sendForm">{{$t('sure')}}</div>
      </div>
    </div>
    <div class="kyc-detail" v-else>
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
            <span>
              <i class="el-icon-folder-checked"></i>
              {{$t('download')}}
            </span>
          </a>
        </template>
        <template v-else>
          {{ item.value }}
        </template>
      </div>
      </div>
    </div>
    <el-dialog
      :title="$t('done')"
      :visible.sync="dialogVisibleSuccess"
      width="636px"
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
import { SubKyc } from "@/api/user";
import { Message } from "element-ui";
import { Local } from "@/utils/index";
import { countries } from "@/api/login";
import { getCountryName, pjDownUrl } from "@/utils/common";
import flagIconVue from "@/components/common/flagicon.vue";
export default {
  name: "verifiedOne",
  components: {
    flagIconVue
  },
  props: ["type"],
  data() {
    return {
      detailList: [],
      dialogVisibleSuccess: false,
      loading: false,
      lang: Local("lang") || "zh",
      form: {
        busType: 1,
        shareholder: "",
        legal: "",
        regCer: "",
      },
      status: [this.$t("shz"), this.$t("ytg"), this.$t("bh")],
      labels: ["", this.$t("gth"),this.$t("qy"), this.$t("hwgs"),],
      options: [
        {
          label: this.$t("gth"),
          value: 1,
        },
        {
          label: this.$t("qy"),
          value: 2,
        },
        {
          label: this.$t("hwgs"),
          value: 3,
        },
      ],
      showEditForm: true,
      areaList: [],
    };
  },
  computed: {
   
  },
  created() {
    this.form.busType = this.type;
    this.getAreaCode();
    this.getAccountKyc();
    this.getCurrentStatus()
  },
  methods: {
    getCurrentStatus() {
      let flag = false
      const userInfo = this.$store.state.userInfo;
      if (!userInfo.kyc) {
        flag = true;
      }
      if (userInfo.kyc && userInfo.kyc.kycStatus == 2) {
        flag = true;
      }
      this.showEditForm = flag
    },
    async sendForm() {
      if (this.loading) return;
      try {
        this.loading = true;
        await SubKyc(this.form);

        this.dialogVisibleSuccess = true;
        this.getAccountKyc(this.form);
        this.showEditForm = false
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    async handlesuccess(req, type) {
      try {
        if (req.code === 200) {
          this.form[type] = req.data[0];
          Message({
            type: "success",
            message: this.$t("sccg"),
          });
        } else {
          this.$message.error(req.msg)
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
    getAccountKyc(data) {
      let accountKyc = this.$store.state.userInfo || {};
      if (data) {
        accountKyc.kyc = {...data, kycStatus: 0}
      }
      if (accountKyc.kyc && (accountKyc.kyc.kycStatus || accountKyc.kyc.kycStatus == 0)) {
        this.form = accountKyc.kyc;
        if (!isNaN(this.form.regDate * 1)) {
          this.form.regDate = "2023/10/11";
        }
        if (!isNaN(this.form.period * 1)) {
          this.form.period = "2053/10/11";
        }
        this.detailList = [
          { label: this.$t("qymc"), value: this.form.companyName },
          {
            label: this.$t("qylx"),
            value: this.labels[this.form.busType],
          },
          {
            label: this.$t("qyzcszd"),
            value: getCountryName(this.form.country),
          },
          { label: this.$t("zcrq"), value: this.form.regDate },
          { label: this.$t("qyyxq"), value: this.form.period },
          { label: this.$t("ygyhkje"), value: this.form.monthlyRemittance },
          { label: this.$t("ygyjybs"), value: this.form.transactionsMonth },
          { label: this.$t("dbjyed"), value: this.form.transactionLimit },
          { label: this.$t("qyjydz"), value: this.form.businessAdd },
          { label: this.$t("ywcjsm"), value: this.form.businessScenario },
          { label: this.$t("qygw"), value: this.form.webSite },
          { label: this.$t("kzt"), value: this.status[this.form.kycStatus] },
          { label: this.$t("bhly"), value: this.form.kycStatus == 1 ? "" : this.form.reason },
          { label: this.$t("cjsj"), value: this.form.createTime },
          { label: this.$t("xgsj"), value: this.form.modifiedTime },
          {
            label: this.$t("qycl"),
            value: pjDownUrl(this.form.regCer),
            type: "link",
          },
          {
            label: this.$t("frcl"),
            value: pjDownUrl(this.form.legal),
            type: "link",
          },
          {
            label: this.$t("gqcl"),
            value: pjDownUrl(this.form.shareholder),
            type: "link",
          },
        ];
      }
    },
  },
};
</script>
<style scoped lang="scss">
.kyc-container {
  background: $contentColor;
  .kyc-detail {
    border-radius: 6px;
    padding: 1.5rem 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 22px;
    @media screen and (max-width: 900px) {
      grid-template-columns: repeat(1, 1fr);
      row-gap: 22px;
    }
    .list {
      background: $bgColor;
      border-radius: 0.25rem;
      padding: 0.3rem 0.5rem;
      margin-top: 0.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      a {
        text-decoration: none;
        color: #fff;
      }
      .list-left,
      .list-right {
        line-height: 1.8em;
        color: #fff;
        word-break: break-all;
        display: flex;
        align-items: center;
        span {
          color: $baseColor;
        }
      }
      .list-left::after {
        content: ":";
      }
      .list-link::after {
        content: none;
      }
      .list-link {
        max-width: 100%!important;
        span {
          color: $baseColor;
        }
        .el-icon-folder-checked {
          font-size: 18px;
        }
      }
      .list-right {
        max-width: 80%;
        padding-left: 10px;
      }
      .list-left {
        max-width: 80%;
      }
    }
  }
}
.verified_type_1_contarner {
  label {
    display: inline-block;
    margin-top: 5px;
    font-size: 14px;
    line-height: 24px;
  }
  .btn {
    margin: 4px 0;
    padding: 4px 10px;
  }
  .list-item {
    margin-bottom: 1rem;
  }
  .mb10 {
    margin-bottom: 20px;
  }
  .process_box2 {
    padding: 1.2rem 2rem;
    border-radius: 4px;
    border: 1px solid rgba($color: #fff, $alpha: 0.6);
    margin-bottom: 1rem;
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
  .operation-group {
    margin-top: 24px;
    display: flex;
    justify-content: center;
    padding-bottom: 24px;
    .csxz, .qd {
      padding: 6px 18px;
      background: #fff;
      border-radius: 4px;
      cursor: pointer;
      &:hover {
        color: $baseColor;
      }
    }
    .qd {
      background: $baseColor;
      margin-left: 20px;
      color: #fff;
      &:hover {
        color: $baseColor;
        background: #fff;
      }
    }
  }
  .content {
    padding: 1.5rem;
    color: #fff;
    border-radius: 8px;
    .title {
      font-size: 15px;
    }
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 22px;
    @media screen and (max-width: 900px) {
      grid-template-columns: repeat(1, 1fr);
      row-gap: 22px;
    }
  }
  .label {
    color: #fff;
    font-size: 14px;
    margin-bottom: 12px;
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
.ziliao-wrapper {
  padding: 1.5rem;
  .upload-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 22px;
    @media screen and (max-width: 900px) {
      grid-template-columns: repeat(1, 1fr);
      row-gap: 22px;
    }
  }
  .title {
    font-size: 1.2rem;
    margin-bottom: 12px;
    color: #fff;
  }
}
</style>
