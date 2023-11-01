<template>
    <div class="user_setting_contianer">
        <LinkPath :linkList="linkList" />
        <div class="content">
            <div class="head_line line flex flex_align_center">
                <img class="avatar" src="@/assets/images/home/user.png" alt="">
                <div class="user_info">
                    <div class="title">{{ userInfo.name }}</div>
                    <div class="des">{{$t('dlzh')}}：{{ userInfo.phone }}</div>
                </div>
            </div>
            <div class="line item flex flex_align_center">
                <div class="key">
                    {{$t('sjbd')}}
                </div>
                <div class="value" v-if="userInfo.phone">{{ userInfo.phone }}</div>
                <div class="baseColor value" v-else>{{ $t('nodata') }}</div>
                <div class="right value baseColor pointer" @click="dialogVisible = true">
                    {{ userInfo.phone ? $t('rz') : $t('setting') }}
                </div>
            </div>
            <div class="line">
                <div class="item flex flex_align_center">
                    <div class="key">{{ $t('yxbd') }}</div>
                    <div class="value" v-if="userInfo.email">{{ userInfo.email }}</div>
                    <div class="baseColor value" v-else>{{ $t('nodata') }}</div>
                </div>
                <div class="item flex flex_align_center">
                    <div class="key">{{ $t('dlmm') }}</div>
                    <div class="value">{{ $t('dlmm2') }}</div>
                    <div class="right value baseColor pointer" @click="dialogVisible2 = true">
                        {{ $t('xg') }}
                    </div>

                </div>
                <div class="item flex flex_align_center">
                    <div class="key">{{ $t('zfmm') }}</div>
                    <div class="value">{{ $t('zfmm2') }}</div>
                    <div class="right value baseColor pointer" @click="dialogVisible3 = true">
                        {{ $t('setting') }}
                    </div>
                </div>
            </div>
        </div>
        <!-- 绑定 | 修改手机号 -->
        <el-dialog :title="$t('sjhrz')" :visible.sync="dialogVisible" width="536px" :before-close="handleClose">
            <el-form label-width="150px">
                <el-form-item :label="$t('ylsjh')+'：'" class="mb24">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item :label="$t('ylsjyzm')+'：'">
                    <el-input v-model="form.name">
                        <TelEcode slot="suffix" :time="70" s />
                    </el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">{{ $t('cancel') }}</el-button>
                <el-button type="primary" @click="dialogVisible = false">{{ $t('qrbg') }}</el-button>
            </span>
        </el-dialog>
        <!-- 修改登录密码 -->
        <el-dialog :title="$t('xgdlmm')" :visible.sync="dialogVisible2" width="536px" :before-close="handleClose">
            <el-form label-width="100px">
                <el-form-item :label="$t('ymm')+'：'" class="mb24">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item :label="$t('xmm')+'：'" class="mb24">
                    <el-input v-model="form.name">
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('qrxmm')+'：'">
                    <el-input v-model="form.name">
                    </el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">{{ $t('cancel') }}</el-button>
                <el-button type="primary" @click="dialogVisible = false">{{ $t('sure') }}</el-button>
            </span>
        </el-dialog>
        <!-- 设置支付密码 -->
        <el-dialog :title="$t('szzfmm')" :visible.sync="dialogVisible3" width="536px" :before-close="handleClose">
            <el-form label-width="150px">
                <el-form-item :label="$t('xzfmm')+'：'" class="mb24">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item :label="$t('qrxzfmm')+'：'" class="mb24">
                    <el-input v-model="form.name">
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('ylsjh')+'：'" class="mb24">
                    <el-input v-model="form.name">
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('dxyzm')+'：'">
                    <el-input v-model="form.name">
                        <TelEcode slot="suffix" :time="70" s />
                    </el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">{{ $t('cancel') }}</el-button>
                <el-button type="primary" @click="dialogVisible = false">{{ $t('sure') }}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import LinkPath from '@/components/common/linkPath.vue'
import TelEcode from '@/components/common/telEcode.vue'
export default {
    name: 'userSetting',
    components: { LinkPath, TelEcode },
    computed: {
        userInfo() {
            return this.$store.getters.getUserInfo
        }
    },
    data() {
        return {
            dialogVisible: false,
            dialogVisible2: false,
            dialogVisible3: false,
            linkList: ['grzx', 'aqsz'],
            form: {
                name: ''
            }
        }
    },
}
</script>
<style scoped lang="scss">
.user_setting_contianer {
    ::v-deep .el-form-item__label{
        line-height: 30px;
        word-break: break-word;
    }
    .content {
        margin-top: 40px;
        padding: 24px;
        border-radius: 4px;
        border: 1px solid var(--unnamed, #DCDFE6);
        background: #FFF;
        box-shadow: 0px 0px 10px 0px rgba(52, 118, 255, 0.25);

        .line {
            position: relative;
            padding-top: 16px;
            border-bottom: 1px solid var(--unnamed, #DCDFE6);

            .key {
                width: 106px;
                color: #909399;
                font-size: 14px;

            }

            .value {
                font-size: 14px;
                color: #303133;
            }

            &:last-child {
                border: unset;
            }

            .right {
                position: absolute;
                right: 16px;
            }
        }

        .head_line {
            padding: 16px 0;

            .avatar {
                margin-right: 32px;
                width: 80px;
                height: 80px;
            }

            .user_info {
                .title {
                    margin-bottom: 10px;
                    font-size: 16px;
                    color: #303133;
                }

                .des {
                    font-size: 14px;
                    color: #909399;
                }
            }
        }

        .item {
            padding: 16px 21px;
        }
    }
}
</style>
