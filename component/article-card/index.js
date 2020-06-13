Component({
  properties: {
    list: Array
  },

  methods: {
    handleCopy() {
      wx.setClipboardData({
        data: '喵星浙外工作处',
      })
    },

    handleTips() {
      wx.showToast({
        title: '即将上线',
      })
    }
  }
})