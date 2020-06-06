/**
 * 控制器：上传类
 * 版本：v0.0.1
 */
const regeneratorRuntime = require("../../runtime")
const $ = require('../request')
const {
  _options
} = require('../request')
const qiniuOptions = _options.qiniu
const qiniu = require('../../../util/qiniu.min')

let lastToken = ''
const Upload = {
  async getUploadToken() {
    return $._get('upload/token', {})
  },

  async uploadImg(file) {
    if (!file) return
    let token = lastToken
    if (!token) token = (await this.getUploadToken()).data
    console.log({
      ...qiniuOptions,
      key: (new Date()).valueOf() + '.jpg',
      uptoken: token,
    })
    return new Promise(async (resolve) => {
      qiniu.upload(file, (res) => {
        console.log('一张照片上传成功！')
        resolve(res)
      }, (error) => {
        resolve(false)
      }, {
        ...qiniuOptions,
        key: (new Date()).valueOf() + '.jpg',
        uptoken: token,
      }, (res) => {
        console.log('上传进度', res.progress)
      })
    })
  },

  async uploadList(imgarr) {
    let arr = imgarr
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].includes('https://')) { //是现成的网络图片，无需上传
        newArr.push(arr[i])
      } else { //本地图片，需要上传
        let res = await this.uploadImg(arr[i])
        if (res.imageURL) {
          newArr.push('https://' + res.imageURL)
        }
      }
    }
    return newArr.length ? newArr : false
  },
}

module.exports = Upload