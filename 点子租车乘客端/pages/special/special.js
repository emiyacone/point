const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_phone: "",
    password:'',
    mhide: false,
    thide: true,
    time: 10,
    lbcolor: '#EBEBEB',
    tbcolor: '#EBEBEB',
    message: '获取验证码'
  },
getphone:function(e){
   wx.setStorageSync('phone',e.detail.value)
},
  getpassword: function (e) {
    wx.setStorageSync('password', e.detail.value)
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
  countdown: function () {
    var that = this
    var second = that.data.time
    console.log(second)
    if (second == 0) {
      // console.log("Time Out...");
      that.setData({
        mhide: false,
        thide: true,
      });
      return;
    }
    var timecount = setTimeout(function () {
      that.setData({
        time: second - 1
      });
      that.countdown();
    }
      , 1000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token=wx.getStorageSync('token');
    wx.request({
      url: 'https://dianzichuxings.aptdev.cn/xact.aspx?act=getumess&token=' + token,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
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
    this.sendtosignin();
  },
  
  changetopage: function (e) {
    console.log(e)
    // var phonenumber=this.data.user_phone
    // wx.redirectTo({
    //   url: '../zuche/special?user_phone='+phonenumber,
    // })
  },
  sendtosignin: function () {
    var openid = wx.getStorageSync('openid');
    var phone=wx.getStorageSync('phone');
    var password = wx.getStorageSync('password');
    wx.request({
      url: 'https://dianzichuxings.aptdev.cn/xact.aspx?act=qyuserlogin&openid='+openid+'&uname='+phone+'&upass=' + password,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        wx.setStorageSync('token', res.data.token)
        var code=res.data.code;
        if(code==1)
        {
          wx.reLaunch({
            url: '../zuche/special',
          })
        }
        else{
          wx.showToast({
            title: '登录失败',
          })
        }
       
      }
    })
   
  }
})