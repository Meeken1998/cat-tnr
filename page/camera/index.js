Page({
  handleUpload() {
    wx.chooseImage({
      success: res => {
        const files = res.tempFilePaths
        console.log(files)
        wx.uploadFile({
          filePath: files[0],
          name: 'image',
          url: 'http://192.168.0.103:5000/recognize',
          success: fuck => {
            console.log(JSON.parse(fuck.data))
          }
        })
      }
    })
  }
})