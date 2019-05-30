//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  common:function(){
    
    wx.navigateTo({
      url: '../login/login'
    })
  },
  special:function(){
    wx.navigateTo({
      url: '../special/special'
    })
  },
  getopenid:function(){
      var that=this;
    console.log('suucess')
    // var getInfo = function (thisObj) {
      // var that = thisObj;
      wx.login({
        success: function (res) {
          if (res.code) {
            //获取openId
            wx.cloud.callFunction({
              name: 'login',
              data: {},
              complete: res => {
                console.log('callFunction test result: ', res)
                var openid = res.result.openid;
                wx.setStorageSync('openid', res.result.openid)
                wx.getUserInfo({
                  success: res => {
                    console.log('授权成功success')
                    wx.request({
                      url: 'https://dianzichuxings.aptdev.cn/xact.aspx?act=autologin&openid=' + openid,
                      header: {
                        'content-type': 'application/json' // 默认值
                      },
                      success(res) {
                        console.log(res.data)
                        wx.setStorageSync('token', res.data.token)
                        var code = res.data.code;
                        if (code == 1) {
                          wx.showToast({
                            title: '登录成功',
                          })
                          wx.reLaunch({
                            url: '../zuche/special'
                          })
                        }
                        else {
                          wx.showToast({
                            title: '用户未登录',
                          })
                        }
                      }
                    })
                  }
                })
              },
            })
          }
        }
      });
    // } 
  },
  onLoad: function (options) {
    var openid1=wx.getStorageSync('openid');
    console.log(openid1)
    var key=options.key;
    this.getopenid();
    if(key)
    {
      this.getopenid();
     return;
    }
    console.log(openid1);
    wx.getSetting({
      success: res => {
        console.log(res);
        if ((res.authSetting['scope.userInfo'] != undefined)&& (res.authSetting['scope.userInfo'] == true) ) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          this.getopenid();
        } else {
          // 未授权，跳转到授权页面
          wx.reLaunch({
            url: '/pages/sq/sq',
          })
        }
      }
    })
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
