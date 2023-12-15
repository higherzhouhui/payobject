const { defineConfig } = require('@vue/cli-service')
const path = require('path');
const Timestamp = new Date().getTime();
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
        target: 'http://47.236.88.42:8087',
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

  configureWebpack: {
    output: {// 输出重构 打包编译后的文件名称 【输出文件夹/文件名(name为默认文件名非参数).时间戳】
      filename: `static/js/[name].${Timestamp}.js`,
      chunkFilename: `static/js/[name].${Timestamp}.js`
    },
  },
})
