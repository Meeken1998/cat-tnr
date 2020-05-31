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
    $._showLoading('联络喵星中')
    try {
      let res = await $._login()
      console.log(res)
      this.setData({
        isLogin: true
      })
      $._hideLoading()
      wx.getUserInfo({
        success: async userRes => {
          await this.onGetUserInfo({
            detail: userRes
          })
        }
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
    const loginCode = wx.getStorageSync('loginCode')
    if (!loginCode) return
    const {
      code
    } = loginCode
    $._showLoading('登录中')
    let res = await $._Authing.loginWithWxapp({
      code,
      detail: e.detail,
      phone: '',
      overideProfile: true
    })
    console.log('用户信息', res)
    $._setToken(wx.getStorageSync('_authing_token'))
    $._hideLoading()
    getCurrentPages().length > 1 ? wx.navigateBack() : wx.reLaunch({
      url: '/page/index/index',
    })
  }
})