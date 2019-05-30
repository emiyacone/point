// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personcolor:'#fff',
    induscolor:'#fff'
  },

changecolorperson:function(){
  this.setData({
    personcolor: 'grey',
    induscolor: '#fff'
  })
},

  changecolorindus:function(){
    this.setData({
      personcolor: '#fff',
      induscolor: 'grey'
    })
  },
  
submit:function(){
  var token = wx.getStorageSync('token');
  var itemid = wx.getStorageSync('oid');
  // var itemid = 39;
  console.log(itemid);
  console.log(token);
  wx.request({
    url: 'https://dianzichuxings.aptdev.cn/xact.aspx?act=startpayord&oid=' + itemid+'&token=' + token,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      console.log(res.data);
      wx.requestPayment({
        timeStamp: res.data.timeStamp,
        nonceStr: res.data.nonceStr,
        package: res.data.package,
        signType: res.data.signType,
        paySign: res.data.paySign,
        success(res) {
          wx.showToast({
            title: '支付成功',
          })
          wx.navigateTo({
            url: '../appraise/appraise',
          })
        },
        fail(res) { }
      })
    }
  })
  

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

  }
})