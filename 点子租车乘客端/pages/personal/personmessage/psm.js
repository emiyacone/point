// pages/personal/personmessage/psm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    agehide:false,
    ageshow:true,
    array: [],
    index: 0,
    agecolor:'grey',
    url:'../../images/people_fill.png',
    uzy: '',
    age: '',
    uname: '',
    usex: true,
    utx: '',
    phone:''
  },
changehead:function(){
  var that = this;
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths
      that.setData({
        //将临时变量赋值给已经在data中定义好的变量
    url: tempFilePaths,
  
      })
      console.log(res)
    }
  })
},

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      agehide: true,
      ageshow: false,
      agecolor: '#000',
    })
  },
  editmessage:function(){
    var token = wx.getStorageSync('token');
    var index = this.data.index;
    var name = this.data.uname;
    var age = this.data.array[index];
    var usex = this.data.usex;
    var uzy = this.data.uzy;
    wx.request({
      url: 'https://dianzichuxings.aptdev.cn/xact.aspx?act=updateumess&token=' + token + '&uname=' + name + '&usex=' + usex + '&uzy=' + uzy + '&unl=' + age + '&utx=' + null,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        wx.showToast({
          title: '修改成功',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getname:function(e){
   this.setData({
     uname: e.detail.value,
   })
  },
  getphone: function (e) {
    var phone = e.detail.value;
    this.setData({
      phone: e.detail.value,
    })
  },
  getsex:function(e){
     console.log(e)
     this.setData({
       usex:e.detail.value
     })
  },

  getuzy: function (e) {
    console.log(e)
    this.setData({
      uzy: e.detail.value
    })
  },
  onLoad: function (options) {
   var ages=[];
   for(var i=10;i<60;i++)
   {
     ages.push(i);
   }
   this.setData({
     array:ages
   })
    var token = wx.getStorageSync('token');
    wx.request({
      
      url: 'https://dianzichuxings.aptdev.cn/xact.aspx?act=getumess&token=' + token,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    });
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