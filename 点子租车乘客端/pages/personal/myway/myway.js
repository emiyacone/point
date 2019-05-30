// pages/personal/myway/myway.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testolist:[],
    navbar: ['已完成', '已取消', '正在进行'],
    currentTab: 0,
    olist:[],
    olist2: [],
    olist3: [],
    olistall:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  knowdetail:function(e){
    console.log(e)
    var id=parseInt(e.currentTarget.id);
    var list=this.data.olistall;
    var length=list.length;
    var order={};
    for(var i=0;i<length;i++)
    {
      // if (id == list[i].id)
      // {
      //   order={
      //     list[i]
      //   }
      // }
    }
    console.log(list);
    wx.navigateTo({
      url: '../../route/special'
    })
  },
  onLoad: function (options) {
    var olist=this.getorderlist(1,6);
    var olistx = this.getorderlist(2, 6);
    var olisty = this.getorderlist(3, 6);
    var olist2=this.getorderlist(1, 2);
    olist2 = olist2.concat(this.getorderlist(2, 2))
    olist2 = olist2.concat(this.getorderlist(3, 2))
    var olist3=this.getorderlist(1, 4);
    olist3 = olist3.concat(this.getorderlist(2, 4))
    olist3 = olist3.concat(this.getorderlist(3, 4))
  },

  getorderlist: function (ordlx, ostate){
    var olist=[];
    var token = wx.getStorageSync('token');
    var waytype='';
    var that = this;
    if (ordlx==1)
    {
      waytype='专车'
    } else if (ordlx == 2) {
      waytype = '自驾出租'
    } else if (ordlx == 3) {
      waytype = '大巴出租'
    } 
    wx.request({
      url: 'https://dianzichuxings.aptdev.cn/xact.aspx?act=getmyords&ordlx=' + ordlx + '&token=' + token + '&ostate=' + ostate,
      success: function (res) {
        console.log(res)
        var list = res.data.olist;
        if(that.data.olistall!=null)
        {
          var listx = that.data.olistall.concat(list);
        }
        else{
          var listx = list;
        }
       
        that.setData({
          olistall: listx
        })
        var length = list.length;
        for (var i = 0; i < length; i++) {
          if (list[i].sdate)
          {
            var time = that.fortime(list[i].sdate)
          }
          var order = {
            id: list[i].id,
            waytype: waytype,
            from_dz: list[i].from_dz,
            to_dz: list[i].to_dz,
            sdate: time
          }
          olist.push(order);
        }
        var testolist = that.data.testolist;
        testolist=testolist.concat(olist);;
        that.setData({
          testolist: testolist
        })
        // console.log(olist)
        if (ordlx == 3 && ostate==6)
       {
          var testolist = that.data.testolist;
          console.log('上传olist' + testolist)
          that.setData({
            olist: testolist,
            testolist:[]
          })
        } else if (ordlx == 3 && ostate == 2) {
          var testolist = that.data.testolist;
          console.log('上传olis2t' + testolist)
          that.setData({
            olist2: testolist,
            testolist: []
          })
        } else if (ordlx == 3 && ostate == 4) {
          var testolist = that.data.testolist;
          console.log('上传olist3' + testolist)
          that.setData({
            olist3: testolist,
            testolist: []
          })
        }
      },
      complete:function(){
  
      }
    })
    return olist;
  },
  fortime:function date_time(val) {
    var date = new Date(parseInt(val.replace("/Date(", "").replace(")/", ""), 10));
    //月份为0-11，所以+1，月份小于10时补个0
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var theTime = date.getFullYear() + "-" + month + "-" + currentDate + " " + hour + ":" + minute + ":" + second;
    return theTime ;
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