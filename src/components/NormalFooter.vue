<template>
  <footer>
    <div class="footer-content container-auto">
        <div class="footer-top">
            <div class="footer-item">
                <p class="desc">
                    ReliancePay旨在为更多的跨境企业提供便利的服务于技术支持
                </p>
                <h3>关注我们</h3>
                <img class="footer-icon" src="@/assets/images/index/facebook.png" alt="facebook" />
                <img class="footer-icon" src="@/assets/images/index/twitter.png" alt="twitter" />
                <img class="footer-icon" src="@/assets/images/index/telegram.png" alt="telegram" />
                <img class="footer-icon" src="@/assets/images/index/skype.png" alt="skype" />
            </div>
            <div class="footer-item">
                <div class="footer-title">有效链接</div>
                <div class="item-warppaer">
                    <div class="item" v-for="item in links" :key="item.name" @click="to(item.url)">
                        {{item.name}}
                    </div>
                </div>
            </div>
            <div class="footer-item">
                <div class="footer-title">订阅</div>
                <div class="item-desc">探索更多的解决方案，请与我们联系</div>
                <div class="btn">{{ $t('lxwm') }}</div>
            </div>
        </div>
        <div class="copyright">{{$t('footer')}}</div>
    </div>
</footer>
</template>

<script>
export default {
  name: 'NormalFooter',
  props: {
    msg: String
  },
  data() {
    return {
      links: [
                {name: '首页', url: '/index'},
                {name: '关于我们', url: '/about'},
                {name: '登录', url: '/user/login'},
                {name: '博客', url: '/blog'},
                {name: '注册', url: '/user/register'},
                {name: '隐私&政策', url: '/privacy'},
            ],
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
footer {
    padding: 50px 0 8px 0;
    font-size: 14px;
    color: #fff;
    background: $bgColor;
    text-align: center;
    box-sizing: border-box;
    text-align: left;
    .footer-content {
        .footer-icon {
            height: 30px;
            margin-right: 9px;
        }
    }
    .copyright {
        text-align: center;
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
            font-size: 17px;
            &::after {
                content: '';
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
            cursor: pointer;
            &:hover {
                background: #0501fc;
            }
        }
    }
}
</style>
