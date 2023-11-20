<template>
    <div>
        <div class="container" ref="container">
            <header :class="headerShow && 'headerShow'">
                <div class="inner">
                    <img class="logo" src="@/assets/images/index/logo.png" alt="">
                    <div class="info flex flex_align_center">
                        <div class="item hidden-md-and-down item-active">{{ $t('home') }}</div>
                        <div class="item hidden-md-and-down">{{ $t('product') }}&{{ $t('serve') }}</div>
                        <div class="btn-group flex hidden-md-and-down">
                            <div class="btn" @click="to('/user/login')">{{ $t('login') }}</div>
                            <div class="btn active" @click="to('/user/register')">{{ $t('register') }}</div>
                        </div>
                        <div class="language flex flex_align_center" @click="open">
                            <img class="icon" v-if="languge == 'zh'" src="@/assets/images/index/ch.png" alt="zh">
                            <img class="icon" v-else src="@/assets/images/index/en.png" alt="en">
                            <span class="txt">{{ $t('languageChange') }}</span>
                            <img src="@/assets/images/index/down.png" alt="">
                        </div>
                        <div class="hidden-md-and-up" @click="handleShowMenu">
                            <div class="menu-btn">
                                <div />
                                <div />
                                <div />
                            </div>
                            <div class="menus" :class="showMenu && 'showMenu'">
                                <div class="menus-item" @click="to('/index')">首页</div>
                                <div class="menus-item" @click="to('/user/login')">登陆</div>
                                <div class="menus-item" @click="to('/user/register')">注册</div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section class="header-bg">
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
                    <div class="item">
                        <div>
                            <CountTo class="count" :startVal='0' :endVal='100' :duration='500'></CountTo>
                            <img src="@/assets/images/index/add.png" alt="">
                        </div>
                        <div class="txt">{{ $t('fggj') }}</div>
                    </div>
                    <div class="item">
                        <div>
                            <CountTo class="count" :startVal='0' :endVal='100' :duration='500'></CountTo>
                            <img src="@/assets/images/index/add.png" alt="">
                        </div>
                        <div class="txt">{{ $t('fggj') }}</div>
                    </div>
                    <div class="item">
                        <div>
                            <CountTo class="count" :startVal='0' :endVal='100' :duration='500'></CountTo>
                            <img src="@/assets/images/index/add.png" alt="">
                        </div>
                        <div class="txt">{{ $t('fggj') }}</div>
                    </div>
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
            <section class="">
                <div class="advantage_box">
                    <div class="inner_box">
                        <div class="title">
                            <div class="txt">{{ $t('fwys') }}</div>
                        </div>
                        <div class="flex">
                            <div class="block hidden-sm-and-down"></div>
                            <div class="info">
                                <div class="black hidden-sm-and-down"></div>
                                <el-row :gutter="24">
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
            <section class="componey_box">
                <div class="inner_box">
                    <div class="title">
                        <div class="txt">{{ $t('hzhb') }}</div>
                    </div>
                    <div class="info">
                        <el-row :gutter="24">
                            <el-col :xs="12" :sm="4" v-for="(item) in 12" :key="item">
                                <img :src="require('@/assets/images/index/p' + item + '.png')" alt="">
                            </el-col>
                        </el-row>
                    </div>
                </div>

            </section>
            <!-- <section class="content to_us">
                <div class="txt">{{ $t('jjfa') }}</div>
                <div class="txt">{{ $t('jt') }}</div>
                <div class="btn">{{ $t('lxwm') }}</div>
            </section> -->
            <el-backtop></el-backtop>
        </div>
        <footer>
            <div class="footer-content">
                <div class="footer-top">
                    <div class="footer-item">
                        <p class="desc">
                            ReliancePay旨在为更多的跨境企业提供便利的服务于技术支持
                        </p>
                        <h3>关注我们</h3>
                        <img class="footer-icon" src="@/assets/images/index/facebook.png" alt="facebook" />
                        <img class="footer-icon" src="@/assets/images/index/twitter.png" alt="twitter" />
                        <img class="footer-icon" src="@/assets/images/index/telegram.png" alt="telegram" />
                        <img class="footer-icon" src="@/assets/images/index/skype.png" alt="skype" />
                    </div>
                    <div class="footer-item">
                        <div class="footer-title">有效链接</div>
                        <div class="item-warppaer">
                            <div class="item" v-for="item in links" :key="item.name" @click="to(item.url)">
                                {{item.name}}
                            </div>
                        </div>
                    </div>
                    <div class="footer-item">
                        <div class="footer-title">订阅</div>
                        <div class="item-desc">探索更多的解决方案，请与我们联系</div>
                        <div class="btn">{{ $t('lxwm') }}</div>
                    </div>
                </div>
                <div class="copyright">{{$t('footer')}}</div>
            </div>
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
            noteice: 'Reliance-Pay正式上线了',
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
            ],
            links: [
                {name: '首页', url: '/index'},
                {name: '关于我们', url: '/about'},
                {name: '登录', url: '/user/login'},
                {name: '新闻', url: '/blog'},
                {name: '注册', url: '/user/register'},
                {name: '隐私&政策', url: '/privacy'},
            ],
            showMenu: false,
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
        handleShowMenu() {
            this.showMenu = !this.showMenu
        },
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
.item-active {
    color: #0b07fa;
    font-weight: bold;
}
.menus {
    position: fixed;
    top: 88px;
    width: 100%;
    left: 0;
    background: rgb(207, 223, 245);
    z-index: 999;
    box-sizing: border-box;
    transition: all 0.5s;
    height: 0;
    overflow: hidden;
    box-shadow: 2px 2px 1px #cddbee;
    .menus-item {
        color: #fff;
        font-size: 15px;
        line-height: 36px;
        color: #000000;
        cursor: pointer;
        text-align: center;
        &:hover {
            color: #0501fc;
            background: rgba($color: #0501fc, $alpha: 0.2);
            font-weight: bold;
        }
    }
}
.showMenu {
    height: 156px;
    padding: 24px 0;
}

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
        box-sizing: border-box;
        width: 1180px;
        @media screen and (max-width: 1250px) {
            width: 100%;
            padding: 0 24px;
        }
        @media screen and (max-width: 700px) {
            width: 100%;
            padding: 0 12px;
        }
    }

    @keyframes headerMove {
        0% {
            top: -88px;
            background: rgba(255, 255, 255, 0.05);
        }
        100% {
            top: 0;
            background: rgba(202, 210, 255, .6);
            backdrop-filter: blur(20px);
            box-shadow: 0 2px 10px rgba($color: #000000, $alpha: .1);
        }
    }
    header {
        position: fixed;
        z-index: 1001;
        left: 0;
        top: 0;
        width: 100%;
        height: 88px;
        display: flex;
        align-items: center;
        background: rgba(255, 255, 255, 0.05);
        &.headerShow {
            animation: headerMove forwards 1s;
        }

        .logo {
            height: 60px;
            @media screen and (max-width: 700px) {
                height: 35px;
            }
        }

        .logo2 {
            height: 44px;
        }

        .inner {
            margin: auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 1180px;
            @media screen and (max-width: 1200px) {
                padding: 0 60px;
            }
            @media screen and (max-width: 700px) {
                padding: 0 10px;
            }
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
                margin-right: 6px;
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
        box-sizing: border-box;
    }

    .notice {
        margin: 32px auto;
        box-sizing: border-box;
        padding: 14px 26px 20px;
        width: 100%;
        height: 64px;
        background: #FFFFFF;
        box-shadow: 0px 4px 4px 0px rgba(52, 118, 255, 0.25);
        border-radius: 40px 40px 40px 40px;
        opacity: 1;
        border: 1px solid #3476FF;
        display: flex;
        align-items: center;
        @media screen and (max-width: 1200px) {
            margin: 12px auto;
            padding: 8px 12px 10px;
            height: 32px;
            .txt {
                font-size: 15px!important;
            }
            img {
                width: 16px!important;
                height: 16px!important;
            }
        }
        .txt {
            margin-left: 8px;
            color: #606266;
            font-size: 18px;
            font-weight: 400;
            width: calc(100% - 40px);
            white-space: nowrap;  
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 21px;
        }

        img {
            width: 32px;
            height: 32px;
        }
    }

    .numbers_box {
        margin: 128px auto 0;
        box-sizing: border-box;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 32px;
        @media screen and (max-width: 1200px) {
            margin: 68px auto 0;
            grid-template-columns: repeat(1, 1fr);
            .item {
                padding: 12px 0!important;
                .count {
                    font-size: 18px!important;
                }
                img {
                    width: 20px!important;
                    height: 20px!important;
                }
                .txt {
                    font-size: 16px!important;
                }
            }
        }
        .item {
            margin-bottom: 20px;
            box-sizing: border-box;
            padding: 40px 0;
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
        box-sizing: border-box;
        width: 100%;
        border-bottom: 1px solid #DCDFE6;
        @media screen and (max-width: 1200px) {
            margin: 64px auto 0;
            .txt {
                font-size: 26px!important;
            }
        }
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
                    @media screen and (max-width: 700px) {
                        width: 230px;
                        padding: 18px;
                    }
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
        @media screen and (max-width: 1336px) {
            margin-top: 40px;
            padding: 40px 0;
            .txt {
                font-size: 26px!important;
            }
        }
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
        width: 100%;
        border-bottom: 1px solid #DCDFE6;
        @media screen and (max-width: 1200px) {
            padding-bottom: 40px;
            margin: 120px auto 0;
        }
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
                @media screen and (max-width: 1200px) {
                    font-size: 22px;
                }
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
                    @media screen and (max-width: 1200px) {
                        font-size: 22px;
                    }
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
    padding: 50px 0 8px 0;
    font-size: 14px;
    color: #fff;
    background: #6967ca;
    text-align: center;
    box-sizing: border-box;
    text-align: left;
    .footer-content {
        width: 1180px;
        box-sizing: border-box;
        @media screen and (max-width: 1200px) {
            width: 100%;
            padding: 0 24px;
        }
        margin: 0 auto;
        .footer-icon {
            height: 30px;
            margin-right: 9px;
        }
    }
    .copyright {
        text-align: center;
    }
    .footer-top {
        box-sizing: border-box;
        margin-bottom: 28px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 20px;
        @media screen and (max-width: 1200px) {
            grid-template-columns: repeat(2, 1fr);
        }
        @media screen and (max-width: 700px) {
            grid-template-columns: repeat(1, 1fr);
            column-gap: 0;
        }
        h3 {
            text-align: left;
            margin: 12px 0;
        }
        .footer-title {
            font-size: 17px;
            &::after {
                content: '';
                width: 30px;
                height: 1px;
                background: #ddd6d6;
                display: block;
                margin: 12px 0;
            }
        }
        .item-warppaer {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            row-gap: 12px;
            .item {
                cursor: pointer;
                &:hover {
                    font-weight: bold;
                }
            }
        }
        .btn {
            background: #1916d6;
            width: fit-content;
            padding: 6px 10px;
            border-radius: 6px;
            margin-top: 16px;
            cursor: pointer;
            &:hover {
                background: #0501fc;
            }
        }
    }
}
.menu-btn {
    width: 36px;
    height: 22px;
    border-radius: 5px;
    background-color: #723eeb;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 7px 0;
    cursor: pointer;
    > div {
        width: 20px;
        height: 3px;
        background: #fff;
    }
}
</style>
