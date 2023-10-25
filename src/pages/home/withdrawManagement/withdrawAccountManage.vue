<template>
    <div class="user_withdrawManage_withdrawAccountManage_contianer">
        <LinkPath :linkList="linkList" />
        <div class="content">
            <div class="s_title flex flex_align_center flex_jc_sb">
                <div>{{ $t('txzhgl') }}</div> <el-button type="primary" class="primary"><i class="el-icon-plus"></i>{{ $t('tjtxzh') }}</el-button></div>
            <el-form ref="form" :inline="true" class="mt40">
                <el-form-item>
                    <el-date-picker v-model="value1" type="datetimerange" :range-separator="$t('to')"
                        :start-placeholder="$t('startTime')" :end-placeholder="$t('endTime')">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-input :placeholder="$t('zhbm')" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input :placeholder="$t('zhbh')" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="value" :placeholder="$t('ddjd')">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="value" :placeholder="$t('qxzzhlx')">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="primary">
                        <i class="el-icon-search"></i>{{ $t('search') }}
                    </el-button>
                    <el-button class="primary">
                        <i class="el-icon-refresh"></i>{{ $t('reset') }}
                    </el-button>
                </el-form-item>
            </el-form>
            <el-table class="tables" :data="tableData" style="width: 100%">
                <el-table-column prop="name" :label="$t('zhbmm')" width="180" />
                <el-table-column prop="name" :label="$t('yhzh')" width="200" />
                <el-table-column prop="name" :label="$t('zhssd')" width="180" />
                <el-table-column prop="name" :label="$t('zhyt')" width="180" />
                <el-table-column prop="name" :label="$t('kzt')" width="180" />
                <el-table-column prop="name" :label="$t('cjrq')" width="180" />
                <el-table-column prop="name" :label="$t('cz')" width="180" fixed="right" />
                <div slot="empty">
                    <el-empty :description="$t('nodata')" style="padding: 50px;"></el-empty>
                </div>
            </el-table>
        </div>
    </div>
</template>
<script>
import LinkPath from '@/components/common/linkPath.vue'
export default {
    name: 'userWithdrawAccountManage',
    components: { LinkPath },
    data() {
        return {
            tableData: [],
            options: [],
            type: '1',
            dialogVisible2: false,
            linkList: ['txgl', 'txzhgl'],
            form: {
                name: ''
            }
        }
    },
    methods: {
        handleClick() {

        }
    }
}
</script>
<style scoped lang="scss">
.user_withdrawManage_withdrawAccountManage_contianer {
    .content {
        margin-top: 40px;
        padding: 24px;
        border-radius: 4px;
        border: 1px solid var(--unnamed, #DCDFE6);
        background: #FFF;

        .form {
            margin-top: 40px;
        }
    }
}
</style>
