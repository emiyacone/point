// pages/driver/setdata/setdata.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personimagehide: true,
    personimagehid:false,
   personimageurl:null,

   personseimagehide: true,
   personseimagehid: false,
   personseimageurl: null,

   thhide: true,
   thhid: false,
   thurl: null,

     fohide: true,
   fohid: false,
   fourl: null,

   fivehide: true,
   fivehid: false,
   fiveurl: null,

   sihide: true,
   sihid: false,
   siurl: null,
    topcolorfi:' #9ac81f',
  topcolorse: 'black',
  topcolorth: 'black',
  topcolorfo: 'black',
  colorfi: ' #9ac81f',
  colorse: 'grey',
  colorth: 'grey',
  colorfo: 'grey',
  firsthid:false,
  secondhid:true,
  thirdhid:true,
  fourhid:true,
  },

nexttip:function(){
this.setData({
  topcolorfi: 'black ',
  topcolorse: '#9ac81f',
  topcolorth: 'black',
  topcolorfo: 'black',
  colorfi: 'grey',
  colorse: '#9ac81f',
  colorth: 'grey',
  colorfo: 'grey',
  firsthid: true,
  secondhid: false,
  thirdhid: true,
  fourhid: true,
})
},
nexttipse: function () {
  this.setData({
    topcolorfi: 'black ',
    topcolorse: 'black',
    topcolorth: '#9ac81f',
    topcolorfo: 'black',
    colorfi: 'grey',
    colorse: 'grey',
    colorth: '#9ac81f',
    colorfo: 'grey',
    firsthid: true,
    secondhid: true,
    thirdhid: false,
    fourhid: true,
  })
},
  nexttipses: function () {
    this.setData({
      topcolorfi: 'black ',
      topcolorse: 'black',
      topcolorth: '#9ac81f',
      topcolorfo: 'black',
      colorfi: 'grey',
      colorse: 'grey',
      colorth: '#9ac81f',
      colorfo: 'grey',
      firsthid: true,
      secondhid: true,
      thirdhid: true,
      fourhid: false,
    })
  },
  toindex:function(){
   wx.reLaunch({
    
     url: '../indexpage/indexpage',
   })
  },
//
getpersonimage:function(){
  var that = this;
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths
      that.setData({
        //将临时变量赋值给已经在data中定义好的变量
        personimageurl: tempFilePaths,
        personimagehide: false,
        personimagehid: true,
      })
      console.log(res)
    }
  })
},
//
getpersonseimage: function () {
  var that = this;
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths
      that.setData({
        //将临时变量赋值给已经在data中定义好的变量
        personseimageurl: tempFilePaths,
        personseimagehide: false,
        personseimagehid: true,
      })
      console.log(res)
    }
  })
},
//
getimageth: function () {
  var that = this;
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths
      that.setData({
        //将临时变量赋值给已经在data中定义好的变量
        thurl: tempFilePaths,
        thhide: false,
        thhid: true,
      })
      console.log(res)
    }
  })
},
//
getimagefo: function () {
  var that = this;
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths
      that.setData({
        //将临时变量赋值给已经在data中定义好的变量
        fourl: tempFilePaths,
        fohide: false,
        fohid: true,
      })
      console.log(res)
    }
  })
},
getimagefi: function () {
  var that = this;
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths
      that.setData({
        //将临时变量赋值给已经在data中定义好的变量
        fiveurl: tempFilePaths,
        fivehide: false,
        fivehid: true,
      })
      console.log(res)
    }
  })
},
getimagesi: function () {
  var that = this;
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths
      that.setData({
        //将临时变量赋值给已经在data中定义好的变量
        siurl: tempFilePaths,
        sihide: false,
        sihid: true,
      })
      console.log(res)
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