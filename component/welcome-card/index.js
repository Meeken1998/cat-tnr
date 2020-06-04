// component/welcome-card/index.js
Component({
  properties: {
    cat: Array,
    avatar: String
  },

  data: {
    date: (new Date().getMonth() + 1) + ' 月 ' + new Date().getDate() + ' 日'
  },

  methods: {
    handleLogin() {
      wx.navigateTo({
        url: '/page/login/index',
      })
    },

    handleViewCat() {
      wx.navigateTo({
        url: '/page/cat/detail?id=' + this.properties.cat[0]['_id'],
      })
    }
  }
})