const regeneratorRuntime = require("../../util/runtime.js")
const $ = require('../../util/api/request')
const Api = require('../../util/api/index')
const App = getApp()

Page({
  async onShow() {
    let res = await Api.Cat.helloWorld()
    console.log(res)
  },

  onPullDownRefresh() {

  }
})