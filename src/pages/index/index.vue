<template>
    <div>
        <div class="container" ref="container">
            <div class="banner">
                <div class="container-auto banner-content">
                    <div class="left leftAni">
                        <h4>{{ $t("trusted")}}</h4>
                        <div class="title-big">
                            {{ $t("moveMoney")}}
                        </div>
                        <h3>{{ $t("fastEasy")}}
                        </h3>
                        <div class="btn-group">
                            <div  class="normal-btn start-btn">{{$t("start")}}</div>
                            <div class="movie-btn" @click="showMovie = true">
                                <img class="arrow" src="@/assets/images/index/arrow.png" alt="arrow" />
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="form-item">
                            <div class="label">{{$t("senders")}}</div>
                            <div class="input-with-select">
                                <el-input :placeholder="$t('enterAmount')" v-model="form.sendersAmount" class="input-amount">
                                </el-input>
                                <el-select v-model="form.sendersType" class="input-select">
                                    <el-option v-for="item in sendTypeList" :label="item" :value="item" :key="item"></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="label">{{$t("recipients")}}</div>
                            <div class="input-with-select">
                                <el-input :placeholder="$t('enterAmount')" v-model="form.recipientsAmount" class="input-amount">
                                </el-input>
                                <el-select v-model="form.recipientsType" class="input-select">
                                    <el-option v-for="item in recipientsTypeList" :label="item" :value="item" :key="item"></el-option>
                                </el-select>
                            </div>
                        </div>
                        <ul class="list">
                            <li>{{$t('lastestRate')}}</li>
                            <li>{{$t('limitNum')}}</li>
                            <li>{{$t('charge')}}</li>
                        </ul>
                        <div class="form-item">
                            <div class="label">{{$t("transoctionType")}}</div>
                            <div class="input-with-select">
                                <el-select v-model="form.transactionType" class="input-transaction">
                                    <el-option v-for="item in transactionTypeList" :label="item" :value="item" :key="item"></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="normal-btn pro-btn">{{$t("proceed")}}</div>
                    </div>
                </div>
            </div>
            <div class="animation-warapper">
                <div class="container-auto section-content animation">
                    <div class="left" :class="animationFlag.c0 ? 'leftAnimation' : 'leaveLeft'">
                        <img class="left-img" src="@/assets/images/index/b1.png" />
                    </div>
                    <div class="right" :class="animationFlag.c0 ? 'rightAnimation' : 'leaveRight'">
                        <div class="right-item">
                            <div class="right-left">
                                <img class="rleft-img" src="@/assets/images/index/user.png" />
                            </div>
                            <div class="right-right">
                                <div class="title">{{$t("createAccount")}}</div>
                                <div class="desc">{{$t("createDesc")}}</div>
                            </div>
                        </div>
                        <div class="right-item">
                            <div class="right-left">
                                <img class="rleft-img" src="@/assets/images/index/bank.png" />
                            </div>
                            <div class="right-right">
                                <div class="title">{{$t("attachBank")}}</div>
                                <div class="desc">{{$t("attachBankDesc")}}</div>
                            </div>
                        </div>
                        <div class="right-item">
                            <div class="right-left">
                                <img class="rleft-img" src="@/assets/images/index/money.png" />
                            </div>
                            <div class="right-right">
                                <div class="title">{{$t("sendMoney")}}</div>
                                <div class="desc">{{$t("sendMoneyDesc")}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="animation-warapper have-bg">
                <div class="title-lg">
                    <h1>{{$t("whyChoose")}}</h1>
                    <h3>{{$t("Anmei")}}</h3>
                </div>
                <div class="container-auto section-column animation">
                    <div class="item" :class="animationFlag.c1 ? 'show' : 'hide'">
                        <i class="el-icon-refresh"/>
                        <h1>{{$t("szyw")}}</h1>
                        <p>{{$t("s1")}}</p>
                    </div>
                    <div class="item" :class="animationFlag.c1 ? 'show' : 'hide'">
                        <i class="el-icon-money"/>
                        <h1>{{$t("qqsk")}}</h1>
                        <p>{{$t("s2")}}</p>
                    </div>
                    <div class="item" :class="animationFlag.c1 ? 'show' : 'hide'">
                        <i class="el-icon-set-up"/>
                        <h1>{{$t("qqfk")}}</h1>
                        <p>{{$t("s3")}}</p>
                    </div>
                    <div class="item" :class="animationFlag.c1 ? 'show' : 'hide'">
                        <i class="el-icon-lock"/>
                        <h1>{{$t("FastPayment")}}</h1>
                        <p>{{$t("FastPaymentDesc")}}</p>
                    </div>
                </div>
            </div>
            <div class="animation-warapper">
                <div class="title-lg">
                    <h1>{{$t("fwys")}}</h1>
                    <h3>{{$t("remesaserviceDesc")}}</h3>
                </div>
                <div class="container-auto section-column section-fwys animation">
                    <div class="item" :class="animationFlag.c2 ? 'show' : 'hide'">
                        <i class="el-icon-location-outline"/>
                        <h1>{{$t("scdw")}}</h1>
                        <p>{{$t("cpjs")}}</p>
                    </div>
                    <div class="item" :class="animationFlag.c2 ? 'show' : 'hide'">
                        <i class="el-icon-connection"/>
                        <h1>{{$t("cxjs")}}</h1>
                        <p>{{$t("cpjs2")}}</p>
                    </div>
                    <div class="item" :class="animationFlag.c2 ? 'show' : 'hide'">
                        <i class="el-icon-cpu"/>
                        <h1>{{$t("cpjz")}}</h1>
                        <p>{{$t("cpjs3")}}</p>
                    </div>
                </div>
            </div>
            <div class="animation-warapper have-bg">
                <div class="container-auto section-content animation">
                    <div class="left" :class="animationFlag.c3 ? 'leftAnimation' : 'leaveLeft'">
                        <img class="left-img" src="@/assets/images/index/f1.png" />
                    </div>
                    <div class="right" :class="animationFlag.c3 ? 'rightAnimation' : 'leaveRight'">
                        <div class="right-item">
                            <div class="right-right">
                                <div class="title" style="margin-bottom: 1.5rem">{{$t("moveMoneyFor")}}</div>
                                <div class="desc">{{$t("moveMoneyForDesc")}}</div>
                            </div>
                        </div>
                        <div class="normal-btn">{{$t("getStartNow")}}</div>
                    </div>
                </div>
            </div>
            <div class="allpayment-content">
                <div class="container-auto allpay-desc">
                    <h1>{{$t("allpayment")}}</h1>
                    <h3>{{$t("allpaymentDesc")}}</h3>
                    <div class="normal-btn opennew-btn">{{$t("opennew")}}</div>
                </div>
            </div>
            <div class="animation-warapper have-bg">
                <div class="container-auto section-content animation">
                    <div class="right" :class="animationFlag.c4 ? 'leftAnimation' : 'leaveLeft'">
                        <div class="right-item">
                            <div class="right-right">
                                <div class="title" style="margin-bottom: 1.5rem">{{$t("manyPlant")}}</div>
                                <div class="desc">{{$t("manyPlantDesc")}}</div>
                            </div>
                        </div>
                        <div class="normal-btn">{{$t("getStartNow")}}</div>
                    </div>
                    <div class="left" :class="animationFlag.c4 ? 'rightAnimation' : 'leaveRight'">
                        <img class="left-img" src="@/assets/images/index/appdown.png" />
                    </div>
                </div>
            </div>
            <div class="animation-warapper">
                <div class="title-lg">
                    <h1>{{$t("comments")}}</h1>
                    <h3>{{$t("commentsDesc")}}</h3>
                </div>
                <div class="container-auto comment-content">
                    <el-carousel trigger="click">
                        <el-carousel-item v-for="item in (Math.ceil(comments.length / 2))" :key="item" class="mycarousel">
                          <div class="item">
                            <div class="avatar">
                                <img :src="comments[(item - 1) * 2].avatar" />
                            </div>
                            <div class="title">
                                <h2>{{comments[(item - 1) * 2].name}}</h2>
                                <h3>{{comments[(item - 1) * 2].content}}</h3>
                            </div>
                          </div>
                          <div class="item" v-if="comments.length > (item - 1) * 2 + 1 ">
                            <div class="avatar">
                                <img :src="comments[(item - 1) * 2 + 1].avatar" />
                            </div>
                            <div class="title">
                                <h2>{{comments[(item - 1) * 2 + 1].name}}</h2>
                                <h3>{{comments[(item - 1) * 2 + 1].content}}</h3>
                            </div>
                          </div>
                        </el-carousel-item>
                      </el-carousel>
                </div>
            </div>
            <div class="animation-warapper have-bg">
                <div class="title-lg">
                    <h1>{{$t("lastnews")}}</h1>
                    <h3>{{$t("lastnewsDesc")}}</h3>
                </div>
                <div class="container-auto section-column section-fwys section-news animation">
                    <div class="item" :class="animationFlag.c5 ? 'show' : 'hide'">
                        <img src="@/assets/images/index/news1.png" class="cover"/>
                        <div class="bottom">
                            <h1>{{$t("news1")}}</h1>
                            <div class="more-btn">{{$t("readmore")}}</div>
                        </div>
                    </div>
                    <div class="item" :class="animationFlag.c5 ? 'show' : 'hide'">
                        <img src="@/assets/images/index/news1.png" class="cover"/>
                        <div class="bottom">
                            <h1>{{$t("news1")}}</h1>
                            <div class="more-btn">{{$t("readmore")}}</div>
                        </div>
                    </div>
                    <div class="item" :class="animationFlag.c5 ? 'show' : 'hide'">
                        <img src="@/assets/images/index/news1.png" class="cover"/>
                        <div class="bottom">
                            <h1>{{$t("news1")}}</h1>
                            <div class="more-btn">{{$t("readmore")}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="animation-warapper">
                <div class="title-lg">
                    <h1>{{$t("ourPowerPartner")}}</h1>
                    <h3>{{$t("ourPowerPartnerDesc")}}</h3>
                </div>
                <div class="container-auto comment-content">
                    <el-carousel trigger="click">
                        <el-carousel-item v-for="item in 3" :key="item" class="company-carousel">
                            <img class="band" :src="require('@/assets/images/index/p' + ((item - 1) * 3 + sitem) * 1 + '.png')" alt="band" v-for="sitem in 4" :key="sitem">
                        </el-carousel-item>
                      </el-carousel>
                </div>
            </div>
        </div>
        <div class="modal" v-if="showMovie">
            <div class="mask" @click="showMovie = false"></div>
            <div class="close" @click="showMovie = false">
                <img src="@/assets/images/index/close.png" />
            </div>
            <div class="modal-content">
                <video 
                    controls 
                    muted 
                    loop 
                    >
                    <source 
                        :src="movieSrc" 
                        type="video/webm" 
                        />
                </video>
            </div>
        </div>
    </div>
</template>
<script>
import { Local } from '@/utils/index'
export default {
    name: 'indexVue',
    data() {
        return {
            comments: [
                {
                    avatar: require('@/assets/images/index/avatar-icon1.png'), 
                    name: 'JustTin Bok', 
                    content: `Odio expedita neque illo deserunt quasi consequatur tenetur fugiat deleniti nisiad dolores accusamus cumque sapiente sequi hic nam dolorum culpa laborum excepturi libero minima. Voluptas quas expedita quae quidem itaque facere non commodi ratione ea.`,
                },
                {
                    avatar: require('@/assets/images/index/avatar-icon2.png'), 
                    name: 'JustTin Bok', 
                    content: `Odio expedita neque illo deserunt quasi consequatur tenetur fugiat deleniti nisiad dolores accusamus cumque sapiente sequi hic nam dolorum culpa laborum excepturi libero minima. Voluptas quas expedita quae quidem itaque facere non commodi ratione ea.`,
                },
                {
                    avatar: require('@/assets/images/index/avatar-icon3.png'), 
                    name: 'JustTin Bok', 
                    content: `Odio expedita neque illo deserunt quasi consequatur tenetur fugiat deleniti nisiad dolores accusamus cumque sapiente sequi hic nam dolorum culpa laborum excepturi libero minima. Voluptas quas expedita quae quidem itaque facere non commodi ratione ea.`,
                },
                {
                    avatar: require('@/assets/images/index/avatar-icon4.png'), 
                    name: 'JustTin Bok', 
                    content: `Odio expedita neque illo deserunt quasi consequatur tenetur fugiat deleniti nisiad dolores accusamus cumque sapiente sequi hic nam dolorum culpa laborum excepturi libero minima. Voluptas quas expedita quae quidem itaque facere non commodi ratione ea.`,
                },
                {
                    avatar: require('@/assets/images/index/avatar-icon5.png'), 
                    name: 'JustTin Bok', 
                    content: `Odio expedita neque illo deserunt quasi consequatur tenetur fugiat deleniti nisiad dolores accusamus cumque sapiente sequi hic nam dolorum culpa laborum excepturi libero minima. Voluptas quas expedita quae quidem itaque facere non commodi ratione ea.`,
                },
            ],
            animationFlag: {
                c0: false,
                c1: false,
                c2: false,
                c3: false,
                c4: false,
                c5: false,
            },
            showMovie: false,
            movieSrc: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Schlossbergbahn.webm',
            type: 0,
            languge: Local('lang') || 'zh',
            notice: 'Reliance-Pay正式上线了',
            serviceLeftData: [
                { title: 'szyw', des: 's1' },
                { title: 'qqsk', des: 's2' },
                { title: 'qqfk', des: 's3' }
            ],
            form: {
                sendersType: 'USA',
                recipientsType: 'AUD',
                transactionType: 'Bank Deposit'
            },
            sendTypeList: ['USA', 'EUR', 'GBP'],
            recipientsTypeList: ['AUD', 'PRI', 'CHN'],
            transactionTypeList: ['Bank Deposit', 'Pickup Point', 'Remesa Wallet'],
            advantageData: [
                { title: 'scdw', des: 'cpjs' },
                {
                    title: 'cxjs', des: 'cpjs2'
                },
                { title: 'cpjz', desList: ['kj', 'xf', 'gycp', 'qc', 'jr', 'cm', 'fc'] }
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
            const selectContent = document.getElementsByClassName('animation')
            const avaheight = window.screen.availHeight
            const scrollY = window.scrollY
            if (selectContent && selectContent.length) {
                const length = selectContent.length
                for (let i = 0; i < length; i++) {
                    const domRect = selectContent[i].getBoundingClientRect()
                    if (domRect.top > 0) {
                        if (avaheight - domRect.top > 0 && scrollY > 10) {
                            this.animationFlag[`c${i}`] = true
                        }
                    } else {
                        if (domRect.top + domRect.height < -100) {
                            this.animationFlag[`c${i}`] = false
                        }
                    }
                    if (scrollY < 10) {
                        this.animationFlag[`c${i}`] = false
                    }
                }
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
    }
}
</script>
<style scoped lang="scss">
.modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10005;
    .modal-content {
        video {
            width: 800px;
            height: 500px;

        }
        @media screen and (max-width: 900px) {
            width: 90%;
            video {
                width: 100%;
                height: auto;
            }
        }
    }

    .mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba($color: #000000, $alpha: 0.5);
    }
    .close img {
        cursor: pointer;
        position: absolute;
        right: 20px;
        top: 20px;
        width: 40px;
        height: 40px;
    }
}
.menus {
    position: fixed;
    top: 88px;
    width: 100%;
    left: 0;
    background: rgba($color: #8eabe7, $alpha: 1);
    z-index: 999;
    box-sizing: border-box;
    transition: all 0.5s;
    overflow: hidden;
    box-shadow: 2px 2px 1px #cddbee;
    height: 0;
    .menus-item {
        color: #fff;
        font-size: 1.2rem;
        line-height: 2.1rem;
        color: #000000;
        cursor: pointer;
        text-align: center;
        &:hover {
            color: #0501fc;
            background: rgba($color: #384d78, $alpha: 0.2);
            font-weight: bold;
        }
    }
}
.showMenu {
    height: 9.3rem;
    padding: 1.5rem 0;
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


    @keyframes ripple {
        0%, 35% {
            -webkit-transform: scale(0);
            transform: scale(0);
            opacity: 1;
        }
        50% {
            -webkit-transform: scale(1.5);
            transform: scale(1.5);
            opacity: 0.8;
        }
        
        100% {
            opacity: 0;
            -webkit-transform: scale(2);
            transform: scale(2);
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
        border: 1px solid $baseColor;
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
            background: $baseColor;
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
                color: $baseColor;
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
                    border: 1px solid $baseColor;
                    font-weight: 400;
                    text-align: left;

                    .s_title {

                        padding-left: 16px;
                        border-left: 2px solid $baseColor;
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
                        background: $baseColor;
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
                        background: $baseColor;
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
                color: $baseColor;
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
            background: $baseColor;
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
        margin-top: 88px;
        width: 100%;
        padding: 5rem 0;
        background: #384d78;
        color: #fff;
        .banner-content {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            column-gap: 1rem;
            @media screen and (max-width: 800px) {
                grid-template-columns: repeat(1, 1fr);
                row-gap: 2rem;
            }
        }
        .leftAni {
            animation: bounceln 1.5s forwards 0.5s;
        }
        .left {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        h4 {
            margin-bottom: 1rem;
            line-height: 1.8rem;
        }
        .title-big {
            font-size: 3.5rem;
            margin-bottom: 1.5rem;
            line-height: 5rem;
        }
        h3 {
            font-size: 1.25rem;
            padding-right: 3rem;
            line-height: 2rem;
            margin-bottom: 1.5rem;
        }
        .btn-group {
            display: flex;
            align-items: center;
        }
        .start-btn {
            width: fit-content;
            height: 44px;
            margin-right: 2.5rem;
        }
        .movie-btn {
            width: 60px;
            height: 60px;
            z-index: 1;
            background-color: #2dbe60;
            border-radius: 50%;
            transition: all ease 0.5s;
            position: relative;
            cursor: pointer;
            .arrow {
                width: 15px;
                height: 15px;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }
        .movie-btn::before {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            z-index: -1;
            bottom: 0;
            left: 0;
            border-radius: 0;
            border-radius: 50%;
            -webkit-transition: all ease 0.5s;
            transition: all ease 0.5s;
            -webkit-animation: ripple 1.6s ease-out infinite;
            animation: ripple 1.6s ease-out infinite;
            background-color: #2dbe60;
        }
        .right {
            background-color: $bgColor;
            padding: 20px;
            border-radius: 10px;
            .form-item {
                margin-bottom: 1.2rem;
                .label {
                    margin-bottom: 0.5rem;
                }
                .input-with-select {
                    padding: 0;
                    display: flex;
                    ::v-deep .input-amount .el-input__inner {
                        border: none;
                        height: 50px;
                        background: #fff;
                        border-radius: 4px 0 0 4px;
                    }
                    .input-transaction {
                        flex: 1;
                    }
                    ::v-deep .input-transaction .el-input__inner {
                        border: none;
                        height: 50px;
                        background: #fff;
                        width: 100%;
                        border-radius: 4px;
                    }
                    ::v-deep .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
                        background: $baseColor;
                    }
                    ::v-deep .input-select .el-input__inner {
                        width: 120px;
                        border: none;
                        height: 50px;
                        color: #fff;
                        background:  $baseColor;
                        border-radius: 0 4px 4px 0;
                    }
                }
            }
            .list {
                font-size: 0.9rem;
                margin: 1.25rem 0;
                padding: 0 0 0 1.5rem;
                li {
                    line-height: 1.6rem;
                }
            }
            .pro-btn {
                text-align: center;
            }
        }
    }
}

.el-select-dropdown__item {
    padding: 6px 9px;
    display: flex;
    align-items: center;
    color: #000;
    &:hover {
        background: $baseColor;
    }
}
.allpayment-content {
    background-image: url('@/assets/images/index/s1.png');
    background-size: 100% 100%;
    display: flex;
    align-content: center;
    justify-content: center;
    position: relative;
    padding-top: 120px;
    padding-bottom: 100px;
    background-attachment: fixed;
    color: #fff;
    &::before {
        content: "";
        position: absolute;
        background: #384d78;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        opacity: 0.9;
    }
    .allpay-desc {
        z-index: 2;
    }
    h1 {
        font-size: 3.5rem;
        text-align: center;
        line-height: 5rem;
    }
    h3 {
        font-size: 1.5rem;
        text-align: center;
        line-height: 2.5rem;
        margin: 2rem 0;
    }
    .opennew-btn {
        width: fit-content;
        margin: 0 auto;
    }
}

.have-bg {
    background: #f3f6f8;
}
.animation-warapper {
    padding: 3rem 0;
    .title-lg {
        max-width: 600px;
        width: 60%;
        margin: 0 auto;
        text-align: center;
        margin-bottom: 3rem;
        @media screen and (max-width: 800px) {
            width: 80%;
        }
        h1 {
            font-size: 2rem;
            line-height: 3rem;
            margin-bottom: 1rem;
        }
        h3 {
            font-size: 1.2rem;
            line-height: 2.1rem;
        }
    }
    .show {
        opacity: 1;
        transform: scale(1);
    }
    .hide {
        opacity: 0;
        transform: scale(0.6);
    }
    .section-column {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        column-gap: 1rem;
        overflow: hidden;
        @media screen and (max-width: 800px) {
            grid-template-columns: repeat(2, 1fr);
            row-gap: 2rem;
        }
        @media screen and (max-width: 500px) {
            grid-template-columns: repeat(1, 1fr);
            row-gap: 2rem;
        }
        .item {
            position: relative;
            box-shadow: 1px 1px 2px #f5f5f5;
            padding: 0.8rem 2rem;
            background: #fff;
            transition: all 0.5s;
            cursor: pointer;
            transition: all 1.5s;
            i {
                font-size: 4rem;
                color: #666;
                margin-bottom: 1rem;
            }
            h1 {
                font-size: 1.8rem;
                line-height: 3rem;
            }
            p {
                font-size: 1rem;
                line-height: 1.8rem;
            }
            &:hover {
                box-shadow: 0px 5px 25px #ccc9c9;
                i {
                    color: $baseColor;
                }
            }
        }
    }
    .section-fwys {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 1rem;
        overflow: hidden;
        @media screen and (max-width: 800px) {
            grid-template-columns: repeat(2, 1fr);
        }
        @media screen and (max-width: 500px) {
            grid-template-columns: repeat(1, 1fr);
            row-gap: 2rem;
        }
        .item {
            border: 1px solid #ccc;
            box-shadow: 2px 3px 5px rgba(0,0,0,.375);
            &:hover {
                box-shadow: 2px 3px 10px rgba(46, 45, 45, 0.675);
            }
        }

    }
    .section-news {
        .bottom {
            padding: 0 0 2rem 1rem;
            margin-top: -10px;
            transition: all 0.5s;
        }
        .item {
            border: none;
            padding: 0;
            h1 {
                padding-top: 1rem;
                font-size: 1.3rem;
                line-height: 2.5rem;
            }
            &:hover {
                transform: scale(1.05);
                .bottom {
                    background: $bgColor;
                    padding-left: 1rem;
                    color: #fff;
                        .more-btn {
                            color: $bgColor;
                            background: #fff;
                        }
                }
            }
        }
        .cover {
            width: 100%;
            object-fit: contain;
        }
        .more-btn {
            border-radius: 1rem;
            color: #fff;
            background: $bgColor;
            padding: 4px 12px;
            width: fit-content;
            margin-top: 1rem;
            transition: all 0.5s;
        }
    }
    .section-content {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 1rem;
        overflow: hidden;
        @media screen and (max-width: 800px) {
            grid-template-columns: repeat(1, 1fr);
            row-gap: 2rem;
        }
      
        .left {
            display: flex;
            align-items: center;
            transition: all 2s;
        }
        .left-img {
            width: 100%;
            object-fit: contain;
        }
        .right {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: all 2s;
        }
        .leftAnimation {
            opacity: 1;
           transform: translateX(0);
        }
        .rightAnimation {
            transform: translateX(0);
            opacity: 1;
        }
        .leaveLeft {
            opacity: 0;
            transform: translateX(-50vw);
        }
        .leaveRight {
            opacity: 0;
            transform: translateX(100vw);
        }
        .right-item {
            display: flex;
            align-items: center;
            margin-bottom: 1.5rem;
            .rleft-img {
                width: 3rem;
                margin-right: 1rem;
            }
            .title {
                font-size: 2rem;
                line-height: 3rem;
                font-weight: bold;
            }
            .desc {
                font-size: 1.2rem;
                line-height: 1.7rem;
            }
        }
    }
}
.mycarousel {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 1rem;
    @media screen and (max-width: 500px) {
        grid-template-columns: repeat(1, 1fr);
        row-gap: 1rem;
    }
    .item {
        display: flex;
        .avatar img {
            width: 4rem;
            margin-right: 1rem;
        }
        h2 {
            font-size: 1.6rem;
            line-height: 2.4rem;
        }
        h3 {
            font-size: 1.2rem;
            line-height: 2rem;
        }
    }
}
.company-carousel {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 1rem;
    @media screen and (max-width: 700px) {
        grid-template-columns: repeat(2, 1fr);
        row-gap: 1rem;
    }
    .band {
        width: 100%;
    }
}
::v-deep .el-carousel__button {
    background-color: #222;
    height: 3px;
}
</style>
