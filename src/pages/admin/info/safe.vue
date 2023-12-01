<template>
  <div class="safe-container">
    <div class="top">
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
    </div>
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
}
</style>
