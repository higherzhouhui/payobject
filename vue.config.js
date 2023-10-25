const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  assetsDir: 'static',
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/style/scssFile.scss";`
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://119.23.54.86:8087',
        // target: 'http://85b0-119-123-28-26.ngrok-free.app',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  },
  lintOnSave: false,
})
