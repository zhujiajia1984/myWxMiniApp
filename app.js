App({
  globalData: {
    userinfo: null
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  // 获取token
  getToken: function (code) {
    return new Promise((resolve, reject) => {
      let url = "https://wechat.weiquaninfo.cn/wxAppLogin/token";
      const requestTask = wx.request({
        url: url,
        method: "POST",
        header: {
          'content-type': 'application/json',
        },
        data: {
          code: code
        },
        success: function (res) {
          console.log(res.data);
          return resolve(res.data);
        },
        fail: function (error) {
          return reject(error);
        }
      })
    })
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  // 获取用户登录code
  getCode: function () {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          if (res.code) {
            resolve(res.code);
          } else {
            reject(`登录失败, ${res.errMsg}`);
          }
        },
        fail: (error) => {
          reject(error);
        }
      })
    })
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  // 检查登录态是否过期(小程序的session_key是否过期)
  checkSession: function () {
    return new Promise((resolve, reject) => {
      wx.checkSession({
        success: () => {
          //session_key 未过期，并且在本生命周期一直有效
          resolve("notNeedLogin");
        },
        fail: () => {
          // session_key 已经失效，需要重新执行登录流程
          resolve("needLogin");
        }
      })
    })
  },

  ///////////////////////////////////////////////////////////////////////////////////////////
  // 用户登录流程
  userLogin: function () {
    this.checkSession().then((result) => {
      if (result == "needLogin") {
        return this.getCode();
      } else return null;
    }).then((code) => {
      if (code) {
        this.getToken(code);
      } else return null;
    }).catch((error) => {
      console.log(error);
    })
  },

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function (options) {
    // console.log(options);
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
