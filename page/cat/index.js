Page({
  data: {
    search: '',
    option1: [{
        text: '全部毛色',
        value: 0
      },
      {
        text: '橘色',
        value: 1
      },
      {
        text: '狸花',
        value: 2
      },
    ],
    option2: [{
        text: '全部性格',
        value: 'a'
      },
      {
        text: '亲人可抱',
        value: 'b'
      },
      {
        text: '随机亲人',
        value: 'c'
      },
      {
        text: '怕人',
        value: 'd'
      },
    ],
    option3: [{
        text: '全部状态',
        value: 'a0'
      },
      {
        text: '在校',
        value: 'b'
      },
      {
        text: '毕业',
        value: 'c'
      },
      {
        text: '休学',
        value: 'd'
      },
      {
        text: '喵星',
        value: 'e'
      },
    ],
    value1: 0,
    value2: 'a',
    value3: 'a0'
  },

  handleSearch(e) {
    console.log(e)
  },

  onPullDownRefresh() {
    
  }
})