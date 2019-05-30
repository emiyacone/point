// pages/personal/myway/myway.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['已完成', '已取消', '正在进行'],
    currentTab: 0,
    olist:[],
    items: [
      {
        "waytype": "专车",
        "time": "2018年1月1日19:20",
        "start": "人民公路46号",
        "end": "人民公路100号",
        "money":"100",
        "paytime":"2018年1月1日19:20",
        "orderno":"142141**121231"
      },
      {
        "waytype": "专车",
        "time": "2018年1月1日19:20",
        "start": "人民公路46号",
        "end": "人民公路100号",
        "money": "100",
        "paytime": "2018年1月1日19:20",
        "orderno": "142141**121231"
      },
      {
        "waytype": "专车",
        "time": "2018年1月1日19:20",
        "start": "人民公路46号",
        "end": "人民公路100号",
        "money": "100",
        "paytime": "2018年1月1日19:20",
        "orderno": "142141**121231"
      },
      {
        "waytype": "专车",
        "time": "2018年1月1日19:20",
        "start": "人民公路46号",
        "end": "人民公路100号",
        "money": "100",
        "paytime": "2018年1月1日19:20",
        "orderno": "142141**121231"
      },
      {
        "waytype": "专车",
        "time": "2018年1月1日19:20",
        "start": "人民公路46号",
        "end": "人民公路100号",
        "money": "100",
        "paytime": "2018年1月1日19:20",
        "orderno": "142141**121231"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token=wx.getStorageSync("token");
    var that=this;
    wx.request({
      url: 'https://dianzichuxings.aptdev.cn/dact.aspx?act=getmyallord&token=' + token,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        var olist=res.data.olist;
        var olist1=[];
        var olist2=[];
        var olist3=[];
        var length=olist.length;
        for(var i=0;i<length;i++)
        {
          if(olist[i].ostate==6)
          {
            olist1.push(olist[i]);
          }
          else if (olist[i].ostate == 2) {
            olist2.push(olist[i]);
          }
          else{
            olist3.push(olist[i]);
          }
        }
        // console.log("已完成"+olist1);
        // console.log("已取消" + olist2);
        // console.log("正在进行" + olist3);
        that.setData({
          olist:olist,
          olist1: olist1,
          olist2: olist2,
          olist3: olist3
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

  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  }
})