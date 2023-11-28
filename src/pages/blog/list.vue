<template>
  <div>
    <div class="container" ref="container" v-loading="loading">
      <div class="animation-warapper">
        <div class="title-lg">
          <h1>{{ $t("lastnews") }}</h1>
          <h3>{{ $t("lastnewsDesc") }}</h3>
        </div>
        <div class="container-auto section-column section-three section-news">
          <div
            class="item show"
            v-for="item in blogList"
            :key="item.id"
            @click="routerToBlogDetail(item.id)"
          >
            <div class="backgroundEffect"></div>
            <div class="cover">
              <img :src="`/api/file/downLoad?url=${item.cover}`" />
              <div class="time">
                <div class="date">{{ item.date }}</div>
                <div class="month">{{ getMonth(item.month) }}</div>
                <div class="year">{{ item.year }}</div>
              </div>
            </div>
            <div class="bottom">
              <h1>{{ item.title }}</h1>
              <h2>{{ item.mainPoint }}</h2>
              <div class="more-btn">
                <span>{{ $t("readmore") }}</span>
                <i class="el-icon-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { cmsPageReq } from "@/api/common";
export default {
  name: "indexVue",
  data() {
    return {
      loading: true,
      lang: this.$i18n.locale,
      blogList: [],
    };
  },
  created() {
    this.getBlogsList();
  },
  watch: {
    form: {
      deep: true,
      handler: function (newVal, oldVal) {
        if (this.form.exFrom && this.form.exTarget) {
          if (this.form.exValue) {
            this.exTargetValue = this.rate * this.form.exValue;
          } else {
            if (this.exTargetValue) {
              this.form.exValue = this.exTargetValue / this.rate;
            }
          }
        }
      },
    },
    "$i18n.locale"() {
      this.lang = this.$i18n.locale
      this.getBlogsList();
    },
  },
  mounted() {
    // window.addEventListener("scroll", this.onScroll);
    window.addEventListener("wheel", this.onWheel);
  },
  beforeDestroy() {
    // window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("wheel", this.onWheel);
  },
  methods: {
    getMonth(month) {
      let monthStr = "";
      const enmonthArray = [
        "",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const monthArray = [
        "",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
        "十一",
        "十二",
      ];
      if (this.lang == "zh") {
        monthStr = monthArray[month] + "月";
      } else {
        monthStr = enmonthArray[month];
      }
      return monthStr;
    },
    to(path) {
      this.$router.push(path);
    },
    routerToBlogDetail(id) {
      this.$router.push(`/blog/detail?id=${id}`);
    },
    async getBlogsList() {
      try {
        this.loading = true;
        const res = await cmsPageReq({ current: 1, size: 30, lang: this.lang });
        res.data.records.map((item) => {
          const time = item.createTime.split(" ")[0].split("-");
          if (time.length == 3) {
            item.date = time[2];
            item.month = time[1];
            item.year = time[0];
          }
        });
        this.blogList = res.data.records;
        this.loading = false;
      } catch {
        console.log("err");
        this.loading = false;
      }
    },
  },
};
</script>
<style scoped lang="scss">
.container {
  width: 100%;
  min-height: 100vh;
  padding-top: 80px;
  background: $contentColor;
}

.animation-warapper {
  padding: 6rem 0;
  .title-lg {
    max-width: 600px;
    width: 60%;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 3rem;
    color: #fff;
    @media screen and (max-width: 800px) {
      width: 80%;
    }
    h1 {
      font-size: 2rem;
      font-weight: normal;
      margin-bottom: 0.8rem;
    }
    h2 {
      font-weight: normal;
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    h3 {
      font-size: 1.2rem;
      line-height: 2.1rem;
      font-weight: normal;
    }
  }
  .show {
    opacity: 1;
    transform: scale(1);
  }
  .hide {
    opacity: 0;
    transform: scale(0.6);
  }
  .section-column {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 1rem;
    row-gap: 1rem;
    overflow: hidden;
    padding-bottom: 5px;
    @media screen and (max-width: 800px) {
      grid-template-columns: repeat(2, 1fr);
      row-gap: 2rem;
    }
    @media screen and (max-width: 500px) {
      grid-template-columns: repeat(1, 1fr);
      row-gap: 2rem;
    }
    .item {
      position: relative;
      padding: 0.8rem 1.6rem;
      background: #fff;
      transition: all 1s;
      cursor: pointer;
      .svgWrapper {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: rgb(242, 242, 242);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
      }
      .svgIcon {
        font-size: 35px;
        color: $baseColor;
        transition: all 0.5s;
      }
      h1 {
        font-size: 1.3rem;
        font-weight: normal;
        margin-bottom: 0.8rem;
      }
      p {
        font-size: 1rem;
        line-height: 1.7rem;
        color: #6c757d;
        text-align: justify;
      }
      &:hover {
        box-shadow: 0px 5px 25px #ccc9c9;
        .svgWrapper {
          background: $baseColor;
        }
        .svgIcon {
          color: #fff;
        }
      }
    }
    .feature-item {
      width: 100%;
      padding: 50px 0;
      border-radius: 10px;
      box-shadow: 0 8px 10px rgba(0, 0, 0, 0.175) !important;
      border: 1px solid rgba(0, 0, 0, 0.125);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: all 1s;
      .feature-svg {
        font-size: 80px;
        transition: all 0.5s;
      }
      .feature-desc {
        color: $bgColor;
        margin-top: 1rem;
        transition: all 0.5s;
        font-size: 1.2rem;
      }
      &:hover {
        background: $bgColor;
        .feature-svg {
          color: #fff;
        }
        .feature-desc {
          color: #fff;
        }
      }
    }
  }

  .section-three {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 1.5rem;
    row-gap: 1rem;
    overflow: hidden;
    padding-bottom: 5px;
    @media screen and (max-width: 800px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 500px) {
      grid-template-columns: repeat(1, 1fr);
      row-gap: 2rem;
    }
    .item {
      box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.375);
      &:hover {
        box-shadow: 2px 6px 15px rgba(46, 45, 45, 0.675);
      }
    }
  }
  @keyframes popBackground {
    0% {
      height: 20px;
      border-top-left-radius: 50%;
      border-top-right-radius: 50%;
    }
    50% {
      height: 80px;
      border-top-left-radius: 75%;
      border-top-right-radius: 75%;
    }
    75% {
      height: 160px;
      border-top-left-radius: 85%;
      border-top-right-radius: 85%;
    }
    100% {
      height: 320px;
      border-top-left-radius: 100%;
      border-top-right-radius: 100%;
    }
  }
  .section-news {
    .bottom {
      padding: 2rem 1rem 1rem 1rem;
      transition: all 0.5s;
      user-select: none;
      z-index: 10;
      overflow: hidden;
    }
    .item {
      border-radius: 6px 6px 0 0;
      overflow: hidden;
      padding: 0;
      h1 {
        padding: 1.5rem 0 1rem 0;
        font-size: 1.3rem;
        line-height: 1.8rem;
      }
      h2 {
        text-align: justify;
        font-size: 0.9rem;
        font-weight: normal;
        color: #666;
      }
      &:hover {
        transform: scale(1.025);
        box-shadow: rgba(0, 0, 0, 0.24) 0px 5px 10px;
        position: relative;
        user-select: none;
        z-index: 10;
        overflow: hidden;
        .backgroundEffect {
          bottom: 0;
          height: 320px;
          width: 100%;
          position: absolute;
          z-index: -1;
          background: $bgColor;
          animation: popBackground 0.3s ease-in;
        }
        .bottom {
          color: #fff;
          h2 {
            color: #fff;
          }
          .more-btn {
            background: #fff;
            span {
              color: $bgColor;
            }
            i {
              color: $bgColor;
            }
          }
        }
      }
    }
    .cover {
      background: #fff;
      position: relative;
      height: 250px;
      width: 100%;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
      }
      .time {
        position: absolute;
        bottom: 0;
        left: 0;
        background: $bgColor;
        color: #fff;
        padding: 5px 8px;
        text-align: center;
        .date {
          font-weight: bold;
          font-size: 0.9rem;
        }
        .month {
          font-size: 0.8rem;
        }
        .year {
          font-size: 0.8rem;
        }
      }
    }

    .more-btn {
      border-radius: 1rem;
      color: #fff;
      background: $bgColor;
      padding: 4px 12px;
      width: fit-content;
      margin-top: 1rem;
      transition: all 0.5s;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      i {
        font-size: 0.9rem;
        margin: 0;
        color: #fff;
      }
    }
  }
}
</style>
