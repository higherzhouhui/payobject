<template>
  <div>
    <div class="container" ref="container">
      <div class="banner">
        <div class="container-auto banner-content">
          <div class="left leftAni">
            <h4>{{ $t("trusted") }}</h4>
            <div class="title-big">
              {{ $t("moveMoney") }}
            </div>
            <h3 style="margin-top: 8px">{{ $t("fastEasy") }}</h3>
            <div class="btn-group">
              <div class="normal-btn start-btn" @click="handleNext">
                {{ $t("start") }}
              </div>
              <!-- <div class="movie-btn" @click="showMovie = true">
                <img
                  class="arrow"
                  src="@/assets/images/index/arrow.png"
                  alt="arrow"
                />
              </div> -->
            </div>
          </div>
          <div class="right">
            <div class="form-item">
              <div class="label">{{ $t("汇付总额") }}</div>
              <div class="input-with-select">
                <el-input
                  :placeholder="$t('enterAmount')"
                  v-model="form.exValue"
                  class="input-amount"
                  type="number"
                >
                </el-input>
                <el-select
                  v-model="form.exFrom"
                  class="input-select"
                  ref="exFromRef"
                  @change="getTargetList"
                >
                  <el-option
                    v-for="item in areaList"
                    :key="item.code"
                    :value="item.coinCode"
                  >
                    <span
                      :class="`flag-icon ${getFlagIcon(item.coinCode)}`"
                      v-if="item.coinCode != 'USDT'"
                    ></span>
                    <img
                      src="@/assets/images/usdt.png"
                      v-else
                      class="usdt-inner"
                    />
                    {{ lang == "zh" ? item.name : item.enName }}
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="form-item">
              <div class="label">{{ $t("到账额") }}</div>
              <div class="input-with-select">
                <el-input
                  :placeholder="$t('enterAmount')"
                  v-model="exTargetValue"
                  class="input-amount"
                  type="number"
                >
                </el-input>
                <el-select
                  v-model="form.exTarget"
                  class="input-select"
                  ref="targetRef"
                  @change="calculateMoney"
                >
                  <el-option
                    v-for="item in targetCoinList"
                    :key="item.code"
                    :value="item.coinCode"
                  >
                    <span
                      :class="`flag-icon ${getFlagIcon(item.coinCode)}`"
                      v-if="item.coinCode != 'USDT'"
                    ></span>
                    <img
                      src="@/assets/images/usdt.png"
                      v-else
                      class="usdt-inner"
                    />
                    {{ lang == "zh" ? item.name : item.enName }}
                  </el-option>
                </el-select>
              </div>
            </div>
            <ul class="list">
              <li v-if="rateDetail">{{ rateDetail }}</li>
              <li>{{ $t("limitNum") }}</li>
            </ul>
            <div class="form-item">
              <div class="label">{{ $t("收款账号") }}</div>
              <div class="input-with-select">
                <el-select v-model="transactionType" class="input-transaction">
                  <el-option
                    v-for="item in transactionTypeList"
                    :label="item"
                    :value="item"
                    :key="item"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="normal-btn pro-btn" @click="handleNext">
              {{ $t("proceed") }}
            </div>
          </div>
        </div>
      </div>
      <div class="animation-warapper">
        <div class="container-auto section-content animation">
          <div
            class="left"
            :class="animationFlag.c0 ? 'leftAnimation' : 'leaveLeft'"
          >
            <img class="left-img" src="@/assets/images/index/b1.png" />
          </div>
          <div
            class="right"
            :class="animationFlag.c0 ? 'rightAnimation' : 'leaveRight'"
          >
            <div class="right-item">
              <div class="svg-wrapper">
                <svg-icon iconClass="user" className="rleft-svg" />
              </div>
              <div class="svg-conent">
                <div class="title">创建账户</div>
                <div class="desc">
                  我们将通过邮箱验证您的基础信息，创建并激活您的账户。
                </div>
              </div>
            </div>
            <div class="right-item">
              <div class="svg-wrapper">
                <svg-icon iconClass="building" className="rleft-svg" />
              </div>
              <div class="svg-conent">
                <div class="title">完成账户KYC认证</div>
                <div class="desc">
                  我们需要您的企业资料和银行资料进行KYC资料核对，保障支付过程的安全。
                </div>
              </div>
            </div>
            <div class="right-item">
              <div class="svg-wrapper">
                <svg-icon
                  iconClass="comments-dollar-solid"
                  className="rleft-svg"
                />
              </div>
              <div class="svg-conent">
                <div class="title">发起转汇</div>
                <div class="desc">认证服务，开启您的全球支付之旅！</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="animation-warapper have-bg">
        <div class="title-lg">
          <h1>{{ $t("whyChoose") }}</h1>
          <h2>{{ $t("payService") }}</h2>
          <h3>{{ $t("Anmei") }}</h3>
        </div>
        <div class="container-auto section-column animation">
          <div class="item" :class="animationFlag.c1 ? 'show' : 'hide'">
            <div class="svgWrapper">
              <svg-icon
                iconClass="circle-dollar-to-slot-solid"
                className="svgIcon"
              />
            </div>
            <h1>{{ $t("szyw") }}</h1>
            <p>{{ $t("s1") }}</p>
          </div>
          <div class="item" :class="animationFlag.c1 ? 'show' : 'hide'">
            <div class="svgWrapper">
              <svg-icon iconClass="lock-solid" className="svgIcon" />
            </div>
            <h1>{{ $t("qqsk") }}</h1>
            <p>{{ $t("s2") }}</p>
          </div>
          <div class="item" :class="animationFlag.c1 ? 'show' : 'hide'">
            <div class="svgWrapper">
              <svg-icon iconClass="headset-solid" className="svgIcon" />
            </div>
            <h1>{{ $t("fwzc") }}</h1>
            <p>{{ $t("s3") }}</p>
          </div>
          <div class="item" :class="animationFlag.c1 ? 'show' : 'hide'">
            <div class="svgWrapper">
              <svg-icon
                iconClass="money-check-dollar-solid"
                className="svgIcon"
              />
            </div>
            <h1>{{ $t("qqfk") }}</h1>
            <p>{{ $t("s4") }}</p>
          </div>
        </div>
      </div>
      <div class="animation-warapper">
        <div class="title-lg">
          <h1>{{ $t("fwys") }}</h1>
          <h3>{{ $t("remesaserviceDesc") }}</h3>
        </div>
        <div
          class="container-auto section-column section-column-feature animation"
        >
          <div class="feature-item" :class="animationFlag.c2 ? 'show' : 'hide'">
            <svg-icon iconClass="money-bill-solid" className="feature-svg" />
            <div class="feature-desc">{{ $t("scdw") }}</div>
          </div>
          <div class="feature-item" :class="animationFlag.c2 ? 'show' : 'hide'">
            <svg-icon iconClass="building" className="feature-svg" />
            <div class="feature-desc">{{ $t("cxjs") }}</div>
          </div>
          <div class="feature-item" :class="animationFlag.c2 ? 'show' : 'hide'">
            <svg-icon iconClass="cart-shopping-solid" className="feature-svg" />
            <div class="feature-desc">{{ $t("cpjz") }}</div>
          </div>
          <div class="feature-item" :class="animationFlag.c2 ? 'show' : 'hide'">
            <svg-icon
              iconClass="circle-dollar-to-slot-solid"
              className="feature-svg"
            />
            <div class="feature-desc">{{ $t("cpjz4") }}</div>
          </div>
          <div></div>
          <div class="feature-item" :class="animationFlag.c2 ? 'show' : 'hide'">
            <svg-icon iconClass="credit-card-solid" className="feature-svg" />
            <div class="feature-desc">{{ $t("cpjz5") }}</div>
          </div>
          <div class="feature-item" :class="animationFlag.c2 ? 'show' : 'hide'">
            <svg-icon
              iconClass="file-invoice-dollar-solid"
              className="feature-svg"
            />
            <div class="feature-desc">{{ $t("cpjz6") }}</div>
          </div>
        </div>
      </div>
      <div class="animation-warapper have-bg">
        <div class="container-auto section-content animation">
          <div
            class="left"
            :class="animationFlag.c3 ? 'leftAnimation' : 'leaveLeft'"
          >
            <img class="left-img" src="@/assets/images/index/f1.png" />
          </div>
          <div
            class="right"
            :class="animationFlag.c3 ? 'rightAnimation' : 'leaveRight'"
          >
            <div class="right-item">
              <div class="right-right">
                <div class="alltitle">
                  {{ $t("moveMoneyFor") }}
                </div>
                <ul class="ul-desc">
                  <li class="desc mdesc">{{ $t("moveMoneyFor1") }}</li>
                  <li class="desc mdesc">{{ $t("moveMoneyFor2") }}</li>
                  <li class="desc mdesc">{{ $t("moveMoneyFor3") }}</li>
                  <li class="desc mdesc">{{ $t("moveMoneyFor4") }}</li>
                  <li class="desc mdesc">{{ $t("moveMoneyFor5") }}</li>
                  <li class="desc mdesc">{{ $t("moveMoneyFor6") }}</li>
                </ul>
              </div>
            </div>
            <div class="normal-btn" @click="handleNext">
              {{ $t("getStartNow") }}
            </div>
          </div>
        </div>
      </div>
      <div class="allpayment-content">
        <div class="container-auto allpay-desc">
          <h1>{{ $t("allpayment") }}</h1>
          <h1>{{ $t("allpayment1") }}</h1>
          <h3>{{ $t("allpaymentDesc") }}</h3>
          <div class="country">
            <div class="country-item" v-for="item in areaList" :key="item.id">
              <span
                :class="`flag-icon ${getFlagIcon(item.coinCode)}`"
                v-if="item.coinCode != 'USDT'"
              ></span>
              <img src="@/assets/images/usdt.png" v-else class="usdt-inner" />
              <span class="country-name">{{
                lang == "zh" ? item.name : item.enName
              }}</span>
            </div>
          </div>
          <div
            class="normal-btn opennew-btn"
            @click="$router.push('/user/register')"
          >
            {{ $t("opennew") }}
          </div>
        </div>
      </div>
      <div class="animation-warapper have-bg">
        <div class="container-auto section-content animation">
          <div
            class="right"
            :class="animationFlag.c4 ? 'leftAnimation' : 'leaveLeft'"
          >
            <div class="right-item">
              <div class="right-right">
                <div
                  class="title"
                  style="
                    margin-bottom: 1.5rem;
                    color: #2dbe60;
                    font-weight: bold;
                    font-size: 1rem;
                  "
                >
                  {{ $t("manyPlant") }}
                </div>
                <div class="title-big">{{ $t("manyPlantDesc") }}</div>
                <span class="normal-text">
                  {{ $t("下载应用") }}
                </span>
                <span class="normal-text" @click="handleNext">
                  {{ $t("创建账户") }}
                </span>
                <span class="normal-text" @click="handleNext">
                  {{ $t("开始使用") }}
                </span>
              </div>
            </div>
            <!-- <div class="normal-btn" @click="handleNext">
              {{ $t("getStartNow") }}
            </div> -->
          </div>
          <div
            class="left"
            :class="animationFlag.c4 ? 'rightAnimation' : 'leaveRight'"
          >
            <img class="left-img" src="@/assets/images/index/appdown.png" />
          </div>
        </div>
      </div>
      <div class="animation-warapper">
        <div class="title-lg">
          <h1>{{ $t("comments") }}</h1>
          <h3>{{ $t("commentsDesc") }}</h3>
        </div>
        <div class="container-auto comment-content">
          <swiper
            ref="refSwiper"
            :options="commentsWiperOption"
            class="content-swiper"
          >
            <swiper-slide
              v-for="item in comments"
              :key="item.name"
              class="mycarousel"
            >
              <div class="item">
                <h3>{{ item.content }}</h3>
                <div class="user-info">
                  <div class="avatar">
                    <img :src="item.avatar" />
                  </div>
                  <div class="user">
                    <p class="user-name">{{ item.name }}</p>
                    <p class="user-desc">{{ item.desc }}</p>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
          <div class="swiper-pagination-commentsWiperOption"></div>
        </div>
      </div>
      <div class="animation-warapper have-bg">
        <div class="title-lg">
          <h1>{{ $t("lastnews") }}</h1>
          <h3>{{ $t("lastnewsDesc") }}</h3>
        </div>
        <div
          class="container-auto section-column section-three section-news animation"
        >
          <div
            class="item"
            :class="animationFlag.c5 ? 'show' : 'hide'"
            v-for="item in blogList"
            :key="item.id"
            @click="routerToBlogDetail(item.id)"
          >
            <div class="backgroundEffect"></div>
            <div class="cover">
              <img :src="`/api/file/downLoad?url=${item.cover}`" />
              <div class="time">
                <div class="date">{{ item.date }}</div>
                <div class="month">{{ getMonth(item.month) }}</div>
                <div class="year">{{ item.year }}</div>
              </div>
            </div>
            <div class="bottom">
              <h1>{{ item.title }}</h1>
              <h2>{{ item.mainPoint }}</h2>
              <div class="more-btn">
                <span>{{ $t("readmore") }}</span>
                <i class="el-icon-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="animation-warapper">
        <div class="title-lg">
          <h1>{{ $t("ourPowerPartner") }}</h1>
          <h3>{{ $t("ourPowerPartnerDesc") }}</h3>
        </div>
        <div class="container-auto comment-content">
          <swiper
            ref="refSwiper"
            :options="partnerWiperOption"
            class="content-swiper"
          >
            <swiper-slide
              v-for="item in 5"
              :key="item.id"
              class="company-swiper"
            >
              <img
                class="band"
                :src="require('@/assets/images/index/company-' + item + '.png')"
                alt="band"
              />
            </swiper-slide>
          </swiper>
          <div class="swiper-pagination-partnerWiperOption"></div>
        </div>
      </div>
    </div>
    <div class="modal" v-if="showMovie">
      <div class="mask" @click="showMovie = false"></div>
      <div class="close" @click="showMovie = false">
        <img src="@/assets/images/index/close.png" />
      </div>
      <div class="modal-content">
        <video controls muted loop>
          <source :src="movieSrc" type="video/webm" />
        </video>
      </div>
    </div>
  </div>
</template>
<script>
import { Local } from "@/utils/index";
import {
  getSourceCoin,
  getTargetCoin,
  homeBlogList,
  getCalculateRate,
} from "@/api/common";
import { getFlagIcon } from "@/utils/common";
export default {
  name: "indexVue",
  data() {
    return {
      country: "",
      getFlagIcon: getFlagIcon,
      comments: [
        {
          avatar: require("@/assets/images/index/huawei.png"),
          name: "Huawei Technologies",
          content: `“在全球运营中，资金的及时和安全转移至关重要。自从我们开始使用ReliancePay后，不仅汇款过程变得更加高效，而且由于他们出色的货币汇率，我们还节省了大量成本。ReliancePay已成为我们国际金融交易的可靠伙伴。”`,
          desc: '使用超过2年的用户'
        },
        {
          avatar: require("@/assets/images/index/zte.png"),
          name: "ZTE",
          content: `ReliancePay的操作简易性和卓越的客户服务让我们的国际支付流程无比顺畅。实时的活动追踪功能让我们能够随时监控资金流向，确保每一笔交易都能快速且安全地完成。”`,
          desc: '使用超过2年的用户'
        },
        {
          avatar: require("@/assets/images/index/telling.png"),
          name: "Telling",
          content: `“我们对ReliancePay的安全保障和全天候支持印象深刻。他们不仅保证了交易的安全性，还为我们提供了行业内最优惠的汇率，极大地提高了我们的工作效率。”`,
          desc: '使用超过2年的用户'
        },
        {
          avatar: require("@/assets/images/index/binance.png"),
          name: "Binance",
          content: `优秀的产品思维以及高度前瞻性，为安全支付行业树立起了标杆,不亚于市面上的任一国际支付平台，相信不久将会闪闪发光`,
          desc: '使用超过2年的用户'
        },
        {
          avatar: require("@/assets/images/index/coinbase.png"),
          name: "CoinBase",
          content: `很好的解决了国际支付行业痛点，为全球化贸易提供了较为便捷且安全的支付平台`,
          desc: '使用超过2年的用户'
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
      movieSrc:
        "https://upload.wikimedia.org/wikipedia/commons/8/87/Schlossbergbahn.webm",
      type: 0,
      lang: Local("lang") || "zh",
      notice: "Reliance-Pay正式上线了",
      serviceLeftData: [
        { title: "szyw", des: "s1" },
        { title: "qqsk", des: "s2" },
        { title: "qqfk", des: "s3" },
      ],
      form: {
        exFrom: "",
        exTarget: "",
        exValue: "",
      },
      exTargetValue: "",
      rateDetail: "",
      sendTypeList: ["USA", "EUR", "GBP"],
      recipientsTypeList: ["AUD", "PRI", "CHN"],
      transactionType: "银行入账",
      transactionTypeList: ["银行入账", "ReliancePay Wallet"],
      commentsWiperOption: {
        // 设置垂直轮播vertical,  水平轮播 horizontal
        direction: "horizontal",
        // 轮播图间距
        spaceBetween: 18,
        slidesPerView: 1,
        // 循环模式选项
        loop: true,
        //  自动滑动
        autoplay: {
          delay: 4000,
          // 如果设置为true，当切换到最后一个slide时停止自动切换。
          stopOnLastSlide: false,
          // 如果设置为false，用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay
          disableOnInteraction: false,
        },
        breakpoints: {
          //当宽度大于等于480
          500: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          900: {
            slidesPerView: 3,
            spaceBetween: 32,
          },
        },
        // 分页器
        pagination: {
          el: ".swiper-pagination-commentsWiperOption",
          clickable: true, // 设置小圆点可以切换
        },
      },
      partnerWiperOption: {
        // 设置垂直轮播vertical,  水平轮播 horizontal
        direction: "horizontal",
        // 轮播图间距
        spaceBetween: 18,
        slidesPerView: 2,
        // 循环模式选项
        loop: true,
        //  自动滑动
        autoplay: {
          delay: 2500,
          // 如果设置为true，当切换到最后一个slide时停止自动切换。
          stopOnLastSlide: false,
          // 如果设置为false，用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay
          disableOnInteraction: false,
        },
        breakpoints: {
          //当宽度大于等于320
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          //当宽度大于等于480
          680: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          //当宽度大于等于640
          940: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
        },
        // 分页器
        pagination: {
          el: ".swiper-pagination-partnerWiperOption",
          clickable: true, // 设置小圆点可以切换
        },
      },
      advantageData: [
        { title: "scdw", des: "cpjs" },
        {
          title: "cxjs",
          des: "cpjs2",
        },
        {
          title: "cpjz",
          desList: ["kj", "xf", "gycp", "qc", "jr", "cm", "fc"],
        },
      ],
      areaList: [],
      targetCoinList: [],
      targetCoin: [],
      showMenu: false,
      blogList: [],
      rate: 1,
    };
  },
  created() {
    this.getAreaCode();
    this.getBlogsList();
  },
  watch: {
    form: {
      deep: true,
      handler: function (newVal, oldVal) {
        if (this.form.exFrom && this.form.exTarget) {
          if (this.form.exValue) {
            this.exTargetValue = this.rate * this.form.exValue;
          } else {
            if (this.exTargetValue) {
              this.form.exValue = this.exTargetValue / this.rate;
            }
          }
        }
      },
    },
    rate: function () {
      if (this.form.exFrom && this.form.exTarget) {
        if (this.form.exValue) {
          this.exTargetValue = this.rate * this.form.exValue;
        } else {
          if (this.exTargetValue) {
            this.form.exValue = this.exTargetValue / this.rate;
          }
        }
      }
    },
    exTargetValue: function () {
      if (this.form.exFrom && this.form.exTarget) {
        if (this.exTargetValue && this.exValue) {
          if (
            Math.abs(this.exTargetValue - this.rate * this.form.exValue) < 1
          ) {
            return;
          }
        }
        if (this.exTargetValue) {
          this.form.exValue = this.exTargetValue / this.rate;
        } else {
          this.form.exValue = "";
        }
      }
    },
  },
  mounted() {
    // window.addEventListener("scroll", this.onScroll);
    window.addEventListener("wheel", this.onWheel);
    this.initShowSection();
  },
  beforeDestroy() {
    // window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("wheel", this.onWheel);
  },
  methods: {
    routerToBlogDetail(id) {
        this.$router.push(`/blog/detail?id=${id}`)
    },
    initShowSection() {
      const selectContent = document.getElementsByClassName("animation");
      const avaheight = window.screen.availHeight;
      if (selectContent && selectContent.length) {
        const length = selectContent.length;
        for (let i = 0; i < length; i++) {
          const domRect = selectContent[i].getBoundingClientRect();
          if (domRect.top < avaheight * 0.7 && domRect.top > 0) {
            this.animationFlag[`c${i}`] = true;
          }
        }
      }
    },
    getMonth(month) {
      let monthStr = "";
      const enmonthArray = [
        "",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const monthArray = [
        "",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
        "十一",
        "十二",
      ];
      if (this.lang == "zh") {
        monthStr = monthArray[month] + "月";
      } else {
        monthStr = enmonthArray[month];
      }
      return monthStr;
    },
    async calculateMoney() {
      try {
        if (this.form.exFrom && this.form.exTarget) {
          const res = await getCalculateRate({
            exFrom: this.form.exFrom,
            exTarget: this.form.exTarget,
            exValue: 1,
          });
          this.rate = res.data.targetValue;
          this.rateDetail = `Latest Currancy Rate 1 ${this.form.exFrom} = ${this.rate} ${this.form.exTarget}`;
        } else {
          this.rateDetail = "";
        }
      } catch {
        console.log(111);
      }
    },
    handleNext() {
      if (this.$store.state.userInfo.admin) {
        return;
      }
      if (this.$store.state.userInfo.email) {
        this.$router.push("/admin/withdraw/index");
      } else {
        this.$router.push("/user/login");
      }
    },
    handleShowMenu() {
      this.showMenu = !this.showMenu;
    },
    to(path) {
      this.$router.push(path);
    },
    onWheel(e) {
      const scrollY = window.scrollY;
      const direction = e.deltaY > 0 ? "down" : "up";
      const selectContent = document.getElementsByClassName("animation");
      const avaheight = window.screen.availHeight;
      if (selectContent && selectContent.length) {
        const length = selectContent.length;
        for (let i = 0; i < length; i++) {
          const domRect = selectContent[i].getBoundingClientRect();
          if (scrollY < 100) {
            this.animationFlag[`c${i}`] = false;
            return;
          }
          if (direction == "down") {
            if (domRect.top < avaheight * 0.7) {
              this.animationFlag[`c${i}`] = true;
            }
            if (domRect.bottom < 0) {
              this.animationFlag[`c${i}`] = false;
            }
          } else {
            if (domRect.bottom > 0) {
              this.animationFlag[`c${i}`] = true;
            }
            if (domRect.top > avaheight) {
              this.animationFlag[`c${i}`] = false;
            }
          }
        }
      }
    },
    onScroll() {
      const selectContent = document.getElementsByClassName("animation");
      const avaheight = window.screen.availHeight;
      const scrollY = window.scrollY;
      console.log(scrollY);
      if (selectContent && selectContent.length) {
        const length = selectContent.length;
        for (let i = 0; i < length; i++) {
          const domRect = selectContent[i].getBoundingClientRect();
          if (domRect.top > 0) {
            if (avaheight - domRect.top > 0 && scrollY > 10) {
              this.animationFlag[`c${i}`] = true;
            }
          } else {
            if (domRect.top + domRect.height < -100) {
              this.animationFlag[`c${i}`] = false;
            }
          }
          if (scrollY < 10) {
            this.animationFlag[`c${i}`] = false;
          }
        }
      }
    },
    async getAreaCode() {
      try {
        let res = await getSourceCoin();
        const arr = res.data.filter((obj, index, self) => {
          return (
            self.findIndex((obj1) => obj1.coinCode === obj.coinCode) === index
          );
        });
        this.areaList = arr;
      } catch (error) {}
    },
    async getTargetList() {
      if (this.form.exTarget) {
        this.form.exTarget = "";
      }
      let cn = getFlagIcon(this.form.exFrom);
      if (cn) {
        cn = cn.replace("flag-icon-", "").toLocaleUpperCase();
      }
      try {
        let res = await getTargetCoin({ source: cn });
        const arr = res.data.filter((obj, index, self) => {
          return (
            self.findIndex((obj1) => obj1.coinCode === obj.coinCode) === index
          );
        });
        this.targetCoinList = arr;
        this.$refs.targetRef.toggleMenu();
      } catch (error) {}
    },
    async getBlogsList() {
      try {
        const res = await homeBlogList();
        res.data.map((item) => {
          const time = item.createTime.split(" ")[0].split("-");
          if (time.length == 3) {
            item.date = time[2];
            item.month = time[1];
            item.year = time[0];
          }
        });
        this.blogList = res.data;
      } catch {
        console.log("err");
      }
    },
    cutOutNum(num) {
      let changeNum = (num + "").split(".");
      let decimal = "";
      if (changeNum[1]) {
        decimal =
          changeNum[1].slice(0, 2) === "00"
            ? ""
            : changeNum[1].slice(1, 2) === "0"
            ? "." + changeNum[1].slice(1, 2)
            : "." + changeNum[1].slice(0, 2);
      }
      return changeNum[0] + decimal;
    },
  },
};
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
      background: rgba($color: $contentColor, $alpha: 0.2);
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
    0%,
    35% {
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
    background: #ffffff;
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
        font-size: 15px !important;
      }
      img {
        width: 16px !important;
        height: 16px !important;
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
        padding: 12px 0 !important;
        .count {
          font-size: 18px !important;
        }
        img {
          width: 20px !important;
          height: 20px !important;
        }
        .txt {
          font-size: 16px !important;
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
        color: #ffffff;
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
    border-bottom: 1px solid #dcdfe6;
    @media screen and (max-width: 1200px) {
      margin: 64px auto 0;
      .txt {
        font-size: 26px !important;
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
          content: "";
          position: absolute;
          bottom: 8px;
          height: 16px;
          background: linear-gradient(
            0deg,
            #097cff 0%,
            rgba(86, 204, 242, 0) 100%
          );
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
          background: #f2f6ff;
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
        background: #d9d9d9;
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
    background: url("@/assets/images/index/left_bg.png");
    padding: 80px 0;
    box-sizing: border-box;
    @media screen and (max-width: 1336px) {
      margin-top: 40px;
      padding: 40px 0;
      .txt {
        font-size: 26px !important;
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
            content: "";
            position: absolute;
            bottom: 8px;
            height: 16px;
            background: #097cff;
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
          background: #f2f6ff;
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
              background: #fff;
              border: 1px solid #dcdfe6;
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
    border-bottom: 1px solid #dcdfe6;
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
          content: "";
          position: absolute;
          bottom: 8px;
          height: 16px;
          background: linear-gradient(
            0deg,
            #097cff 0%,
            rgba(86, 204, 242, 0) 100%
          );
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
        border: 1px solid #dcdfe6;
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
    background: url("@/assets/images/index/right_bg.png");
    background-size: 100% 100%;
    position: relative;

    .inner_box {
      position: relative;
      margin: auto;
      padding: 56px 48px;
      background: #f4f4f4;
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
            content: "";
            position: absolute;
            bottom: 8px;
            height: 16px;
            background: #097cff;
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
  .title-big {
    font-size: 3.5rem;
    margin-bottom: 15px;
    line-height: 4rem;
  }
  .banner {
    margin-top: 88px;
    width: 100%;
    padding: 5rem 0;
    background: $contentColor;
    color: #fff;
    .banner-content {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 1.5rem;
      @media screen and (max-width: 800px) {
        grid-template-columns: repeat(1, 1fr);
        row-gap: 2rem;
      }
    }
    .leftAni {
      animation: bounceln 0.8s forwards 0.75s;
    }
    .left {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    h4 {
      margin-bottom: 15px;
      line-height: 1.7rem;
      font-weight: normal;
      font-size: 0.8rem;
    }

    h3 {
      font-size: 1.2rem;
      line-height: 1.8rem;
      margin-bottom: 1rem;
      font-weight: normal;
      font-family: serif;
    }
    .btn-group {
      display: flex;
      align-items: center;
      margin-top: 1rem;
    }
    .start-btn {
      width: fit-content;
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
            height: 3rem;
            background: #fff;
            border-radius: 4px 0 0 4px;
          }
          .input-transaction {
            flex: 1;
          }
          ::v-deep .input-transaction .el-input__inner {
            border: none;
            height: 3rem;
            background: #fff;
            width: 100%;
            border-radius: 4px;
          }
          ::v-deep .el-select-dropdown__item.hover,
          .el-select-dropdown__item:hover {
            background: $baseColor;
          }
          ::v-deep .input-select .el-input__inner {
            width: 7.5rem;
            border: none;
            height: 3rem;
            color: #fff;
            background: $baseColor;
            border-radius: 0 4px 4px 0;
            &::placeholder {
              color: #fff !important;
            }
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
  background-image: url("@/assets/images/index/s1.png");
  background-size: 100% 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  position: relative;
  padding-top: 80px;
  padding-bottom: 60px;
  background-attachment: fixed;
  color: #fff;
  &::before {
    content: "";
    position: absolute;
    background: $contentColor;
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
    font-size: 3.2rem;
    text-align: center;
    line-height: 4.5rem;
    font-weight: normal;
  }
  h3 {
    font-size: 1rem;
    text-align: center;
    line-height: 2.1rem;
    margin: 1.5rem 0;
    font-weight: normal;
  }
  .opennew-btn {
    width: fit-content;
    margin: 0 auto;
  }
  .country {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    column-gap: 1rem;
    row-gap: 1rem;
    margin-bottom: 2rem;
    @media screen and (max-width: 800px) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media screen and (max-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }
    .country-item {
      display: flex;
      align-items: center;
      flex-direction: column;
      background: rgba($color: #000, $alpha: 0.1);
      padding: 1rem 0;
      border-radius: 6px;
      cursor: pointer;

      .flag-icon {
        width: 30px;
        height: 30px;
      }
      .usdt-inner {
        width: 30px;
        height: 30px;
      }
      .country-name {
        margin-top: 0.5rem;
      }
      &:hover {
        box-shadow: 2px 3px 10px $contentColor;
      }
    }
  }
}

.have-bg {
  background: #f3f6f8;
}
.animation-warapper {
  padding: 6rem 0;
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
      font-weight: normal;
    }
    h2 {
      font-weight: normal;
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    h3 {
      font-size: 1.2rem;
      line-height: 2.1rem;
      font-weight: normal;
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
    row-gap: 1rem;
    overflow: hidden;
    padding-bottom: 5px;
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
      padding: 0.8rem 1.6rem;
      background: #fff;
      transition: all 1s;
      cursor: pointer;
      .svgWrapper {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: rgb(242, 242, 242);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
      }
      .svgIcon {
        font-size: 35px;
        color: $baseColor;
        transition: all 0.5s;
      }
      h1 {
        font-size: 1.3rem;
        font-weight: normal;
        margin-bottom: 0.8rem;
      }
      p {
        font-size: 1rem;
        line-height: 1.7rem;
        color: #6c757d;
        text-align: justify;
      }
      &:hover {
        box-shadow: 0px 5px 25px #ccc9c9;
        .svgWrapper {
          background: $baseColor;
        }
        .svgIcon {
          color: #fff;
        }
      }
    }
    .feature-item {
      width: 100%;
      padding: 50px 0;
      border-radius: 10px;
      box-shadow: 0 8px 10px rgba(0, 0, 0, 0.175) !important;
      border: 1px solid rgba(0, 0, 0, 0.125);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: all 1s;
      .feature-svg {
        font-size: 80px;
        transition: all 0.5s;
      }
      .feature-desc {
        color: $bgColor;
        margin-top: 1rem;
        transition: all 0.5s;
        font-size: 1.2rem;
      }
      &:hover {
        background: $bgColor;
        .feature-svg {
          color: #fff;
        }
        .feature-desc {
          color: #fff;
        }
      }
    }
  }
  .section-column-feature {
    padding-bottom: 1rem;
  }
  .section-three {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 1.5rem;
    row-gap: 1rem;
    overflow: hidden;
    padding-bottom: 5px;
    @media screen and (max-width: 800px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 500px) {
      grid-template-columns: repeat(1, 1fr);
      row-gap: 2rem;
    }
    .item {
      border: 1px solid #ccc;
      box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.375);
      &:hover {
        box-shadow: 2px 6px 15px rgba(46, 45, 45, 0.675);
      }
    }
  }
  @keyframes popBackground {
    0% {
      height: 20px;
      border-top-left-radius: 50%;
      border-top-right-radius: 50%;
    }
    50% {
      height: 80px;
      border-top-left-radius: 75%;
      border-top-right-radius: 75%;
    }
    75% {
      height: 160px;
      border-top-left-radius: 85%;
      border-top-right-radius: 85%;
    }
    100% {
      height: 320px;
      border-top-left-radius: 100%;
      border-top-right-radius: 100%;
    }
  }
  .section-news {
    .bottom {
      padding: 2rem 1rem 1rem 1rem;
      transition: all 0.5s;
      user-select: none;
      z-index: 10;
      overflow: hidden;
    }
    .item {
      border: none;
      padding: 0;
      h1 {
        padding: 1.5rem 0 1rem 0;
        font-size: 1.3rem;
        line-height: 1.8rem;
      }
      h2 {
        text-align: justify;
        font-size: 0.9rem;
        font-weight: normal;
        color: #666;
      }
      &:hover {
        transform: scale(1.025);
        box-shadow: rgba(0, 0, 0, 0.24) 0px 5px 10px;
        position: relative;
        user-select: none;
        z-index: 10;
        overflow: hidden;
        .backgroundEffect {
          bottom: 0;
          height: 320px;
          width: 100%;
          position: absolute;
          z-index: -1;
          background: $bgColor;
          animation: popBackground 0.3s ease-in;
        }
        .bottom {
          color: #fff;
          h2 {
            color: #fff;
          }
          .more-btn {
            background: #fff;
            span {
              color: $bgColor;
            }
            i {
              color: $bgColor;
            }
          }
        }
      }
    }
    .cover {
      background: #fff;
      position: relative;
      height: 250px;
      width: 100%;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
      }
      .time {
        position: absolute;
        bottom: 0;
        left: 0;
        background: $bgColor;
        color: #fff;
        padding: 5px 8px;
        text-align: center;
        .date {
          font-weight: bold;
          font-size: 0.9rem;
        }
        .month {
          font-size: 0.8rem;
        }
        .year {
          font-size: 0.8rem;
        }
      }
    }

    .more-btn {
      border-radius: 1rem;
      color: #fff;
      background: $bgColor;
      padding: 4px 12px;
      width: fit-content;
      margin-top: 1rem;
      transition: all 0.5s;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      i {
        font-size: 0.9rem;
        margin: 0;
        color: #fff;
      }
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
    .use {
      h2 {
        font-size: 1.6rem;
        font-weight: bold;
        margin-bottom: 0.6rem;
      }
      h3 {
        font-size: 1.2rem;
        margin-bottom: 0.6rem;
        color: #333;
      }
      .use-select {
        width: 100%;
      }
      .label {
        margin: 1rem 0;
      }
    }
    .left {
      display: flex;
      align-items: center;
      transition: all 1.2s;
    }
    .left-img {
      width: 100%;
      object-fit: contain;
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      transition: all 1.2s;
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
      transform: translateX(-200px);
    }
    .leaveRight {
      opacity: 0;
      transform: translateX(200px);
    }
    .right-item {
      display: flex;
      align-items: center;
      margin-bottom: 1.8rem;
      .down-step {
        height: 300px;
        margin: 12px auto;
      }
      .rleft-img {
        width: 3rem;
        margin-right: 1rem;
      }
      .svg-wrapper {
        width: 4rem;
        min-width: 4rem;
      }
      .rleft-svg {
        font-size: 3rem;
      }
      .normal-text {
        margin-right: 1rem;
        margin-top: 1rem;
      }
      .alltitle {
        font-size: 1.55rem;
        line-height: 1.8rem;
        font-weight: bold;
        margin-bottom: 1.4rem;
      }
      .title {
        font-size: 1.35rem;
        line-height: 1.8rem;
        margin-bottom: 10px;
        font-weight: normal;
      }
      .desc {
        font-size: 0.9rem;
        line-height: 1.8rem;
      }
      .ul-desc {
        padding: 0 6px;
      }
      .mdesc {
        color: #666;
        padding-bottom: 10px;
        line-height: 1.7rem;
      }
    }
  }
}
.mycarousel {
  padding: 6px;
  margin: 6px 0;
  .item {
    background: #fff;
    box-shadow: 0px 0px 10px 0px rgba(42, 54, 13, 0.25);
    padding: 2rem 1rem;
    border-radius: 8px;
    .user-info {
        display: flex;
        margin-top: 2.5rem;
        align-items: center;
    }
    .avatar img {
      width: 3.5rem;
      margin-right: 1rem;
    }
    h3 {
      font-size: 14px;
      font-weight: normal;
      font-family: monospace;
      color: #333;
    }
    .user-name {
        font-size: 1rem;
        font-weight: bold;
    }
    .user-desc {
      font-size: 12px;
      font-style: italic;
      margin-top: 8px;
      color: #999;
    }
  }
}
.company-swiper {
  .band {
    width: 100%;
    transition: all 0.5s;

    &:hover {
      transform: scale(1.05);
    }
  }
}

::v-deep .input-select .el-input__inner {
  &::placeholder {
    color: #fff !important;
  }
}
.swiper-pagination-partnerWiperOption,
.swiper-pagination-commentsWiperOption {
  text-align: center;
  ::v-deep .swiper-pagination-bullet {
    height: 3px;
    width: 25px;
    margin: 0 4px;
    border-radius: 0;
    background: $bgColor;
  }
}
</style>
