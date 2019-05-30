var app = getApp();
var amapFile = require('../../utils/amap-wx.js');
var dateTimePicker = require('../../utils/dateTimePicker.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ygjg:0,
    cursor:0,
    personsn:[1,2,3,4],
    typecar:null,
    oid:0,
    rs:0,
    cxs:[],
    d_gps_x: 31.97958,
    d_gps_y: 120.89371,
    endlongitude: '',
    endlatitude: '',
    startlongitude:'',
    startlatitude:'',
    inputvalue: '',
    timehide: false,
    timeshow: true,
    timehide1: false,
    timeshow1: true,
    startcolor: '#e0e3da',
    endcolor: '#e0e3da',
    peoplenumcolor: '#e0e3da',
    tmecolor: '#e0e3da',
    spreakingAnimation: {},
    num: 0,
    startdate: '',
    enddate: '',
    date: '2018年10月01日',
    time: '12:00',
    startYear: 2000,
    endYear: 2050,
    dateTime1: null,
    dateTimeArray1: null,
    dateTime2: null,
    dateTimeArray2: null,
    dateTime3: null,
    dateTimeArray3: null,
    carhide: true,
    hiddenmodalput: true,
    id: 0,
    x: 0,
    regionstart: '中山市',
    regionend: '中山市',
    startplace: '您到哪儿上车',
    endplace: '您到哪儿下车',
    personnumber: '出行人数',
    timeso: '出行时间',
    navbar: ['专车', '自驾出租', '大巴'],
    carname: '丰田卡罗拉',
    carcolor:'白色',
    currentTab: 0,
    time: 1,
    licencetitle: '予A-12345',
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    cartypes: [{
        "url": "../images/GL8.jpg",
        "typename": "别克GL8",
        "tendto": "tobusinesscar",
        "seatnumber": 5,
      },
      {
        "url": "../images/GL82.jpg",
        "typename": "别克GL8",
        "tendto": "tobusinesscar",
        "seatnumber": 5,
      },
      {
        "url": "../images/GL84.jpg",
        "typename": "别克GL8商务车",
        "tendto": "tobusinesscar",
        "seatnumber": 5,
      },
      {
        "url": "../images/GL83.jpg",
        "typename": "别克商务车",
        "tendto": "tobusinesscar",
        "seatnumber": 5,
      },
      {
        "url": "../images/aodiA6.jpg",
        "typename": "奥迪A6",
        "tendto": "tobusinesscar",
        "seatnumber": 5,
      },
      {
        "url": "../images/benchiV260.jpg",
        "typename": "奔驰V260",
        "tendto": "tobusinesscar",
        "seatnumber": 5,
      },
      {
        "url": "../images/benchiS600.jpg",
        "typename": "奔驰S600",
        "tendto": "tobusinesscar",
        "seatnumber": 5,
      },
    ],
    scartypes: [{
        "url": "../images/pscar.png",
        "typename": "客货二用车",
        "tendto": "tobusinesscar",
      },
      {
        "url": "../images/moodcar.png",
        "typename": "货车",
        "tendto": "tobusinesscar",
      },
    ],
    tcartypes: [{
        "url": "../images/savecar.png",
        "typename": "救护车",
        "tendto": "tobusinesscar",
      },
      {
        "url": "../images/takecar.png",
        "typename": "吊车",
        "tendto": "tobusinesscar",
      },
      {
        "url": "../images/roadmashine.png",
        "typename": "压路机",
        "tendto": "tobusinesscar",
      },
      {
        "url": "../images/pushmashine.png",
        "typename": "挖掘机",
        "tendto": "tobusinesscar",
      },
      {
        "url": "../images/popcar.png",
        "typename": "铲车",
        "tendto": "tobusinesscar",
      },
      {
        "url": "../images/tocar.png",
        "typename": "拖车",
        "tendto": "tobusinesscar",
      },
    ]
  },

  getnowc:function(e){
   console.log(e);
    var index = e.detail.value;
    var personsn=this.data.personsn;
    var rs = parseInt(personsn[index]);
   this.setData({
      peoplenumcolor: '#000',
     rs: rs,
     personnumber:rs

   })
  },
  zijiachuzu: function() {
    var dateTimeArray2 = this.data.dateTimeArray2;
    var dateTime2 = this.data.dateTime2;
    var year2 = dateTimeArray2[0][dateTime2[0]];
    var month2= dateTimeArray2[1][dateTime2[1]];
    var day2 = dateTimeArray2[2][dateTime2[2]];
    var hour2 = dateTimeArray2[3][dateTime2[3]];
    var second2 = dateTimeArray2[4][dateTime2[4]];
    var dateTimeArray3 = this.data.dateTimeArray3;
    var dateTime3 = this.data.dateTime3;
    var year3 = dateTimeArray3[0][dateTime3[0]];
    var month3 = dateTimeArray3[1][dateTime3[1]];
    var day3 = dateTimeArray3[2][dateTime3[2]];
    var hour3 = dateTimeArray3[3][dateTime3[3]];
    var second3 = dateTimeArray3[4][dateTime3[4]];
    var sdate = year2 + '-' + month2 + '-' + day2 + ' ' + hour2 + ':' + second2;
    var ddate = year3 + '-' + month3 + '-' + day3 + ' ' + hour3 + ':' + second3;
    var regionstart=this.data.regionstart;
    var regionend = this.data.regionend;
    var typecar=this.data.typecar;
    if(this.num_date()==1){
      if (typecar == null) {
        wx.showToast({
          title: '请选择租车类型',
          icon: 'none'
        })
      }
      else {
        var ddjg = typecar.ddjg;
        var gljg = typecar.gljg;
        var typeid = typecar.id;
        var timg = typecar.timg;
        var cartypename = typecar.cartypename;
        wx.navigateTo({
          url: '../cartypetest/cartypetest?ddjg=' + ddjg + '&gljg=' + gljg + '&typeid=' + typeid + '&sdate=' + sdate + '&ddate=' + ddate + '&regionstart=' + regionstart + '&regionend=' + regionend + '&timg=' + timg + '&cartypename=' + cartypename
        })

      }
    }
    
 
  },

  confirm: function() {
    this.setData({
      hiddenmodalput: true,
    });
  },
  cancel: function() {
    var token=wx.getStorageSync('token');
    var oid=wx.getStorageSync('oid');
    var that=this;
    wx.request({
      url: 'https://dianzichuxings.aptdev.cn/xact.aspx?act=qxordd&oid='+oid+'&token=' + token,
      success: function (res) {
        console.log(res);
        if(res.data.code==1)
        {
          that.setData({
            hiddenmodalput: true,
            currentTab: 0,
            specialcarhide: false,
            messagehide: true,
            closehide: true,
            timehide: true,
            endtophide: false,
            ncolor: 'black',
            fcolor: 'grey',
            messageendheight: 80,
            futuresethide: true,
            maphides: false,
            carhide: true,
            timehide: false,
            timeshow: true,
            timehide1: false,
            timeshow1: true,
            startcolor: '#e0e3da',
            endcolor: '#e0e3da',
            peoplenumcolor: '#e0e3da',
            timecolor: '#e0e3da',
            startplace: '您到哪儿上车',
            endplace: '您到哪儿下车',
            personnumber: '出行人数',
            inputvalue: ''
          });
          wx.showToast({
            title: '订单已取消',
          })
        }
        else{
          wx.showToast({
            title: '订单取消失败',
          })
        }
       
      }
    })
   
  },
  cancelorder: function() {
    this.setData({
      hiddenmodalput: false,
    });
  },

  bindRegionChanges: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      regionstart: e.detail.value
    })
  },
  bindRegionChangek: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      regionend: e.detail.value
    })
  },
  bindDateChangestart: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startdate: e.detail.value
    })
  },
  bindDateChangeend: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      enddate: e.detail.value
    })
  },
  bindTimeChangestime: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startime: e.detail.value
    })
  },
  bindTimeChangedtime: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endtime: e.detail.value
    })
    this.num_date();
  },
  //车辆位置
  locationcar: function() {
    var d_gps_x=this.data.d_gps_x;
    var d_gps_y = this.data.d_gps_y;
    wx.openLocation({
      latitude: d_gps_x,
      longitude: d_gps_y,
    })
    // wx.navigateTo({
    //   url: '../locationcar/locationcar',
    // })
  },
  //联系客服
  contactservice: function() {
    wx.navigateTo({
      url: '../contactservice/contactsrevice',
    })
  },
  //等待派车计时器
  countdown: function() {
    var startplaceadd = this.data.startplace;
    var endplaceadd = this.data.endplace;
    var token = wx.getStorageSync('token');
    var that = this;
    var oid =this.data.oid;
    var second = that.data.time;
    console.log(second);
    wx.request({
      url: 'https://dianzichuxings.aptdev.cn/xact.aspx?act=chkordpd&oid=' + oid+'&token=' + token,
      header: {
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        console.log(res.data);
        var ostate=parseInt(res.data.ostate);
        if(ostate==1)
        {
          clearTimeout(timecount) 
          wx.setStorageSync('carnum', res.data.pdxx.carnum)
          wx.setStorageSync('carys', res.data.pdxx.carys)
          wx.setStorageSync('cartypename', res.data.pdxx.cartypename)
          wx.setStorageSync('xm', res.data.pdxx.xm)
          that.setData({
            currentTab: 4,
            carnum: res.data.pdxx.carnum,
            carcolor: res.data.pdxx.carys,
            cartypename: res.data.pdxx.cartypename,
            sjphone: res.data.pdxx.sjphone,
            d_gps_x: res.data.pdxx.d_gps_x,
            d_gps_y: res.data.pdxx.d_gps_y,
          });
          that.sijicount();
        }
        else if (ostate == 2)
        {
          clearTimeout(timecount);
        }
      }
    })

    var timecount = setTimeout(function() {
      that.setData({
        time: second + 1
      });
      that.countdown();
    }, 1000)
  },
  //找司机计时器
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
        if (ostate == 4) {
          clearTimeout(timecount);
        wx.navigateTo({
          url: '../inthejourney/inthejourney?oid='+oid,
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
  tobusinesscar: function() {
    var id = this.data.currentTab;
    var that = this;
    var token = wx.getStorageSync('token');
    var zclx = id + 1;
    var name;
    switch (id) {
      case 0:
        name = 'zhuan';
        break;
      case 1:
        name = 'zijia';
        break;
      case 2:
        name = 'daba';
        break;
    }
    wx.request({
      url: 'https://dianzichuxings.aptdev.cn/xact.aspx?act=hqcxx&token=' + token + '&zclx=' + zclx,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var carlist = res.data.cxs;
        that.setData({
          cartypes: carlist,
        })
      }
    })
    wx.navigateTo({
      url: '../cartypes/cartypes?name=' + name + '&id=' + id,
    })
  },
  topersonal: function() {
    wx.navigateTo({
      url: '../personal/personal'
    })
  },
  changestate: function() {
    var that=this;
    var token = wx.getStorageSync('token');
    var startlatitude = this.data.startlatitude;
    var startlongitude = this.data.startlongitude;
    var endlatitude = this.data.endlatitude;
    var endlongitude = this.data.endlongitude;
    var startplace=this.data.startplace;
    var endplace = this.data.endplace;
    var x=this.data.x;
    var rs=this.data.rs;
    var dateTimeArray1 = this.data.dateTimeArray1;
    var dateTime1=this.data.dateTime1;
    var year=dateTimeArray1[0][dateTime1[0]];
    var month=dateTimeArray1[1][dateTime1[1]];
    var day =dateTimeArray1[2][dateTime1[2]];
    var hour= dateTimeArray1[3][dateTime1[3]];
    var second = dateTimeArray1[4][dateTime1[4]];
    var sdate = year + '-' + month + '-' + day + ' ' + hour + ':' + second;
    console.log(sdate);
    // startplace: '您到哪儿上车',
    //   endplace: '您到哪儿下车',
    //     personnumber: '出行人数',
    //       timeso: '出行时间',
    if (startplace =='您到哪儿上车')
    {
      wx.showToast({
        title: '请输入起点',
      })
    }
    else if (endplace == '您到哪儿下车')
    {
      wx.showToast({
        title: '请输入终点',
      })
    }
    else if (rs==0)
    {
      wx.showToast({
        title: '请输入出行人数',
      })
    }
    else if (x == 0) {
      wx.showToast({
        title: '请选择租车类型',
      })
    }
    else if (sdate == '') {
      wx.showToast({
        title: '请选择出行时间',
      })
    }
    else{
      wx.request({
        url: 'https://dianzichuxings.aptdev.cn/xact.aspx?act=zczc&from_x=' + startlatitude + '&from_y=' + startlongitude + '&from_dz=' + startplace + '&to_x=' + endlatitude + '&to_y=' + endlongitude + '&to_dz=' + endplace + '&rs=' + rs + '&sdate=' + sdate + '&cartypid=' + x + '&token=' + token,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log('oid:' + res.data.oid)
          var oid = parseInt(res.data.oid)
          wx.setStorageSync('oid', res.data.oid)
          that.setData({
            oid: oid
          });
          that.setData({
            currentTab: 3,
          });
          that.countdown();
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //计算相隔天数
  // num_date: function() {
  //   var dateTimeArray3 = this.data.dateTimeArray3
  //   var dateTime3 = this.data.dateTime3
  //   var dateTimeArray2 = this.data.dateTimeArray2
  //   var dateTime2 = this.data.dateTime2
  //   var startdate = dateTimeArray2[0][dateTime2[0]] + '/' + dateTimeArray2[1][dateTime2[1]] + '/' + dateTimeArray2[2][dateTime2[2]];
  //   var startdate = startdate.replace("年","");
  //   var startdate = startdate.replace("月", "");
  //   var startdate = startdate.replace("日", "");
  //   var enddate = dateTimeArray3[0][dateTime3[0]] + '/' + dateTimeArray3[1][dateTime3[1]] + '/' + dateTimeArray3[2][dateTime3[2]];
  //   var enddate = startdate.replace("年", "");
  //   var enddate = startdate.replace("月", "");
  //   var enddate = startdate.replace("日", "");
  //   var nowdate=new Date();
  //   console.log(nowdata);
  //   var days = end_date.getTime() - start_date.getTime();
  //   var day = parseInt(days / (1000 * 60 * 60 * 24));
  //   console.log(day);
  //   if (day > 0) {
  //     this.setData({
  //       num: day
  //     })
  //     return 1;
  //   } else {
  //     wx.showToast({
  //       title: '请最少借一天，保证还车日期在借车日期之后',
  //     })
  //     this.onShow();
  //     return 0;
  //   }
  // },

//大巴订单
  changestatebus: function () {
    var that = this;
    var token = wx.getStorageSync('token');
    var startlatitude = this.data.startlatitude;
    var startlongitude = this.data.startlongitude;
    var endlatitude = this.data.endlatitude;
    var endlongitude = this.data.endlongitude;
    var startplace = this.data.startplace;
    var endplace = this.data.endplace;
    var x = this.data.x + 1;
    var rs = this.data.rs;
    var dateTimeArray1 = this.data.dateTimeArray1;
    var dateTime1 = this.data.dateTime1;
    var year = dateTimeArray1[0][dateTime1[0]];
    var month = dateTimeArray1[1][dateTime1[1]];
    var day = dateTimeArray1[2][dateTime1[2]];
    var hour = dateTimeArray1[3][dateTime1[3]];
    var second = dateTimeArray1[4][dateTime1[4]];
    var sdate = year + '-' + month + '-' + day + ' ' + hour + ':' + second;
    console.log(sdate);
    // startplace: '您到哪儿上车',
    //   endplace: '您到哪儿下车',
    //     personnumber: '出行人数',
    //       timeso: '出行时间',
    if (startplace == '您到哪儿上车') {
      wx.showToast({
        title: '请输入起点',
      })
    }
    else if (endplace == '您到哪儿下车') {
      wx.showToast({
        title: '请输入终点',
      })
    }
    else if (rs == 0) {
      wx.showToast({
        title: '请输入出行人数',
      })
    }
    else if (x == 0) {
      wx.showToast({
        title: '请选择租车类型',
      })
    }
    else if (sdate == '') {
      wx.showToast({
        title: '请选择出行时间',
      })
    }
    else {
      wx.request({
        url: 'https://dianzichuxings.aptdev.cn/xact.aspx?act=dabazc&from_x=' + startlatitude + '&from_y=' + startlongitude + '&from_dz=' + startplace + '&to_x=' + endlatitude + '&to_y=' + endlongitude + '&to_dz=' + endplace + '&rs=' + rs + '&sdate=' + sdate + '&cartypid=' + x + '&token=' + token,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log("大巴订单成功")
          console.log('oid:' + res.data.oid)
          var oid = parseInt(res.data.oid)
          wx.setStorageSync('oid', res.data.oid)
          that.setData({
            oid: oid
          });
          that.setData({
            currentTab: 3,
          });
          that.countdown();
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //计算相隔天数
  num_date: function () {
    var dateTimeArray3 = this.data.dateTimeArray3
    var dateTime3 = this.data.dateTime3
    var dateTimeArray2 = this.data.dateTimeArray2
    var dateTime2 = this.data.dateTime2
    var startdate = dateTimeArray2[0][dateTime2[0]] + '/' + dateTimeArray2[1][dateTime2[1]] + '/' + dateTimeArray2[2][dateTime2[2]];
    var enddate = dateTimeArray3[0][dateTime3[0]] + '/' + dateTimeArray3[1][dateTime3[1]] + '/' + dateTimeArray3[2][dateTime3[2]];
    startdate = startdate.replace('年','');
    startdate = startdate.replace('月', '');
    enddate = enddate.replace('年', '');
    enddate = enddate.replace('月', '');
    var start_date = new Date(startdate);
    var end_date = new Date(enddate);
    var nowdate=new Date();
    console.log(nowdate);
    var days = end_date.getTime() - start_date.getTime();
    console.log(days)
    var days2 = start_date.getTime() - nowdate.getTime();
    var days3 = parseInt(days2 / (1000 * 60 * 60 * 24));
    var day = parseInt(days / (1000 * 60 * 60 * 24));
    console.log(day);
    if (day > 0 && days3>0) {
      this.setData({
        num: day
      });
      return 1;
    } else if (days3<=0){
      wx.showModal({
        title: '提示',
        content: '请提前24小时约车',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
            console.log('用户点击取消')
          }

        }
      })
    }
    else{
      wx.showModal({
        title: '提示',
        content: '请最少借一天，保证还车日期在借车日期之后',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
            console.log('用户点击取消')
          }

        }
      })
      this.onShow()
      return 0;
    }
  },
  //出发地选
  startplace: function() {
    var that = this;
    wx.chooseLocation({
      success: function(res) {
        console.log(res)
        var startlatitude = res.latitude;
        var startlongitude = res.longitude;
        var orgin = startlongitude + ',' + startlatitude
        wx.setStorageSync('orgin', orgin)
        that.setData({
          startplace: res.name,
          startcolor: '#000',
          startlatitude: startlatitude,
          startlongitude: startlongitude
        })
      },
      fail:function(){
        wx.getSetting({
          success: function (res) {
            var statu = res.authSetting;
            if (!statu['scope.userLocation']) {
              wx.showModal({
                title: '是否授权当前位置',
                content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
                success: function (tip) {
                  if (tip.confirm) {
                    wx.openSetting({
                      success: function (data) {
                        if (data.authSetting["scope.userLocation"] === true) {
                          wx.showToast({
                            title: '授权成功',
                            icon: 'success',
                            duration: 1000
                          })
                          //授权成功之后，再调用chooseLocation选择地方
                          wx.chooseLocation({
                            success: function (res) {
                              obj.setData({
                                addr: res.address
                              })
                            },
                          })
                        } else {
                          wx.showToast({
                            title: '授权失败',
                            icon: 'success',
                            duration: 1000
                          })
                        }
                      }
                    })
                  }
                }
              })
            }
          },
          fail: function (res) {
            wx.showToast({
              title: '调用授权窗口失败',
              icon: 'success',
              duration: 1000
            })
          }
        })
      }
    })        
      
  },
  endplace: function() {
    var that = this;
    wx.chooseLocation({
      success: function(res) {
        var endlatitude = res.latitude;
        var endlongitude = res.longitude;
        var destination = endlongitude + ',' + endlatitude
        wx.setStorageSync('destination', destination)
        that.data.endlongitude = endlongitude;
        that.data.endlatitude = endlatitude;
        that.setData({
          endplace: res.name,
          endcolor: '#000',
          endlatitude: endlatitude,
          endlongitude: endlongitude
        });
      that.getdistance();
      },
    })
  },
  //开始日期
  changeDateTimeColumn2(e) {
    var arr = this.data.dateTime2,
      dateArr = this.data.dateTimeArray2;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray2: dateArr,
      dateTime2: arr,
      timehide: true,
      timeshow: false,
    });
    // this.num_date();
  },
  changeDateTime2(e) {
    this.setData({
      dateTime2: e.detail.value,
      timehide: true,
      timeshow: false
    });
  },
  //结束日期
  changeDateTimeColumn3(e) {
    var arr = this.data.dateTime3,
      dateArr = this.data.dateTimeArray3;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray3: dateArr,
      dateTime3: arr,
      timehide1: true,
      timeshow1: false,
    });
    // this.num_date();
  },
  changeDateTime3(e) {
    console.log(e.detail.value)
    this.setData({
      dateTime3: e.detail.value,
      timehide1:true,
      timeshow1:false
    });

  },

  //专车和大巴日期
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1,
      dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    console.log(arr);
    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr,
      timecolor: '#000',
      timehide: true,
      timeshow: false,
    });
  },
  changeDateTime1(e) {
    console.log(e.detail.value)
    this.setData({
      dateTime1: e.detail.value,
      timecolor: '#000',
      timehide: true,
      timeshow: false,
    });
  },


  inputget: function(e) {
    console.log(e);
    var rs =parseInt(e.detail.value);
    this.setData({
      peoplenumcolor: '#000',
      rs: rs
    })
  },

  onLoad: function(options) {
    var that=this;
    var key = 'ded1cf8579e9605e133cd05667777497';
    var myAmapFun = new amapFile.AMapWX({ key: key });
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();
    this.setData({
      dateTime1: obj1.dateTime,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime2: obj1.dateTime,
      dateTimeArray2: obj1.dateTimeArray,
      dateTime3: obj1.dateTime,
      dateTimeArray3: obj1.dateTimeArray,
    });
    var id = this.data.currentTab
    if (id == 4) {
      this.countdown();
    }
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // wx.openSetting({
          //   success(res) {
          console.log(res.authSetting)
          // res.authSetting = {
          //   "scope.userInfo": true,
          //   "scope.userLocation": true
          // }
          wx.getLocation({
            type: "gcj02",
            success: function (res) {
              var orgin = res.longitude + "," + res.latitude;
              var location ="&location=" + res.longitude + "," + res.latitude;
              wx.setStorageSync("orgin", orgin);
              console.log(location);
              myAmapFun.getRegeo({
                success: function (data) {
                  console.log(data);
                  that.setData({
                    startplace:data[0].name,
                    startlatitude: res.latitude,
                    startlongitude: res.longitude,
                    startcolor:'black',
                    longitude: res.longitude,
                    latitude: res.latitude
                  })
                  //成功回调
                },
                fail: function (info) {
                  //失败回调
                  console.log(info)
                }
              })
          
            }
            });
        }
        else {

          wx.reLaunch({
            url: '../sq/sq',
          })

        }
       
      }
    })
   
    this.getdistance();
  },
  //set the width and height
  // 动态设置map的宽和高

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var cartypes = this.data.cartypes;
    var x = this.data.x;
    console.log(cartypes + '    ' + x)
    var length = cartypes.length;
    var that = this;
    for (var i = 0; i < length; i++) {
      if (cartypes[i].id == x) {
        that.setData({
          typecar: cartypes[i]
        })
      }
    }
    this.getdistance();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //获取距离
  getdistance:function(){
    var origin = wx.getStorageSync("orgin");
    var destination = wx.getStorageSync("destination");
    console.log(destination);
    console.log(origin);
    if ((destination != '') && (origin != '') )
    {
      var that = this;
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
          if (data.paths[0] && data.paths[0].distance) {
            console.log("距离：" + data.paths[0].distance + '米')
            var carid=that.data.x;
            var endplace=that.data.endplace;
            var token=wx.getStorageSync('token');
            if (carid != 0 && endplace !='您到哪儿下车')
            {
            wx.request({
              url: 'https://dianzichuxings.aptdev.cn/xact.aspx?act=getordmey&token=' + token+'&cartypeid=' + carid + '&gl=' + data.paths[0].distance/1000,
              success(res){
                console.log(res.data.ygjg);
                that.setData({
                  ygjg: res.data.ygjg
                })
              }
            })
            }
          }
          if (data.taxi_cost) {
            console.log("出租车价格："+data.taxi_cost)
          }

        },
        fail: function (info) {

        }
      })
    }
   
  },
  // , regionchange(e) {
  //   // 地图发生变化的时候，获取中间点，也就是用户选择的位置
  //   if (e.type == 'end') {
  //     this.getLngLat()
  //   }
  // }
  // , markertap(e) {
  //   console.log(e)
  // },
  navbarTap: function(e) {
    var currentTab = this.data.currentTab;
    var that=this;
    if ((currentTab == 0) || (currentTab == 1) || (currentTab == 2))
    {
      that.setData({
        currentTab: e.currentTarget.dataset.idx,
        specialcarhide: false,
        messagehide: true,
        closehide: true,
        timehide: true,
        endtophide: false,
        ncolor: 'black',
        fcolor: 'grey',
        messageendheight: 80,
        futuresethide: true,
        maphides: false,
        carhide: true,
        timehide: false,
        timeshow: true,
        timehide1: false,
        timeshow1: true,
        // startcolor: '#e0e3da',
        endcolor: '#e0e3da',
        peoplenumcolor: '#e0e3da',
        timecolor: '#e0e3da',
        // startplace: '您到哪儿上车',
        endplace: '您到哪儿下车',
        personnumber: '出行人数',
        inputvalue: '',
        num:0
      })
    }
   
  }

})
// function speaking() {
//   console.log("动画.....")
//   var _this = this;
//   var animation = wx.createAnimation({
//     duration: 10000,
//   })
//   animation.opacity(0).scale(3, 3).step();//修改透明度,放大
//   this.setData({
//     spreakingAnimation: animation.export()
//   })
// }