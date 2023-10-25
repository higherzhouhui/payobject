<template>
    <div class="form_table_container">
        <div class="flex flex_nowrap">
            <div class="left"> <div class="all_line">收款</div></div>
            <div class="right">
                <div class="flex line line1">
                    <div class="inner_left inner_item">
                        <div class="all_line">收款</div>
                    </div>
                    <div class="inner_right out_right">
                        <div class="all_line">收款</div>
                    </div>
                </div>
                <div class="flex line line2">
                    <div class="inner_left  inner_item">
                        <div class="all_line">收款</div>
                    </div>
                    <div class="inner_right  inner_item">
                        <div class="flex half_height border_bottom">
                            <div class="inner_left inner_item">
                                <div class="all_line">收款</div>
                            </div>
                            <div class="inner_item">
                                <div class="all_line">收款</div>
                            </div>
                        </div>
                        <div class="flex half_height">
                            <div class="inner_item">
                                <div class="all_line inner_left">收款</div>
                            </div>
                            <div class="inner_item">
                                <div class="all_line">收款</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex line line3">
                    <div class="inner_left  inner_item">
                        <div class="all_line">收款</div>
                    </div>
                    <div class="inner_right  inner_item">
                        <div class="flex half_height border_bottom">
                            <div class="inner_left inner_item">
                                <div class="all_line">收款</div>
                            </div>
                            <div class="inner_item">
                                <div class="all_line">收款</div>
                            </div>
                        </div>
                        <div class="flex half_height">
                            <div class="inner_left inner_item">
                                <div class="all_line">收款</div>
                            </div>
                            <div class="inner_item">
                                <div class="all_line">收款</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'formOne',
    data() {
        return {}
    },
}
</script>
<style scoped lang="scss">
.form_table_container {
    .left {
        flex: 1;
        border: 1px solid #DCDFE6;
        // width: 378px;
        height: 496px;
    }

    .all_line {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        line-height: 100%;
    }

    .line {
        height: 176px;
        border: 1px solid #DCDFE6;
        border-left: unset;
        border-bottom: unset;

        &.line3 {
            border-bottom: 1px solid #DCDFE6;
        }

        &.line1 {
            height: 142px;
        }
    }

    .right {
        flex: 3;

        .flex {
            // align-items: center;
        }

        .inner_item {
            flex: 1;
            text-align: center;
            line-height: 100%;
        }
        .inner_left{
            flex: 1;
        }
        .inner_right {
            flex: 2;
        }
        .half_height {
            height: 50%;
        }

        .border_bottom {
            border-bottom: 1px solid #DCDFE6;
        }

        .inner_left {
            border-right: 1px solid #DCDFE6;
        }
    }
}</style>
