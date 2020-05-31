const regeneratorRuntime = require("../../util/runtime.js")
const $ = require('../../util/api/request')
const Api = require('../../util/api/index')
const App = getApp()

Page({
  data: {
    fileList: [],
    name: '',
    nickname: '',
    color: '',
    colorList: ['纯色', '狸花', '橘色', '奶牛', '三花/玳瑁'],
    colorIndex: 0,
    male: '',
    maleList: ['男孩', '女孩'],
    maleIndex: 0,
    status: '',
    statusList: ['在校', '休学', '毕业', '喵星'],
    statusIndex: 0,
    sterilization: '',
    sterilizationList: ['未绝育', '已绝育'],
    sterilizationIndex: 0,
    sterilizationDate: '',
    character: '',
    characterList: ['亲人', '怕生', '怕人'],
    characterIndex: 0,
    firstMeetTime: '',
    relationship: '',
  },

  handleValueChange(e) {
    const key = e.currentTarget.dataset.t
    let data = this.data
    data[key] = e.detail
    this.setData(data)
  },

  handlePickerChange(e) {
    const key = e.currentTarget.dataset.t
    let data = this.data
    data[key + 'Index'] = e.detail.value * 1
    this.setData(data)
  },

  handleAfterRead(e) {
    const {
      file
    } = e.detail
    const {
      fileList = []
    } = this.data
    fileList.push({
      ...file
    })
    this.setData({
      fileList
    })
  },

  async handlePublish() {
    const imageList = this.data.fileList.map(item => item.path)
    try {
      $._showLoading('图片上传中')
      let uploadRes = await Api.Upload.uploadList(imageList)
      let cat = {
        name: this.data.name,
        nickname: this.data.nickname,
        color: this.data.colorList[this.data.colorIndex],
        male: !this.data.maleIndex,
        status: this.data.statusList[this.data.statusIndex],
        sterilization: !!this.data.sterilizationIndex,
        sterilizationDate: !this.data.sterilizationIndex ? 0 : new Date(this.data.sterilizationDate).valueOf(),
        character: this.data.characterList[this.data.characterIndex],
        firstMeetTime: this.data.firstMeetTime,
        relationship: this.data.relationship,
        photo: uploadRes && uploadRes instanceof Array ? uploadRes : [],
        relations: [],
        timeline: []
      }
      let res = await Api.Cat.create(cat)
      if (res.code == 200) {
        wx.showModal({
          cancelColor: 'cancelColor',
          title: '温馨提示',
          content: '保存猫咪信息成功'
        })
      }
    } catch (err) {
      $._hideLoading()
      wx.showModal({
        cancelColor: 'cancelColor',
        title: '温馨提示',
        content: '猫咪信息保存失败，请联系管理员'
      })
    }


  }
})