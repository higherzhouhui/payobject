<template>
  <div class="container" ref="container">
    <div class="container-auto">
      <div class="title">{{detail.title}}</div>
      <img :src="`/api/file/downLoad?url=${detail.cover}`" class="cover" alt="cover" />
      <div class="content" v-html="detail.content"></div>
    </div>
  </div>
</template>
<script>
import { Local, getHashParams } from "@/utils/index";
import {
  cmsGetReq,
} from "@/api/common";
export default {
  name: "indexVue",
  data() {
    return {
      type: 0,
      lang: Local("lang") || "zh",
      detail: [],
      id: '',
    };
  },
  created() {
    this.getBlogsList();
  },

  methods: {
    async getBlogsList() {
      const params = getHashParams()
      this.id = params.get('id') || '1'
      try {
        const res = await cmsGetReq({id: this.id});
        this.detail = res.data;
      } catch {
        console.log("err");
      }
    },
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
    margin-bottom: 1rem;
  }
  .cover {
    width: 100%;
    object-fit: contain;
    margin-bottom: 1rem;
  }
  .content {
    width: 85%;
    margin: 0 auto;
    color: #fff;
    font-size: 0.9rem;
    line-height: 1.8rem;
  }
}
</style>
