<template>
  <footer>
    <div class="footer-content container-auto">
      <div class="footer-top">
        <div class="footer-item">
          <img class="logo" src="@/assets/images/index/logo.png" alt="logo" @click="to('/index')">
          <p class="desc">
            {{ $t("zztgjrfw") }}
          </p>
          <a href="https://www.facebook.com/profile.php?id=61552592069646" target="_blank">
            <!-- <img
              class="footer-icon"
              src="@/assets/images/index/facebook.png"
              alt="facebook"
            /> -->
            <svg-icon iconClass="square-facebook" className="footer-icon" />

          </a>
         <a href="https://twitter.com/PayReliance" target="_blank">
          <!-- <img
            class="footer-icon"
            src="@/assets/images/index/twitter.png"
            alt="twitter"
          /> -->
          <svg-icon iconClass="square-twitter" className="footer-icon" />

         </a>
         <a href="https://www.instagram.com/payreliance/" target="_blank">
          <!-- <img
            class="footer-icon"
            src="@/assets/images/index/ins.png"
            alt="twitter"
          /> -->
          <svg-icon iconClass="square-instagram" className="footer-icon" />

         </a>
        </div>
        <div class="footer-item">
          <div class="footer-title">RELIANCEPAY</div>
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
          <div class="footer-title">{{$t('ffwzc')}}</div>
          <div class="item-warppaer">
            <div
              class="item"
              v-for="item in slinks"
              :key="item.name"
              @click="to(item.url)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="footer-item">
          <div class="item-desc">{{$t('jjfa')}}</div>
          <div class="btn">
            <img src="@/assets/images/index/footer-email.png" alt="email" />
            Support@reliancepay.net
          </div>
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
        { name: "News", url: "/blog" },
        { name: this.$t("login"), url: "/user/login" },
        { name: this.$t("register"), url: "/user/register" },
      ],
      slinks: [
        { name: this.$t("huidui"), url: "/admin/deposit/index" },
        { name: this.$t("kycyz"), url: "/admin/kycverification" },
        { name: this.$t("tjgpy"), url: "/admin/referfriends" },
        { name: this.$t('comments'), url: '', active: false, mao: '#abountUs'},
      ],
      path: '',
      
    };
  },
  watch: {
    $route(to, _from) {
      this.path = to.path
    },
    '$i18n.locale'(newValue, oldValue) {
      console.log('language switch from ' + oldValue + ' to ' + newValue + '')
      this.links = [
        { name: "News", url: "/blog" },
        { name: this.$t("login"), url: "/user/login" },
        { name: this.$t("register"), url: "/user/register" },
      ];
      this.slinks = [
        { name: this.$t("huidui"), url: "/admin/deposit/index" },
        { name: this.$t("kycyz"), url: "/admin/kycverification" },
        { name: this.$t("tjgpy"), url: "/admin/referfriends" },
        { name: this.$t('comments'), url: '', active: false, mao: '#abountUs'},
      ]
    }
  },
  methods: {
    handleShowMenu() {
        this.showMenu = !this.showMenu
    },
    to(path) {
        if (path) {
            if (path == this.$store.state.path) {
                return
            }
            if (path.includes('admin')) {
              if (this.$store.state.userInfo.email) {
                this.$router.push(path)
              } else {
                if (this.$store.state.path == '/user/login') {
                    return
                }
                this.$router.push('/user/login')
              }
            } else {
              this.$router.push(path)
            }
        } else {
            if (this.path !== '/index') {
                this.$router.push('/index')
                setTimeout(() => {
                    const elm = document.getElementById('abountUs');
                    if (elm) {
                        elm.scrollIntoView(true);
                    }
                }, 500);
            } else {
                const elm = document.getElementById('abountUs');
                if (elm) {
                    elm.scrollIntoView(true);
                }
            }
        }
    },
  }
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
      font-size: 20px;
      margin-right: 9px;
      color: #fff;
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
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
    column-gap: 20px;
    row-gap: 20px;
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
      margin-bottom: 24PX;
    }
    .item-warppaer {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      row-gap: 12px;
      .item {
        font-size: 13px;
        cursor: pointer;
        text-decoration: underline;
        &:hover {
          font-weight: bold;
        }
      }
    }
    .btn {
      display: flex;
      align-items: center;
      margin-top: 16px;
      font-weight: bold;
      font-size: 13px;
      img {
        width: 20px;
        margin-right: 5px;
      }
    }
  }
}
.desc {
  font-size: 13px;
  margin: 1.5rem 0;
}
.logo {
  width: 12rem;
}
</style>
