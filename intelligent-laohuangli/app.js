//app.js

const utils = require('./utils/util.js')

App({
  onLaunch: function () {

    wx.getStorage({
      key: 'history',
      success: (res) => {
        this.globalData.history = res.data
      },
      fail: (res) => {
        console.log("get storage failed")
        console.log(res)
        this.globalData.history = []
      }
    })

    //调用API从本地缓存中获取数据
    // console.log('Launch');
  },


  getDateDetail: function(dateStr, callback) {
    var that = this;
    var api = 'https://v.juhe.cn/laohuangli/d';
    var appKey = ''; //此为聚合用户的appKey
    wx.request({
      url: api,
      data: {
        key: appKey,
        date: dateStr
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        var data = typeof res === 'string' ? JSON.parse(res) : res;
        if (typeof callback === 'function') {
          callback.call(that, data);
        }
      }
    });
  },

// 权限询问
getRecordAuth: function () {
    wx.getSetting({
      success(res) {
        console.log("succ")
        console.log(res)
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success() {
              console.log("succ auth")
            }, fail() {
              console.log("fail auth")
            }
          })
        } else {
          console.log("record has been authed")
        }
      }, fail(res) {
        console.log("fail")
        console.log(res)
      }
    })
  },
  onHide: function () {
    wx.stopBackgroundAudio()
  },
  globalData: {
    appName:"老黄历",
    authur:"TEAM.19",
    history: [],
    text123:"这是默认值",
    sentimentResult:"默认值",
    date123:"1998-2-2",
  }

})

