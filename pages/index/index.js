//获取应用实例
const app = getApp();

// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  // 打开h5页面
  test: function () {
    console.log("test");
    wx.navigateTo({
      url: '/pages/h5/h5'
    })
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  // 获取微信支付的prepay_id
  getPrepayId: function () {
    return new Promise((resolve, reject) => {
      const requestTask = wx.request({
        url: "https://wechat.weiquaninfo.cn/wxPay/unifiedorder",
        method: "POST",
        header: {
          'content-type': 'application/json'
        },
        data: {
          body: "智企云-服务"
        },
        success: function (res) {
          return resolve(res.data);
        },
        fail: function (error) {
          return reject(error);
        }
      })
    })
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  // 获取小程序支付API的PaySign
  getPaySign: function (prepay_id) {
    return new Promise((resolve, reject) => {
      const requestTask = wx.request({
        url: `https://wechat.weiquaninfo.cn/wxPay/md5?prepay_id=${prepay_id}`,
        method: "GET",
        success: function (res) {
          return resolve(res.data);
        },
        fail: function (error) {
          return reject(error);
        }
      })
    })
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  // 调取小程序支付API
  wxPayment: function (data) {
    return new Promise((resolve, reject) => {
      wx.requestPayment({
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.package,
        signType: 'MD5',
        paySign: data.paySign,
        success: function (res) {
          return resolve(res.data);
        },
        fail: function (error) {
          return reject(error);
        }
      })
    })
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  // 微信支付
  pay: function () {
    // 获取微信支付prepay_id
    this.getPrepayId().then((prepay_id) => {
      return this.getPaySign(prepay_id);
    }).then((data) => {
      return this.wxPayment(data);
    }).catch((error) => {
      console.log(error);
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 用户登录
    app.userLogin();
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