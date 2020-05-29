/**
 * 控制器：猫
 * 版本：v0.0.1
 */
const regeneratorRuntime = require("../../runtime")
const $ = require('../request')
const Cat = {
  async helloWorld() {
    return $._get('', {})
  }
}

module.exports = Cat