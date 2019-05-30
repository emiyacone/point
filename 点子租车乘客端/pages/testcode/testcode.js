// pages/testcode/testcode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1_focus: true,
    value2_focus: false,
    value3_focus: false,
    value4_focus: false,
    time:50,
    timehide:false,
    drawhide:true,
  max:1,
  value1:0,
  value2: 0,
  value3: 0,
  value4: 0,
  },
nexttip:function(){
  var openid = wx.getStorageSync('openid');
  var value1=this.data.value1;
  var value2 = this.data.value2;
  var value3 = this.data.value3;
  var value4 = this.data.value4;
  var yzm = value1 + value2 + value3 + value4;
  console.log(yzm);
  wx.request({
    url: 'https://dianzichuxings.aptdev.cn/xact.aspx?act=phonereg&openid=' + openid + '&yzm=' + yzm,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      console.log(res.data)
      var code = res.data.code;
      console.log(res.data)
      wx.setStorageSync('token', res.data.token)
      if (code == 1) {
        wx.showToast({
          title: '注册成功',
        })
        wx.navigateTo({
          url: '../zuche/special'
        })
      }
      else if (code == 2) {
        wx.showToast({
          title: '验证码错误',
        })
        wx.navigateBack({
        })
      }
    }
  })

},
  testnum: function () {
    var phonenumber = parseInt(this.data.phonenumber)
    wx.request({
      url: 'test.php', //仅为示例，并非真实的接口地址
      data: {
        phonenumber
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this. countdown();
  },
  //验证码测试
  //第一位验证码
  hidetime1:function(e){
    var that=this;
    var value1= e.detail.value;
    var value2=this.data.value2;
    var value3= this.data.value3;
    var value4= this.data.value4;
    if (value1.length == 1) {
      that.setData({
        value1_focus: false,
        value2_focus: true,
        value3_focus: false,
        value4_focus: false,
      })
    }
    this.setData({
      value1: value1
    });
    if (value1.length == 1 && value1 == 1 && value2 == 1 && value3 == 1 && value4 == 1)
     {
       this.setData({
         timehide: true,
         drawhide: false,
       });
     }
  },
//第二位验证码
  hidetime2: function (e) {
    var that = this;
    var value1 = this.data.value1;
    var value2 = e.detail.value;
    var value3 = this.data.value3;
    var value4 = this.data.value4;
    if (value2.length == 1) {
      that.setData({
        value1_focus: false,
        value2_focus: false,
        value3_focus: true,
        value4_focus: false,
      })
    }
    this.setData({
      value2: value2
    });
    if (value2.length == 1 && value1 == 1 && value2 == 1 && value3 == 1 && value4 == 1) {
      this.setData({
        timehide: true,
        drawhide: false,
      });
    }
  },
//第三位验证码
  hidetime3: function (e) {
    var that = this;
    var value1 = this.data.value1;
    var value2 = this.data.value2;
    var value3 = e.detail.value;
    var value4 = this.data.value4;
    this.setData({
      value3: value3
    });
    if (value3.length == 1) {
      that.setData({
        value1_focus: false,
        value2_focus: false,
        value3_focus: false,
        value4_focus: true,
      })
    }
    if (value3.length == 1 && value1 == 1 && value2 == 1 && value3 == 1 && value4 == 1) {
      this.setData({
        timehide: true,
        drawhide: false,
      });
    }
  },
//第四位验证码
  hidetime4: function (e) {
    var value1 = this.data.value1;
    var value2 = this.data.value2;
    var value3 = this.data.value3;
    var value4 = e.detail.value;
    this.setData({
      value4: value4
    });
    if (value4.length == 1 && value1 == 1 && value2 == 1 && value3 == 1 && value4 == 1) {
      this.setData({
        timehide: true,
        drawhide: false,
      });
    }
  },

//焦点离开
cancel1:function(e){
  var value1 = e.detail.value;
  var value2 = this.data.value2;
  var value3 = this.data.value3;
  var value4 = this.data.value4;
  this.setData({
    value4: value4
  });
  if (value1.length == 0|| value1 != 1 || value2 != 1 || value3 != 1 || value4 != 1) {
    this.setData({
      timehide: false,
      drawhide: true,
    });
  }
},

cancel2: function (e) {
  var value1 = this.data.value1;
  var value2 = e.detail.value;
  var value3 = this.data.value3;
  var value4 = this.data.value4;
  this.setData({
    value4: value4
  });
  if (value2.length == 0 || value1 != 1 || value2 != 1 || value3 != 1 || value4 != 1) {
    this.setData({
      timehide: false,
      drawhide: true,
    });
  }
},

cancel3: function (e) {
  var value1 = this.data.value1;
  var value2 = this.data.value2;
  var value3 = e.detail.value;
  var value4 = this.data.value4;
  this.setData({
    value4: value4
  });
  if (value3.length == 0 || value1 != 1 || value2 != 1 || value3 != 1 || value4 != 1) {
    this.setData({
      timehide: false,
      drawhide: true,
    });
  }
},

cancel4: function (e) {
  var value1 = this.data.value1;
  var value2 = this.data.value2;
  var value3 = this.data.value3;
  var value4 = e.detail.value;
  this.setData({
    value4: value4
  });
  if (value4.length == 0 || value1 != 1 || value2 != 1 || value3 != 1 || value4 != 1) {
    this.setData({
      timehide: false,
      drawhide: true,
    });
  }
},


  countdown:function () {
    var that=this
    var second = that.data.time
    // console.log(second)
 if (second == 0) {
      // console.log("Time Out...");
      that.setData({
        time: "Time Out..."
      });
      return;
    }
 var timecount = setTimeout(function(){
      that.setData({
        time: second - 1
      });
     that.countdown();
    }
      , 1000)
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
  
  }
})