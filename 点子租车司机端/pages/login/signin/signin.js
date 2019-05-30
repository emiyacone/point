// pages/login/signin/signin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputhide:false,
    toasthide:true,
    totalcolor:'white',
    circlecolor:'#9ac81f',
    phonenumber:null,
    commcolor:'#ebebeb',
    areaIndex: 0,
    area: ['+86', '00', '000', '000'],
     items: [
      { name: 'CHN', value: '同意', checked: 'true' },
    ]
  },
  testnum: function () {
    wx.request({
      url: 'test.php', //仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
circlechange:function(){
   if (this.data.circlecolor=='#9ac81f')
   {
    this.setData({
      circlecolor: '#ebebeb'
    })
    }
  else if (this.data.circlecolor =='#ebebeb')
  {
    this.setData({
      circlecolor: '#9ac81f'
    })
  }

},

  phonenumber: function (e) {
    var phonenumber= e.detail.value;
    console.log(phonenumber)
    this.setData({
      phonenumber: phonenumber
    })
  },



tendtocode:function(){
  var phonenumber= this.data.phonenumber;
  if (phonenumber==11111111111)
  {
    this.setData({
      totalcolor: '#ebebeb',
      toasthide: false,
      inputhide: true,
    })
  }
  else{
  wx.navigateTo({
    url: '../../testcode/testcode'
  })
  }
},


tendtopage:function(){
  wx.redirectTo({
    url: '../../driver/indexpage/indexpage'
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  bindPickerChange: function (e) {
    this.setData({
      areaIndex: e.detail.value
    })
  },
  changecolor:function(){
    this.setData({ 
      commcolor:'#9ac81f'
    })
  },
  changeback:function(){
    if(this.data.phonenumber==null)
    {
      console.log(this.data.phonenumber),
      this.setData({
        commcolor: '#ebebeb'
      })
    }
  }

})