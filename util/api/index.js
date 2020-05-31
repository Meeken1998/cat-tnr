/**
 * API
 * 版本：v0.0.1
 */
const regeneratorRuntime = require("../runtime")
const Cat = require('./controller/cat')
const Upload = require('./controller/upload')

module.exports = {
  Cat,
  Upload
}