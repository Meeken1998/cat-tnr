/**
 * 控制器：猫
 * 版本：v0.0.1
 */
const regeneratorRuntime = require("../../runtime")
const $ = require('../request')
const Cat = {
  async helloWorld() {
    return $._get('', {})
  },

  async create(options = {}) {
    /*     const cat = Object.assign(options, {
          name: '小明', // 猫咪名称
          nickname: '大叔猫', // 昵称
          color: '橘色', // 花色
          male: true, // 性别
          status: '在校', // 状态
          sterilization: true, // 是否绝育
          sterilizationDate: parseInt(new Date('2020-05-12').valueOf() / 1000), // 绝育时间
          character: '亲人可抱', // 性格
          firstMeetTime: '2019-10-01', // 初次见面时间
          relationship: '性格高冷的橘色猫咪，但是对混熟的人异常亲近。', // 猫际关系
          relations: [], // 关联猫咪
          timeline: [], // 时间线
          photo: ['http://hbimg.b0.upaiyun.com/e676be21d9ee538a7ab5cbdabbfc58685e025de067e7-5oPNs2_fw658'], // 图片
        }) */
    let res = await $._post('cat', options)
    return res
  },

  async list() {
    let res = await $._get(`cat`, {})
    return res
  },

  async get(id = '') {
    let res = await $._get(`cat/${id}`, {})
    return res
  },

  async update(id = '', options = {}) {
    let res = await $._put(`cat/${id}`, options)
    return res
  },

  async delete(id = '') {
    let res = await $._delete(`cat/${id}`, {})
    return res
  }
}

module.exports = Cat