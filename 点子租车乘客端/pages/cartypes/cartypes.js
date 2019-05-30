// pages/cartypes/cartypes.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['专车', '自驾出租', '大巴'],
    currentTab: 0,
    name: '',
    cartypes: [],

  },

  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      specialcarhide: false,
      messagehide: true,
      closehide: true,
      timehide: true,
      endtophide: false,
      ncolor: 'black',
      fcolor: 'grey',
      messageendheight: 80,
      futuresethide: true,
      maphides: false,
      carhide: true,
    })
  },
  //跳转到商务车
  tobusinesscar: function (e) {
    var cars=this.data.cartypes;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    var id = e.target.id;
    var name = this.data.name;
    console.log(id)
    prevPage.setData({
      x: id,
      carhide: false,
      cartypes: cars
    })
    wx.navigateBack({
      url: "/pages/zuche/special?id" + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var id=parseInt(options.id);
    var that = this;
    var token = wx.getStorageSync('token');
    var zclx = id + 1;
    var name = options.name;
    switch (name) {
      case 'zhuan': {
        that.setData({
          currentTab: 0
        })
      }; break;
      case 'zijia': {
        that.setData({
          currentTab: 1
        })
      }; break;
      case 'daba': {
        that.setData({
          currentTab: 2
        })
      }; break;
    }
    wx.request({
      url: 'https://dianzichuxings.aptdev.cn/xact.aspx?act=hqcxx&token=' + token + '&zclx=' + zclx,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.cxs);
        var carlist = res.data.cxs;
        console.log(carlist);
        that.setData({
          cartypes: carlist,
          name: options.name,
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