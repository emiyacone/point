// pages/driver/indexpage/indexpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ordernum: 2,
    servicescore: '080',
    items: [
      {
        id: 0,
        titlehide: false,
        futurehide: true,
        time: '12:00',
        titlecolor: '#9ac81f',
        state: '最近',
        startplace: '某某区一二三四路物流大厦',
        endplace: '某某区七八九路',
      },
      {
        id: 1,
        titlehide: false,
        futurehide: true,
        time: '2016年10月18日',
        titlecolor: '#4570D2',
        state: '最近',
        startplace: '某某区一二三四路物流大厦',
        endplace: '某某区七八九路',
      },
      {
        id: 2,
        titlehide: false,
        futurehide: true,
        time: '14:00',
        titlecolor: '#4570D2',
        state: '最近',
        startplace: '某某区一二三四路物流大厦',
        endplace: '某某区七八九路',
      },
      {
        id: 3,
        titlehide: false,
        futurehide: true,
        time: '19:00',
        titlecolor: '#4570D2',
        state: '最近',
        startplace: '某某区一二三四路物流大厦',
        endplace: '某某区七八九路',
      },
      {
        id: 4,
        titlehide: false,
        futurehide: true,
        time: '20:00',
        titlecolor: '#4570D2',
        state: '最近',
        startplace: '某某区一二三四路物流大厦',
        endplace: '某某区七八九路',
      },
    ]
  },
  dispatch: function () {
    wx.navigateTo({
      url: '../dispatch/dispatch'
    })
  },

  gettowork: function () {
    console.log('开始派单')
  },
  todetail: function (e) {
    console.log(e);
    var itemid = e.currentTarget.id;
    wx.navigateTo({
      url: '../index/index?itemid=' + itemid,
    })
  },
  persontab: function () {
    wx.navigateTo({
      url: '../../personal/personal'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      middleheight: 300,
      success: function (res) {
        console.log('getSystemInfo');
        console.log(res.windowWidth);
        console.log(res.windowHeight);
        that.setData({
          middleheight: res.windowHeight - 185,
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

  }
})