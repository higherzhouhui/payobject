<template>
  <div class="home_index_container">
    <div class="label" v-if="kycTotal">
      <div class="desc">
        {{$t('kycdsh')}}<span>{{ kycTotal }}</span>
      </div>
      <div @click="to('/manage/kyc?type=second')" class="normal-btn">
        {{$t('qsh')}}
      </div>
    </div>
    <el-table
      class="tables"
      size="small"
      :data="kycData"
      style="width: 100%"
      v-loading="kycLoading"
      v-if="kycTotal"
    >
      <el-table-column
        prop="companyName"
        :label="$t('qymc')"
        min- width="180"
        show-overflow-tooltip
      />
      <el-table-column
        prop="businessAdd"
        :label="$t('qyjydz')"
        min-width="200"
        show-overflow-tooltip
      />
      <el-table-column
        prop="businessScenario"
        :label="$t('ywcjsm')"
        min-width="280"
        show-overflow-tooltip
      />
      <el-table-column
        prop="createTime"
        :label="$t('cjrq')"
        min-width="180"
        show-overflow-tooltip
      />
      <div slot="empty">
        <el-empty :description="$t('nodata')" style="padding: 50px"></el-empty>
      </div>
    </el-table>
    <div class="label" v-if="bankTotal">
      <div class="desc">
        {{$t('yhkdsh')}}<span>{{ bankTotal }}</span>
      </div>
      <div @click="to('/manage/kyc?type=first')" class="normal-btn">{{$t('qsh')}}</div>
    </div>
    <el-table
      class="tables"
      size="small"
      :data="bankData"
      style="width: 100%"
      v-loading="bankLoading"
      v-if="bankTotal"
    >
      <el-table-column
        prop="accountName"
        :label="$t('zhmc')"
        min-width="180"
        show-overflow-tooltip
      />
      <el-table-column
        prop="bankAccount"
        :label="$t('yhzh')"
        min-width="200"
        show-overflow-tooltip
      />
      <el-table-column
        prop="accountAdd"
        :label="$t('jzdz')"
        min-width="300"
        show-overflow-tooltip
      />
      <el-table-column
        prop="createTime"
        :label="$t('cjrq')"
        min-width="180"
        show-overflow-tooltip
      />
      <div slot="empty">
        <el-empty :description="$t('nodata')" style="padding: 50px"></el-empty>
      </div>
    </el-table>
    <div class="label" v-if="depositTotal">
      <div class="desc">
        {{$t('fdhbrjdsh')}}<span>{{ depositTotal }}</span>
      </div>
      <div @click="to('/manage/deposit?type=fabi')" class="normal-btn">
        {{$t('qsh')}}
      </div>
    </div>
    <el-table
      class="tables"
      size="small"
      :data="depositData"
      style="width: 100%"
      v-loading="depositLoading"
      v-if="depositTotal"
    >
      <el-table-column
        prop="accountName"
        :label="$t('skzhmc')"
        min-width="180"
      />
      <el-table-column prop="coinCode" :label="$t('bz')" min-width="120" />
      <el-table-column prop="reqValue" :label="$t('czje')" min-width="180" />
      <el-table-column prop="sendAccount" :label="$t('hkzh')" min-width="180" />
      <el-table-column
        prop="createTime"
        :label="$t('cjsj')"
        min-width="180"
      />
      <div slot="empty">
        <el-empty :description="$t('nodata')" style="padding: 50px"></el-empty>
      </div>
    </el-table>
    <div class="label" v-if="cryptdepositTotal">
      <div class="desc">
        {{$t('jmhbrjdsh')}}<span>{{ cryptdepositTotal }}</span>
      </div>
      <div @click="to('/manage/deposit?type=usdt')" class="normal-btn">
        {{$t('qsh')}}
      </div>
    </div>
    <el-table
      class="tables"
      size="small"
      :data="cryptdepositData"
      style="width: 100%"
      v-loading="cryptdepositLoading"
      v-if="cryptdepositTotal"
    >
      <el-table-column
        prop="cryptAdd"
        :label="$t('skqbdz')"
        min-width="180"
      />
      <el-table-column prop="coinCode" :label="$t('bz')" min-width="120" />
      <el-table-column prop="reqValue" :label="$t('czje')" min-width="180" />
      <el-table-column prop="tid" :label="$t('hkqbdz')" min-width="180" />
      <el-table-column
        prop="createTime"
        :label="$t('cjsj')"
        min-width="180"
      />
      <div slot="empty">
        <el-empty :description="$t('nodata')" style="padding: 50px"></el-empty>
      </div>
    </el-table>
    <div class="label" v-if="withdrawTotal">
      <div class="desc">
        {{$t('fdhbcjdsh')}}<span>{{ withdrawTotal }}</span>
      </div>
      <div @click="to('/manage/withdraw?type=fabi')" class="normal-btn">
        {{$t('qsh')}}
      </div>
    </div>
    <el-table
      class="tables"
      size="small"
      :data="withdrawData"
      style="width: 100%"
      v-loading="withdrawLoading"
      v-if="withdrawTotal"
    >
      <el-table-column
        prop="accountName"
        :label="$t('skzhmc')"
        min-width="180"
        show-overflow-tooltip
      />
      <el-table-column prop="coinCode" :label="$t('bz')" min-width="100" />
      <el-table-column prop="reqValue" :label="$t('ckje')" min-width="100" />
      <el-table-column
        prop="createTime"
        :label="$t('cjsj')"
        min-width="180"
      />
      <div slot="empty">
        <el-empty :description="$t('nodata')" style="padding: 50px"></el-empty>
      </div>
    </el-table>
    <div class="label" v-if="cryptwithdrawTotal">
      <div class="desc">
        {{$t('jmhbcjdsh')}}<span>{{ cryptwithdrawTotal }}</span>
      </div>
      <div @click="to('/manage/withdraw?type=usdt')" class="normal-btn">
        {{$t('qsh')}}
      </div>
    </div>
    <el-table
      class="tables"
      size="small"
      :data="cryptwithdrawData"
      style="width: 100%"
      v-loading="cryptwithdrawLoading"
      v-if="cryptwithdrawTotal"
    >
      <el-table-column prop="srcCode" :label="$t('bz')" width="100" />
      <el-table-column
        prop="cryptAdd"
        :label="$t('skqbdz')"
        min-width="180"
      />
      <el-table-column prop="coinCode" :label="$t('mbbz')" min-width="100" />
      <el-table-column prop="reqValue" :label="$t('ckje')" min-width="100" />
      <el-table-column
        prop="createTime"
        :label="$t('cjsj')"
        min-width="180"
      />
      <div slot="empty">
        <el-empty :description="$t('nodata')" style="padding: 50px"></el-empty>
      </div>
    </el-table>
  </div>
</template>
<script>
import { getBankListPage, kycList } from "@/api/bank";
import { depositList, cryptDepositList } from "@/api/out.js";
import { withdrawList, cryptWithdrawList } from "@/api/out.js";

export default {
  name: "homeHide",
  data() {
    return {
      kycData: [],
      kycLoading: true,
      kycTotal: 0,
      bankData: [],
      bankLoading: true,
      bankTotal: 0,
      depositData: [],
      depositLoading: true,
      depositTotal: 0,
      cryptdepositData: [],
      cryptdepositLoading: true,
      cryptdepositTotal: 0,
      withdrawData: [],
      withdrawLoading: true,
      withdrawTotal: 0,
      cryptwithdrawData: [],
      cryptwithdrawLoading: true,
      cryptwithdrawTotal: 0,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    to(path) {
      this.$router.push(path);
    },
    initData() {
      this.getkycData();
      this.getbankData();
      this.getdepositData();
      this.getcryptdepositData();
      this.getwithdrawData();
      this.getcryptwithdrawData();
    },
    async getkycData() {
      try {
        this.kycLoading = true;
        let req = await kycList({ current: 1, size: 5, kycStatus: 0 });
        this.kycData = req.data.records;
        this.kycTotal = req.data.total;
        this.kycLoading = false;
      } catch (error) {
        this.kycLoading = false;
      }
    },
    async getbankData() {
      try {
        this.bankLoading = true;
        let req = await getBankListPage({ current: 1, size: 5, bankStatus: 0 });
        this.bankData = req.data.records;
        this.bankTotal = req.data.total;
        this.bankLoading = false;
      } catch (error) {
        this.bankLoading = false;
      }
    },
    async getdepositData() {
      try {
        this.depositLoading = true;
        let req = await depositList({ current: 1, size: 5, status: 2 });
        this.depositData = req.data.records;
        this.depositTotal = req.data.total;
        this.depositLoading = false;
      } catch (error) {
        this.depositLoading = false;
      }
    },
    async getcryptdepositData() {
      try {
        this.cryptdepositLoading = true;
        let req = await cryptDepositList({ current: 1, size: 5, status: 2 });
        this.cryptdepositData = req.data.records;
        this.cryptdepositTotal = req.data.total;
        this.cryptdepositLoading = false;
      } catch (error) {
        this.cryptdepositLoading = false;
      }
    },
    async getwithdrawData() {
      try {
        this.withdrawLoading = true;
        let req = await withdrawList({ current: 1, size: 5, status: 1 });
        this.withdrawData = req.data.records;
        this.withdrawTotal = req.data.total;
        this.withdrawLoading = false;
      } catch (error) {
        this.withdrawLoading = false;
      }
    },
    async getcryptwithdrawData() {
      try {
        this.cryptwithdrawLoading = true;
        let req = await cryptWithdrawList({ current: 1, size: 5, status: 1 });
        this.cryptwithdrawData = req.data.records;
        this.cryptwithdrawTotal = req.data.total;
        this.cryptwithdrawLoading = false;
      } catch (error) {
        this.cryptwithdrawLoading = false;
      }
    },
  },
};
</script>
<style scoped lang="scss">
.home_index_container {
  width: 100%;
  .label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    margin-bottom: 1rem;
    .desc {
      span {
        font-size: 1.2rem;
        margin-left: 4px;
        font-weight: bold;
        color: $baseColor;
      }
    }
  }
  .tables {
    margin-bottom: 2rem;
  }
}
</style>
