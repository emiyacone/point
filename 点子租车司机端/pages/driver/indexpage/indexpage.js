// pages/driver/indexpage/indexpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    ordernum:2,
  servicescore: '080',
    maxid:0,
  items:[
    // {
    //   id:0,
    //   titlehide:false,
    //   futurehide:true,
    //   time:'12:00',
    //   titlecolor:'#9ac81f',
    //   state:'最近',
    //   startplace:'某某区一二三四路物流大厦',
    //   endplace:'某某区七八九路',
    // },
    //     {
    //       id: 1,
    //   titlehide: true,
    //   futurehide: false,
    //   time: '16:00',
    //   titlecolor: '#4570D2',
    //   state: '预约',
    //   startplace: '某某区一二三四路物流大厦',
    //   endplace: '某某区七八九路',
    // },
    //     {
    //       id: 2,
    //       titlehide: true,
    //       futurehide: false,
    //       time: '14:00',
    //       titlecolor: '#4570D2',
    //       state: '预约',
    //       startplace: '某某区一二三四路物流大厦',
    //       endplace: '某某区七八九路',
    //     },
    //     {
    //       id: 3,
    //       titlehide: true,
    //       futurehide: false,
    //       time: '19:00',
    //       titlecolor: '#4570D2',
    //       state: '预约',
    //       startplace: '某某区一二三四路物流大厦',
    //       endplace: '某某区七八九路',
    //     },
    //     {
    //       id: 4,
    //       titlehide: true,
    //       futurehide: false,
    //       time: '20:00',
    //       titlecolor: '#4570D2',
    //       state: '预约',
    //       startplace: '某某区一二三四路物流大厦',
    //       endplace: '某某区七八九路',
    //     },
  ]
  },
  dispatch:function(){
    wx.navigateTo({
      url: '../dispatch/dispatch'
    })
  },

  gettowork: function () {
    var that=this;
  console.log('开始派单')
  var token=wx.getStorageSync('token')
  wx.request({
    url: 'https://dianzichuxings.aptdev.cn/dact.aspx?act=startjd&token=' + token,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      console.log(res.data)
      that.countdown();
   

    }
  })
},

todetail:function(e){
  console.log(e);
  var itemid=e.currentTarget.id;
  var items=this.data.items;
  wx.navigateTo({
    url: '../index/index?itemid=' + itemid,
  })
},



  //判断司机是否登录
countdown: function () {   
    var token = wx.getStorageSync('token');
    var that = this;
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        console.log('success');
        console.log(res)
        var sijilongitude = res.longitude;
        var sijilatitude = res.latitude;
        var maxid=that.data.maxid;
        wx.request({
          url: 'https://dianzichuxings.aptdev.cn/dact.aspx?act=jding&&maxid='+maxid+'&gps_x=' + sijilatitude + '&gps_y=' + sijilongitude + '&token=' + token,
          header: {
            'content-type': 'application/json'  // 默认值
          },
          success(res) {
            console.log(res.data);
            that.setData({
              maxid:res.data.mynmaxid
            })
            console.log(res.data.hasneword);
            if (res.data.hasneword==true)
            {
              wx.request({
                url: 'https://dianzichuxings.aptdev.cn/dact.aspx?act=getmyording&token=' + token,
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success(res) {
                  console.log(res.data)
                  that.setData({
                    items: res.data.olist
                })
                }
              })
            }
            if(res.data.code==-1)
            {
            clearTimeout(timecount) 
            }
          }
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
    
    var timecount = setTimeout(function () {
      that.countdown();
    }, 5000)
  },

persontab:function(){
  wx.navigateTo({
    url: '../../personal/personal'
  })
},

  toallorders:function(){
    wx.navigateTo({
      url: '../allorders/allorders'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var token = wx.getStorageSync('token');
    wx.getSystemInfo({
      middleheight:300,
      success: function (res) {
        console.log('getSystemInfo');
        console.log(res.windowWidth);
        console.log(res.windowHeight );
        that.setData({
          middleheight: res.windowHeight -185,
        })
      }
    })
    wx.request({
      url: 'https://dianzichuxings.aptdev.cn/dact.aspx?act=getmyording&token=' + token,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          items: res.data.olist
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