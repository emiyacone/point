const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sijilongitude:'',
    sijilatitude: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    user_phone: "",
    password:'',
    mhide: false,
    thide: true,
    time: 10,
    lbcolor: '#EBEBEB',
    tbcolor: '#EBEBEB',
    message: '获取验证码',
    phone:'',
    password:'',
    time:0
  },
getphone:function(e){
  this.setData({
    phone: e.detail.value
  })
  //  wx.setStorageSync('phone',e.detail.value)
},
  getpassword: function (e) {
    this.setData({
      password: e.detail.value
    })
    // wx.setStorageSync('password', e.detail.value)
  },
  timecount: function () {
    if (this.data.tbcolor == '#9ac81f') {
      this.countdown();
      this.setData({
        mhide: true,
        thide: false,
        tbcolor: '#EBEBEB',
      })

    }
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var openid;
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log('授权成功success')
              // // 可以将 res 发送给后台解码出 unionId
              // this.globalData.userInfo = res.userInfo

              // // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // // 所以此处加入 callback 以防止这种情况
              // if (this.userInfoReadyCallback) {
              //   this.userInfoReadyCallback(res)
              // }
              wx.login({
                success: function (res) {
                  console.log(res)
                  if (res.code) {
                    //获取openId
                    wx.cloud.callFunction({
                      name: 'login',
                      data: {},
                      complete: res => {
                        console.log('callFunction test result: ', res)
                        var openid = res.result.openid;
                        wx.setStorageSync('openid', res.result.openid)
                        wx.request({
                          url: 'https://dianzichuxings.aptdev.cn/dact.aspx?act=autologin&openid=' + openid,
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
                                url: '../driver/indexpage/indexpage'
                              })
                            }
                            else {
                              wx.showToast({
                                title: '用户',
                              })
                            }
                          }
                        })
                      },
                    })
                  }
                }
              });
            }
          })
        } else {
          // 未授权，跳转到授权页面
          wx.reLaunch({
            url: '/pages/sq/sq',
          })
        }
      }
    })
  
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindGetUserInfo: function (e) {
    var that = this
    var uname=this.data.phone;
    var upass = this.data.password;
    var openid1 = wx.getStorageSync('openid');
    wx.request({
      url: 'https://dianzichuxings.aptdev.cn/dact.aspx?act=loginbyuname&uname=' + uname + '&upass=' + upass + '&openid=' + openid1,
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
            url: '../driver/indexpage/indexpage'
          })
        }
        else {
          wx.showToast({
            title: '用户或密码错误',
          })
        }
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
    // if (e.detail.userInfo) {
    //   //用户按了允许授权按钮
    //   that.getuser()
    //   // that.rootsu()
    //   wx.navigateTo({
    //     url: '../../driver/indexpage/indexpage'
    //   })
    // } else {
    //   //用户按了拒绝按钮
    //   that.showshow()
    // }
    // var that = this
    // //从数据库获取用户信息
    // wx.getUserInfo({
    //   withCredentials: true,
    //   lang: 'zh',
    //   success: function (res) {
    //     console.log('千呼万唤的用户信息', res)
    //     //存到缓存里。
    //     wx.setStorageSync('userdata', res.userInfo)
    //     // that.authorization()
    //   },
    //   fail: function (res) { },
    //   complete: function (res) { },
    // })
  },
  // 用户未授权的弹窗
  showshow: function () {
    var that = this
    wx.showModal({
      title: '友情提示',
      content: '请点击授权，方便我们对您更好的服务',
      showCancel: false,
      confirmText: '返回授权',
      success: function (res) {
        // if (res.confirm) {
        //   console.log('用户点击了“返回授权”')
        //   that.showset()
        // }
      }
    })
  },
  changetopage: function (e) {
    console.log(e)
    // var phonenumber=this.data.user_phone
    // wx.redirectTo({
    //   url: '../zuche/special?user_phone='+phonenumber,
    // })
  },
  // sendtosignin: function () {
  //   wx.navigateTo({
  //     url: '../login/signin/signin',
  //   })
    // var openid = wx.getStorageSync('openid');
    // var phone=wx.getStorageSync('phone');
    // var password = wx.getStorageSync('password');
    // wx.request({
    //   url: 'http://xx.xx.xx//xact.aspx?act=qylogin&openid='+openid+'&uname='+phone+'&upass=' + password,
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log(res.data)
    //     code=res.data.code;
    //     if(code==1)
    //     {
         
    //     }
    //     else{
    //       wx.showToast({
    //         title: '登录失败',
    //       })
    //     }
       
    //   }
    // })
   
  // }
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})