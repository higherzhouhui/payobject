<template>
  <div class="footer-container">
    <div class="item" v-for="(item, index) in ($store.state.userInfo.admin ? adminNavList : userNavList)" :key="item.icon" @click="routerTo(item.path)">
      <template v-if="index != 2">
        <svg-icon :iconClass="item.icon" className="svg" />
        <p>{{ item.title }}</p>
      </template>
      <div class="dashboard" v-else>
        <svg-icon :iconClass="item.icon" className="svg" />
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "footerBootom",
  data() {
    return {
      userNavList: [
        {
          icon: 'coins-solid',
          title: this.$t('chongzhi'),
          path: '/admin/deposit/index'
        },
        {
          icon: 'paper-plane-solid',
          title: this.$t('tx'),
          path: '/admin/withdraw/index'
        },
        {
          icon: 'house-solid',
          title: this.$t('kztai'),
          path: '/admin/dashboard'
        },
        {
          icon: 'circle-dollar-to-slot-solid',
          title: this.$t('duihuan'),
          path: '/admin/convert/index'
        },
        {
          icon: 'user-group-solid',
          title: this.$t('tjgpy'),
          path: '/admin/referfriends'
        },
      ],
      adminNavList: [
        {
          icon: 'coins-solid',
          title: this.$t('rjlist'),
          path: '/manage/deposit'
        },
        {
          icon: 'paper-plane-solid',
          title: this.$t('cjlist'),
          path: '/manage/withdraw'
        },
        {
          icon: 'house-solid',
          title: this.$t('kztai'),
          path: '/manage/index'
        },
        {
          icon: 'circle-dollar-to-slot-solid',
          title: this.$t('duihuanls'),
          path: '/manage/convert'
        },
        {
          icon: 'percent-solid',
          title: this.$t('hlgl'),
          path: '/manage/exchange'
        },
      ],
    };
  },
  methods: {
    routerTo(path) {
      if (this.$store.state.path !== path) {
        this.$router.push(path)
      }
    }
  },
};
</script>
<style scoped lang="scss">
.footer-container {
  grid-template-columns: repeat(5, 1fr);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: $contentColor;
  height: 54px;
  z-index: 10020;
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
  .svg {
    color: #fff;
    font-size: 20px;
    margin-bottom: 4px;
  }
  .dashboard {
    background: $baseColor;
    border-radius: 20px;
    width: 100%;
    margin-top: -27px;
    text-align: center;
    padding: 8px 0;
  }
}
</style>