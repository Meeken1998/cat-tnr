const regeneratorRuntime = require("./util/runtime")
const $ = require('./util/api/request')
App({
  async onLaunch() {
    // await this.checkLogin()
  },

  async checkLogin() {
    let userRes = {}
    try {
      userRes = await $._login()
    } catch (err) {
      if (err && err.msg) {
        wx.navigateTo({
          url: '/page/login/index',
        })
      }
    }
  }
})