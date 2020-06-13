const regeneratorRuntime = require("../../util/runtime.js")
const $ = require('../../util/api/request')
const Api = require('../../util/api/index')
const App = getApp()

Page({
  data: {
    list: []
  },

  onLoad() {
    this.setData({
      list: wx.getStorageSync('cats') || []
    })
  }
})