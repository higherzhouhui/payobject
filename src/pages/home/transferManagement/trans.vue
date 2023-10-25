
<template>
    <div class="user_withdrawmanagement_withdraw_contianer">
      <div class="content flex">
        <div class="left">
          <div class="title">1、{{ $t("tczhybz2") }}</div>
          <div class="content_shadow">
            <el-form label-position="top">
              <el-form-item :label="$t('tczh2')">
                <el-select
                  class="form-item"
                  v-model="value"
                  :placeholder="$t('xztcz2')"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('xztczh2')">
                <el-select
                  class="form-item"
                  v-model="value"
                  :placeholder="$t('xzdzbz')"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="right">
          <div class="title">2、{{ $t("txddxx2") }}</div>
          <div class="content_shadow">
            <el-form :rules="rules">
              <el-form-item :label="$t('skr')" prop="type">
                <el-select
                  class="form-item-1"
                  v-model="value"
                  :placeholder="$t('xzskr')"
                >
                  <el-option
                    v-for="item in outZHList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <div class="move">
                <div class="flex" style="gap: 20px">
                  <div>
                    <div class="txt">{{ $t("tcbz2") }}</div>
                    <el-select
                      class="form-item-2"
                      v-model="value"
                      :placeholder="$t('xzdzbz')"
                    >
                      <el-option
                        v-for="item in outCoinList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <div>
                    <div class="txt">{{ $t("tcje2") }}</div>
                    <el-input class="form-item-3" :placeholder="$t('srtcje2')" />
                  </div>
                </div>
                <img
                  class="frame"
                  src="@/assets/images/withdrawManage/frame.png"
                  alt=""
                />
                <img
                  class="left_line"
                  src="@/assets/images/withdrawManage/left_line.png"
                  alt=""
                />
                <div>
                  <div class="txt">{{ $t("dzbz") }}</div>
                  <el-select
                    class="form-item-2"
                    v-model="value"
                    :placeholder="$t('xzdzbz')"
                  >
                    <el-option
                      v-for="item in inCoinList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <el-form-item :label="$t('tkfy2')" class="mt30" prop="type">
                <el-input class="form-item-1" :placeholder="$t('xztkfy2')" />
              </el-form-item>
            </el-form>
            <div class="bottom">
              <el-button class="primary hui"
                ><img src="@/assets/images/withdrawManage/tx.png" alt="" />{{
                  $t("fqtx2")
                }}</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import LinkPath from "@/components/common/linkPath.vue";
  import {
    withdrawAccounts,
    depCoins,
    withdrawCoins,
    balanceList,
    putWithdraw,
    calculateRate
  } from "@/api/out";
  export default {
    name: "userWithdrawManagementWithdraw",
    components: { LinkPath },
    data() {
      return {
        tableData: [],
        options: [],
        type: "1",
        dialogVisible2: false,
        linkList: ["txgl", "tx"],
        form: {
          name: "",
        },
        rules: {
          type: [{ required: true, message: "123", tigger: "blur" }],
        },
        outCoinList: [],
        inCoinList: [],
        outZHList: []
      };
    },
    created() {
    //   this.getCjZh()
    //   // balanceList();
    //   this.getCJBZ()
    //   this.getRJBZ()
    //   calculateRate({
    //       exFrom: 'CNY',
    //       exTarget: 'USDT',
    //       exValue: 100
    //   })
    },
    methods: {
      // 获取出金账户
      async getCjZh() {
          try {
              let res = await withdrawAccounts()
              this.outZHList = res.data
          } catch (error) {
              
          }
      },
      // 获取出金币种
      async getCJBZ() {
        try {
          let res = await withdrawCoins();
          this.outCoinList = res.data;
        } catch (error) {}
      },
      // 获取入金币种
      async getRJBZ() {
        try {
          let res = await depCoins();
          this.inCoinList = res.data;
        } catch (error) {}
      },
      handleClick() {},
    },
  };
  </script>
  <style scoped lang="scss">
  .user_withdrawmanagement_withdraw_contianer {
    .content {
      margin-top: 40px;
      gap: 32px;
  
      .title {
        margin-bottom: 20px;
        font-size: 20px;
        color: #303133;
      }
  
      .content_shadow {
        padding: 24px;
        box-sizing: border-box;
        border-radius: 10px;
        height: 95%;
      }
  
      .left {
        width: 382px;
  
        .form-item {
          width: 100%;
        }
      }
  
      .right {
        width: calc(100% - 414px);
  
        .form-item-1 {
          width: 456px;
        }
  
        .form-item-2 {
          width: 186px;
        }
  
        .form-item-3 {
          width: 300px;
        }
  
        .move {
          position: relative;
          margin-left: 30px;
  
          .frame {
            margin: 40px 0;
            height: 112px;
          }
          .left_line {
            position: absolute;
            top: 48px;
            left: -30px;
            height: 270px;
          }
        }
  
        .txt {
          margin-bottom: 10px;
          font-size: 14px;
          color: #606266;
        }
        .bottom {
          padding-top: 30px;
          border-top: 1px solid #dcdfe6;
          text-align: center;
        }
      }
    }
  }
  </style>
  