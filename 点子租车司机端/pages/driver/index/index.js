var amapFile = require('../../../utils/amap-wx.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemid:0,
    ischose:'none',
    choosehide:'',
    maphide:false,
    display: '',
    timehide:true,
    buttonmess:'出发接人',
    endtop:10,
    endheight:200,
    rewardme:'你已行驶500km，请及时保养',
    timelimit:'4分30秒内',
  startplace:'某某区一二三四路物流大厦',
  endplace:'某某区七八九路',
  name:'李先生',
  phonenumber:'138****1453',
  introduce:'打车多，履约多',
  map_width: 380,
  map_height: 500,
  icontop:0,
  items:[],
    polyline: []
  },
  phonekh:function(){
    var phonenumber=this.data.phonenumber
    wx.makePhoneCall({
      phoneNumber: phonenumber,
    })
  },
  yeschose:function(){
    this.setData({
      ischose:'none',
      maphide: false
    })
    var itemid=this.data.itemid
    console.log(itemid)
    var token = wx.getStorageSync('token')
    wx.request({
      url: 'https://dianzichuxings.aptdev.cn/dact.aspx?act=qdjdd&oid=' + itemid+'&token=' + token,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })
  },
  nochose:function(){
    wx.navigateTo({
      url: '../dispatch/dispatch',
    })
    var itemid = this.data.itemid
    var token = wx.getStorageSync('token')
    wx.request({
      url: 'https://dianzichuxings.aptdev.cn/dact.aspx?act=qxjdd&oid=' + itemid + '&token=' + token,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })
  },
  xianjin:function(){
    this.setData({
      display: 'none',
      choosehide: 'none',
      maphide: false
    })
    wx.showToast({
      title: '订单完成',
    })
    wx.reLaunch({
      url: '../indexpage/indexpage',
    })
  },
  choosepaway:function(){
    this.setData({
      display: 'none',
      choosehide:'block',
      maphide: true
    })
  },
changetitle:function(){
  var itemid = this.data.itemid
  var token = wx.getStorageSync('token')
  var that=this
  wx.request({
    url: 'https://dianzichuxings.aptdev.cn/dact.aspx?act=getmyordone&oid=' + itemid +'&token=' + token,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      console.log(res.data);
    }
  })
  if (that.data.buttonmess == '出发接人')
  {
    wx.request({
      url: 'https://dianzichuxings.aptdev.cn/dact.aspx?act=qdjgkk&oid=' + itemid +'&token='+ token,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        if(res.data.code==1)
        {
          that.setData({
            timehide: false,
            buttonmess: '到达上车地点',
          })
        }
      }
    })
  
  }else if(that.data.buttonmess=='到达上车地点')
{
          that.setData({
            timehide: true,
            buttonmess: '已到达 等候乘客上车',
            endheight: that.data.endheight - 80,
            endtop: that.data.endtop + 30,
          })
     
  
}
else if (that.data.buttonmess == '已到达 等候乘客上车')
{
  that.setData({
    timehide: true,
    buttonmess: '乘客上车 行程开始',
  })
}
else if (that.data.buttonmess == '乘客上车 行程开始') {
    wx.request({
      url: 'https://dianzichuxings.aptdev.cn/dact.aspx?act=yjdkh&oid=' + itemid + '&token=' + token,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        if (res.data.code == 1) {
          that.setData({
            timehide: true,
            buttonmess: '到达目的地',
          })
        }
      }
    })

}

else if (that.data.buttonmess == '到达目的地') {
    wx.request({
      url: 'https://dianzichuxings.aptdev.cn/dact.aspx?act=wcdd&oid=' + itemid + '&token=' + token,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        if (res.data.code == 1) {
          that.setData({
            display: "block",
            maphide: true
          })
        }
      }
    })
  this.setData({
    display: "block",
    maphide:true
  })
}
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var itemid=parseInt(options.itemid)
    this.setData({
      itemid: itemid
    })
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
            , iconPath: "../../images/ic_location.png"
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
          map_height: res.windowHeight*0.40,
          icontop: res.windowHeight * 0.30,
          controls: [
          ]
        })
      }
    })
    var token = wx.getStorageSync('token')
    var that = this;
    wx.request({
      url: 'https://dianzichuxings.aptdev.cn/dact.aspx?act=getmyordone&oid=' + itemid + '&token=' + token,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        var startplace = res.data.omod.from_dz;
        var endplace = res.data.omod.to_dz;
        var name = res.data.omod.unc;
        var phonenumber = res.data.omod.phone_num;
        var key = 'ded1cf8579e9605e133cd05667777497';
        var ostate = res.data.omod.ostate;
        var from_x = res.data.omod.from_x;
        var from_y = res.data.omod.from_y;
        var to_x = res.data.omod.to_x;
        var to_y = res.data.omod.to_y;
        var origin = from_y+ ',' + from_x;
        var destination = to_y + ',' + to_x;
        if(ostate==0){origin
          that.setData({
            ischose: 'block',
            maphide: true,

          });
        }
        else if (ostate == 3){
          that.setData({
            timehide: true,
            buttonmess: '已到达 等候乘客上车',
            endheight: that.data.endheight - 80,
            endtop: that.data.endtop + 30,
          })
        }
        else if (ostate == 4) {
          that.setData({
            timehide: true,
            buttonmess: '到达目的地',
          })
        }
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
              startplace:startplace,
              endplace:endplace,
              phonenumber:phonenumber,
              name:name,
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