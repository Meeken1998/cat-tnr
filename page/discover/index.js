import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
const regeneratorRuntime = require("../../util/runtime.js")
const $ = require('../../util/api/request')
const Api = require('../../util/api/index')
const App = getApp()
Page({
  data: {
    isContributorShow: false
  },

  onShow() {
    const role = wx.getStorageSync('user')
    this.setData({
      hasPermission: role && role.permission instanceof Array && role.permission.includes('cat:editor'),
      hasArticlePermission: role && role.permission instanceof Array && role.permission.includes('article:editor')
    })
  },

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
        icon: 'plus-circle',
        handle: this.handleAddCatClick
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
    wx.removeStorageSync('cats')
    wx.chooseImage({
      success: res => {
        const files = res.tempFilePaths
        console.log(files)
        wx.uploadFile({
          filePath: files[0],
          name: 'image',
          url: 'http://39.98.214.108:5000/recognize',
          success: async result => {
            let data = JSON.parse(result.data)
            data = data.data
            let cats = await Api.Cat.getRecognizeCats(data)
            console.log(cats)
            wx.setStorageSync('cats', cats.data)
            wx.navigateTo({
              url: '/page/camera/index',
            })
          }
        })
      }
    })

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
  },

  onShareAppMessage() {
    return {
      imageUrl: 'https://img.meek3n.cn/mew.jpeg',
      title: '发现浙外猫咪图鉴',
    }
  },

  handleViewContributor() {
    this.setData({
      isContributorShow: true
    })
  },

  handleDialogClose() {
    this.setData({
      isContributorShow: false
    })
  },

  handleCopyRepoUrl() {
    wx.setClipboardData({
      data: 'wow',
    })
    this.setData({
      isContributorShow: false
    })
  },

  handleAddCatClick() {
    if (!this.data.hasPermission) {
      wx.showModal({
        cancelColor: 'cancelColor',
        title: 'ops！',
        content: '似乎你还不是猫咪板块管理员，暂时只有管理员才能编辑猫咪图鉴~',
        confirmText: '加入我们',
        cancelText: '再想想',
        success: (e) => {
          if (e.confirm) this.handleJoinUs()
        }
      })
    } else {
      wx.navigateTo({
        url: '/page/manage/index',
      })
    }
  },

  handleManageArticle() {
    if (!this.data.hasPermission) {
      wx.showModal({
        cancelColor: 'cancelColor',
        title: 'ops！',
        content: '似乎你还不是文章板块管理员，暂时只有管理员才能编辑猫咪图鉴~',
        confirmText: '加入我们',
        cancelText: '再想想',
        success: (e) => {
          if (e.confirm) this.handleJoinUs()
        }
      })
    } else {
      wx.navigateTo({
        url: '/page/article/index',
      })
    }
  }


})