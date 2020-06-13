const regeneratorRuntime = require("../../util/runtime.js")
const $ = require('../../util/api/request')
const Api = require('../../util/api/index')
const App = getApp()

function dateFormat(fmt, date) {
  let ret
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString() // 秒
  }
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    }
  }
  return fmt
}

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
    relations: '',
    uploading: false
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
    if (!this.checkInput()) return
    const imageList = this.data.fileList.map(item => item.path)
    try {
      $._showLoading('图片上传中')
      this.setData({
        uploading: true
      })
      let uploadRes = await Api.Upload.uploadList(imageList)
      $._hideLoading()
      if (!uploadRes) {
        wx.showToast({
          title: '图片上传失败，请联系管理员',
          icon: 'none'
        })
        return
      }
      let cat = {
        name: this.data.name,
        nickname: this.data.nickname,
        color: this.data.colorList[this.data.colorIndex],
        male: !this.data.maleIndex,
        status: this.data.statusList[this.data.statusIndex],
        sterilization: !!this.data.sterilizationIndex,
        sterilizationDate: !this.data.sterilizationIndex ? 0 : parseInt(new Date(this.data.sterilizationDate).valueOf() / 1000),
        character: this.data.characterList[this.data.characterIndex],
        firstMeetTime: this.data.firstMeetTime,
        relationship: this.data.relationship,
        photo: uploadRes && uploadRes instanceof Array ? uploadRes : [],
        relations: this.data.relations.replace(new RegExp('，', 'g'), ',').split(','),
        timeline: []
      }
      let res
      $._showLoading('正在保存')
      if (!this.data.id) {
        res = await Api.Cat.create(cat)
      } else {
        res = await Api.Cat.update(this.data.id, Object.assign(cat, {
          _id: this.data.id
        }))
      }
      if (res.code == 200) {
        $._hideLoading()
        this.setData({
          uploading: false
        })
        wx.showModal({
          cancelColor: 'cancelColor',
          title: '温馨提示',
          content: '保存猫咪信息成功',
          showCancel: false,
          success() {
            wx.navigateBack({})
          }
        })
      }
    } catch (err) {
      $._hideLoading()
      this.setData({
        uploading: false
      })
      wx.showModal({
        cancelColor: 'cancelColor',
        title: '温馨提示',
        content: '猫咪信息保存失败，请联系管理员'
      })
    }
  },

  checkInput() {
    if (!this.data.name) {
      wx.showToast({
        title: '请输入猫咪大名',
        icon: 'none'
      })
      return false
    }
    if (!this.data.fileList.length) {
      wx.showToast({
        title: '请至少上传一张猫咪图片',
        icon: 'none'
      })
      return false
    }
    if (this.data.sterilizationIndex && (!this.data.sterilizationDate || !new Date(this.data.sterilizationDate).valueOf())) {
      wx.showToast({
        title: '请输入正确的绝育时间',
        icon: 'none'
      })
      return false
    }
    if (!this.data.firstMeetTime) {
      wx.showToast({
        title: '请输入和猫咪的初次见面时间',
        icon: 'none'
      })
      return false
    }
    if (!this.data.relationship) {
      wx.showToast({
        title: '请完善猫际关系',
        icon: 'none'
      })
      return false
    }
    return true
  },

  async onLoad(e) {
    if (e.id) {
      this.setData({
        id: e.id
      })
      await this.getCurrentCat()
    } else {
      wx.setNavigationBarTitle({
        title: '新增猫咪',
      })
    }
  },

  async getCurrentCat() {
    let id = this.data.id
    let catRes = await Api.Cat.get(id)
    if (catRes.code != 200) return
    let cat = catRes.data
    cat.maleIndex = cat.male ? 0 : 1
    cat.colorIndex = this.data.colorList.indexOf(cat.color) == -1 ? 0 : this.data.colorList.indexOf(cat.color)
    cat.statusIndex = this.data.statusList.indexOf(cat.status) == -1 ? 0 : this.data.statusList.indexOf(cat.status)
    cat.sterilizationIndex = cat.sterilization ? 1 : 0
    cat.sterilizationDate = cat.sterilizationDate == '0' ? '' : dateFormat("YYYY-mm-dd", new Date(cat.sterilizationDate * 1000))
    cat.relations = cat.relations instanceof Array && cat.relations.every(item => item.name) ? cat.relations.map(item => item.name).join('，') : ''
    cat.characterIndex = this.data.characterList.indexOf(cat.character || '亲人')
    cat.fileList = cat.photo.map(item => {
      return {
        path: item
      }
    })
    this.setData(cat)
  },

  handleDeleteImage(e) {
    let fileList = this.data.fileList
    fileList.splice(e.detail.index * 1, 1)
    this.setData({
      fileList
    })
  }
})