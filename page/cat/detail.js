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

const dic = {
  id: '',
  name: {
    title: '大名',
  },
  nickname: {
    title: '昵称',
    format: e => e || '-'
  },
  color: {
    title: '毛色'
  },
  male: {
    title: '性别',
    format: e => e ? '男孩' : '女孩'
  },
  status: {
    title: '状态'
  },
  sterilization: {
    title: '是否绝育',
    format: e => e ? '已绝育' : '未绝育'
  },
  sterilizationDate: {
    title: '绝育日期',
    format: e => e ? dateFormat("YYYY-mm-dd", new Date(e * 1000)) : '-'
  },
  character: {
    title: '性格'
  },
  firstMeetTime: {
    title: '初次见面'
  },
  relationship: {
    title: '猫际关系'
  },
}

Page({
  data: {
    cat: {},
    catInfo: [],
    catExtraImages: []
  },

  async onLoad(e) {
    if (e.id) {
      this.setData({
        id: e.id
      })
      $._showLoading()
      await this.getCurrentCat()
      $._hideLoading()
    }
  },

  onShareAppMessage() {
    return {
      title: this.data.cat.name,
      imageUrl: this.data.cat.photo[0],
      path: '/page/cat/detail?id=' + this.data.id
    }
  },

  async getCurrentCat() {
    let res = await Api.Cat.get(this.data.id)
    if (res && res.code == 200 && typeof res.data === 'object') {
      // 获取到猫咪信息，开始格式化
      let cat = res.data,
        catInfo = []
      for (let key in cat) {
        if (dic[key] && dic[key]['title'] !== undefined) {
          catInfo.push({
            key: dic[key]['title'],
            value: dic[key]['format'] ? dic[key]['format'].call(this, cat[key]) : cat[key]
          })
        }
      }
      this.setData({
        cat,
        catInfo,
        catExtraImages: cat.photo instanceof Array && cat.photo.length > 1 ? cat.photo.slice(1) : []
      })
    }
  },

  handleViewAnother(e) {
    wx.navigateTo({
      url: '/page/cat/detail?id=' + e.currentTarget.dataset.cat._id,
    })
  }
})