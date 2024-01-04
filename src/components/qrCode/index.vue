<template>
  <div class="QRCode" :style="{'width':width, 'height':height}">
    <canvas :id="canvasId" :style="{'width':width, 'height':height}"></canvas>
    <!-- <div class="QQMode" v-if="load || view"><a-icon type="download" @click="loadCode" v-if="load" /></div> -->
  </div>
</template>
<script>
import QRCode from "qrcode";
export default {
  name: "QRCode",
  props: {
    content: {
      type: String,
      default: "测试二维码"
    },
    width: {
      type: String,
      default: "100"
    },
    height: {
      type: String,
      default: "100"
    },
    codeName: {
      type: String,
      default: "二维码"
    },
    load: {
      type: Boolean,
      default: true
    },
    view: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      canvasId: ""
    };
  },
  computed: {},
  created() {
    this.canvasId = this.getUUID();
    this.$nextTick(() => {
      this.init();
    });
  },
  mounted: function() {},
  methods: {
    init() {
      let width = this.width,
        height = this.height;
      QRCode.toCanvas(
        document.getElementById(this.canvasId),
        this.content,
        { width, height, toSJISFunc: QRCode.toSJIS },
        error => {}
      );
    },
    getUUID() {
      let d = new Date().getTime();
      let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function(c) {
          let r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == "x" ? r : (r & 0x7) | 0x8).toString(16);
        }
      );
      return uuid;
    }
    //下载二维码
    // loadCode() {
    //   let [F, S, a] = [
    //     navigator.userAgent.indexOf("Firefox") > -1,
    //     document.getElementById(this.canvasId).toDataURL("image/png"),
    //     document.createElement("a")
    //   ];
    //   // var dataurl = showel.toDataURL();
    //   var arr = S.split(","),
    //     mime = arr[0].match(/:(.*?);/)[1],
    //     bstr = atob(arr[1]),
    //     n = bstr.length,
    //     u8arr = new Uint8Array(n);
    //   while (n--) {
    //     u8arr[n] = bstr.charCodeAt(n);
    //   }
    //   var file = new File([u8arr], this.codeName + ".png", { type: mime });
    //   $A.FU(file, data => {
    //     // alert(1)
    //     // window.location.href = data;
    //     [a.href, a.download] = [data, this.codeName];
    //     // a.download = '二维码';
    //     if (F) {
    //       let evt = document.createEvent("MouseEvents");
    //       evt.initEvent("click", true, true);
    //       a.dispatchEvent(evt);
    //     } else {
    //       a.click();
    //     }
    //   });
    // },
    // insertContentLoad(content, size) {
    //   const ele = document.createElement("canvas");
    //   ele.style.width = size.width || "100" + "px";
    //   ele.style.height = size.height || "100" + "px";
    //   QRCode.toCanvas(
    //     ele,
    //     content,
    //     {
    //       width: size.width || "100",
    //       height: size.height || "100",
    //       toSJISFunc: QRCode.toSJIS
    //     },
    //     error => {}
    //   );
    //   let [F, S, a] = [
    //     navigator.userAgent.indexOf("Firefox") > -1,
    //     ele.toDataURL("image/png"),
    //     document.createElement("a")
    //   ];
    //   [a.href, a.download] = [S, size.name];
    //   // a.download = '二维码';
    //   if (F) {
    //     let evt = document.createEvent("MouseEvents");
    //     evt.initEvent("click", true, true);
    //     a.dispatchEvent(evt);
    //   } else {
    //     a.click();
    //   }
    // }
  },
  watch: {
    content(val) {
      this.init();
    }
  }
};
</script>
<style lang="scss" scoped>
.QRCode {
  display: inline-block;
  position: relative;
  overflow: hidden;
  .QQMode {
    position: absolute;
    left: 0;
    bottom: 100%;
    right: 0;
    height: 0;
    background-color: rgba(0, 0, 0, 0.45);
    transition: all 200ms ease-in-out;
    cursor: pointer;
    color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 20px;
    font-weight: bolder;
    box-sizing: border-box;
    padding: 10px;
  }
}
.QRCode:hover .QQMode {
  bottom: 0;
  height: 100%;
}
</style>