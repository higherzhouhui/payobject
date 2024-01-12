<template>
  <div class="container" ref="container">
    <div class="container-auto" v-if="lang == 'zh'">
      <div class="title">ReliancePay 换汇服务平台服务协议</div>
      <div class="content">
        <ol>
          <li>引言
            <ul>
              <li>目的：本协议旨在规范用户使用ReliancePay提供的法币与数字货币间的兑换服务。</li>
              <li>定义：“用户”指注册使用ReliancePay服务的个人或机构；“服务”指ReliancePay提供的法币与数字货币间的兑换服务；“平台”指ReliancePay网站及其相关应用程序。</li>
            </ul>
          </li>
          <li>用户注册与账户
            <ul>
              <li>注册要求：用户必须提供有效的身份证明和联系信息。</li>
              <li>账户安全：用户负责维护其账户信息的安全性和保密性。</li>
            </ul>
          </li>
          <li>
            兑换服务
            <ul>
              <li>服务描述：用户可通过ReliancePay进行法币与多种数字货币间的兑换。</li>
              <li>费用和汇率：交易按照ReliancePay提供的实时汇率进行，相关手续费将在交易前明示。</li>
            </ul>
          </li>
          <li>
            用户责任
            <ul>
              <li>合法使用：用户承诺将服务用于合法目的，遵守所有相关的美国及国际法律法规，包括但不限于反洗钱和反恐怖融资法规。</li>
              <li>信息准确性：用户应确保所有提供给ReliancePay的信息均为准确和最新。</li>
            </ul>
          </li>
          <li>
            知识产权
            <ul>
              <li>版权声明：ReliancePay平台的所有内容，包括文本、图像、软件等版权均归ReliancePay所有。</li>
              <li>用户内容：用户对其通过平台上传或分享的内容负责，并授予ReliancePay使用的非独家权利。</li>
            </ul>
          </li>
          <li>
            责任限制
            <ul>
              <li>免责声明：ReliancePay对由于网络问题、系统故障或其他不可抗力因素导致的服务中断或损失不承担责任。</li>
            </ul>
          </li>
          <li>
            协议修改与终止
            <ul>
              <li>修改流程：ReliancePay保留随时修改服务协议的权利，并将通过网站公告或电子邮件通知用户。</li>
              <li>终止条件：在违反本协议条款的情况下，ReliancePay有权终止用户使用服务。</li>
            </ul>
          </li>
          <li>
            法律适用与争议解决
            <ul>
              <li>适用法律：本协议受美国法律的管辖。</li>
              <li>争议解决：任何因本协议引起或与本协议相关的争议应通过友好协商解决，协商不成的，提交美国法院解决。</li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
    <div class="container-auto" v-if="lang == 'en'">
      <div class="title">ReliancePay Currency Exchange Service Platform Agreement</div>
      <div class="content">
        <ol>
          <li>Introduction
            <ul>
              <li>Purpose: This agreement aims to regulate the use of fiat and digital currency exchange services provided by ReliancePay.</li>
              <li>Definitions: "User" refers to an individual or entity registered to use ReliancePay's services; "Service" refers to the fiat and digital currency exchange services provided by ReliancePay; "Platform" refers to the ReliancePay website and its related applications.</li>
            </ul>
          </li>
          <li>User Registration and Accounts
            <ul>
              <li>Registration Requirements: Users must provide valid identification and contact information.</li>
              <li>Account Security: Users are responsible for maintaining the security and confidentiality of their account information.</li>
            </ul>
          </li>
          <li>
            Exchange Service
            <ul>
              <li>Service Description: Users can exchange fiat currency for various digital currencies through ReliancePay.</li>
              <li>Fees and Exchange Rates: Transactions are conducted at the real-time exchange rates provided by ReliancePay, and related fees will be clearly stated before the transaction.</li>
            </ul>
          </li>
          <li>
            User Responsibilities
            <ul>
              <li>Legal Use: Users commit to using the service for lawful purposes and to comply with all relevant U.S. and international laws and regulations, including but not limited to anti-money laundering and anti-terrorism financing regulations.</li>
              <li>Accuracy of Information: Users should ensure that all information provided to ReliancePay is accurate and up-to-date.</li>
            </ul>
          </li>
          <li>
            Intellectual Property
            <ul>
              <li>Copyright Statement: All content on the ReliancePay platform, including texts, images, software, etc., is copyrighted and owned by ReliancePay.</li>
              <li>User Content: Users are responsible for the content they upload or share on the platform and grant ReliancePay a non-exclusive right to use it.</li>
            </ul>
          </li>
          <li>
            Liability Limitation
            <ul>
              <li>ReliancePay is not responsible for any service interruption or loss caused by network issues, system failures, or other force majeure events.</li>
            </ul>
          </li>
          <li>
            translates to "Amendment and Termination of Agreement
            <ul>
              <li>Amendment Process - ReliancePay reserves the right to modify the service agreement at any time and will notify users through website announcements or email.</li>
              <li>Termination Conditions - In the event of a breach of the terms of this agreement, ReliancePay reserves the right to terminate the user's service.</li>
            </ul>
          </li>
          <li>
            Governing Law and Dispute Resolution
            <ul>
              <li>Applicable Law: This agreement is governed by the laws of the United States.</li>
              <li>Dispute Resolution: Any dispute arising from or related to this agreement shall be resolved through amicable negotiation. If negotiation fails, the dispute shall be submitted to the courts of the United States for resolution.</li>
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
  watch: {
    "$i18n.locale"() {
      this.lang = this.$i18n.locale
    },
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
