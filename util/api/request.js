/**
 * 请求类
 * 版本：v0.0.1
 */
const regeneratorRuntime = require("../runtime")
const authing = require('../authing/authing')
let options = {
  host: 'http://192.168.0.100:4000/api/v1/',
  header: {},
  userPoolId: '5ecb891fae9ae00850555f7b',
}
const Authing = new authing({
  userPoolId: options.userPoolId
})

let storageToken = wx.getStorageSync('_authing_token')
if (storageToken) options.header['authorization'] = 'bearer ' + storageToken

/* 封装好请求 */
const _request = function (url, method, data) {
  let result = null
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${options.host}${url}`,
      method,
      data,
      header: options.header,
      success(res) {
        if (res.data.code == 403) reject(res)
        if (res.statusCode === 200 && res.data !== undefined) {
          result = res.data
          resolve(res.data)
        } else {
          result = res.data
          reject(res)
        }
      },
      fail(err) {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        })
        reject(err)
      }
    })
  }).catch(err => {
    if (err && err.data && err.data.code == 403) {
      // 403 code 表明用户未登录或无权查看
      wx.navigateTo({
        url: '/page/login/index',
      })
    } else {
      /* 错误收集 */
      if (result && result.error && result.message) {
        wx.showModal({
          title: '温馨提示',
          content: result.message,
          showCancel: false
        })
      }
      return result
    }
  })
}

/* post 请求 */
const _post = function (url, data = {}) {
  return _request(url, 'POST', data)
}

/* get */
const _get = function (url, data = {}) {
  return _request(url, 'GET', data)
}

/* patch */
const _patch = function (url, data = {}) {
  return _request(url, 'PATCH', data)
}

/* put */
const _put = function (url, data = {}) {
  return _request(url, 'PUT', data)
}

/* delete */
const _delete = function (url, data = {}) {
  return _request(url, 'DELETE', data)
}

/* 登录服务器，换取 token，该方法不需要 token */
const _getToken = async function (code = wx.getStorageSync('loginCode').code) {
  let {
    encryptedData,
    iv
  } = wx.getStorageSync('userRes')
  let res = await _post('Login/wxApplets', {
    code,
    encryptedData,
    iv
  })
  if (res.code == 0 && res.data) {
    _setToken(res.data)
  }
  return res
}


/* 设置 token */
const _setToken = function (token = '') {
  options.header['authorization'] = 'bearer ' + token
  wx.setStorageSync('_authing_token', token)
}

/* 登录 */
const _login = function () {
  return new Promise((resolve, reject) => {
    // 登录
    wx.login({
      success: loginRes => {
        let code = loginRes.code
        wx.setStorageSync('loginCode', {
          code,
          timestamp: new Date().valueOf()
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let userInfo
        // 获取用户信息
        wx.getSetting({
          success: settingRes => {
            if (settingRes.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: userRes => {
                  // 可以将 res 发送给后台解码出 unionId
                  userInfo = userRes.userInfo
                  wx.setStorageSync('userInfo', userInfo)
                  wx.setStorageSync('userRes', userRes)
                  resolve(userInfo)
                },

                fail(userErr) {
                  //进入登录页面
                  reject({
                    msg: '获取用户资料失败',
                    err: userErr
                  })
                }
              })
            } else {
              reject({
                msg: '没有用户信息',
                err: 0
              })
            }
          },
        })
      },

      fail: err => {
        reject({
          msg: '未授权登录',
          err
        })
      }
    })
  })
}

const _showLoading = function (text = '') {
  wx.showLoading({
    title: text,
  })
}

const _hideLoading = function () {
  wx.hideLoading({})
}

const _download = function (url) {
  return new Promise(resolve => {
    wx.downloadFile({
      url: `${options.host}${url}`,
      header: options.header,
      success: res => {
        if (res.tempFilePath) {
          resolve(res.tempFilePath)
        } else {
          resolve('')
        }
      }
    })
  })
}

const _loginWithAuthing = async function () {
  const code = wx.getStorageSync('loginCode').code
  const userInfo = wx.getStorageSync('userInfo')
  let authRes = await Authing.loginWithWxapp({
    code,
    detail: userInfo,
    overideProfile: true
  })
  return authRes
}

module.exports = {
  _post,
  _get,
  _put,
  _delete,
  _request,
  _patch,
  _login,
  _setToken,
  _getToken,
  _showLoading,
  _hideLoading,
  _download,
  _loginWithAuthing,
  _Authing: Authing
}