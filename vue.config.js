module.exports = {
  publicPath: './',
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        network: '@/network',
        views: '@/views'
      }
    }
  }
}

// const path = require('path')
// function resolve (dir) {
//   return path.join(__dirname, dir)
// }
// module.exports = {
//   // 这里是配置上线读取当前目录，默认是根路径，如 /js, /css 等，具体根据项目来
//   // baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
//   lintOnSave: true,
//   chainWebpack: (config) => {
//     config.resolve.alias
//       .set('@$', resolve('src'))
//       .set('assets', resolve('src/assets'))
//       .set('components', resolve('src/components'))
//       .set('layout', resolve('src/layout'))
//       .set('base', resolve('src/base'))
//       .set('static', resolve('src/static'))
//   },
//   publicPath: './'
// }
