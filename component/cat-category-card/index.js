Component({
  properties: {
    catCount: Number,
    cat: Array
  },

  methods: {
    handle2CatPage() {
      wx.switchTab({
        url: '/page/cat/index',
      })
    },

    handleViewCurrentCat(e) {
      wx.navigateTo({
        url: '/page/cat/detail?id=' + e.currentTarget.dataset.cat,
      })
    }
  }
})