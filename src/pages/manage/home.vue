<template>
    <div class="home_index_container">
        <div class="content">



            <section class="box box_3 flex flex_nowrap">
                <div class="left box_base has_bg_box_base content_shadow">
                    <div class="s_title">{{ $t('shgl') }}</div>
                </div>
                <div class="left right_content box_base content_shadow">
                    <div class="s_title">{{ $t('hlgl') }}</div>
                    <div class="txt">仅供参考，交易时以实际成交价为准</div>
                    <div class="box_content">
                        <el-table :data="tableData">
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


            </section>
            <section class="box box_2 content_shadow box_base">
                <div class="s_title">{{ $t('ddgl') }}</div>
                <div class="box_content">
                    <el-row :gutter="24">
                        <el-col :span="6">
                            <div class="item item-1">
                                <div class="flex flex_align_center">
                                    <img class="icon" src="@/assets/images/home/dh_fk_1.png" alt="">
                                    <span>提现</span>
                                </div>
                                <div class="btn pointer">立即提现</div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="item item-2">
                                <div class="flex flex_align_center">
                                    <img class="icon" src="@/assets/images/home/dh_fk_2.png" alt="">
                                    <span>付款</span>
                                </div>
                                <div class="btn pointer">立即提现</div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="item item-3">
                                <div class="flex flex_align_center">
                                    <img class="icon" src="@/assets/images/home/dh_fk_3.png" alt="">
                                    <span>换汇</span>
                                </div>
                                <div class="btn pointer">立即提现</div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="item item-4">
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

    .content_shadow {
        border: unset;
    }

    .title {
        font-size: 24px;

    }

    .content {
        // margin-top: 24px;

        .box_base {
            border-radius: 10px;
            padding: 24px;
        }

        .has_bg_box_base {
            background: url('@/assets/images/manage/bg2.png');
            background-size: 100% 100%;
            width: 760px;
            height: 358px;
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
                        filter: drop-shadow(0px 2px 4px rgba(52, 118, 255, 0.25));
                        .icon {
                            margin-right: 8px;
                            height: 24px;
                            width: 24px;
                        }

                        &.item-1 {
                            color: #3476FF;
                            background-image: url('@/assets/images/manage/dh_1.png');

                            .btn {
                                &:hover {
                                    background: #3476FF;
                                }
                            }

                        }

                        &.item-2 {
                            color: #09D268;
                            background-image: url('@/assets/images/manage/dh_2.png');

                            .btn {
                                &:hover {
                                    background: #09D268;
                                }
                            }
                        }

                        &.item-3 {
                            color: #F5A836;
                            background-image: url('@/assets/images/manage/dh_3.png');

                            .btn {
                                &:hover {
                                    background: #F5A836;
                                }
                            }
                        }

                        &.item-4 {
                            color: #FB6739;
                            background-image: url('@/assets/images/manage/dh_4.png');

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
                gap: 30px;
                .txt {
                    margin-top: 8px;
                    font-size: 14px;
                    color: #909399;
                }

                .box_content {
                    margin-top: 20px;
                }
                .right_content{
                    width: calc(100% - 885px)
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
}</style>
