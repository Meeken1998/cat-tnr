/**
 * 控制器：欢迎页面
 * 版本：v0.0.1
 */
const regeneratorRuntime = require("../../runtime")
const $ = require('../request')
const Welcome = {
  async get() {
    return $._get('welcome', {})
  }
}

module.exports = Welcome