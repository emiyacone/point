var amapFile = require('../../utils/amap-wx.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oid:0,
    arrivetime: '15分钟',
    time:0,
    sjd:0
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  routegh:function(){
    var second=this.data.time;
    var oid=this.data.oid;
    var token = wx.getStorageSync('token');
    var that=this;
    wx.request({
      url: 'https://dianzichuxings.aptdev.cn/xact.aspx?act=getordzb&oid=' + oid + '&token=' + token,
      header: {
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        console.log(res.data);
        var length = (res.data.zbs).length;
        if (res.data.abs)
        {
        var sjd = parseInt(res.data.zbs[0].sj);
        for (var i = 0; i < length; i++) {
          if (parseInt(res.data.zbs[i].sj) > sjd) {
            sjd = parseInt(res.data.zbs[i].sj);
          }
        }
        console.log(sjd)
        // that.setData({
        //   sjd: parseInt(sjd)
        // })
        wx.request({
          url: 'https://dianzichuxings.aptdev.cn/xact.aspx?act=getordzb&oid=' + oid + '&sjd=' + sjd + '&token=' + token,
          header: {
            'content-type': 'application/json'  // 默认值
          },
          success(res) {
            console.log(res.data);
           
          }
        })
      }
      }
    })
    

    var timecount = setTimeout(function () {
      that.setData({
        time: second + 1
      });
      that.routegh();
    }
      , 1000)
  },
  onLoad: function (options) {
    var token=wx.getStorageSync('token');
    var oid=parseInt(options.oid);
    this.mapCtx = wx.createMapContext("map4select");
    var that = this;
    that.setData(
      {
        oid: oid
      }
    )
    that.routegh();
    
   
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
            // ,
            // callout: {
            //   content: '',
            //   color: '#000000',
            //   fontSize: 15,
            //   borderRadius: 10,
            //   padding: 10,
            //   display: 'ALWAYS',
            // }
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
          map_height: res.windowHeight - 100,
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
    var origin = wx.getStorageSync('orgin');
    var destination = wx.getStorageSync('destination')
    var key = 'ded1cf8579e9605e133cd05667777497';
    var myAmapFun = new amapFile.AMapWX({ key: key });
    myAmapFun.getDrivingRoute({
      origin: origin,
      destination: destination,
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
          // startplace: startplace,
          // endplace: endplace,
          // phonenumber: phonenumber,
          // name: name,
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
        });
      },
      fail: function (info) {
        console.log(info);
      }
    })
    this.sijicount();
  },
//计时是否完成
  sijicount: function () {
    var startplaceadd = this.data.startplace;
    var endplaceadd = this.data.endplace;
    var token = wx.getStorageSync('token');
    var that = this;
    var oid = this.data.oid;
    var second = that.data.time;
    console.log(second);
    wx.request({
      url: 'https://dianzichuxings.aptdev.cn/xact.aspx?act=chkordpd&oid=' + oid + '&token=' + token,
      header: {
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        console.log(res.data);
        var ostate = parseInt(res.data.ostate);
        if (ostate == 5) {
          clearTimeout(timecount);
          wx.navigateTo({
            url: '../journey/endjourney/endjourney',
          })
        }
      }
    })
    var timecount = setTimeout(function () {
      that.setData({
        time: second + 1
      });
      that.sijicount();
    }, 1000)
  },

  returnback: function () {

    this.mapCtx.moveToLocation();
  },

  //计时器
  countdown: function () {
    var startplaceadd = this.data.startplace;
    var endplaceadd = this.data.endplace;
    var that = this
    var second = that.data.time
    console.log(second)
    if (second == 3) {
      wx.navigateTo({
        url: '../journey/endjourney/endjourney',
      })
    

    }
    if (second ==5 ) {
      return 1;
    }

    var timecount = setTimeout(function () {
      that.setData({
        time: second + 1
      });
      that.countdown();
    }
      , 1000)
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