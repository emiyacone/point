// pages/driverme/driverme.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    inserttype:'',
    jia:'',
   drivename:'',
   xin:'',
   ming:'',
   idcard:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  inserttype: function (e) {
    console.log(e.detail.value);
    this.setData({
      type: e.detail.value
    })

  },
  insertxin:function(e){
      console.log(e.detail.value);
      this.setData({
        xin:e.detail.value
      })
    
  },
  insertjia: function (e) {
    console.log(e.detail.value);
    this.setData({
      jia: e.detail.value
    })

  },
  insertming: function (e) {
    console.log(e.detail.value);
    this.setData({
      ming: e.detail.value
    })
  },
  insertcard:function(e){
    console.log(e.detail.value);
    this.setData({
      idcard: e.detail.value
    })
  },
  inputphone:function(){
    console.log(e.detail.value);
    this.setData({
      phone: e.detail.value
    })
  },
cutcard:function(idcard){
  var length = idcard.length;
  var cardnumber = idcard.substring(0, 3) + '*****' + idcard.substring(length - 4, length);
  return cardnumber;
},

  savemessage:function(){
    var xin=this.data.xin;
    var ming=this.data.ming;
    var name=xin+ming;
    var idcard=this.data.idcard;
    var cardnumber=this.cutcard(idcard);
    console.log(cardnumber);
    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
   let prePage=pages[pages.length-2]
    var list = prePage.data.items;
    var isuser=0;
    for(var i=0;i<list.length;i++)
    {
      if(list[i].cardnumber==cardnumber)
      {
        isuser=1;
      }
    }
    if (name != '' && cardnumber != ''&&isuser==0) {
      var userjson = {
        name: name,
        cardnumber: cardnumber,
      }
      list.push(userjson);
      prePage.setData({
        items: list
      })
    }
    else {
      wx.showToast({
        title: '请输入信息',
        icon: 'fail'
      })
    }
   
   console.log(prePage.data.items)
     wx.navigateBack({
       success(res){
         console.log('success');
         console.log(xin);
       }
     })
     var jznum=this.data.jia;
     var type=this.data.type;
     var phone=this.data.phone;
     var token=wx.getStorageSync('token');
    wx.request({
      url: 'https://dianzichuxings.aptdev.cn/xact.aspx?act=scjsyxx&jznum=' + jznum + '&sfznum=' + idcard + '&sjnum=' + phone+'&xm='+name+'&jzlx='+type+'&token='+token,
      header: {
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        console.log(res.data);
      }
        })
      
    //    url:'/pages/cartypetest/cartypetest?name='+xin+ming+'&idcard='+idcard
    //  })
  },
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