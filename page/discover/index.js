import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';

Page({
  handleMenuButtonClick(e) {
    const target = e.detail
    const menuList = [{
        title: '拍照识猫',
        icon: 'instagram',
        handle: this.handleUploadImage
      },
      {
        title: '猫咪 SOS',
        icon: 'alert',
        handle: this.handleTips
      },
      {
        title: '扫描名牌',
        icon: 'scan',
        handle: this.handleTips
      },
      {
        title: '管理文章',
        icon: 'edit'
      },
      {
        title: '添加猫咪',
        icon: 'plus-circle'
      },
      {
        title: '加入我们',
        icon: 'heart',
        handle: this.handleJoinUs
      },
      {
        title: '公众号',
        icon: 'wechat-fill'
      },
    ]

    const targetItem = menuList.filter(item => item.icon == target.icon)
    targetItem.length && targetItem[0].handle && targetItem[0].handle.call(this)
  },

  handleUploadImage() {
    console.log(1)
  },

  handleTips() {
    Notify({
      background: '#608fda',
      message: '即将上线，敬请期待',
      duration: 1000
    })
  },

  handleCopyWechatId() {
    wx.setClipboardData({
      data: 'wwwTongErCom',
    })
  },

  handleJoinUs() {
    wx.pageScrollTo({
      selector: '#join'
    })
  }
})