<template>
  <div class="safe-container">
    <div class="admin-title">{{$t('safe')}}</div>
    <!-- <div class="item">
      <div class="item-top">
        <div class="item-title">
          {{$t('绑定手机号')}}
          <span class="desc">{{$t('可登录')}}</span>
        </div>
        <div class="normal-btn dis" @click="routerTo()">{{$t('xg')}}</div>
      </div>
      <div class="itme-middle">
         <span class="areacode">
          {{ userInfo.areaCode }}
         </span>
         <span>{{userInfo.phone || $t('暂未绑定')}}</span>
      </div>
      <div class="desc">{{$t('交易时可能会发送短信验证码进行身份验证')}}</div>
    </div> -->
    <div class="item">
      <div class="item-top">
        <div class="item-title">
          {{$t('bdyx')}}
          <span class="desc">{{$t('kdl')}}</span>
        </div>
        <div class="normal-btn" @click="routerTo('/admin/email')">{{$t('xg')}}</div>
      </div>
      <div class="itme-middle">
         <span>{{userInfo.email || $t('zwbd')}}</span>
      </div>
      <div class="desc">{{$t('bdyxdesc')}}</div>
    </div>
    <div class="item">
      <div class="item-top">
        <div class="item-title">
          {{$t('xgdlmm')}}
        </div>
        <div class="normal-btn" @click="routerTo('/admin/reset')">{{$t('xg')}}</div>
      </div>
      <div class="desc">{{$t('xgmmdesc')}}</div>
    </div>
    <div class="item">
      <div class="item-top">
        <div class="item-title">
          {{$t('paypass')}}
        </div>
        <div class="normal-btn" @click="routerTo('/admin/paypass')">{{$store.state.userInfo.hasPayPass ? $t('xg') : $t('sz')}}</div>
      </div>
      <div class="desc">{{$t('paypassdesc')}}</div>
    </div>
    <!-- <div class="top">
      <img src="@/assets/images/user/user-default.png" class="user-img"/>
      <div class="right">
        <p class="name">{{userInfo.email || userInfo.phone}}</p>
        <p class="time">{{userInfo.createTime}}</p>
      </div>
    </div>
    <div class="list">
      <div class="left">
        {{$t('登录密码')}}
      </div>
      <div class="right" @click="routerTo('/admin/reset')">
        {{$t('定期更换登录密码使你的账号更加安全')}}
        <i class="el-icon-edit"></i>
      </div>
    </div>
    <div class="list">
      <div class="left">
        {{$t('paypass')}}
      </div>
      <div class="right" @click="routerTo('/admin/paypass')">
        {{$t('设置支付密码，在账户资金发生变动时，保证资金安全')}}
        <i class="el-icon-edit"></i>
      </div>
    </div> -->
  </div>
</template>
<script>

export default {
  name: "userRegister",
  data() {
    return {
      userInfo: this.$store.state.userInfo
    };
  },

  created() {
  },
  mounted() {  
   
  }, 
  methods: {
    routerTo(path) {
      this.$router.push(path)
    }
  },
};
</script>
<style scoped lang="scss">
.safe-container {
  background: $contentColor;
  border-radius: 12px;
  padding: 2rem 1.5rem;
  .top {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #af9999;
    padding-bottom: 36px;
    margin-bottom: 36px;
    .user-img {
      width: 100px;
      height: 100px;
    }
    .right {
      margin-left: 30px;
      .name {
        font-size: 1.2rem;
        color: #fff;
        opacity: 0.9;
      }
      .time {
        color: #fff;
        opacity: 0.6;
        margin-top: 6px;
      }
    }
  }
  .list {
    display: flex;
    color: #fff;
    margin-bottom: 32px;
    .left {
      opacity: 0.9;
      min-width: 120px;
      font-weight: bold;
      font-size: 1.1rem;
    }
    .right {
      cursor: pointer;
      opacity: 0.8;
      &:hover i{
        color: $baseColor;
      }
    }
  }
  .item {
    padding: 2rem 0;
    color: #fff;
    border-bottom: 1px solid #c7b9b9;
    .item-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .item-title {
        font-weight: bold;
        font-size: 1.3rem;
        .desc {
          margin-left: 12px;
          color: $baseColor;
          background: rgba($color: $bgColor, $alpha: 0.5);
          padding: 4px 12px;
          font-size: 1rem;
          border-radius: 6px;
        }
      }
      .btn {
        background: rgba($color: $baseColor, $alpha: 0.2);
        color: $baseColor;
        border-radius: 4px;
        text-decoration: underline;
        cursor: pointer;
      }
      .dis {
        color: #f3e9e9;
        cursor: no-drop;
        background: #8d8383;
      }
    }
    .itme-middle {
      margin-top: 12px;
      opacity: 0.9;
      .areacode {
        margin-right: 6px;
      }
    }
    .desc {
      margin-top: 12px;
      opacity: 0.8;
    }
  }
}
</style>
