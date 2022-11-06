const { randomNum } = require('./utils')

// 空串开头，空格结尾中的字符
// '# '
const reg_mark = /^(.+?)\s/

// 井号开头
const reg_sharp = /^\#/

// - 开头
const reg_crossbar = /^\-/

// 数字开头
const reg_num = /^\d/

// md arr to html tree
function createTree(_mdArr) {
  let _htmlPool = {}
  let _lastMark = '' // 上一次标签
  let _key = 0
  // 
  _mdArr.forEach(mdFragment => {
    const matched = mdFragment.match(reg_mark)
    // console.log(matched) // '# '
    if(matched) {
      const mark = matched[1] // #
      const input = matched['input'] // # h1
      // 处理 #
      if(reg_sharp.test(matched)) {
        // console.log(matched) // '#' '##'
        const tag = `h${mark.length}` // h1
        const tagContent = input.replace(reg_mark, '') // h1
        // console.log(tag, tagContent)
        if(_lastMark === mark) {
          // 标签相同追加
          _htmlPool[`${tag}-${_key}`].tags = [..._htmlPool[`${tag}-${_key}`].tags, `<${tag}>${tagContent}</${tag}>`]
        } else {
          // 标签不同新建
          _lastMark = mark
          _key = randomNum()
          _htmlPool[`${tag}-${_key}`] = {
            type: 'single',
            tags: [`<${tag}>${tagContent}</${tag}>`]
          }
        }
      }
      // 处理 ul
      if(reg_crossbar.test(mark)) {
        const tag = 'li'
        const tagContent = input.replace(reg_mark, '')
        // 
        if(_lastMark === mark) {
          // 标签相同追加
          _htmlPool[`ul-${_key}`].tags = [..._htmlPool[`ul-${_key}`].tags, `<${tag}>${tagContent}</${tag}>`]
        } else {
          // 标签不同新建
          _lastMark = mark
          _key = randomNum()
          _htmlPool[`ul-${_key}`] = {
            type: 'wrap',
            tags: [`<${tag}>${tagContent}</${tag}>`]
          }
        }
      }
      // 处理 ol
      if(reg_num.test(mark)) {
        const tag = 'li'
        const tagContent = input.replace(reg_mark, '')
        // 
        if(reg_num.test(_lastMark)) {
          // 标签相同追加
          _htmlPool[`ol-${_key}`].tags = [..._htmlPool[`ol-${_key}`].tags, `<${tag}>${tagContent}</${tag}>`]
        } else {
          // 标签不同新建
          _lastMark = mark
          _key = randomNum()
          _htmlPool[`ol-${_key}`] = {
            type: 'wrap',
            tags: [`<${tag}>${tagContent}</${tag}>`]
          }
        }
      }
    }
  })
  // console.log(_htmlPool)
  return _htmlPool
}

/*
[
  '# h1\r',   '\r',
  '- ul1\r',  '- ul2\r',
  '- ul3\r',  '\r',
  '## h2\r',  '\r',
  '1. ol1\r', '2. ol2\r',
  '3. ol3\r', ''
]
createTree ->
{
  'h1-1657846618355': { type: 'single', tags: [ '<h1>h1\r</h1>' ] },
  'ul-1657846617359': {
    type: 'wrap',
    tags: [ '<li>ul1\r</li>', '<li>ul2\r</li>', '<li>ul3\r</li>' ]
  },
  'h2-1657846618505': { type: 'single', tags: [ '<h2>h2\r</h2>' ] },
  'ol-1657846616188': {
    type: 'wrap',
    tags: [ '<li>ol1\r</li>', '<li>ol2\r</li>', '<li>ol3\r</li>' ]
  }
}
*/

function compileHTML(_mdArr) {
  // console.log(_mdArr)
  const _htmlPool = createTree(_mdArr)
  // console.log(_htmlPool)
  let _htmlStr = ''
  let item
  for(let k in _htmlPool) {
    item = _htmlPool[k]
    if(item.type === 'single') {
      // 单标签
      item.tags.forEach((tag) => {
        _htmlStr += tag
        // console.log(tag)
      })
    } else if (item.type === 'wrap') {
      // 嵌套标签
      let _list = `<${k.split('-')[0]}>`
      item.tags.forEach((tag) => {
        _list += tag
      })
      _list += `</${k.split('-')[0]}>`
      _htmlStr += _list
      // console.log(_list)
    }
  }
  // console.log('_htmlStr: ')
  // console.log(_htmlStr)
  return _htmlStr  
}

module.exports = {
  compileHTML
}
