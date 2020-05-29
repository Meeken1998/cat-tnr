Component({
  properties: {
    options: {
      type: Object,
      value: {
        cats: [{
          icon: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2247692397,1189743173&fm=5',
        }, {
          icon: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1569462993,172008204&fm=5'
        }, {
          icon: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1917461690,696184102&fm=5'
        }, {
          icon: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2247692397,1189743173&fm=5',
        }, {
          icon: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1569462993,172008204&fm=5'
        }, {
          icon: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1917461690,696184102&fm=5'
        }, {
          icon: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2247692397,1189743173&fm=5',
        }, {
          icon: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1569462993,172008204&fm=5'
        }, {
          icon: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1917461690,696184102&fm=5'
        }]
      }
    }
  },

  methods: {
    handle2CatPage() {
      wx.switchTab({
        url: '/page/cat/index',
      })
    }
  }
})