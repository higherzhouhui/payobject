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
            <h3>{{ $t("fastEasy") }}</h3>
            <div class="btn-group">
              <div class="normal-btn start-btn" @click="handleNext">
                {{ $t("start") }}
              </div>
              <div class="movie-btn" @click="showMovie = true">
                <img
                  class="arrow"
                  src="@/assets/images/index/arrow.png"
                  alt="arrow"
                />
              </div>
            </div>
          </div>
          <div class="right">
            <div class="form-item">
              <div class="label">{{ $t("提现金额") }}</div>
              <div class="input-with-select">
                <el-input
                  :placeholder="$t('enterAmount')"
                  v-model="form.sendersAmount"
                  class="input-amount"
                >
                </el-input>
                <el-select v-model="form.sendersType" class="input-select">
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
            <ul class="list">
              <li>{{ $t("limitNum") }}</li>
              <li>{{ $t("charge") }}</li>
            </ul>
            <div class="form-item">
              <div class="label">{{ $t("收款账号") }}</div>
              <div class="input-with-select">
                <el-select
                  v-model="form.transactionType"
                  class="input-transaction"
                >
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
            <div class="use">
              <h2>如何使用<svg-icon iconClass="user" />
              </h2>
              <h3>在现实时间内跨越全球转账</h3>
              <el-steps :active="1">
                <el-step
                  title="联系客服"
                  icon="el-icon-phone-outline"
                ></el-step>
                <el-step title="创建账户" icon="el-icon-user"></el-step>
                <el-step title="开始使用" icon="el-icon-thumb"></el-step>
              </el-steps>
            </div>
            <div class="use">
              <h2>我们的资产</h2>
              <h3>快速、安全地发送全球资金</h3>
              <el-steps :active="1">
                <el-step
                  title="联系客服"
                  icon="el-icon-phone-outline"
                ></el-step>
                <el-step title="创建账户" icon="el-icon-user"></el-step>
                <el-step title="开始使用" icon="el-icon-thumb"></el-step>
              </el-steps>
            </div>
            <div class="use">
              <h2>现在 ReliancePay已在这些国家/地区提供服务</h2>
              <div class="country-select" :class="country && 'hadvalue'">
                <el-select
                  class="use-select"
                  v-model="country"
                  @change="getTargetList"
                >
                  <el-option
                    v-for="item in areaList"
                    :key="item.code"
                    :value="lang == 'zh' ? item.name : item.enName"
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
                <span
                  v-if="country && country != 'USDT'"
                  :class="`flag-icon ${getFlagIcon(country)}`"
                ></span>
                <img
                  v-if="country && country == 'USDT'"
                  src="@/assets/images/usdt.png"
                  class="usdt-icon"
                />
              </div>
              <div class="label" v-if="country">可兑换国家</div>
              <div
                class="country-select"
                :class="targetCoin && 'hadvalue'"
                v-if="country"
              >
                <el-select class="use-select" v-model="targetCoin">
                  <el-option
                    v-for="item in targetCoinList"
                    :key="item.code"
                    :value="lang == 'zh' ? item.name : item.enName"
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
                <span
                  v-if="targetCoin && targetCoin != 'USDT'"
                  :class="`flag-icon ${getFlagIcon(targetCoin)}`"
                ></span>
                <img
                  v-if="targetCoin && targetCoin == 'USDT'"
                  src="@/assets/images/usdt.png"
                  class="usdt-icon"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="animation-warapper have-bg">
        <div class="title-lg">
          <h1>{{ $t("whyChoose") }}</h1>
          <h3>{{ $t("Anmei") }}</h3>
        </div>
        <div class="container-auto section-column section-three animation">
          <div class="item" :class="animationFlag.c1 ? 'show' : 'hide'">
            <i class="el-icon-time" />
            <h1>{{ $t("szyw") }}</h1>
            <p>{{ $t("s1") }}</p>
          </div>
          <div class="item" :class="animationFlag.c1 ? 'show' : 'hide'">
            <i class="el-icon-lock" />
            <h1>{{ $t("qqsk") }}</h1>
            <p>{{ $t("s2") }}</p>
          </div>
          <div class="item" :class="animationFlag.c1 ? 'show' : 'hide'">
            <i class="el-icon-sell" />
            <h1>{{ $t("qqfk") }}</h1>
            <p>{{ $t("s3") }}</p>
          </div>
        </div>
      </div>
      <div class="animation-warapper">
        <div class="title-lg">
          <h1>{{ $t("fwys") }}</h1>
          <h3>{{ $t("remesaserviceDesc") }}</h3>
        </div>
        <div class="container-auto section-column section-three animation">
          <div class="item" :class="animationFlag.c2 ? 'show' : 'hide'">
            <i class="el-icon-data-line" />
            <h1>{{ $t("scdw") }}</h1>
            <p>{{ $t("cpjs") }}</p>
          </div>
          <div class="item" :class="animationFlag.c2 ? 'show' : 'hide'">
            <i class="el-icon-location-outline" />
            <h1>{{ $t("cxjs") }}</h1>
            <p>{{ $t("cpjs2") }}</p>
          </div>
          <div class="item" :class="animationFlag.c2 ? 'show' : 'hide'">
            <i class="el-icon-trophy" />
            <h1>{{ $t("cpjz") }}</h1>
            <p>{{ $t("cpjs3") }}</p>
          </div>
          <div class="item" :class="animationFlag.c2 ? 'show' : 'hide'">
            <i class="el-icon-folder-checked" />
            <h1>{{ $t("cpjz4") }}</h1>
            <p>{{ $t("cpjs4") }}</p>
          </div>
          <div class="item" :class="animationFlag.c2 ? 'show' : 'hide'">
            <i class="el-icon-shopping-cart-2" />
            <h1>{{ $t("cpjz5") }}</h1>
            <p>{{ $t("cpjs5") }}</p>
          </div>
          <div class="item" :class="animationFlag.c2 ? 'show' : 'hide'">
            <i class="el-icon-chat-dot-round" />
            <h1>{{ $t("cpjz6") }}</h1>
            <p>{{ $t("cpjs6") }}</p>
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
                <div class="title" style="margin-bottom: 1.5rem">
                  {{ $t("moveMoneyFor") }}
                </div>
                <div class="desc">{{ $t("moveMoneyForDesc") }}</div>
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
          <h3>{{ $t("allpaymentDesc") }}</h3>
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
                <div class="title" style="margin-bottom: 1.5rem">
                  {{ $t("manyPlant") }}
                </div>
                <div class="desc">{{ $t("manyPlantDesc") }}</div>
                <el-steps direction="vertical" :active="1" class="down-step">
                  <el-step title="下载应用" icon="el-icon-download"></el-step>
                  <el-step title="创建账户" icon="el-icon-user"></el-step>
                  <el-step title="开始使用" icon="el-icon-thumb"></el-step>
                </el-steps>
              </div>
            </div>
            <div class="normal-btn" @click="handleNext">
              {{ $t("getStartNow") }}
            </div>
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
                <div class="avatar">
                  <img :src="item.avatar" />
                </div>
                <div class="title">
                  <h2>{{ item.name }}</h2>
                  <h3>{{ item.content }}</h3>
                </div>
              </div>
            </swiper-slide>
          </swiper>
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
          >
            <div class="backgroundEffect"></div>
            <div class="cover">
              <img :src="`/api/file/downLoad?url=${item.cover}`" />
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
              v-for="item in 12"
              :key="item.id"
              class="company-swiper"
            >
              <img
                class="band"
                :src="require('@/assets/images/index/p' + item + '.png')"
                alt="band"
              />
            </swiper-slide>
          </swiper>
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
import { getSourceCoin, getTargetCoin, homeBlogList } from "@/api/common";
import { getFlagIcon } from "@/utils/common";
export default {
  name: "indexVue",
  data() {
    return {
      lang: Local("lang") || "zh",
      country: "",
      getFlagIcon: getFlagIcon,
      comments: [
        {
          avatar: require("@/assets/images/index/huawei.png"),
          name: "Huawei Technologies",
          content: `“在全球运营中，资金的及时和安全转移至关重要。自从我们开始使用ReliancePay后，不仅汇款过程变得更加高效，而且由于他们出色的货币汇率，我们还节省了大量成本。ReliancePay已成为我们国际金融交易的可靠伙伴。”`,
        },
        {
          avatar: require("@/assets/images/index/zte.png"),
          name: "ZTE",
          content: `ReliancePay的操作简易性和卓越的客户服务让我们的国际支付流程无比顺畅。实时的活动追踪功能让我们能够随时监控资金流向，确保每一笔交易都能快速且安全地完成。”`,
        },
        {
          avatar: require("@/assets/images/index/telling.png"),
          name: "Telling",
          content: `“我们对ReliancePay的安全保障和全天候支持印象深刻。他们不仅保证了交易的安全性，还为我们提供了行业内最优惠的汇率，极大地提高了我们的工作效率。”`,
        },
        {
          avatar: require("@/assets/images/index/binance.png"),
          name: "Binance",
          content: `优秀的产品思维以及高度前瞻性，为安全支付行业树立起了标杆,不亚于市面上的任一国际支付平台，相信不久将会闪闪发光`,
        },
        {
          avatar: require("@/assets/images/index/coinbase.png"),
          name: "CoinBase",
          content: `很好的解决了国际支付行业痛点，为全球化贸易提供了较为便捷且安全的支付平台`,
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
      languge: Local("lang") || "zh",
      notice: "Reliance-Pay正式上线了",
      serviceLeftData: [
        { title: "szyw", des: "s1" },
        { title: "qqsk", des: "s2" },
        { title: "qqfk", des: "s3" },
      ],
      form: {
        sendersType: "ALL",
        recipientsType: "AUD",
        transactionType: "Bank Deposit",
      },
      sendTypeList: ["USA", "EUR", "GBP"],
      recipientsTypeList: ["AUD", "PRI", "CHN"],
      transactionTypeList: ["Bank Deposit", "Pickup Point", "Reliance Wallet"],
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
          800: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        },
      },
      partnerWiperOption: {
        // 设置垂直轮播vertical,  水平轮播 horizontal
        direction: "horizontal",
        // 轮播图间距
        spaceBetween: 18,
        slidesPerView: 1,
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
          580: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          //当宽度大于等于640
          840: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
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
    };
  },
  created() {
    this.getAreaCode();
    this.getBlogsList();
  },
  mounted() {
    // window.addEventListener("scroll", this.onScroll);
    window.addEventListener("wheel", this.onWheel);
  },
  beforeDestroy() {
    // window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("wheel", this.onWheel);
  },
  methods: {
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
        console.log(selectContent[0].getBoundingClientRect());
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
      this.targetCoin = "";
      let cn = getFlagIcon(this.country);
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
      } catch (error) {}
    },
    async getBlogsList() {
      try {
        const res = await homeBlogList();
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

  .banner {
    margin-top: 88px;
    width: 100%;
    padding: 5rem 0;
    background: $contentColor;
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
      font-size: 1.5rem;
      margin-bottom: 1rem;
      line-height: 1.8rem;
    }
    .title-big {
      font-size: 2.5rem;
      margin-bottom: 1.5rem;
      line-height: 4rem;
    }
    h3 {
      font-size: 1.2rem;
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
          ::v-deep .el-select-dropdown__item.hover,
          .el-select-dropdown__item:hover {
            background: $baseColor;
          }
          ::v-deep .input-select .el-input__inner {
            width: 120px;
            border: none;
            height: 50px;
            color: #fff;
            background: $baseColor;
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
  background-image: url("@/assets/images/index/s1.png");
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
        font-size: 1.5rem;
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
  .section-three {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 1rem;
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
          background: #455b86;
          animation: popBackground 0.3s ease-in;
        }
        .bottom {
          color: #fff;
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
      img {
        height: 200px;
        width: 100%;
        object-fit: contain;
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
      .down-step {
        height: 300px;
        margin: 12px auto;
      }
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
  padding: 6px;
  margin: 6px 0;
  .item {
    display: flex;
    .avatar img {
      width: 3.5rem;
      margin-right: 1rem;
    }
    h2 {
      font-size: 1.4rem;
      line-height: 2.4rem;
      word-break: break-all;
    }
    h3 {
      font-size: 1.1rem;
      line-height: 2rem;
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
</style>
