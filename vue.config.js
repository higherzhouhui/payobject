const { defineConfig } = require('@vue/cli-service')
const path = require('path');

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
  chainWebpack: config => {
   // set svg-sprite-loader
   config.module
   .rule('svg')
   .exclude.add(path.resolve(__dirname, 'src/components/svgIcon/svg'))
   .end()
   config.module
   .rule('icons')
   .test(/\.svg$/)
   .include.add(path.resolve(__dirname, 'src/components/svgIcon/svg'))
   .end()
   .use('svg-sprite-loader')
   .loader('svg-sprite-loader')
   .options({
       symbolId: 'icon-[name]'
   })
   .end()
  },
})
