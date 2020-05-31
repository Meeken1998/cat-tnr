// component/cat-item/index.js
Component({
  options: {
    addGlobalClass: true
  },

  properties: {
    options: {
      type: Object,
      value: {
        photo: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1917461690,696184102&fm=5',
        name: '小明'
      }
    },

    border: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    handleViewCat() {
      wx.navigateTo({
        url: '/page/cat/detail?id=' + this.properties.options._id,
      })
    },

    handleLongPress() {
      this.triggerEvent('long', this.properties.options)
    }
  }
})