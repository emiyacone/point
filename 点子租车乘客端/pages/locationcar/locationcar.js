// pages/locationcar/locationcar.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
arrivetime:'15分钟'
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      startplacead: options.startplacead,
      endplacead: options.endplacead,
    });
    console.log(options.startplacead);
    console.log(options.endplacead);
    this.mapCtx = wx.createMapContext("map4select");
    var that = this;
    // 获取定位，并把位置标示出来
    app.getLocationInfo(function (locationInfo) {
      console.log('map', locationInfo);
      that.setData({
        longitude: locationInfo.longitude
        , latitude: locationInfo.latitude
        , markers: [
          {
            id: 0
            , iconPath: "../images/ic_location.png"
            , longitude: locationInfo.longitude
            , latitude: locationInfo.latitude
            , width: 30
            , height: 30
            ,
            callout: {
              content: '等待司机赶来',
              color: '#000000',
              fontSize: 15,
              borderRadius: 10,
              padding: 10,
              display: 'ALWAYS',
            }
          }
        ]
      })
    })

    //set the width and height
    // 动态设置map的宽和高
    wx.getSystemInfo({
      success: function (res) {
        console.log('getSystemInfo');
        console.log(res.windowWidth);
        console.log(res.windowHeight);
        that.setData({
          map_width: res.windowWidth,
          map_height: res.windowHeight-100,
          icontop: res.windowHeight * 0.60,
          controls: [//{
            // id: 1,
            //   iconPath: '../images/ic_location.png',
            //   position: {
            //     left: res.windowWidth / 2 - 8,
            //     top: res.windowWidth / 2 - 16,
            //     width: 20,
            //     height: 20
            //   },
            //   clickable: true
            // },
            // {
            //   id: 2,
            //   iconPath: '../../images/location.png',
            //   position: {
            //     left: res.windowWidth / 2 + 130,
            //     top: res.windowWidth / 2 + 90,
            //     width: 40,
            //     height: 40
            //   },
            //   clickable: true
            // }
          ]
        })
      }
    })
  },

  returnback: function () {

    this.mapCtx.moveToLocation();
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