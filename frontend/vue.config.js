module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
      ? '/web/'
      : '/',
  assetsDir: 'assets',
  filenameHashing: false,
  lintOnSave: true,
  runtimeCompiler: true,
  devServer: {
      port: 7542 
  },
}
