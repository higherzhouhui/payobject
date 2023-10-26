<template>
    <div class="login_box">
        <div class="top">
            <div class="title">{{ $t('zhmm') }}</div>
            <el-form class="form" :rules="rules">
                <el-form-item :label="$t('email')" prop="email">
                    <div class="line">
                        <img class="icon icon2" src="@/assets/images/user/email.png" alt="">
                        <el-input class="input" placeholder="请输入内容" v-model="input3" />
                    </div>
                </el-form-item>
                <el-form-item :label="$t('yxyzm')" prop="emailecode">
                    <div class="line flex flex_jc_sb flex_align_center">
                        <img class="icon" src="@/assets/images/user/yzm.png" alt="">
                        <el-input class="input yzm" placeholder="请输入内容" v-model="input3" />
                        <el-button class="send_btn" type="primary">{{ $t('send') }}</el-button>
                    </div>
                </el-form-item>

                <el-form-item :label="$t('xdlmm')" prop="newPassword">
                    <el-dropdown class="item pointer" style="width: 100%" trigger="click">
                        <div class="line">
                            <img class="icon" src="@/assets/images/user/password.png" alt="">
                            <el-input class="input" placeholder="请输入内容" v-model="input3" />
                            <el-dropdown-menu slot="dropdown">
                                21312312131231213123121312312131231
                            </el-dropdown-menu>
                        </div>
                    </el-dropdown>
                </el-form-item>
                <el-form-item :label="$t('zcxdlmm')" prop="renewPassword">
                    <div class="line">
                        <img class="icon icon2" src="@/assets/images/user/password.png" alt="">
                        <el-input class="input" placeholder="请输入内容" v-model="input3" />
                    </div>
                </el-form-item>
                <el-form-item :label="$t('txm')" prop="ecode">
                    <div class="line flex flex_jc_sb flex_align_center">
                        <img class="icon icon3" src="@/assets/images/user/txm.png" alt="">
                        <el-input class="input yzm" placeholder="请输入内容" v-model="input3" />
                        <div class="ecode pointer" @click="refreshCode">
                            <Ecode  :identifyCode="identifyCode"   />
                        </div>
                    </div>
                </el-form-item>
                <div class="flex btn_group">
                    <el-button class="btn" type="primary">{{ $t('sure') }}</el-button>
                    <el-button class="btn" @click="to('/user/login')">{{ $t('back') }}</el-button>
                </div>

            </el-form>
        </div>
    </div>
</template>
<script>
import { Local } from '@/utils/index'
import Ecode from '@/components/common/ecode.vue'
export default {
    name: 'userRegister',
    components: { Ecode },
    data() {
        return {
            input3: '',
            languge: Local('lang') || 'zh',
            identifyCodes: "123456789abcdwerwshdjeJKDHRJHKPLMKQ",//绘制的随机数
            identifyCode: '',
            rules: {
                email: [{
                    required: true, message: '请输入名称', trigger: 'blur'
                }],
                emailecode: [{
                    required: true, message: '请输入名称', trigger: 'blur'
                }],
                newPassword: [{
                    required: true, message: '请输入名称', trigger: 'blur'
                }],
                renewPassword: [{
                    required: true, message: '请输入名称', trigger: 'blur'
                }],
                ecode: [{
                    required: true, message: '请输入名称', trigger: 'blur'
                }]
            }
        }
    },
    mounted() {
        this.refreshCode()
    },
    methods: {
        refreshCode() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        randomNum(min, max) {
            max = max + 1
            return Math.floor(Math.random() * (max - min) + min)
        },
        // 随机生成验证码字符串
        makeCode(data, len) {
            for (let i = 0; i < len; i++) {
                this.identifyCode += data[this.randomNum(0, data.length - 1)]
            }
        },
        to(path) {
            this.$router.push(path)
        },
        checkLang(lang) {
            this.languge = lang
            Local('lang', lang)
            this.$i18n.locale = lang;
        }
    }
}
</script>
<style scoped lang="scss">
.login_box {
    padding: 24px 40px;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0, 56, 147, 0.25);
    width: 30%;
    max-width: 632px;
    min-width: 250px;

    .top {
        text-align: center;

        .title {
            padding: 18px 0;
            border-bottom: 1px solid #DCDFE6;
            font-size: 20px;
            color: #303133;
        }
    }


    .form {
        margin-top: 16px;

        .line {
            position: relative;
            width: 100%;
        }

        .send_btn {
            // margin-bottom: 24px;
            padding: 15px 0;
            width: 20%;
        }

        .ecode {
            // margin-bottom: 24px;
            width: 20%;
            transform: translateY(5px);
        }

        .input {
            // margin-bottom: 14px;
            width: 100% !important;

            /* width: 30%!important; */
            ::v-deep input {
                padding-left: 30px !important;
                height: 48px;
                line-height: 48px;
            }

            &.yzm {
                width: 76% !important;
            }
        }

        .icon {
            position: absolute;
            width: 16px;
            height: 16px;
            left: 10px;
            top: 16px;
            z-index: 1;

            &.icon2 {
                top: 56px;
            }
            &.icon3 {
                top: 19px;
            }
        }

        .btn {
            margin-top: 16px;
            padding: 16px 0;
            width: 26.58%;
        }

        .btn_group {
            gap: 40px;
            justify-content: center;
        }

        .txt {
            margin-top: 20px;
            font-size: 14px;
            font-weight: 400;
            color: #606266;

            img {
                margin-right: 4px;
                width: 16px;
                height: 16px;
            }

            .item {
                width: 50%;
                text-align: center;
                flex: 1;
                justify-content: center;
                display: flex;
            }
        }

        .txt2 {
            margin-top: 20px;
        }


    }

    .agree_txt {
        font-size: 12px;
        margin: 10px 0 20px;
    }
}

.down_line {
    padding: 4px 20px;
    text-align: center;
}

.wd {
    font-size: 14px;
    color: #606266;
}
</style>
<style></style>
