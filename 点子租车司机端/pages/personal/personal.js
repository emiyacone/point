// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success(res) {
        console.log(res);
        that.setData({
          userInfo: res.userInfo
        })
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
  personal:function(){
    wx.navigateTo({
      url: 'personmessage/psm'
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
  share: function () {
    wx.navigateTo({
      url: '../share/share'
    })
  },
  product: function () {
    wx.navigateTo({
      url: 'product/productmanage'
    })
  }
})