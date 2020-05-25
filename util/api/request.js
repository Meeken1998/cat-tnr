/**
 * 请求类
 * 版本：v0.0.1
 */

let options = {
  host: 'http://localhost:4000/api/',
  header: {}
}

let storageToken = wx.getStorageSync('token')
if (storageToken) options.header['Authorization'] = 'BASE-AUTH ' + storageToken

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
        if (res.statusCode === 200 && res.data) {
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
      if (!wx.getStorageSync('token')) {
        // 从未登录或清除了缓存，先保存页面路由信息，再强制跳转到登录页面
        wx.setStorageSync('pageInfo', getCurrentPages())
        wx.reLaunch({
          url: '/pages/login/index',
        })
      } else {
        // 曾经登录过，却因为 token 过期鉴权失败，则普通跳转即可
        wx.removeStorageSync('pagesInfo') // 清除路由信息
        wx.navigateTo({
          url: '/pages/login/index',
        })
      }
    } else {
      /* 错误收集 */
      if (result && result.msg) {
        wx.showModal({
          title: '温馨提示',
          content: result.msg,
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
  options.header['Authorization'] = 'BASE-AUTH ' + token
  wx.setStorageSync('token', token)
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
  _download
}