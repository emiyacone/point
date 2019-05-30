var app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onAuth() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
              console.log(res.authSetting)
              wx.reLaunch({
                url: '../index/index',
              })
        }
      }
    })
  }
})