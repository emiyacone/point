// pages/cartypetest/cartypetest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timg:'',
    cartypename:'',
    carmessage:{},
    qcmdid:0,
    qc_dz:'',
    qc_gpsx:'',
    qc_gpsy:'',
    hcmdid: 0,
    hc_dz: '',
    hc_gpsx: '',
    hc_gpsy: '',
    jsyid:0,
    qclx:1,
    hclx:1,
    sdate:'',
    ddate:'',
    typeid:0,
    rizu:0,
    yajin:0,
    starthide:false,
    startshow:true,
    endhide: false,
    endshow: true,
    servertime:'营业时间',
    servertime2: '营业时间',
    index1:0,
    array1: [],
    index2: 0,
    array2: [],
    index3: 0,
    array3: ['00:00-01:00', '01:00-02:00', '02:00-03:00', '03:00-04:00', '04:00-05:00', '05:00-06:00', '06:00-07:00', '07:00-08:00', '08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00'],
    index4: 0,
    array4: ['00:00-01:00', '01:00-02:00', '02:00-03:00', '03:00-04:00', '04:00-05:00', '05:00-06:00', '06:00-07:00', '07:00-08:00', '08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00'],
    startfirst:true,
    startsecond:false,
    endfirst:true,
    endsecond:false,
    bordercss1:'1px solid #ebebeb;',
    sbc1: '1px solid white;',
    bordercss2: '1px solid #ebebeb;',
    sbc2: '1px solid white;',
    carname:'别克GL8',
    url: "../images/GL8.jpg",
    scolor1:'grey',
    zcolor1: 'black',
    scolor2: 'grey',
    zcolor2: 'black',
    takecar:'取车门店',
    sendcar:'还车门店',
    startfirstplace: '选择位置',
    startsecondplace:'选择门店',
    endfirstplace: '选择位置',
    endsecondplace: '选择门店',
    items: [
      // {
      //   "name": "张三",
      //   "cardnumber": "333×××××××4444"
      // },
      // {
      //   "name": "张三",
      //   "cardnumber": "333×××××××4444"
      // }
    ]
  },
  getmendian:function(){
    var that=this;
   
  },
bindchangetime1:function(e){
  this.setData({
    index3: e.detail.value
  })
},
  bindchangetime2: function (e) {
    this.setData({
      index4: e.detail.value
    })
  },
  bindPickerChange1(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var array=this.data.array1
    var index = parseInt(e.detail.value)
    this.setData({
      index1: e.detail.value,
      startsecondplace: array[index].mdmc,
      qcmdid: array[index].id
    })
  },
  bindPickerChange2(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var array = this.data.array2
    var index = parseInt(e.detail.value)
    console.log(array[index])
    this.setData({
      index2: e.detail.value,
      endsecondplace: array[index].mdmc,
      hcmdid: array[index].id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  adddrivemes:function(){
    wx.navigateTo({
      url: '../driverme/driverme',
    })
  },
  changetypes1:function(){
this.setData({
  bordercss1: '1px solid white;',
  sbc1: '1px solid #ebebeb;',
  scolor1: 'black',
  zcolor1: 'grey',
  takecar: '取车位置',
  servertime: '送车时间',
  starthide: true,
  startshow: false,
  startfirst: false,
  startsecond:true,
  qclx:2,

})
  },

  changetypes2: function () {
    this.setData({
      bordercss2: '1px solid white;',
      sbc2: '1px solid #ebebeb;',
      scolor2: 'black',
      zcolor2: 'grey',
      sendcar: '还车位置',
      servertime2: '还车时间',
      endhide: true,
      endshow:false,
      sendshow: false,
      endfirst: false,
      endsecond: true,
      hclx:2,
    })
  },

  changetypez1:function(){
this.setData({
  bordercss1: '1px solid #ebebeb;',
  sbc1: '1px solid white;',
  scolor1: 'grey',
  zcolor1: 'black',
  takecar: '取车门店',
  servertime: '营业时间',
  startfirst: true,
  startsecond: false,
  starthide: false,
  startshow: true,
  qclx:1,
})
  },
  changetypez2: function () {
    this.setData({
      bordercss2: '1px solid #ebebeb;',
      sbc2: '1px solid white;',
      scolor2: 'grey',
      zcolor2: 'black',
      sendcar: '还车门店',
      servertime2: '营业时间',
      endfirst: true,
      endsecond: false,
      endhide: false,
      endshow: true,
      hclx:1,
    })
  },
  precar:function(){
    var sdate=this.data.sdate;
    var ddate=this.data.ddate;
    console.log(sdate);
    console.log(ddate);
    var cartypeid = parseInt(this.data.typeid);
    var qclx =parseInt(this.data.qclx);
    var hclx = parseInt(this.data.hclx);
    var jsyid = parseInt(this.data.jsyid);
    var qcmdid=parseInt(this.data.qcmdid);
    var hcmdid =parseInt(this.data.hcmdid);
    var qc_dz=this.data.qc_dz;
    var qc_gpsx=this.data.qc_gpsx;
    var qc_gpsy = this.data.qc_gpsy;
    var hc_dz = this.data.hc_dz;
    var hc_gpsx = this.data.hc_gpsx;
    var hc_gpsy = this.data.hc_gpsy;
    var token=wx.getStorageSync("token");
    var url='';
    if(qclx==1&&hclx==1)
    {
     url = 'https://dianzichuxings.aptdev.cn/xact.aspx?act=zijzc&from_dz=&to_dz=sss&sdate=' + sdate + '&ddate=' + ddate + '&cartypid=' + cartypeid + '&qclx=' + qclx + '&qcmdid=' + qcmdid + '&hclx=' + hclx + '&hcmdid=' + hcmdid + '&jsyid=' + jsyid + '&token=' + token;
    }
    else if (qclx == 2 && hclx == 1)
    {
      url = 'https://dianzichuxings.aptdev.cn/xact.aspx?act=zijzc&from_dz=&to_dz=sss&sdate=' + sdate + '&ddate=' + ddate + '&cartypid=' + cartypeid + '&qclx=' + qclx + '&qc_dz=' + qc_dz + '&qc_gpsx=' + qc_gpsx + '&qc_gpsy=' + qc_gpsy+ '&hclx=' + hclx + '&hcmdid=' + hcmdid + '&jsyid=' + jsyid + '&token=' + token;
    }
    else if (qclx == 1 && hclx == 2)
    {
      url = 'https://dianzichuxings.aptdev.cn/xact.aspx?act=zijzc&from_dz=&to_dz=sss&sdate=' + sdate + '&ddate=' + ddate + '&cartypid=' + cartypeid + '&qclx=' + qclx + '&qcmdid=' + qcmdid + '&hclx=' + hclx + '&hc_dz=' + hc_dz+'&hc_gpsx='+hc_gpsx +'&hc_gpsy='+hc_gpsy+ '&jsyid=' + jsyid + '&token=' + token;
    }
    else if (qclx == 2 && hclx == 2)
    {
      url = 'https://dianzichuxings.aptdev.cn/xact.aspx?act=zijzc&from_dz=&to_dz=sss&sdate=' + sdate + '&ddate=' + ddate + '&cartypid=' + cartypeid + '&qclx=' + qclx + '&qc_dz=' + qc_dz + '&qc_gpsx=' + qc_gpsx + '&qc_gpsy=' + qc_gpsy + '&hclx=' + hclx + '&hc_dz=' + hc_dz + '&hc_gpsx=' + hc_gpsx + '&hc_gpsy=' + hc_gpsy + '&jsyid=' + jsyid + '&token=' + token;
    }
    wx.request({
      url:url,
      header: {
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        console.log(res.data);
        var oid=res.data.oid;
        wx.setStorageSync('oid', oid)
        console.log(oid);
        wx.navigateTo({
          url: '../pay/pay?oid='+oid,
        })
        // wx.showToast({
        //   title: '预订成功',
        //   icon: 'succes',
        //   duration: 1000,
        //   mask: true
        // })
      }
    })
  
  },

  takecar: function () {

    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          startfirstplace: res.name,
          qc_dz: res.name,
          qc_gpsx:res.latitude,
          qc_gpsy:res.longitude
        })
      },
    })
    
    console.log('test');
  },
  sendcar: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          endfirstplace: res.name,
          hc_dz: res.name,
          hc_gpsx:res.latitude,
          hc_gpsy:res.longitude
        })
      },
    })
  },
  onLoad: function (options) {

  console.log(options);
    var sdate = options.sdate;
    var ddate=options.ddate;
    var ddjg = parseInt(options.ddjg);
    var gljg = parseInt(options.gljg);
  var typeid=parseInt(options.typeid);
    var timg = options.timg;
    var cartypename = options.cartypename;
    this.setData({
      timg: timg,
      cartypename: cartypename
    })
  var that=this;
  that.setData({
    sdate: sdate,
    ddate:ddate,
    rizu: ddjg,
    yajin:gljg,
    typeid:typeid,
    regionend: options.regionend,
    regionstart: options.regionstart
  })
    wx.request({
      url: 'https://dianzichuxings.aptdev.cn/xact.aspx?act=getmdxx',
      header: {
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        console.log(res);
        var length = res.data.length;
        var arry = [];
        for (var i = 0; i < length; i++) {
          if(typeid==res.data[i].id)
          {
            carmessage: res.data[i]
          }
        }
        console.log(res.data);
        that.setData({
          array1: res.data,
          array2:res.data
        })
      }
    })
    var token = wx.getStorageSync('token');
    wx.request({
      url: 'https://dianzichuxings.aptdev.cn/xact.aspx?act=listjsyxx&token=' + token,
      header: {
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        console.log( res);
        that.setData({
          items:res.data.jsylist
        })
      }
    })
  },
chooseid:function(e){
  console.log(e)
  this.setData({
    jsyid:e.currentTarget.id
  })
},
  onUnload: function (options){
    console.log(options)
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
    var that=this;
    var token = wx.getStorageSync('token');
    wx.request({
      url: 'https://dianzichuxings.aptdev.cn/xact.aspx?act=listjsyxx&token=' + token,
      header: {
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        console.log(res);
        that.setData({
          items: res.data.jsylist
        })
      }
    })
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