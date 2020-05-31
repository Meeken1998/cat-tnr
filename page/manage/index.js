Page({
  data: {
    name: '',
    nickname: '',
    color: '',
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
  }
})