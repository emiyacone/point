// pages/test/test.js
var amapFile = require('../../utils/amap-wx.js');//如：..­/..­/libs/amap-wx.js
Page({
  data: {
    // markers: [{
    //   iconPath: "../images/startplace.png",
    //   id: 0,
    //   latitude: 39.989643,
    //   longitude: 116.481028,
    //   width: 23,
    //   height: 33
    // }, {
    //   iconPath: "../images/toplace.png",
    //   id: 0,
    //   latitude: 39.90816,
    //   longitude: 116.434446,
    //   width: 24,
    //   height: 34
    // }],
    distance: '',
    cost: '',
    polyline: []
  },
  onLoad: function () {  
    var that = this;
    var key = 'ded1cf8579e9605e133cd05667777497';
    var myAmapFun = new amapFile.AMapWX({ key:      'ded1cf8579e9605e133cd05667777497' });
     myAmapFun.getDrivingRoute({
       origin: '119.40186276184082,32.3910287147365',
       destination: '119.41882689422604,32.389593820033724',
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
            color: "#0091ff",
            width: 6
          }]
        });
        // if (data.paths[0] && data.paths[0].distance) {
        //   that.setData({
        //     distance: data.paths[0].distance + '米'
        //   });
        // }
        // if (data.taxi_cost) {
        //   that.setData({
        //     cost: '打车约' + parseInt(data.taxi_cost) + '元'
        //   });
        // }

      },
      fail: function (info) {

      }
    })
  },
  goDetail: function () {
    wx.navigateTo({
      url: '../navigation_car_detail/navigation'
    })
  },
  goToCar: function (e) {
    wx.redirectTo({
      url: '../navigation_car/navigation'
    })
  },
  goToBus: function (e) {
    wx.redirectTo({
      url: '../navigation_bus/navigation'
    })
  },
  goToRide: function (e) {
    wx.redirectTo({
      url: '../navigation_ride/navigation'
    })
  },
  goToWalk: function (e) {
    wx.redirectTo({
      url: '../navigation_walk/navigation'
    })
  }
})