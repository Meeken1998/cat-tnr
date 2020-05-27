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

      this.setData({
        isLogin: true
      })
    } catch (err) {
      this.setData({
        isLogin: false
      })
    }
  },

  async onGetUserInfo(e) {
    const {
      code
    } = wx.getStorageSync('loginCode')
    $._showLoading('登录中')
    let res = await $._Authing.loginWithWxapp({
      code,
      detail: e.detail,
      phone: '',
      overideProfile: true
    })
    console.log(res)
    $._hideLoading()
  }
})