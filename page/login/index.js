const regeneratorRuntime = require("../../util/runtime.js")
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
    $._showLoading('自动登录中')
    try {
      let res = await $._login()
      console.log(res)
      this.setData({
        isLogin: true
      })
      $._hideLoading()
      getCurrentPages().length > 1 ? wx.navigateBack() : wx.reLaunch({
        url: '/page/index/index',
      })
    } catch (err) {
      wx.showToast({
        title: '请使用微信授权',
        icon: 'none'
      })
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
    $._hideLoading()
    getCurrentPages().length > 1 ? wx.navigateBack() : wx.reLaunch({
      url: '/page/index/index',
    })
  }
})