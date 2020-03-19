// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:{
      leftIndex: 0,
      navIndex:'0',
    },
      leftData:[
        {
          name:'广州市区'
        },
        {
          name: '深圳市'
        },
        {
          name: '佛山市'
        }
      ],
      rightData:[
        '广州市天河体育中心',
        '广州市广播电视塔',
        '广州市广播电视塔',
        '广州租界最后的“世外桃源”',
        '南粤名山之一，广州有名的踏青胜地',
        '羊城八景之一，内有“五羊石雕”'
      ]
  },
  // 点击跳转
  mapGo: function (e) {
    var that = this

    that.addHistory(e.currentTarget.dataset.name)
  },
  // 保护地与湿地公园切换
  checkNavBtn:function(e)
  {
    wx.showToast({
      title: '正在加载..',
      icon: 'loading',
      duration: 1000
    })
    var that=this
    let _active = that.data.active
    _active.navIndex = e.currentTarget.dataset.index
    that.setData({
      active: _active
    })
  },
  // 城市切换
  checkLeftBtn: function (e) {
    wx.showToast({
      title: '正在加载..',
      icon:'loading',
      duration:1000
    })
    var that = this
    let _active = that.data.active
    _active.leftIndex = e.currentTarget.dataset.index
    that.setData({
      active: _active
    })
  },
  // 添加历史搜索
  addHistory: function (hisVal) {
    console.log(hisVal)
    var that = this
   

    wx.getStorage({
      key: 'historyList',
      success(res) {
        let _historyListShow =res.data
        for (var i in _historyListShow) {
          if (_historyListShow[i] === hisVal) {
            _historyListShow.splice(i, 1);
          }
        }
        _historyListShow.unshift(hisVal)
        wx.setStorage({
          key: "historyList",
          data: _historyListShow
        })
        wx.navigateTo({
          url: '/pages/map/map?searchVal=' + hisVal
        })

      }
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

  }
})