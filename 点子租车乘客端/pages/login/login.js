const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yzm:'',
    user_phone:"",
    mhide:false,
    thide:true,
    time:30,
    lbcolor:'#EBEBEB',
    tbcolor:'#EBEBEB',
    message:'获取验证码'
  },
  changelogincolor:function(e){
    this.setData({
      yzm: e.detail.value,
    })
    console.log(e.detail.value);
    wx.setStorageSync('yzm', e.detail.value);
    this.setData({
      lbcolor: '#9ac81f'
    })
  },
changecolor:function(e){
if(e.detail.value.length==11)
{
  this.setData({
    tbcolor: '#9ac81f',
    user_phone:e.detail.value,
  })
}
},
timecount:function(){
  if (this.data.tbcolor == '#9ac81f')
  {
    this.countdown();
  this.setData({
    mhide: true,
    thide: false,
    tbcolor: '#EBEBEB',
  })
  }
  var phone=this.data.user_phone;
  var openid=wx.getStorageSync('openid');
  wx.request({
    url: 'https://dianzichuxings.aptdev.cn/xact.aspx?act=sendmsglogin&uphone=' + phone+'&openid=' + openid,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      console.log(res.data)
      var code = res.data.code;
      if (code == 1) {
        wx.showToast({
          title: '发送成功',
        })

      }
      else {
        wx.showToast({
          title: '发送失败',
        })
      }

    }
  })
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
  bindGetUserInfo:function(e){
    var openid = wx.getStorageSync('openid');
    console.log(openid);
    var yzm = wx.getStorageSync('yzm');
    console.log(yzm);
    wx.request({
      url: 'https://dianzichuxings.aptdev.cn/xact.aspx?act=phonelogin&openid=' + openid + '&yzm=' + yzm,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        var code = res.data.code;
        console.log(code);
        wx.setStorageSync('token', res.data.token);
        if (code == 1) {
          wx.showToast({
            title: '登录成功',
          })
          wx.reLaunch({
            url: '../zuche/special'
          })
        }
        else if (code == 2) {
          wx.showToast({
            title: '验证码错误',
          })
        }
        else if (code == 3) {
          wx.showToast({
            title: '该用户未注册',
          })
        }

      }
    })
  },
  changetopage:function(e){
    console.log(e)
    // var phonenumber=this.data.user_phone
    // wx.redirectTo({
    //   url: '../zuche/special?user_phone='+phonenumber,
    // })
  },
  sendtosignin:function(){
wx.navigateTo({
  url: 'signin/signin',
})
  }
})