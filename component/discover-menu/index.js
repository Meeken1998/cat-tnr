Component({
  data: {
    menuList: [{
        title: '拍照识猫',
        icon: 'instagram',
      },
      {
        title: '添加文章',
        icon: 'edit'
      },
      {
        title: '添加猫咪',
        icon: 'plus-circle'
      },
      {
        title: '申请加入',
        icon: 'heart'
      },
      {
        title: '公众号',
        icon: 'wechat-fill'
      },
      {
        title: '猫咪 SOS',
        icon: 'alert',
        disabled: true
      },
      {
        title: '扫描名牌',
        icon: 'scan',
        disabled: true
      },

    ]
  },

  methods: {
    handleClick(e) {
      wx.vibrateShort({})
      this.triggerEvent('click', e.currentTarget.dataset.t)
    }
  }
})