<template>
  <div class="container" ref="container">
    <div class="container-auto">
      <div class="title">ReliancePay 隐私政策</div>
      <div class="content">
        <ol>
          <li>数据收集
            <ul>
              <li>收集的数据：包括但不限于用户姓名、联系信息、身份证明、交易记录、数字钱包地址。</li>
              <li>收集目的：为提供兑换服务、改善用户体验、遵守法律法规，包括反洗钱和反恐怖融资规定。</li>
            </ul>
          </li>
          <li>数据使用
            <ul>
              <li>使用方式：用于处理兑换交易、客户服务和法定目的。</li>
              <li>第三方共享：除非法律要求，否则ReliancePay不会与第三方分享用户数据。</li>
            </ul>
          </li>
          <li>
            数据安全
            <ul>
              <li>安全措施：ReliancePay采取行业标准的安全措施保护用户数据。</li>
              <li>数据泄露应对：如发生数据泄露，ReliancePay将立即采取措施并通知受影响的用户。</li>
            </ul>
          </li>
          <li>
            用户权利
            <ul>
              <li>访问与修改：用户有权访问、更正其个人信息。</li>
              <li>撤销同意：用户可随时撤销对ReliancePay处理其个人数据的同意。</li>
            </ul>
          </li>
          <li>
            政策更新
            <ul>
              <li>更新通知：任何隐私政策的更改将通过平台公告或电子邮件通知用户。</li>
            </ul>
          </li>
          <li>
            联系方式
            <ul>
              <li>联系信息：用户如有隐私方面的疑问，可通过<span>Support@reliancepay.net</span>与ReliancePay联系。</li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
<script>
import { Local } from "@/utils/index";

export default {
  name: "indexVue",
  data() {
    return {
      lang: Local("lang") || "zh",
    };
  },
  created() {
  },

  methods: {
  
  },
};
</script>
<style scoped lang="scss">
.container {
  width: 100%;
  min-height: calc(100vh - 256px);
  padding: 158px 0 60px 0;
  background: $contentColor;
  .title {
    font-size: 1.8rem;
    color: #fff;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2rem;
  }
  .content {
    margin: 0 auto;
    color: #fff;
    width: 80%;
    ol>li {
      font-size: 1.25rem;
      line-height: 1.8rem;
      margin-bottom: 2rem;
      font-weight: bold;
    }
    ul>li {
      font-weight: normal;
      font-size: 1rem;
      line-height: 1.7rem;
      list-style: disc;
      text-indent: 2rem;
      list-style-position: inside;
      span {
        color: $baseColor;
        font-weight: bold;
      };
    }
  }
}
</style>
