<template>
    <div class="home_index_container">
        <div class="title baseColor">{{ $t('welcome') }}reliance-pay!</div>
        <div class="content">
            <section class="box box_1 flex flex_jc_sb flex_align_center">
                <div class="left contentBg">
                    <el-progress :width="240" class="process" text-color="#3476FF" :stroke-width="10" type="circle"
                        :percentage="50"></el-progress>
                    <div class="txt">当前任务进度</div>
                </div>
                <div class="right ">
                    <div class="item contentBg">
                        <div class="txt smrz">实名认证未完成，请提交完整信息</div>
                        <el-button  @click="to('/home/verified')" type="primary" class="btn"><img class="icon" src="@/assets/images/home/smrz.png"
                                alt="">继续认证</el-button>
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
                                <div class="btn pointer">立即提现</div>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="item item-2">
                                <div class="flex flex_align_center">
                                    <img class="icon" src="@/assets/images/home/dh_fk_2.png" alt="">
                                    <span>付款</span>
                                </div>
                                <div class="btn pointer">立即提现</div>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="item item-3">
                                <div class="flex flex_align_center">
                                    <img class="icon" src="@/assets/images/home/dh_fk_3.png" alt="">
                                    <span>换汇</span>
                                </div>
                                <div class="btn pointer">立即提现</div>
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
                                <el-table :data="tableData" style="width: 100%">
                                    <el-table-column prop="name" label="账户姓名" width="180">
                                    </el-table-column>

                                    <el-table-column prop="name" label="账户姓名" width="180">
                                    </el-table-column>
                                    <el-table-column prop="address" width="220" label="账户用途">
                                    </el-table-column>
                                    <el-table-column prop="date" label="日期" width="120" fixed="right">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="left box_base contentBg">
                            <div class="s_title">我的汇率</div>
                            <div class="txt">仅供参考，交易时以实际成交价为准</div>
                            <div class="box_content">
                                <el-table :data="tableData" style="width: 100%">
                                    <el-table-column prop="name" label="账户姓名" width="180">
                                    </el-table-column>

                                    <el-table-column prop="name" label="账户姓名" width="180">
                                    </el-table-column>
                                    <el-table-column prop="address" width="220" label="账户用途">
                                    </el-table-column>
                                    <el-table-column prop="date" label="日期" width="120" fixed="right">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>

                    </el-col>
                </el-row>


            </section>
            <section class="box box_4 contentBg box_base">
                <div class="s_title">近期交易</div>
                <div class="box_content">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="name" label="账户姓名" width="180">
                        </el-table-column>

                        <el-table-column prop="name" label="账户姓名" width="180">
                        </el-table-column>
                        <el-table-column prop="address" width="220" label="账户用途">
                        </el-table-column>
                        <el-table-column prop="date" label="日期" width="120" fixed="right">
                        </el-table-column>
                    </el-table>
                </div>
            </section>
        </div>
    </div>
</template>
<script>

export default {
    name: 'homeHide',
    data() {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    methods: {
        to(path) {
            this.$router.push(path)
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

::v-deep .el-table--fit,
::v-deep .el-table__cell,
::v-deep tr {
    background-color: #F4F4F4 !important;

    // .cell {
    //     font-size: 16px;
    //     color: #909399;
    //     font-weight: 400;
    // }

    // .el-table__row {
    //     .cell {
    //         font-size: 14px;
    //         color: #303133;
    //     }
    // }
}

::v-deep .el-progress__text {
    font-size: 60px !important;
    font-weight: 600;
}
</style>
