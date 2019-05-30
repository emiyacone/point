// pages/personal/personmessage/psm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    agehide: false,
    ageshow: true,
    array: [],
    index: 0,
    agecolor: 'grey',
    url: '../../images/people_fill.png',
    uzy: '',
    age: '',
    uname: '',
    usex: true,
    utx: '',
    phone: ''
  },
  changehead: function () {
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
  },
  editmessage: function () {
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getname: function (e) {
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
  getsex: function (e) {
    console.log(e)
    this.setData({
      usex: e.detail.value
    })
  },

  getuzy: function (e) {
    console.log(e)
    this.setData({
      uzy: e.detail.value
    })
  },
  onLoad: function (options) {
    var that=this;
    var userdata=wx.getStorageSync('userdata');
    var url = userdata.avatarUrl;
    var token = wx.getStorageSync('token');
    wx.request({

      url: 'https://dianzichuxings.aptdev.cn/xact.aspx?act=getumess&token=' + token,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        var uname=res.data.uname;
        var uphone=res.data.uphone;
        var uzy=res.data.uzy;
        var age=res.data.unl;
        var usex=res.data.usex;
        var sex='';
        if(usex==true){
          sex='男'
        }
        else if (usex=false)
        {
          sex = '女'
        }
        that.setData({
          uname: uname,
          uphone: uphone,
          uzy: uzy,
          age: age,
          sex: sex,
          url:url
        })
      }
    });
  },
  edit:function(){
    wx.navigateTo({
      url: '../personmessage/psm',
    })
  },
exit:function(){
  wx.reLaunch({
    url: '../../index/index?key=1',
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