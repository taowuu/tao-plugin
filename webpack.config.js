const { resolve } = require('path')
const MdToHtmlPlugin = require('./plugin/md-to-html-plugin')

module.exports = {
  mode: 'development',
  entry: resolve(__dirname, 'src/app.js'),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'app.js',
  },
  devtool:'source-map',
  plugins: [
    new MdToHtmlPlugin({
      // 要解析的文件
      template: resolve(__dirname, 'test.md'),
      // 放入的文件
      filename: 'test.html'
    })
  ],
}