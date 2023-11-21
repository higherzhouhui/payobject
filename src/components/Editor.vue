<template>
  <div style="border: 1px solid #ccc; margin-top: 10px;z-index:999;width:537px">
      <!-- 工具栏 -->
      <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" />
      <!-- 编辑器 -->
      <Editor style="height:300px; overflow-y: hidden;" :defaultConfig="editorConfig" v-model="passSon"
          @onChange="onChange" @onCreated="onCreated" />
  </div> 
</template>

<script>
import { Message } from 'element-ui';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
export default {
  name: "myEditor",
  props: {
      passSon: {
        type: String,
        default: ''
      }
  },
  data() {
      return {
          editor: null,
          toolbarConfig: {
              /* 显示哪些菜单，如何排序、分组 */
              // toolbarKeys: [],
              /* 隐藏哪些菜单 */
              excludeKeys: [
                  // '|',
                  'blockquote',
                  'fontSize',
                  'fontFamily',
                  'lineHeight',
                  'bulletedList',
                  'numberedList',
                  'todo',
                  'emotion',
                  'group-video',
                  'group-indent',
                  'group-more-style',
                  'insertTable',
                  'codeBlock',],
          },
          editorConfig: {
              placeholder: '请输入内容',
              // autoFocus: false,
              // 所有的菜单配置，都要在 MENU_CONF 属性下
              MENU_CONF: {

                  // 配置字号
                  // fontSize: [... ],


                  // 图片上传
                  uploadImage: {
                      server: '/api/file',
                      fieldName: 'img',
                      // 单个文件的最大体积限制，默认为 2M
                      maximgSize: 10 * 1024 * 1024, // 10M
                      // 最多可上传几个文件，默认为 100
                      maxNumberOfimgs: 10,
                      // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
                      allowedimgTypes: ['image/*'],
                      // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
                      meta: {
                          // token: 'xxx',
                          // otherKey: 'yyy'
                          // img:''
                      },
                      // 将 meta 拼接到 url 参数中，默认 false
                      metaWithUrl: false,

                      // 自定义增加 http  header
                      headers: {
                          // Accept: 'text/x-json',
                          // otherKey: 'xxx'
                      },

                      // 跨域是否传递 cookie ，默认为 false
                      withCredentials: true,

                      // 超时时间，默认为 10 秒
                      timeout: 10 * 1000, //10 秒

                      // 上传前
                      onBeforeUpload(imgs) {
                        Message({
                              message: '图片正在上传中,请耐心等待',
                              grouping: true,
                              duration: 0,
                              customClass: 'uploadTip',
                              iconClass: 'el-icon-loading',
                              showClose: true
                          });
                          return imgs;
                      },
                      // 自定义插入图片
                      customInsert(res, insertFn) {
                          // 因为自定义插入导致onSuccess与onFailed回调函数不起作用,自己手动处理
                          // 先关闭等待的ElMessage
                          Message.closeAll();

                          if (res.code === 200) {
                            Message.success({
                                  message: this.$t("sccg"),
                                  grouping: true,
                              });
                          } else {
                            Message.error({
                                  message: "fail",
                                  grouping: true,
                              });
                          }
                          // 从 res 中找到 url alt href ，然后插入图片
                          insertFn(res.data.url);
                          // console.log(res, "res.data")
                      },

                      // 单个文件上传成功之后
                      onSuccess(img, res) {
                          console.log(`${img.name} 上传成功`, res);
                      },

                      // 单个文件上传失败
                      onFailed(img, res) {
                          console.log(`${img.name} 上传失败`, res);
                      },

                      // 上传进度的回调函数
                      onProgress(progress) {
                          console.log('progress', progress);
                          // progress 是 0-100 的数字
                      },

                      // 上传错误，或者触发 timeout 超时
                      onError(img, err, res) {
                          console.log(`${img.name} 上传出错`, err, res);
                      }
                  },
              }
          },
      }
  },
  mounted() {

  },
  methods: {

      onCreated(editor) {
          this.editor = Object.seal(editor) // 【注意】一定要用 Object.seal() 否则会报错
      },

      onChange(editor) {
          const text = editor.getHtml()
          this.$emit('update:content', text)
      },
  },

  beforeDestroy() {
      const editor = this.editor
      if (editor == null) return
      editor.destroy() // 组件销毁时，及时销毁 editor ，重要！！！
  },
  components: { Editor, Toolbar },
}
</script>

<style src="@wangeditor/editor/dist/css/style.css">

</style>