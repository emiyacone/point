// pages/paymoney/paymoney.js
var amapFile = require('../../utils/amap-wx.js');//如：..­/..­/libs/amap-wx.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startplacead: '',
    endplacead: '',
    total: 13,
    changetitle: '前排乘客请系好安全带',
    price: 13,
    maphide: false,
    hiddenmodalput: true,
    icontop: 400,
    personrole: '普通会员',
    map_width: 380,
    map_height: 500,
  },
clickorder:function(){
  var startplaceadd = this.data.startplacead;
  var endplaceadd = this.data.endplacead;
  wx.redirectTo({
    url: '../journey/endjourney/endjourney?startplacead=' + startplaceadd + '&endplacead=' + endplaceadd
  });
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
        console.log(res.windowHeight * 0.9);
        that.setData({
          map_width: res.windowWidth,
          map_height: res.windowHeight,
          icontop: res.windowHeight * 0.47,
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
    var key = 'ded1cf8579e9605e133cd05667777497';
    var myAmapFun = new amapFile.AMapWX({ key: 'ded1cf8579e9605e133cd05667777497' });
    myAmapFun.getDrivingRoute({
      origin: that.data.startplacead,
      destination: that.data.endplacead,
      success: function (data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        that.setData({
          polyline: [{
            points: points,
            color: "#999999",
            width: 6
          }]
        });
        if (data.paths[0] && data.paths[0].distance) {
          that.setData({
            distance: data.paths[0].distance + '米'
          });
        }
        if (data.taxi_cost) {
          that.setData({
            cost: '打车约' + parseInt(data.taxi_cost) + '元'
          });
        }

      },
      fail: function (info) {

      }
    })
  },
  //取消定单
  // cancelorder: function () {
  //   this.setData({
  //     maphide: true,
  //     hiddenmodalput: false,
  //   })
  // },
  // //取消按钮
  // cancel: function () {
  //   this.setData({
  //     hiddenmodalput: true,
  //     maphide: false,

  //     messagehide: false,
  //     closehide: true,
  //     timehide: false,
  //     endtophide: false,

  //   });
  // },
  // //确认
  // confirm: function () {
  //   this.setData({
  //     hiddenmodalput: true,
  //     maphide: false,

  //     messagehide: false,
  //     closehide: true,
  //     timehide: false,
  //     endtophide: false,
  //   })
  // },
  // 
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