<template>
    <div>
        <div class="container" ref="container">
            <header :class="headerShow && 'headerShow'">
                <div class="inner">
                    <img class="logo" src="@/assets/images/index/logo.png" alt="">
                    <div class="info flex flex_align_center">
                        <div class="item hidden-sm-and-down">{{ $t('home') }}</div>
                        <div class="item hidden-sm-and-down">{{ $t('product') }}&{{ $t('serve') }}</div>
                        <div class="btn-group flex hidden-sm-and-down">
                            <div class="btn" @click="to('/user/login')">{{ $t('login') }}</div>
                            <div class="btn active" @click="to('/user/register')">{{ $t('register') }}</div>
                        </div>
                        <div class="language flex flex_align_center hidden-sm-and-down" @click="open">
                            <img class="icon" v-if="languge == 'zh'" src="@/assets/images/index/ch.png" alt="zh">
                            <img class="icon" v-else src="@/assets/images/index/en.png" alt="en">
                            <span class="txt">{{ $t('languageChange') }}</span>
                            <img src="@/assets/images/index/down.png" alt="">
                        </div>
                        <el-dropdown class="hidden-sm-and-up" trigger="click">
                            <i class="el-icon-s-fold pointer"></i>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item ><div style="padding: 10px 20px;"  @click="open">{{ $t('languageChange') }}</div> </el-dropdown-item>
                                <el-dropdown-item ><div style="padding: 10px 20px;"  @click="to('/user/login')">{{ $t('login') }}</div> </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        
                    </div>
                </div>
            </header>
            <section class="content">
                <img class="banner" v-if="languge == 'zh'" src="@/assets/images/index/top.png" alt="">
                <img class="banner" v-else src="@/assets/images/index/top_en.png" alt="">
            </section>
            <section class="content">
                <div class="notice_box">
                    <div class="notice flex flex_align_center">
                        <img src="@/assets/images/index/notice_icon.png" alt="">
                        <div class="txt">{{ noteice }}</div>
                    </div>
                </div>

            </section>
            <section class="content">
                <div class="numbers_box">
                    <el-row :gutter="56">
                        <el-col :xs="24" :sm="8">
                            <div class="item">
                                <div>
                                    <CountTo class="count" :startVal='0' :endVal='100' :duration='500'></CountTo>
                                    <img src="@/assets/images/index/add.png" alt="">
                                </div>
                                <div class="txt">{{ $t('fggj') }}</div>
                            </div>
                        </el-col>
                        <el-col :xs="24" :sm="8">
                            <div class="item">
                                <div>
                                    <CountTo class="count" :startVal='0' :endVal='100' :duration='500'></CountTo>
                                    <img src="@/assets/images/index/add.png" alt="">
                                </div>
                                <div class="txt">{{ $t('fggj') }}</div>
                            </div>
                        </el-col>
                        <el-col :xs="24" :sm="8">
                            <div class="item">
                                <div>
                                    <CountTo class="count" :startVal='0' :endVal='100' :duration='500'></CountTo>
                                    <img src="@/assets/images/index/add.png" alt="">
                                </div>
                                <div class="txt">{{ $t('fggj') }}</div>
                            </div>
                        </el-col>
                    </el-row>
                </div>

            </section>
            <section class="content">
                <div class="serve_box">
                    <div class="title">
                        <div class="txt">{{ $t('ouerserve') }}</div>
                    </div>

                    <div class="info">
                        <el-row>
                            <el-col :xs="24" :sm="8">
                                <div class="left">
                                    <div v-for="(item, index) in serviceLeftData" :key="index"
                                        class="item flex flex_align_center" @mousemove="type = index">
                                        <img v-if="type == index"
                                            :src="require('@/assets/images/index/s_l_' + index + '_active.png')" alt="">
                                        <img v-else :src="require('@/assets/images/index/s_l_' + index + '.png')" alt="">
                                        {{ $t(item.title) }}
                                    </div>
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="16">
                                <div class="right">
                                    <img class="img" :src="require('@/assets/images/index/s_' + type + '.png')" alt="">
                                    <div class="info">
                                        <div class="s_title">
                                            {{ $t(serviceLeftData[type].title) }}
                                        </div>
                                        <div class="des">{{ $t(serviceLeftData[type].des) }}</div>
                                        <div class="btn flex flex_align_center"> <img
                                                src="@/assets/images/index/r_w_icon.png" alt="">{{
                                                    $t('learnmore') }}</div>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>


                    </div>
                </div>
            </section>
            <section class="content">
                <div class="advantage_box">

                    <div class="inner_box">
                        <div class="title">
                            <div class="txt">{{ $t('fwys') }}</div>
                        </div>
                        <div class="flex">
                            <div class="block hidden-sm-and-down"></div>
                            <div class="info">
                                <div class="black hidden-sm-and-down"></div>
                                <el-row :gutter="56">
                                    <el-col :xs="24" :sm="8" :offset="2" v-for="(item, index) in advantageData"
                                        :key="index">
                                        <div class="item">
                                            <img :src="require('@/assets/images/index/a_' + index + '.png')" alt="">
                                            <div class="title">{{ $t(item.title) }}</div>
                                            <div class="text" v-if="index != 2">
                                                {{ $t(item.des) }}
                                            </div>
                                            <div class="text3" v-else-if="index == 2">
                                                <div class="inner_item flex" v-for="(item, idx) in item.desList" :key="idx">
                                                    <div class="key">{{ $t(item) }}</div>
                                                </div>
                                            </div>
                                            <div class="btn flex flex_align_center"> <img
                                                    src="@/assets/images/index/r_w_icon.png" alt="">{{
                                                        $t('learnmore') }}</div>
                                        </div>
                                    </el-col>
                                </el-row>
                                <div class="black hidden-sm-and-down"></div>
                            </div>
                            <div class="block hidden-sm-and-down"></div>
                        </div>

                    </div>
                </div>
            </section>
            <section class="content">
                <div class="process_box">
                    <div class="title">
                        <div class="txt">{{ $t('process') }}</div>
                        <div class="des">{{ $t('processdes') }}</div>
                    </div>

                    <div class="info">
                        <el-row :gutter="16">
                            <el-col :xs="24" :sm="5">
                                <div class="item">{{ $t('p1') }}</div>
                            </el-col>
                            <el-col class="hidden-sm-and-down" :span="1">
                                <img src="@/assets/images/index/h-jt.png" alt="">
                            </el-col>
                            <el-col :xs="24" :sm="6">
                                <div class="item">{{ $t('p2') }}</div>
                            </el-col>
                            <el-col class="hidden-sm-and-down" :span="1">
                                <img src="@/assets/images/index/h-jt.png" alt="">
                            </el-col>
                            <el-col :xs="24" :sm="5">
                                <div class="item">{{ $t('p3') }}</div>
                            </el-col>
                            <el-col class="hidden-sm-and-down" :span="1">
                                <img src="@/assets/images/index/h-jt.png" alt="">
                            </el-col>
                            <el-col :xs="24" :sm="5">
                                <div class="item">{{ $t('p4') }}</div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </section>
            <section class="content componey_box">
                <div class="inner_box">
                    <div class="title">
                        <div class="txt">{{ $t('hzhb') }}</div>
                    </div>
                    <div class="info">
                        <el-row :gutter="52">
                            <el-col :xs="24" :sm="6" v-for="(item) in 12" :key="item">
                                <img :src="require('@/assets/images/index/p' + item + '.png')" alt="">
                            </el-col>
                        </el-row>
                    </div>
                </div>

            </section>
            <section class="content to_us">
                <div class="txt">{{ $t('jjfa') }}</div>
                <div class="txt">{{ $t('jt') }}</div>
                <div class="btn">{{ $t('lxwm') }}</div>
            </section>


        </div>
        <footer>
            {{ $t('footer') }}
        </footer>
        <el-dialog class="lang_box" width="300px" :title="$t('choiceLanguage')" :visible.sync="dialogTableVisible">
            <div class="item" :class="languge == 'zh' && 'active'" @click="checkLang('zh')">中文</div>
            <div class="item" :class="languge == 'en' && 'active'" @click="checkLang('en')">English</div>
        </el-dialog>
    </div>
</template>
<script>
import { Local } from '@/utils/index'
import CountTo from 'vue-count-to'

export default {
    name: 'indexVue',
    components: { CountTo },
    data() {
        return {
            headerShow: false,
            type: 0,
            languge: Local('lang') || 'zh',
            dialogTableVisible: false,
            noteice: '这里是提示',
            serviceLeftData: [
                { title: 'szyw', des: 's1' },
                { title: 'qqsk', des: 's2' },
                { title: 'qqfk', des: 's3' }
            ],
            advantageData: [
                { title: 'scdw', des: 'cpjs' },
                {
                    title: 'cxjs', des: 'cpjs2'
                },
                { title: 'cpjz', desList: ['kj', 'xf', 'gycp', 'qc', 'jr', 'cm', 'fc'] }
            ]
        }
    },
    created() {



    },
    mounted() {
        this.onScroll()
        window.addEventListener('scroll', this.onScroll)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll)
    },
    methods: {
        to(path) {
            this.$router.push(path)
        },
        onScroll() {
            if (window.scrollY > 88) {
                this.headerShow = true
            } else {
                this.headerShow = false
            }
        },

        cutOutNum(num) {
            let changeNum = (num + '').split('.')
            let decimal = ''
            if (changeNum[1]) {
                decimal = changeNum[1].slice(0, 2) === '00' ? '' : changeNum[1].slice(1, 2) === '0' ? '.' + changeNum[1].slice(1, 2) : '.' + changeNum[1].slice(0, 2)
            }
            return changeNum[0] + decimal
        },
        open() {
            this.dialogTableVisible = true
        },
        checkLang(lang) {
            this.languge = lang
            Local('lang', lang)
            this.$i18n.locale = lang;
            this.dialogTableVisible = false
        }
    }
}
</script>
<style scoped lang="scss">
.lang_box {
    .item {
        text-align: center;
        font-size: 18px;
        padding: 10px 0;
        cursor: pointer;
        color: #3476FF;

        // &:hover {
        //     background: #3476FF;
        //     color: #fff;
        // }
        &.active {
            background: #3476FF;
            color: #fff;
        }
    }
}

.container {
    width: 100%;
    min-height: 100vh;
    padding-bottom: 120px;

    .content {
        margin: 0 auto;
        max-width: 1920px;
        box-sizing: border-box;
        width: 100%;
        // min-width: 1180px;


    }

    header {
        position: fixed;
        z-index: 999;
        left: 0;
        top: 0;
        width: 100%;
        height: 88px;
        background: rgba(255, 255, 255, 0.05);
        transition: all .5s;

        &.headerShow {
            background: rgba(202, 210, 255, .6);
            backdrop-filter: blur(20px);
            box-shadow: 0 2px 10px rgba($color: #000000, $alpha: .1);
        }

        .logo {
            width: 280px;
            height: 88px;
        }

        .logo2 {
            width: 140px;
            height: 44px;
        }

        .inner {
            margin: auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            max-width: 1220px;
            width: 100%;
            padding: 0 20px;
            box-sizing: border-box;

            .info {
                // margin-right: 24px;
                font-size: 18px;
                color: #3476FF;

                .item {
                    cursor: pointer;
                    padding: 0 16px;
                }
            }

            .btn-group {
                font-size: 20px;

                .btn {
                    margin-right: 16px;
                    padding: 10px 24px;
                    border-radius: 37px;
                    opacity: 1;
                    border: 1px solid #3476FF;
                    background: #fff;
                    cursor: pointer;

                    &.active {
                        background: #3476FF;
                        color: #fff;
                        border: 1px solid #fff;

                        &:hover {
                            opacity: .5;
                        }
                    }

                    &:hover {
                        background: #3476FF;
                        color: #fff;
                        border: 1px solid #fff;
                    }
                }
            }

            .language {
                cursor: pointer;

                .icon {
                    width: 32px;
                }

                .txt {
                    margin: 0 8px;
                    font-size: 16px;
                }
            }
        }
    }

    .notice_box {
        padding: 0 20px;
        box-sizing: border-box;
    }

    .notice {
        margin: 32px auto;
        box-sizing: border-box;
        padding: 14px 26px 20px;
        max-width: 1180px;
        width: 100%;
        height: 64px;
        background: #FFFFFF;
        box-shadow: 0px 4px 4px 0px rgba(52, 118, 255, 0.25);
        border-radius: 40px 40px 40px 40px;
        opacity: 1;
        border: 1px solid #3476FF;

        .txt {
            margin-left: 8px;
            color: #606266;
            font-size: 18px;
            font-weight: 400;
        }

        img {
            width: 32px;
            height: 32px;
        }
    }

    .numbers_box {
        margin: 128px auto 0;
        padding: 0 28px;
        box-sizing: border-box;
        max-width: 1236px;
        width: 100%;

        .item {
            margin-bottom: 20px;
            box-sizing: border-box;
            padding: 40px 0;
            // width: 356px;
            height: 176px;
            background: #3476FF;
            box-shadow: 0px 10px 10px 0px rgba(1, 33, 105, 0.25);
            border-radius: 10px;
            text-align: center;

            .count {
                font-size: 48px;
                font-family: Roboto-SemiBold, Roboto;
                font-weight: 600;
                color: #FFFFFF;
            }

            .txt {
                margin-top: 5px;
                font-size: 18px;
                color: #fff;
                font-weight: 400;
            }

            img {
                width: 40px;
                height: 40px;
            }
        }
    }

    .serve_box {
        margin: 172px auto 0;
        padding: 0 20px 96px;
        max-width: 1220px;
        box-sizing: border-box;
        width: 100%;
        border-bottom: 1px solid #DCDFE6;

        .title {
            text-align: center;

            .txt {
                position: relative;
                display: inline-block;
                font-size: 36px;
                font-family: PingFang SC-Bold, PingFang SC;
                font-weight: bold;
                color: #3476FF;

                &::before {
                    content: '';
                    position: absolute;
                    bottom: 8px;
                    height: 16px;
                    background: linear-gradient(0deg, #097CFF 0%, rgba(86, 204, 242, 0) 100%);
                    border-radius: 0px 0px 0px 0px;
                    width: 100%;
                }
            }
        }

        .info {
            margin-top: 95px;

            .left {
                margin-top: 15px;

                .item {
                    margin-bottom: 16px;
                    // width: 100%;
                    height: 104px;
                    background: #F2F6FF;
                    border-radius: 4px 4px 4px 4px;
                    font-size: 16px;
                    color: #303133;
                    cursor: pointer;

                    img {
                        margin: 0 20px;
                        width: 56px;
                        height: 56px;
                    }
                }
            }

            .right {
                position: relative;
                height: 384px;
                background: #D9D9D9;
                border-radius: 4px 4px 4px 4px;
                background: #fff;
                text-align: right;

                .img {
                    height: 100%;
                    max-width: 100%;
                }

                .info {
                    position: absolute;
                    top: 25%;
                    transform: translateY(-50%);
                    left: 10%;
                    padding: 32px;
                    // box-sizing: border-box;
                    width: 252px;
                    // height: 218px;
                    background: #fff;
                    box-shadow: 10px 10px 10px 0px rgba(52, 118, 255, 0.25);
                    border-radius: 4px;
                    border: 1px solid #3476FF;
                    font-weight: 400;
                    text-align: left;

                    .s_title {

                        padding-left: 16px;
                        border-left: 2px solid #3476FF;
                        color: #303133;
                        font-size: 20px;

                    }

                    .des {
                        padding: 10px;
                        color: #606266;
                        font-size: 14px;
                    }

                    .btn {
                        margin-top: 16px;
                        padding: 12px 24px;
                        border-radius: 4px;
                        background: #3476FF;
                        width: fit-content;
                        font-size: 16px;
                        color: #fff;
                        cursor: pointer;

                        img {
                            width: 24px;
                            height: 24px;
                            margin-right: 8px;
                        }
                    }
                }
            }
        }
    }

    .advantage_box {
        position: relative;
        margin-top: 96px;
        // height: 790px;
        background: url('@/assets/images/index/left_bg.png');
        padding: 80px 0;
        box-sizing: border-box;

        .block {
            width: 104px;
            height: 1px;
        }

        .flex {
            flex-wrap: nowrap;
        }

        .inner_box {

            position: relative;
            z-index: 1;
            margin: auto;
            padding: 64px 28px;
            background: #fff;
            box-shadow: 0px 0px 20px 0px rgba(1, 33, 105, 0.25);
            border-radius: 10px;
            max-width: 1180px;

            .title {
                text-align: center;

                .txt {
                    white-space: nowrap;
                    position: relative;
                    display: inline-block;
                    font-size: 36px;
                    font-family: PingFang SC-Bold, PingFang SC;
                    font-weight: bold;
                    color: #303133;

                    &::before {
                        content: '';
                        position: absolute;
                        bottom: 8px;
                        height: 16px;
                        background: #097CFF;
                        border-radius: 0px 0px 0px 0px;
                        width: 100%;
                        z-index: -1;
                    }
                }
            }

            .info {
                margin-top: 96px;
                gap: 56px;

                img {
                    width: 40px;
                    height: 40px;
                }

                .item {
                    margin-bottom: 20px;
                    position: relative;
                    padding: 24px 24px 88px;
                    box-sizing: border-box;
                    // width: 356px;
                    box-shadow: 4px 4px 10px 0px rgba(1, 33, 105, 0.25);
                    background: #F2F6FF;
                    border-radius: 10px;
                    text-align: center;
                    height: 375px;

                    .text {
                        text-align: left;
                        color: #909399;
                        font-size: 14px;
                    }

                    .text2 {
                        .inner_item {
                            margin-bottom: 10px;
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 400;

                            .key {
                                color: #303133;
                            }

                            .value {
                                color: #909399;
                            }
                        }
                    }

                    .text3 {
                        text-align: left;
                        display: flex;
                        flex-wrap: wrap;
                        gap: 2%;

                        .inner_item {
                            margin: 0 0 16px 0;
                            display: inline-block;
                            padding: 8px 0;
                            width: 32%;
                            box-sizing: border-box;
                            background: #FFF;
                            border: 1px solid #DCDFE6;
                            border-radius: 4px;
                            text-align: center;

                            &:nth-child(3n) {
                                margin: 0 0 16px 0;
                            }
                        }
                    }

                    .title {
                        margin-bottom: 24px;
                        font-size: 18px;
                        color: #303133;
                    }

                    .btn {
                        position: absolute;
                        bottom: 24px;
                        left: 50%;
                        transform: translateX(-50%);
                        margin: 64px auto 0;
                        padding: 12px 24px;
                        border-radius: 4px;
                        background: #3476FF;
                        width: fit-content;
                        font-size: 16px;
                        color: #fff;
                        cursor: pointer;
                        white-space: nowrap;

                        img {
                            width: 24px;
                            height: 24px;
                            margin-right: 8px;
                        }
                    }
                }
            }
        }
    }

    .process_box {
        padding-bottom: 100px;
        margin: 216px auto 0;
        max-width: 1180px;
        width: 100%;
        border-bottom: 1px solid #DCDFE6;

        .title {
            text-align: center;

            .txt {
                position: relative;
                display: inline-block;
                font-size: 36px;
                font-family: PingFang SC-Bold, PingFang SC;
                font-weight: bold;
                color: #3476FF;
                white-space: nowrap;

                &::before {
                    content: '';
                    position: absolute;
                    bottom: 8px;
                    height: 16px;
                    background: linear-gradient(0deg, #097CFF 0%, rgba(86, 204, 242, 0) 100%);
                    border-radius: 0px 0px 0px 0px;
                    width: 100%;
                }
            }

            .des {
                margin-top: 10px;
                color: #909399;
                font-size: 16px;
            }
        }

        .info {
            margin-top: 72px;
            gap: 16px;
            padding: 0 20px;
            box-sizing: border-box;

            .item {
                margin-bottom: 20px;
                box-sizing: border-box;
                // width: 247px;
                padding: 49px 10px;
                text-align: center;
                box-shadow: 4px 4px 4px 0px rgba(52, 118, 255, 0.25);
                border-radius: 10px;
                border: 1px solid #DCDFE6;
            }

            img {
                transform: translate(0px, 45px);
                width: 32px;
                height: 32px;
            }
        }

    }

    .to_us {
        margin-top: 96px;
        font-size: 36px;
        color: #303133;
        text-align: center;

        .txt {
            margin-bottom: 20px;
        }

        .btn {
            display: inline-block;
            margin-top: 16px;
            padding: 12px 24px;
            border-radius: 4px;
            background: #3476FF;
            font-size: 16px;
            color: #fff;
            cursor: pointer;
        }
    }

    .componey_box {
        margin-top: 95px;
        padding: 80px 0;
        // height: 999px;
        background: url('@/assets/images/index/right_bg.png');
        background-size: 100% 100%;
        position: relative;

        .inner_box {
            position: relative;
            margin: auto;
            max-width: 1084px;
            padding: 56px 48px;
            background: #F4F4F4;
            border-radius: 10px;
            box-shadow: 0px 0px 20px 0px rgba(1, 33, 105, 0.25);
            z-index: 1;

            .title {
                text-align: center;

                .txt {
                    position: relative;
                    display: inline-block;
                    font-size: 36px;
                    font-family: PingFang SC-Bold, PingFang SC;
                    font-weight: bold;
                    color: #303133;

                    &::before {
                        content: '';
                        position: absolute;
                        bottom: 8px;
                        height: 16px;
                        background: #097CFF;
                        border-radius: 0px 0px 0px 0px;
                        width: 100%;
                        z-index: -1;
                    }
                }
            }

            .info {
                margin-top: 96px;

                gap: 42px;
                flex-wrap: wrap;

                img {
                    width: 100%;
                    // height: 156px;
                }
            }
        }
    }



    .banner {
        width: 100%;
        min-height: 300px;
        object-fit: cover;
    }

}

footer {

    padding: 37px;
    font-size: 14px;
    color: #606266;
    background: #F4F4F4;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    // min-width: 1180px;
}</style>
