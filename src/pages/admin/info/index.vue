<template>
  <div class="info-container">
    <div class="refer-container">
      <h1>{{$t("grzl")}}</h1>
      <div class="label" v-if="userInfo.email">{{$t("email")}}</div>
      <div class="code" v-if="userInfo.email" @click="copyText2(userInfo.email)">
        <div class="number">{{userInfo.email}}</div>
        <img src="@/assets/images/home/copy.png"/>
      </div>
      <div class="label" v-if="userInfo.phone">{{$t("phone")}}</div>
      <div class="code" v-if="userInfo.phone" @click="copyText2(userInfo.phone)">
        <div class="number">{{userInfo.phone}}</div>
        <img src="@/assets/images/home/copy.png"/>
      </div>
      <div class="label">{{$t("sjyqm")}}</div>
      <div class="code" @click="copyText2(userInfo.inviteCode)">
        <div class="number">{{userInfo.inviteCode}}</div>
        <img src="@/assets/images/home/copy.png"/>
      </div>
      <div class="label">{{$t("wdyqm")}}</div>
      <div class="code" @click="copyText2(userInfo.providerId)">
        <div class="number">{{userInfo.providerId}}</div>
        <img src="@/assets/images/home/copy.png"/>
      </div>
      <div class="label">{{$t("zhlx")}}</div>
      <div class="code">
        <div class="number">{{userInfo.admin ? $t("gly") : $t("ptyh")}}</div>
      </div>
      <div class="label">{{$t("cjsj")}}</div>
      <div class="code">
        <div class="number">{{userInfo.createTime}}</div>
      </div>
      <div class="label">{{$t("xgsj")}}</div>
      <div class="code">
        <div class="number">{{userInfo.modifiedTime}}</div>
      </div>
    </div>
    <div class="right">
      <img src="@/assets/images/user/user-default.png" class="user-img"/>
      <div class="list" v-if="userInfo.email">
        <div class="list-left">{{$t('email')}}</div>
        <div class="list-right">{{userInfo.email}}</div>
      </div>
      <div class="list" v-if="userInfo.phone">
        <div class="list-left">{{$t('phone')}}</div>
        <div class="list-right">{{userInfo.phone}}</div>
      </div>
      <div class="list">
        <div class="list-left">{{$t('sjyqm')}}</div>
        <div class="list-right">{{userInfo.inviteCode}}</div>
      </div>
      <div class="list">
        <div class="list-left">{{$t('wdyqm')}}</div>
        <div class="list-right">{{userInfo.providerId}}</div>
      </div>
      <div class="list">
        <div class="list-left">{{$t('zhlx')}}</div>
        <div class="list-right">{{userInfo.admin ? $t("gly") : $t("ptyh")}}</div>
      </div>
      <div class="list">
        <div class="list-left">{{$t('cjsj')}}</div>
        <div class="list-right">{{userInfo.createTime}}</div>
      </div>
      <div class="list">
        <div class="list-left">{{$t('xgsj')}}</div>
        <div class="list-right">{{userInfo.modifiedTime}}</div>
      </div>
    </div>
  </div>
 
</template>

<script>
export default {
  name: 'InfoProfile',
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
.info-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  row-gap: 1rem;
  column-gap: 1rem;
  @media screen and (max-width: 950px) {
    grid-template-columns: 1fr;
  }
}
.refer-container {
  background: $contentColor;
  border-radius: 8px;
  padding: 2rem;
  @media screen and (max-width: 950px) {
    padding: 1rem;
  }
  h1 {
    font-size: 1.6rem;
    color: #fff;
    margin: 1rem 0 3rem 0;
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
    padding: 4px 8px;
    border-radius: 6px;
    margin-bottom: 1rem;
    height: 38px;
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
.right {
  border-radius: 4px;
  padding: 1rem;
  background: $contentColor;
  display: flex;
  flex-direction: column;
  align-items: center;
  .user-img {
    width: 120px;
    height: 120px;
    margin-bottom: 20px;
  }
  .list {
    background: $bgColor;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    font-weight: bold;
    margin-top: 8px;
    border-radius: 4px;
    padding: 8px 4px;
    .list-left::after {
      content: ':';
    }
  }
}
</style>