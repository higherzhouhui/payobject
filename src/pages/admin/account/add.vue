<template>
    <div class="account_add_container">
        <div class="back_box flex flex_align_center">
            <el-button class="primary" ><i class="el-icon-back"></i>{{ $t('back') }}</el-button>
            <div class="s_title ">{{ $t('sqjwskzh') }}</div>
        </div>
        <div class="content content_shadow mt40">
            <div class="process_box">
                <el-steps :active="1" align-center>
                    <el-step :title="$t('xzndywcj')" :description="$t('xzndywcj2')"></el-step>
                    <el-step :title="$t('txskzhxx')" :description="$t('txskzhxx2')"></el-step>
                </el-steps>
            </div>

            <el-tabs class="mt30" v-model="type" @tab-click="handleClick">
                <el-tab-pane :label="$t(item.label)" :name="item.name" v-for="(item, index) in labels" :key="item.name">
                    <div class="flex">
                        <img class="item" v-for="(_, idx) in item.list"
                            :src="require(`@/assets/images/account/${index}-${idx}.png`)" :key="idx" alt="">
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
export default {
    name: 'accountAdd',
    data() {
        return {
            type: '1',
            labels: [
                { name: '1', label: 'dspt', list: ['', '', '', '', '', ''] },
                { name: '2', label: 'dlz', list: ['', '', '', '', ''] },
                { name: '3', label: 'b2bhk', list: ['', '', ''] },
                { name: '4', label: 'yysc', list: ['', ''] },
                { name: '5', label: 'other', list: [''] },

            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.account_add_container {
    .back_box{
        gap:16px;
    }
    .content {
        padding: 40px;
        border-radius: 4px;

        .flex {
            gap: 20px 48px;
            margin-top: 20px;
            .item {
                // 
                width: 206px;
            }
        }

        .process_box {
            padding: 24px 40px;
            border-radius: 4px;
            border: 1px solid var(--unnamed, #DCDFE6);
        }

        ::v-deep .el-step__icon {
            width: 48px;
            height: 48px;
        }

        ::v-deep .el-step__main {

            .el-step__title {
                color: #303133;
                // transform: translateX(-40px);
            }

            .el-step__description {
                color: #909399;
                // transform: translateX(-40px);
            }

            .is-finish {

                &.el-step__title,
                &.el-step__description {
                    color: #3476FF;
                    transform: translateX(0);
                }
            }
        }

        ::v-deep .el-step__head {
            // width: 96%;

            .el-step__line {

                transform: translate(0, 11px) !important;

            }

            .el-step__icon {
                font-size: 28px;
                color: #909399;
                border-color: #909399;
            }

            &.is-finish {
                .el-step__icon {
                    // transform: translateX(40px);
                    background: #3476FF;
                    color: #fff;
                    border-color: #3476FF;
                }


            }


        }
    }
}</style>