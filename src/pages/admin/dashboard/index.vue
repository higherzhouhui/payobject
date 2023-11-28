<template>
  <div class="dashboard-container">
    <div class="balance-wrapper" :class="balanceLoading && 'loading'">
      <h1>{{$t("wdqb")}}</h1>
      <swiper ref="refSwiper"
        :options="swiperOption"
        class="content-swiper">
          <swiper-slide v-for="item in balanceArrapy" :key="item.id" class="item">
              <div class="balance-item" @click="routerToDetail(item)">
                <span :class="`flag-icon ${getFlagIcon(item.coinCode)}`" v-if="item.coinCode != 'USDT'"></span>
                <img src="@/assets/images/usdt.png" v-else class="usdt-pic" />
                <h3>{{ item.balance.toFixed(2) }}<span>{{ item.coinCode }}</span></h3>
              </div>
          </swiper-slide>
      </swiper>
      <div v-if="!balanceLoading && !balanceArrapy.length">
        <div class="balance-item">
          <span :class="`flag-icon ${getFlagIcon('USD')}`" v-if="'USD' != 'USDT'"></span>
          <img src="@/assets/images/usdt.png" v-else class="usdt-pic" />
          <h3>0.00<span>{{ 'USD' }}</span></h3>
          <div class="qcz" @click="$router.push('/admin/deposit/index')">
            <img src="@/assets/images/home/recharge.png" />
            {{$t("qcz")}}
          </div>
        </div>
      </div>
    </div>
    <div class="transaction-wrapper">
      <h1>{{$t('近期交易记录')}}</h1>
      <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto" :class="billLoading && 'loading'">
        <div class="list-wrapper" v-for="(item, index) in billArray" :key="item.id" @click="handleShow(index)">
          <div class="list-item">
            <div class="left">
              <i class="el-icon-bottom-left recive" v-if="item.billType == 1"/>
              <i class="el-icon-top-right send" v-if="item.billType == 2"/>
              <i class="el-icon-refresh send" v-if="item.billType == 3"/>
              <i class="el-icon-sort recive" v-if="item.billType == 4"/>
              <div class="type-wrapper">
                <div class="type">{{typeOption[item.billType]}}</div>
                <div class="desc">{{item.coinCode}}</div>
              </div>
            </div>
            <div class="right">
              <div class="type-wrapper">
                <div class="desc">{{item.createTime}}</div>
                <div class="type" :class="item.billType == 2 || item.billType == 3 ? 'send' : 'recive'">${{item.billValue}}</div>
              </div>
            </div>
          </div>
          <div class="detail" :class="item.show ? 'expand' : 'scale'">
            <div class="detail-item">
              <div class="left">{{$t("jyid")}}</div>
              <div class="right">{{item.id}}</div>
            </div>
            <div class="detail-item">
              <div class="left">{{$t("hblx")}}</div>
              <div class="right" v-if="item.cry">{{$t("jmhb")}}</div>
              <div class="right" v-else>{{$t("fdhb")}}</div>
            </div>
            <div class="detail-item" v-if="item.commission">
              <div class="left">{{$t("sxfei")}}</div>
              <div class="right">${{item.commission}}</div>
            </div>
          </div>
        </div>
      </ul>
      <div v-if="!billLoading && !billArray.length" class="empty">
        {{$t('nodata')}}
      </div>
    </div>
  </div>
</template>

<script>
import { balanceList } from "@/api/out"
import { getBillDetails } from "@/api/manage"
import { getFlagIcon } from "@/utils/common"
export default {
  name: 'DashBoard',
  props: {
    msg: String
  },
  data() {
    return {
      typeOption: ['', this.$t('ruzhang'), this.$t('chuzhang'), this.$t('huanhui'), this.$t('huanhuidrz')],
      getFlagIcon: getFlagIcon,
      balanceArrapy: [],
      billArray: [],
      current: 1,
      size: 7,
      noMore: false,
      balanceLoading: false,
      billLoading: false,
      swiperOption: {
        // 设置垂直轮播vertical,  水平轮播 horizontal
        direction: "horizontal", 
        // 轮播图间距
        spaceBetween: 10,
        slidesPerView : 1,
        breakpoints: { 
            //当宽度大于等于480
            320: { 
                slidesPerView: 2,
                spaceBetween: 14
            },
            //当宽度大于等于640
            900: {
                slidesPerView: 3,
                spaceBetween: 18
            },
            //当宽度大于等于640
            1400: {
                slidesPerView: 4,
                spaceBetween: 26
            }
        },
        // 循环模式选项
        loop: false,
        //  自动滑动
        autoplay: {
          delay: 2500,
          // 如果设置为true，当切换到最后一个slide时停止自动切换。
          stopOnLastSlide: false,
          // 如果设置为false，用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay
          disableOnInteraction: false,
        },
        // 分页器
        pagination: {
          el: ".swiper-pagination",
          clickable: true, // 设置小圆点可以切换
        },
        // 轮播图的切换前进后退按钮，如果想放在轮播图中可以看swiper官方文档，这里写在了轮播外
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    }
  },
  created() {
    this.initData()
  },
  methods: {
    routerToDetail(item) {
      this.$router.push(`/admin/detail?coinCode=${item.coinCode}&balance=${item.balance}`)
    },
    initData() {
      this.getBalanceList()
      this.getBillList()
    },
    getBalanceList() {
      if (this.balanceLoading) {
        return
      }
      this.balanceLoading = true
      balanceList().then(res => {
        this.balanceLoading = false
        if (res.code === 200) {
          this.balanceArrapy = res.data
        }
      }).catch(() =>  {
        this.balanceLoading = false
      })
    },
    getBillList() {
      if (this.billLoading) {
        return
      }
      this.billLoading = true
      if (this.noMore) {
        this.billLoading = false
        return
      }
      getBillDetails({current: this.current, size: this.size}).then(res => {
          this.billLoading = false
          const records = res.data.records
          if (this.size * this.current > res.data.total) {
            this.noMore = false
          }
          if (res.data.current == 1) {
            this.billArray = records
          } else {
            this.billArray = this.billArray.concat(records)
            this.current = this.current + 1
          }
        }).catch(() =>  {
          this.billLoading = false
        })
    },
    handleShow(index) {
      this.billArray[index].show = !this.billArray[index].show 
      this.$forceUpdate();  
    },
    load() {
      // this.getBillList()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
  color: #fff;
  font-weight: bold;
  font-size: 1.5rem;
  margin: 1.5rem 0;
}
.balance-wrapper {
  
}
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item {
  border-radius: 5px;
}
.balance-item {
  word-wrap: break-word;
  background: $contentColor;
  background-clip: border-box;
  border-left: 4px solid #2dbe60;
  position: relative;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
  z-index: 2;
  cursor: pointer;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  color: #fff;
  border-radius: 5px;
  position: relative;
  .qcz {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translate(0, -50%);
    display: flex;
    align-items: center;
    line-height: 20px;
    img {
      width: 20px;
      height: 20px;
      margin-right: 6px;
    }
  }
  @media screen and (max-width: 500px) {
    padding: 6px;
  }
  &:hover {
    transform: translateY(-4px);
    box-shadow: 1px 5px 10px rgba(30, 32, 37, 1);
  }
  .flag-icon {
    font-size: 36px;
    margin-bottom: 6px;
    height: 30px;
  }
  .usdt-pic {
    width: 30px;
    height: 30px;
    margin-bottom: 6px;
  }
  h3 {
    font-size: 1.5rem;
    line-height: 2.2rem;
    font-weight: bold;
    color: #fff;
    span {
      margin-left: 0.5rem;
    }
  }
  h4 {
    font-weight: normal;
    font-size: 1rem;
    line-height: 1.5rem;
  }
}
.transaction-wrapper {
  .list-wrapper {
    background: $contentColor;
    margin-bottom: 1rem;
    border-radius: 1rem;
  }
  .detail {
    padding: 1rem;
    transition: all 0.5s;
    overflow: hidden;
    .detail-item {
      padding: 0.6rem 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #fff;
      font-weight: bold;
      font-size: 1.2rem;
      border-bottom: 1px solid #aa9b9b;
    }
  }
  .expand {
    max-height: 500px;
  }
  .scale {
    max-height: 0;
    padding: 0;
  }
  .list-item {
    padding: 1.3rem 1rem;
    cursor: pointer;
    transition: all 0.5s;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      i {
        font-size: 1.5rem;
      }
    }
    .type-wrapper {
      margin-left: 0.8rem;
      .type {
        font-weight: bold;
        font-size: 1.2rem;
        margin-bottom: 5px;
      }
      .desc {
        font-weight: 1rem;
      }
    }
    .send {
      color: #ff0000;
    }
    .recive {
      color: #2dbe60;
    }
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 5px 10px rgba(30, 32, 37, 0.12);
    }
  }
}
.empty {
  border-radius: 6px;
  background: $contentColor;
  padding: 100px;
  text-align: center;
  font-size: 1.2rem;
  color: #fff;
}
</style>
