// const regeneratorRuntime = require("../../util/runtime.js")
const $ = require('../../util/api/request')
const Api = require('../../util/api/index')
const App = getApp()

Page({
  data: {
    isLogin: false
  },

  async onLoad() {
    await this.checkLogin()
  },

  async checkLogin() {
    try {
      let res = await $._login()
      console.log(res)
      const {
        code
      } = wx.getStorageSync('loginCode')
      this.setData({
        isLogin: true
      })
    } catch (err) {
      this.setData({
        isLogin: false
      })
    }
  }

})