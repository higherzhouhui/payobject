<template>
  <div class="footer-container">
    <div class="item" v-for="item in navList" :key="item.icon" @click="routerTo(item.path)">
      <svg-icon :iconClass="item.icon" className="svg" />
      <p>{{ item.title }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "footerBootom",
  data() {
    return {
      navList: [
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
      ]
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
  .item:nth-child(3) {
    background: $baseColor;
    border-radius: 20px;
  }
}
</style>