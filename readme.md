const path =require('path')
module.exports = {
  // publicPath: './', // hash是./  histroy 是 /  // 根域上下文目录
  outputDir: 'dist', // 构建输出的目录
  // assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
  // indexPath: 'index.html',
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
       console.log(config)
       config.output.filename='[case].[hash:30].js'
       // config.output.path=path.resolve(__dirname, './dist')
       config.output.chunkFilename= '[case].[hash:30].chunk.js'
          // 把所有依赖的模块合并输出到一个 bundle.js 文件
          //filename: 'bundle.js',
          // filename: '[case].[hash:20].js',
          // 输出文件都放到 dist 目录下
          // path: path.resolve(__dirname, './dist')
        // }
    } else {
      // 为开发环境修改配置...
    }
  }