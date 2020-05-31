const regeneratorRuntime = require("../../util/runtime.js")
const $ = require('../../util/api/request')
const Api = require('../../util/api/index')
const App = getApp()

Page({
  data: {
    list: null,
    search: '',
    searchList: [],
    option1: [{
        text: '全部毛色',
        value: '全部毛色'
      },
      {
        text: '三花/玳瑁',
        value: '三花/玳瑁'
      },
      {
        text: '狸花',
        value: '狸花'
      },
      {
        text: '橘色',
        value: '橘色'
      },
      {
        text: '奶牛',
        value: '奶牛'
      },
      {
        text: '纯色',
        value: '纯色'
      },
    ],
    option2: [{
        text: '全部性格',
        value: '全部性格'
      },
      {
        text: '亲人',
        value: '亲人'
      },
      {
        text: '怕生',
        value: '怕生'
      },
      {
        text: '怕人',
        value: '怕人'
      },
    ],
    option3: [{
        text: '全部状态',
        value: '全部状态'
      },
      {
        text: '在校',
        value: '在校'
      },
      {
        text: '毕业',
        value: '毕业'
      },
      {
        text: '休学',
        value: '休学'
      },
      {
        text: '喵星',
        value: '喵星'
      },
    ],
    value1: '全部毛色',
    value2: '全部性格',
    value3: '全部状态'
  },

  handleSearch(e) {
    this.setData({
      search: e.detail
    })
    this.getSearchList()
  },

  async onPullDownRefresh() {
    await this.getCatList()
    wx.stopPullDownRefresh({})
  },

  async onShow() {
    await this.getCatList()
  },


  async getCatList() {
    let res = await Api.Cat.list()
    if (res.code == 200) {
      this.setData({
        list: res.data
      })
    }
  },

  getSearchList() {
    let catList = this.data.list
    let searchList = catList.filter(item => ((this.data.value1 == '全部毛色' || item.color == this.data.value1) && (this.data.value2 == '全部性格' || item.character == this.data.value2) && (this.data.value3 == '全部状态' || item.status == this.data.value3) && (!this.data.search || JSON.stringify(item).includes(this.data.search))))
    this.setData({
      searchList
    })
  },

  handleDropMenuChange(e) {
    let data = this.data
    data[e.currentTarget.dataset.k] = e.detail
    this.setData(data)
    this.getSearchList()
  },

  handleClearSearch() {
    this.setData({
      search: '',
      value1: '全部毛色',
      value2: '全部性格',
      value3: '全部状态'
    })
    this.getSearchList()
  }
})