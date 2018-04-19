App({
  ///////////////////////////////////////////////////////////////////////////////////////////
  // 用户重新登录
  login: function (cb) {
    wx.login({
      success: (res) => {
        if (res.code) {
          wx.request({
            url: "https://wechat.weiquaninfo.cn/wxAppLogin/token",
            method: "POST",
            header: {
              'content-type': 'application/json',
            },
            data: {
              code: res.code
            },
            success: function (res) {
              wx.setStorageSync('token', res.data.token);
              typeof cb == "function" && cb(res.data.token);
            },
            fail: function (error) {
              console.log(error);
            }
          })
        } else {
          console.log(`登录失败, ${res.errMsg}`);
        }
      },
      fail: (error) => {
        console.log(error);
      }
    })
  },

  ///////////////////////////////////////////////////////////////////////////////////////////
  // 用户登录
  userLogin: function (cb) {
    wx.checkSession({
      success: () => {
        // 登录态未过期
        let token = wx.getStorageSync('token');
        if (token) {
          typeof cb == "function" && cb(token);
        } else {
          // 重新登录
          this.login(cb);
        }
      },
      fail: () => {
        // 重新登录
        this.login(cb);
      }
    })
  },

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function (options) {
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  }
})
