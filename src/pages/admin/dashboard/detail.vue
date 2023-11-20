<template>
  <div class="dashboard-container">
    <div class="balance-wrapper">
      <div class="balance-item">
        <span :class="`flag-icon ${getFlagIcon(coinCode)}`"></span>
        <h3>{{ balance }}<span>{{ coinCode }}</span></h3>
      </div>
    </div>
    <div class="operation">
      <div class="normal-btn" @click="routerToPath('/admin/deposit/index')">
        <i class="el-icon-circle-plus-outline" />
        {{$t("充值")}}
      </div>
      <!-- <div class="normal-btn" @click="routerToPath('/admin/exchange/index')">
        <i class="el-icon-connection" />
        {{$t("转账")}}
      </div> -->
      <div class="normal-btn" @click="routerToPath('/admin/withdraw/index')">
        <i class="el-icon-position" />
        {{$t("提现")}}
      </div>
    </div>
    <div class="transaction-wrapper">
      <h1>{{$t('近期交易记录')}}</h1>
      <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto" :class="billLoading && 'loading'">
        <div class="list-wrapper" v-for="(item, index) in billArray" :key="item.id" @click="handleShow(index)">
          <div class="list-item">
            <div class="left">
              <i class="el-icon-top-right send" v-if="item.billType == 2"/>
              <i class="el-icon-bottom-left recive" v-if="item.billType == 1"/>
              <div class="type-wrapper">
                <div class="type" v-if="item.billType == 2">{{$t("提现金额")}}</div>
                <div class="type" v-else>{{$t("收到金额")}}</div>
                <div class="desc">{{item.coinCode}}</div>
              </div>
            </div>
            <div class="right">
              <div class="type-wrapper">
                <div class="desc">{{item.createTime}}</div>
                <div class="type" :class="item.billType == 2 ? 'send' : 'recive'">${{item.billValue}}</div>
              </div>
            </div>
          </div>
          <div class="detail" :class="item.show ? 'expand' : 'scale'">
            <div class="detail-item">
              <div class="left">{{$t("交易ID")}}</div>
              <div class="right">{{item.id}}</div>
            </div>
            <div class="detail-item">
              <div class="left">{{$t("货币类型")}}</div>
              <div class="right" v-if="item.cry">{{$t("加密货币")}}</div>
              <div class="right" v-else>{{$t("法定货币")}}</div>
            </div>
            <div class="detail-item" v-if="item.commission">
              <div class="left">{{$t("手续费")}}</div>
              <div class="right">${{item.commission}}</div>
            </div>
          </div>
        </div>
      </ul>
      <el-empty :description="$t('暂无数据')" v-if="!billLoading && !billArray.length"></el-empty>
    </div>
  </div>
</template>

<script>
import { balanceList } from "@/api/out"
import { getBillDetails } from "@/api/manage"
import { getHashParams } from "@/utils/index"
import { getFlagIcon } from "@/utils/common"
export default {
  name: 'DashBoard',
  props: {
    msg: String
  },
  data() {
    return {
      getFlagIcon: getFlagIcon,
      balanceArrapy: [],
      billArray: [],
      current: 1,
      size: 10,
      noMore: false,
      balanceLoading: false,
      billLoading: false,
      coinCode: 'CNY',
      balance: '9999'
    }
  },
  created() {
    this.initData()
  },
  methods: {
    routerToPath(path) {
      this.$router.push(path)
    },
    initData() {
      const hash = location.hash
      const params = getHashParams()
      this.coinCode = params.get('coinCode') || 'CNY'
      this.balance = params.get('balance') || '9999'
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
      getBillDetails({current: this.current, size: this.size, fromCode: this.coinCode}).then(res => {
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
      this.getBillList()
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
.operation {
  display: grid;
  margin-top: 2rem;
  column-gap: 2rem;
  grid-template-columns: repeat(2, 1fr);
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
  width: 100%;
  overflow: hidden;
  z-index: 2;
  cursor: pointer;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  color: #fff;
  border-radius: 5px;
  @media screen and (max-width: 500px) {
    padding: 6px;
  }
  &:hover {
    transform: translateY(-4px);
    box-shadow: 1px 5px 10px rgba(30, 32, 37, 1);
  }
  .flag-icon {
    font-size: 2.5rem;
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
    .el-icon-top-right {
      font-size: 1.5rem;
      font-weight: bold;
    }
    .send {
      color: #ff0000;
    }
    .recive {
      color: #2dbe60;
    }
    .el-icon-bottom-left {
      font-size: 1.5rem;
      font-weight: bold;
    }
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 5px 10px rgba(30, 32, 37, 0.12);
    }
  }
}
</style>