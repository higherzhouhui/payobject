<template>
    <div class="home_index_container">
        <div class="title baseColor">{{ $t('welcome') }}reliance-pay!</div>
        <div class="content">
            <section class="box box_1 flex flex_jc_sb flex_align_center">
                <div class="left contentBg">
                    <el-progress :width="240" class="process" text-color="#3476FF" :stroke-width="10" type="circle"
                        :percentage="percentage"></el-progress>
                    <div class="txt">当前任务进度</div>
                </div>
                <div class="right ">
                    <div class="item contentBg">
                        <div class="txt smrz">
                            <span>实名认证</span>
                        </div>
                        <el-button  @click="to('/home/verified')" type="primary" class="btn"><img class="icon" src="@/assets/images/home/smrz.png"
                                alt="id">
                            {{ status }}
                        </el-button>
                        <span class="meltag">{{ reason }}</span>
                    </div>
                    <div class="item contentBg">
                        <div class="txt span">开通收款账户，从电商平台/支付网关等开始收款</div>
                    </div>
                    <div class="item contentBg">
                        <div class="txt span">添加同名银行帐户，开始第一笔提款等交易</div>
                    </div>
                </div>
            </section>

            <section class="box box_2 contentBg box_base">
                <div class="s_title">快速导航</div>
                <div class="box_content">
                    <el-row :gutter="24">
                        <el-col :span="8">
                            <div class="item item-1">
                                <div class="flex flex_align_center">
                                    <img class="icon" src="@/assets/images/home/dh_fk_1.png" alt="">
                                    <span>提现</span>
                                </div>
                                <div class="btn pointer" @click="navgation('/home/withdraw')">立即提现</div>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="item item-2">
                                <div class="flex flex_align_center">
                                    <img class="icon" src="@/assets/images/home/dh_fk_2.png" alt="">
                                    <span>付款</span>
                                </div>
                                <div class="btn pointer" @click="navgation('/home/transfers')">立即付款</div>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="item item-3">
                                <div class="flex flex_align_center">
                                    <img class="icon" src="@/assets/images/home/dh_fk_3.png" alt="">
                                    <span>换汇</span>
                                </div>
                                <div class="btn pointer"  @click="navgation('/home/collection')">立即换汇</div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </section>
            <section class="box box_3">
                <el-row :gutter="24">
                    <el-col :span="16">
                        <div class="left box_base contentBg">
                            <div class="s_title">{{ $t('myaccount') }}</div>
                            <div class="txt">支持美元、欧元、英镑、日元、港币等全球12大主流货币收款</div>
                            <div class="box_content">
                                <el-table :data="myAccountList" v-loading="myAccountListLoading" style="width: 100%" height="250" border>
                                    <el-table-column prop="accountName" label="名称" min-width="120" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="bankAccount" label="账号" min-width="180" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="bankAdd" label="开户行地址" min-width="160" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="createTime" label="添加日期" min-width="120" show-overflow-tooltip>
                                    </el-table-column>
                                    <div slot="empty">
                                        <el-empty
                                        :description="$t('nodata')"
                                        style="padding: 50px"
                                        ></el-empty>
                                    </div>
                                </el-table>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="left box_base contentBg">
                            <div class="s_title">当前汇率</div>
                            <div class="txt">仅供参考，交易时以实际成交价为准</div>
                            <div class="box_content">
                                <el-table :data="exchangeList" v-loading="exchangeListLoading" style="width: 100%" height="250" border>
                                    <el-table-column prop="exFrom" label="币种" min-width="80" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="exRate" label="汇率" min-width="80" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="exTarget" label="兑换币种" min-width="80" show-overflow-tooltip>
                                    </el-table-column>
                                    <div slot="empty">
                                        <el-empty
                                        :description="$t('nodata')"
                                        style="padding: 50px"
                                        ></el-empty>
                                    </div>
                                </el-table>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </section>
            <section class="box box_4 contentBg box_base">
                <div class="s_title">近期交易</div>
                <div class="box_content">
                    <el-table class="tables" :data="tableData" style="width: 100%" v-loading="loading" max-height="350" border>
                        <el-table-column prop="depCoin" :label="$t('币种')" min-width="100" show-overflow-tooltip/>
                        <el-table-column prop="targetCoin" :label="$t('兑换币种')" min-width="100" />
                        <el-table-column prop="changeRate" :label="$t('汇率')" min-width="100" />
                        <el-table-column prop="depValue" :label="$t('金额')" min-width="100" />
                        <el-table-column prop="targetValue" :label="$t('到账金额')" width="130" />
                        <el-table-column prop="createTime" :label="$t('创建时间')" min-width="180" show-overflow-tooltip/>
                        <el-table-column prop="modifiedTime" :label="$t('更新时间')" min-width="180" show-overflow-tooltip/>
                        <div slot="empty">
                            <el-empty
                            :description="$t('nodata')"
                            style="padding: 50px"
                            ></el-empty>
                        </div>
                    </el-table>
                </div>
            </section>
        </div>

        <el-dialog :title="`查看详情`" :visible.sync="dialogVisible" width="636px" :before-close="() => {
            dialogVisible = false;
          }
            ">
            <el-form label-position="top" ref="formss" :model="userInfo.kyc" class="formStyle" v-if="userInfo.kyc">
              <el-form-item :label="$t('qymc')" class="mb24">
                <el-input v-model="userInfo.kyc.companyName" :readOnly="true"></el-input>
              </el-form-item>
              <el-form-item :label="$t('qyjydz')" class="mb24">
                <el-input type="textarea" :rows="8" v-model="userInfo.kyc.businessAdd" :readOnly="true"></el-input>
              </el-form-item>
              <el-form-item :label="$t('qylx')" class="mb24">
                <el-select v-model="userInfo.kyc.busType" :readOnly="true" style="width: 100%">
                  <el-option style="padding: 0 10px" v-for="item in options3" :key="item.value" :label="$t(item.label)"
                    :value="item.value" />
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('qyzcszgj')" class="mb24">
                <el-input v-model="userInfo.kyc.country" :readOnly="true"></el-input>
              </el-form-item>
              <el-form-item :label="$t('zcrq')" class="mb24">
                <el-date-picker style="width: 100%" size="small" :readOnly="true" value-format="timestamp"
                  v-model="userInfo.kyc.regDate" type="date" :placeholder="$t('xzsj')" />
              </el-form-item>
              <el-form-item :label="$t('qyyxq')" class="mb24">
                <el-date-picker :readOnly="true" style="width: 100%" value-format="timestamp" size="small"
                  v-model="userInfo.kyc.period" type="date" :placeholder="$t('xzsj')" />
              </el-form-item>
              <el-form-item :label="$t('ygyhkje')" class="mb24">
                <el-input v-model="userInfo.kyc.monthlyRemittance" :readOnly="true"></el-input>
              </el-form-item>
              <el-form-item :label="$t('ygyjybs')" class="mb24">
                <el-input v-model="userInfo.kyc.transactionsMonth" :readOnly="true"></el-input>
              </el-form-item>
              <el-form-item :label="$t('dbjyed')" class="mb24">
                <el-input v-model="userInfo.kyc.transactionLimit" :readOnly="true"></el-input>
              </el-form-item>
              <el-form-item :label="$t('ywcjsm')" class="mb24">
                <el-input type="textarea" :rows="8" v-model="userInfo.kyc.businessScenario" :readOnly="true"></el-input>
              </el-form-item>
              <el-form-item :label="$t('qygw')" class="mb24">
                <el-input v-model="userInfo.kyc.webSite" :readOnly="true"></el-input>
              </el-form-item>
              <el-form-item :label="$t('scwj')" class="mb24">
                <label style="font-size: 12px">
                  {{ $t("t1") }}
                </label>
                <el-button style="padding: 4px 20px" size="small" type="primary" class="btn"><a
                    :href="'/api/file/downLoad?url=' + userInfo.kyc.regCer" target="_blank">预览</a></el-button>
              </el-form-item>
              <el-form-item :label="$t('scwj')" class="mb24">
                <label style="font-size: 12px">
                  {{ $t("t2") }}
                </label>
                <el-button style="padding: 4px 20px" size="small" type="primary" class="btn"><a
                    :href="'/api/file/downLoad?url=' + userInfo.kyc.legal" target="_blank">预览</a></el-button>
              </el-form-item>
              <el-form-item :label="$t('scwj')" class="mb24" v-if="userInfo.kyc.busType != 1">
                <label style="font-size: 12px">
                  {{ $t("t3") }}
                </label>
                <el-button style="padding: 4px 20px" size="small" type="primary" class="btn"><a
                    :href="'/api/file/downLoad?url=' + userInfo.kyc.shareholder" target="_blank">预览</a></el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
    </div>
</template>
<script>
import { getAccountKyc } from '@/api/user'
import { Local } from "@/utils/index"
import { withdrawAccounts } from "@/api/out.js"
import { getExchanges } from "@/api/exchange";
import { getchangeDetails } from "@/api/manage"

export default {
    name: 'homeHide',
    data() {
        return {
            tableData: [],
            loading: true,
            dialogVisible: false,
            options3: [
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
            percentage: 0,
            status: '去认证',
            reason: '',
            userInfo: {kyc: {}},
            myAccountList: [],
            myAccountListLoading: true,
            exchangeList: [],
            exchangeListLoading: true,
        }
    },
    created() {
        this.initKycData()
        this.getAccountList()
        this.getExchangeList()
        this.getTransationList()
    },
    methods: {
        async getTransationList() {
            this.loading = true
            let res;
            res = await getchangeDetails()
            this.loading = false
            if (res.code === 200) { 
                this.tableData = res.data.records
            }
        },
        async getAccountList() {
            this.myAccountListLoading = true
            try {
                const res = await withdrawAccounts()
                this.myAccountList = res.data
            } catch(error) {
                console.error(error)
            }
            this.myAccountListLoading = false
        },
        async getExchangeList() {
            this.exchangeListLoading = true
            try {
                const res = await getExchanges()
                this.exchangeList = res.data
            } catch(error) {
                console.error(error)
            }
            this.exchangeListLoading = false
        },
        initKycData() {
            getAccountKyc().then(rt=>{
                const userInfo = this.$store.state.userInfo
                try {
                    Object.keys(rt.data).map(key => {
                        userInfo[key] = rt.data[key]
                    })
                    this.$store.commit('SET_USERINFO', userInfo)
                    this.userInfo = userInfo
                    this.getBaseKycInfo()
                    this
                } catch {
                    if(rt.data && rt.data.kyc && rt.data.kyc.kycStatus) {
                        Local('isSMZ',  true)
                    }
                }
            })
        },
        to(path) {
            // 通过KYC
            if (this.userInfo.kyc && this.userInfo.kyc.kycStatus !== 2) {
                this.dialogVisible = true
            } else {
                this.$router.push(path)
            }
        },
        getBaseKycInfo() {
            let percentage = 0;
            if (this.userInfo.authBanks) {
                percentage += 50
            }
            if (this.userInfo.kyc && this.userInfo.kyc.kycStatus == 1) {
                percentage += 50
            }
            this.percentage = percentage
            let status = '去认证'
            if (this.userInfo.kyc) {
                status = '审核中'
                if (this.userInfo.kyc.kycStatus == 1) {
                    status = '已认证'
                }
                if (this.userInfo.kyc.kycStatus === 2) {
                    status = `重新认证`
                }
            }
            this.status = status
            let reason = ''
            if (this.userInfo.kyc) {
                if (this.userInfo.kyc.kycStatus === 2) {
                    reason = this.userInfo.kyc.reason
                }
            }
            this.reason = reason
        },
        navgation(url) {
            this.$router.push(url)
        }
    }
}
</script>
<style scoped lang="scss">
.home_index_container {
    width: 100%;

    .title {
        font-size: 24px;

    }

    .content {
        margin-top: 24px;

        .box_base {
            border-radius: 10px;
            padding: 24px;
        }

        .box {
            border-radius: 10px;
            margin-bottom: 24px;


            &.box_1 {
                gap: 24px;

                .left {
                    padding: 41px 0;
                    width: 480px;
                    text-align: center;
                    border-radius: 10px;

                    .process {
                        margin: auto;
                        background: #F2F6FF;
                        border-radius: 50%;
                    }

                    .txt {
                        margin-top: 20px;
                        font-size: 14px;
                        color: #909399;

                    }
                }

                .right {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                    width: calc(100% - 504px);

                    .item {
                        border-radius: 10px;
                        height: 106px;
                        box-sizing: border-box;
                        padding: 0 24px;
                        font-size: 14px;

                        .txt {

                            color: #303133;
                        }

                        .smrz {
                            padding: 16px 0 16px;

                        }

                        .span {
                            padding: 40px 0;
                        }
                    }
                }
            }

            &.box_2 {
                .box_content {
                    margin-top: 38px;

                    .item {
                        padding: 24px;
                        box-sizing: border-box;
                        height: 144px;
                        background-size: auto 100%;
                        background-position: right center;
                        background-color: #fff;
                        background-repeat: no-repeat;
                        font-size: 18px;

                        .icon {
                            margin-right: 8px;
                            height: 24px;
                            width: 24px;
                        }

                        &.item-1 {
                            color: #3476FF;
                            background-image: url('@/assets/images/home/dh_1.png');

                            .btn {
                                &:hover {
                                    background: #3476FF;
                                }
                            }

                        }

                        &.item-2 {
                            color: #09D268;
                            background-image: url('@/assets/images/home/dh_2.png');

                            .btn {
                                &:hover {
                                    background: #09D268;
                                }
                            }
                        }

                        &.item-3 {
                            color: #FB6739;
                            background-image: url('@/assets/images/home/dh_3.png');

                            .btn {
                                &:hover {
                                    background: #FB6739;
                                }
                            }
                        }

                        .btn {
                            margin-top: 34px;
                            width: fit-content;
                            border: 1px solid;
                            font-size: 14px;
                            padding: 6px 24px;
                            border-radius: 4px;

                            &:hover {
                                color: #fff;
                            }
                        }
                    }
                }
            }

            &.box_3 {
                .txt {
                    margin-top: 8px;
                    font-size: 14px;
                    color: #909399;
                }

                .box_content {
                    margin-top: 20px;
                }
            }

            &.box_4 {
                .box_content {
                    margin-top: 20px;
                }
            }
        }
    }

}

.btn {
    padding: 8px 16px;

    .icon {
        margin-right: 4px;
        height: 24px;
        vertical-align: middle;
    }
}

::v-deep .el-progress__text {
    font-size: 60px !important;
    font-weight: 600;
}
.meltag {
    margin-left: 20px;
    text-overflow: ellipsis;
    color: red;
}
</style>
