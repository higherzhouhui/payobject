<template>
    <div class="user_transactionInquiry_fundingDetails_contianer">
        <LinkPath :linkList="linkList" />
        <div class="content">
            <div class="s_title flex flex_align_center flex_jc_sb">
                <div>{{ $t('zjmx') }}</div></div>
            <el-form ref="form" :inline="true" class="mt40">
                <el-form-item>
                    <el-select v-model="value" :placeholder="$t('xzzjzh')">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="value" :placeholder="$t('xzzhlx')">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="value" :placeholder="$t('xzbz')">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-date-picker v-model="value1" type="datetimerange" :range-separator="$t('to')"
                        :start-placeholder="$t('startTime')" :end-placeholder="$t('endTime')">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="primary">
                        <i class="el-icon-search"></i>{{ $t('search') }}
                    </el-button>
                    <el-button class="primary">
                        <i class="el-icon-download"></i>{{ $t('download') }}
                    </el-button>
                </el-form-item>
            </el-form>
            <el-table class="tables" :data="tableData" style="width: 100%">
                <el-table-column prop="name" :label="$t('jzsj')" width="180" />
                <el-table-column prop="name" :label="$t('zhyt')" width="200" />
                <el-table-column prop="name" :label="$t('bz')" width="180" />
                <el-table-column prop="name" :label="$t('srje')" width="180" />
                <el-table-column prop="name" :label="$t('zcje')" width="180" />
                <el-table-column prop="name" :label="$t('zhye')" width="180" />
                <el-table-column prop="name" :label="$t('zjbdsm')" width="280"  />
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
    name: 'fundingDetails',
    components: { LinkPath },
    data() {
        return {
            tableData: [],
            options: [],
            type: '1',
            dialogVisible2: false,
            linkList: ['jycx', 'zjmx'],
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
.user_transactionInquiry_fundingDetails_contianer {
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
