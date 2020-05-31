const regeneratorRuntime = require("../../util/runtime.js")
const $ = require('../../util/api/request')
const Api = require('../../util/api/index')
const App = getApp()

Page({
  async onShow() {
    let authingUserInfo = await Api.Cat.helloWorld()
    if (authingUserInfo.code == 200) {
      wx.setStorageSync('user', authingUserInfo.data)
    }
  },

  onPullDownRefresh() {

  },

})