// pages/personal/product/productmanage.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
  items:[
    {
      "id":0,
      "totalheight":120,
      "backgroundcolor":"white",
      "name": "黄金",
      "nameweight": 100,
      "nameprice": 308,
      "tipshow":true,
    }
  ],
  sellpros: [
    {
      "id": 0,
      "name": "白金",
      "price": 208,
    }
  ]
  },
clickme:function(e){
  var index = e.currentTarget.dataset.id;
  console.log(index);
  var tipshow = 'items[' + index + '].tipshow';
  var totalheight = 'items[' + index + '].totalheight';
  var backgroundcolor = 'items[' + index + '].backgroundcolor';
  if (this.data.items[index].backgroundcolor == '#EBEBEB' || color =='#EBEBEB')
  {
    this.setData({
      [tipshow]: true,
      [totalheight]: 120,
      [backgroundcolor]: "white"
    })
    let color='white'
  }
  else{
    this.setData({
      [tipshow]: false,
      [totalheight]: 150,
      [backgroundcolor]: "#EBEBEB"
    })
    var color = '#EBEBEB';
  }
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