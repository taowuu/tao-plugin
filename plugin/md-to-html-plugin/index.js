const { readFileSync } = require("fs")
const { resolve } = require('path')
const { compileHTML } = require('./compiler')

const inner_mark = '<!-- inner -->'

class MdToHtmlPlugin {
  // 接收配置
  constructor({template, filename}) {
    if(!template) {
      throw new Error('no tamplate')
    }
    this.template = template
    this.filename = filename ? filename : 'md.html'
  }
  // 提供钩子编写逻辑
  apply(compiler) {
    compiler.hooks.emit.tap('md-to-html-plugin', (compilation) => {
      // 打包的资源
      const _assets = compilation.assets
      // console.log('_assets', _assets)
      const _mdContent = readFileSync(this.template, 'utf8')
      const _templateHTML = readFileSync(resolve(__dirname, 'template.html'), 'utf8')
      const _mdContentArr = _mdContent.split('\r\n')
      // md to html
      const _htmlStr = compileHTML(_mdContentArr)
      const _finalHTML = _templateHTML.replace(inner_mark, _htmlStr)
      // console.log(_mdContentArr)
      // 添加打包资源
      _assets[this.filename] = {
        source() {
          return _finalHTML
        },
        size() {
          return _finalHTML.length
        }
      }
    })
  }
}

module.exports = MdToHtmlPlugin
