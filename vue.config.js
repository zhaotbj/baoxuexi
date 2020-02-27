module.exports = {
  publicPath: './',
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
    // host: "0.0.0.0",
    // port: '',
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'https://test2.baoxuexiedu.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }

  },
  lintOnSave: false,


}
