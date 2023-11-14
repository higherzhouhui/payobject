<template>
  <div class="refer-container">
    <h1>{{$t("个人资料")}}</h1>
    <div class="label">{{$t("邮箱")}}</div>
    <div class="code" @click="copyText2(userInfo.email)">
      <div class="number">{{userInfo.email}}</div>
      <img src="@/assets/images/home/copy.png"/>
    </div>
    <div class="label">{{$t("上级邀请码")}}</div>
    <div class="code" @click="copyText2(userInfo.inviteCode)">
      <div class="number">{{userInfo.inviteCode}}</div>
      <img src="@/assets/images/home/copy.png"/>
    </div>
    <div class="label">{{$t("我的邀请码")}}</div>
    <div class="code" @click="copyText2(userInfo.providerId)">
      <div class="number">{{userInfo.providerId}}</div>
      <img src="@/assets/images/home/copy.png"/>
    </div>
    <div class="label">{{$t("账号类型")}}</div>
    <div class="code">
      <div class="number">{{userInfo.admin ? "管理员" : "普通用户"}}</div>
    </div>
    <div class="label">{{$t("创建时间")}}</div>
    <div class="code">
      <div class="number">{{userInfo.createTime}}</div>
    </div>
    <div class="label">{{$t("更新时间")}}</div>
    <div class="code">
      <div class="number">{{userInfo.modifiedTime}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'refer',
  props: {
    msg: String
  },
  data() {
    return {
      userInfo: this.$store.state.userInfo,
    }
  },
  created() {
    console.log(this.userInfo)
  },
  methods: {
    copyText2(word) {
      navigator.clipboard.writeText(word)
      .then(() => {
        this.$message.success('复制成功')
      })
      .catch(() => {
        this.$message.error('复制失败')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.refer-container {
  margin: 2rem auto;
  padding: 1.5rem 2rem;
  width: fit-content;
  background: $contentColor;
  border-radius: 8px;
  @media screen and (max-width: 800px) {
    padding: 1rem;
    .code {
      width: 300px!important;
    }
  }
  h1 {
    font-size: 1.6rem;
    color: #fff;
    margin: 1rem 0;
  }
  .label {
    color: #fff;
    margin-bottom: 8px;
  }
  .code {
    display: flex;
    background: #fff;
    align-items: center;
    justify-content: space-between;
    width: 500px;
    padding: 4px 8px;
    border-radius: 6px;
    margin-bottom: 1rem;
    .number {
      border-radius: 6px;
      word-break: break-all;
    }
    img {
      width: 30px;
      min-width: 30px;
      margin-left: 6px;
      cursor: pointer;
    }
  }
}
</style>