<template>
    <div class="user_transactionInquiry_transactionDetails_contianer">
        <LinkPath :linkList="linkList" />
        <div class="content">
            <div class="s_title flex flex_align_center flex_jc_sb">
                <div>{{ $t('jymx') }}</div> <el-button v-if="type == 2" type="primary" class="primary"><i class="el-icon-plus"></i>{{ $t('tjtxzh') }}</el-button></div>
            <el-tabs class="mt30" v-model="type" @tab-click="handleClick">
                <el-tab-pane :label="$t('tx')" name="1">
                    <el-form ref="form" :inline="true" class="mt40">
                        <el-form-item>
                            <el-date-picker v-model="value1" type="datetimerange" :range-separator="$t('to')"
                                :start-placeholder="$t('startTime')" :end-placeholder="$t('endTime')">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-input :placeholder="$t('skzh')" v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-select v-model="value" :placeholder="$t('ddzt')">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value">
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
                        <el-table-column prop="name" :label="$t('tksj')" width="180" />
                        <el-table-column prop="name" :label="$t('jyje')" width="200" />
                        <el-table-column prop="name" :label="$t('ddzt')" width="180" />
                        <el-table-column prop="name" :label="$t('skzh')" width="180" />
                        <el-table-column prop="name" :label="$t('jydh')" width="180" />
                        <el-table-column prop="name" :label="$t('cz')" width="180" fixed="right" />
                        <div slot="empty">
                            <el-empty :description="$t('nodata')" style="padding: 50px;"></el-empty>
                        </div>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane :label="$t('zz')" name="2">
                    <el-form ref="form" :inline="true" class="mt40">
                        <el-form-item>
                            <el-date-picker v-model="value1" type="datetimerange" :range-separator="$t('to')"
                                :start-placeholder="$t('startTime')" :end-placeholder="$t('endTime')">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-input :placeholder="$t('skzh')" v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-select v-model="value" :placeholder="$t('ddzt')">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value">
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
                        <el-table-column prop="name" :label="$t('tksj')" width="180" />
                        <el-table-column prop="name" :label="$t('jyje')" width="200" />
                        <el-table-column prop="name" :label="$t('ddzt')" width="180" />
                        <el-table-column prop="name" :label="$t('skzh')" width="180" />
                        <el-table-column prop="name" :label="$t('jydh')" width="180" />
                        <el-table-column prop="name" :label="$t('cz')" width="180" fixed="right" />
                        <div slot="empty">
                            <el-empty :description="$t('nodata')" style="padding: 50px;"></el-empty>
                        </div>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane :label="$t('hh')" name="3">
                    <el-form ref="form" :inline="true" class="mt40">
                        <el-form-item>
                            <el-date-picker v-model="value1" type="datetimerange" :range-separator="$t('to')"
                                :start-placeholder="$t('startTime')" :end-placeholder="$t('endTime')">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-select v-model="value" :placeholder="$t('ddzt')">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value">
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
                        <el-table-column prop="name" :label="$t('fqsj')" width="180" />
                        <el-table-column prop="name" :label="$t('mcjebz')" width="200" />
                        <el-table-column prop="name" :label="$t('jghl')" width="180" />
                        <el-table-column prop="name" :label="$t('jyzt')" width="180" />
                        <el-table-column prop="name" :label="$t('jydh')" width="180" />
                        <el-table-column prop="name" :label="$t('cz')" width="180" fixed="right" />
                        <div slot="empty">
                            <el-empty :description="$t('nodata')" style="padding: 50px;"></el-empty>
                        </div>
                    </el-table>
                </el-tab-pane>
            </el-tabs>

        </div>
    </div>
</template>
<script>
import LinkPath from '@/components/common/linkPath.vue'
export default {
    name: 'transactionInquiry',
    components: { LinkPath },
    data() {
        return {
            tableData: [],
            options: [],
            type: '1',
            dialogVisible2: false,
            linkList: ['jycx', 'jymx'],
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
.user_transactionInquiry_transactionDetails_contianer {
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
