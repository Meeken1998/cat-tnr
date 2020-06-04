const regeneratorRuntime = require("../../util/runtime.js")
const $ = require('../../util/api/request')
const Api = require('../../util/api/index')
const App = getApp()

Page({
  data: {
    cat: [],
    article: [],
    catCount: 0,
    avatar: ''
  },

  async onShow() {
    if (wx.getStorageSync('userInfo')) this.setData({
      avatar: wx.getStorageSync('userInfo').avatarUrl
    })

    let authingUserInfo = await Api.Cat.helloWorld()
    if (authingUserInfo.code == 200) {
      wx.setStorageSync('user', authingUserInfo.data)
    }

    let res = await Api.Welcome.get()
    if (res.code == 200) {
      this.setData({
        cat: res.data.cat,
        article: res.data.article,
        catCount: res.data.catCount
      })
    }
  },

  async onPullDownRefresh() {
    await this.onShow()
    wx.stopPullDownRefresh({})
  },

})