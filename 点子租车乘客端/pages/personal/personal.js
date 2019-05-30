// pages/personal/personal.js
Page({
  data: {
    userInfo: [],
    uzy:'',
    age:'',
    uname:'',
    usex:'',
    utx:'',
    utype:0,
    uphone:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getUserInfo({
      success(res) {
        console.log(res);
        wx.setStorageSync('userdata', res.userInfo );
        that.setData({
          userInfo: res.userInfo
        })
      }
    })

    var token = wx.getStorageSync('token');
    wx.request({
      url: 'https://dianzichuxings.aptdev.cn/xact.aspx?act=getumess&token=' + token,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        wx.setStorageSync('uphone', res.data.uphone);
        wx.setStorageSync('utype', res.data.utype);
        var uphone = (res.data.uphone).substring(0, 3) + "***" + (res.data.uphone).substring(6, 10)
        that.setData({
          uphone: uphone,
          utype: res.data.utype
        })
      }
    });
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

  share: function () {
    console.log("1")
    wx.showShareMenu();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("fenxiangsue")
    let that = this;
    return {
      title: '点子出行', // 转发后 所显示的title
      path: '/pages/index/index', // 相对的路径
      success: (res) => {    // 成功后要做的事情
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  },
  personal:function(){
    wx.navigateTo({
      url: 'showmessage/showmessage'
    })
  },
  myway:function(){
    wx.navigateTo({
      url: 'myway/myway'
    })
  },
  mymoney: function () {
    wx.navigateTo({
      url: 'mymoney/mymoney'
    })
  },
  mymessage: function () {
    wx.navigateTo({
      url: 'mymessage/mymessage'
    })
  },
  setto: function () {
    wx.navigateTo({
      url: 'set/set'
    })
  },
  service: function () {
    wx.navigateTo({
      url: 'service/service'
    })
  },

  product: function () {
    wx.navigateTo({
      url: 'product/productmanage'
    })
  }
})