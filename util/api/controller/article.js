/**
 * 控制器：文章
 * 版本：v0.0.1
 */
const regeneratorRuntime = require("../../runtime")
const $ = require('../request')
const Article = {
  async get() {
    return $._get('article', {})
  }
}

module.exports = Article