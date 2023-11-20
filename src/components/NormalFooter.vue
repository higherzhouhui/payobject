<template>
  <footer>
    <div class="footer-content container-auto">
      <div class="footer-top">
        <div class="footer-item">
          <p class="desc">
            <h4>ReliancePay</h4>
            <br/>
            旨在为更多的跨境企业提供便利的金融服务
          </p>
          <h3>关注我们</h3>
          <a href="https://www.facebook.com/profile.php?id=61552592069646" target="_blank">
            <img
              class="footer-icon"
              src="@/assets/images/index/facebook.png"
              alt="facebook"
            />
          </a>
         <a href="https://twitter.com/PayReliance" target="_blank">
          <img
            class="footer-icon"
            src="@/assets/images/index/twitter.png"
            alt="twitter"
          />
         </a>
         <a href="https://www.instagram.com/payreliance/" target="_blank">
          <img
            class="footer-icon"
            src="@/assets/images/index/ins.png"
            alt="twitter"
          />
         </a>
        </div>
        <div class="footer-item">
          <div class="footer-title">有效链接</div>
          <div class="item-warppaer">
            <div
              class="item"
              v-for="item in links"
              :key="item.name"
              @click="to(item.url)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="footer-item">
          <div class="footer-title">订阅</div>
          <div class="item-desc">探索更多的解决方案，请与我们联系</div>
          <!-- <div class="btn">{{ $t("lxwm") }}</div> -->
          <div class="btn">Support@reliancepay.net</div>
        </div>
      </div>
    </div>
    <div class="copyright">{{ $t("footer") }}</div>
  </footer>
</template>

<script>
export default {
  name: "NormalFooter",
  props: {
    msg: String,
  },
  data() {
    return {
      links: [
        { name: "首页", url: "/index" },
        { name: "登录", url: "/user/login" },
        { name: "新闻", url: "/blog" },
        { name: "注册", url: "/user/register" },
        { name: "服务协议", url: "/service" },
        { name: "隐私保护政策", url: "/privacy" },
      ],
    };
  },
  methods: {
    to(path) {
      this.$router.push(path);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
footer {
  padding: 50px 0 0 0;
  font-size: 0.9rem;
  color: #fff;
  background: $bgColor;
  text-align: center;
  box-sizing: border-box;
  text-align: left;
  .footer-content {
    .footer-icon {
      height: 30px;
      width: 30px;
      object-fit: fill;
      margin-right: 9px;
    }
  }
  .copyright {
    text-align: center;
    background: $contentColor;
    padding: 1rem 0;
  }
  .footer-top {
    box-sizing: border-box;
    margin-bottom: 28px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 20px;
    @media screen and (max-width: 1200px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 700px) {
      grid-template-columns: repeat(1, 1fr);
      column-gap: 0;
    }
    h3 {
      text-align: left;
      margin: 12px 0;
    }
    .footer-title {
      font-size: 1rem;
      &::after {
        content: "";
        width: 30px;
        height: 1px;
        background: #ddd6d6;
        display: block;
        margin: 12px 0;
      }
    }
    .item-warppaer {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      row-gap: 12px;
      .item {
        cursor: pointer;
        &:hover {
          font-weight: bold;
        }
      }
    }
    .btn {
      background: #1916d6;
      width: fit-content;
      padding: 6px 10px;
      border-radius: 6px;
      margin-top: 16px;
      &:hover {
        background: #0501fc;
      }
    }
  }
}
</style>
