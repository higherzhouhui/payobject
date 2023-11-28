<template>
  <div class="refer-container">
    <h1>{{$t("tjgpy")}}</h1>
    <div class="label">{{$t("wdyqm")}}</div>
    <div class="code" @click="copyText2(userInfo.providerId)">
      <div class="number">{{userInfo.providerId}}</div>
      <img src="@/assets/images/home/copy.png"/>
    </div>
    <!-- <div class="label">{{$t("yqlj")}}</div>
    <div class="code"  @click="copyText2(shareLink)">
      <div class="number">{{shareLink}}</div>
      <img src="@/assets/images/home/copy.png"/>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'referMfrend',
  props: {
    msg: String
  },
  data() {
    return {
      userInfo: this.$store.state.userInfo,
      shareLink: ''
    }
  },
  created() {
    this.getShareLink()
  },
  methods: {
    getShareLink() {
      const href = `${location.origin}#/user/register?inviteCode=${this.userInfo.providerId}`
      this.shareLink = href
    },
    copyText2(word) {
      navigator.clipboard.writeText(word)
      .then(() => {
        this.$message.success(this.$t('copysuccess'))
      })
      .catch(() => {
        console.error('copy fail')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.refer-container {
  margin: 2rem auto;
  padding: 1.5rem;
  width: fit-content;
  background: $contentColor;
  border-radius: 8px;
  @media screen and (max-width: 800px) {
    padding: 1rem;
    .code {
      width: 330px!important;
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
    width: 550px;
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