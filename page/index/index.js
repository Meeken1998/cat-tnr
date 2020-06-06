const regeneratorRuntime = require("../../util/runtime.js")
const $ = require('../../util/api/request')
const Api = require('../../util/api/index')
const App = getApp()

Page({
  data: {
    cat: [],
    article: [],
    catCount: 0,
    avatar: '',
    loading: true
  },

  async onShow() {
    if (wx.getStorageSync('userInfo')) this.setData({
      avatar: wx.getStorageSync('userInfo').avatarUrl
    })

    if (this.data.cat.length && !wx.getStorageSync('reload')) return
    await this.getWelcomeInfo()
  },

  async getWelcomeInfo() {
    let authingUserInfo = await Api.Cat.helloWorld()
    wx.removeStorageSync('reload')
    if (authingUserInfo.code == 200) {
      wx.setStorageSync('user', authingUserInfo.data)
    }

    let res = await Api.Welcome.get()
    if (res.code == 200) {
      this.setData({
        cat: res.data.cat,
        article: res.data.article,
        catCount: res.data.catCount,
        loading: false
      })
    }
  },

  async onPullDownRefresh() {
    await this.getWelcomeInfo()
    wx.stopPullDownRefresh({})
  },

  onShareAppMessage() {
    return {

    }
  }

})