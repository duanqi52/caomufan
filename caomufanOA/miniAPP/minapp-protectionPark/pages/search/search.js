// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   * searchVal 搜索框的值
   * arrayHeight 联想框高度
   * searchLoadingStatus 联想框与历史搜索控制状态
   * bindSource 联想框结果
   * associateData 所有的保护地数据
   */
  data: {
    searchVal:'广州',
    arrayHeight:0,
 
    searchLoadingStatus:false,
    bindSource:[
      
    ],
    historyList:[
      '广州市天河体育中心',
      '广州市广播电视塔',
      '广州市广播电视塔',
      '广州租界最后的“世外桃源”',
      '南粤名山之一，广州有名的踏青胜地',
      '羊城八景之一，内有“五羊石雕”'
    ],
    associateData:[
      '广州市天河体育中心',
      '广州市广播电视塔',
      '广州市广播电视塔',
      '广州租界最后的“世外桃源”',
      '南粤名山之一，广州有名的踏青胜地',
      '羊城八景之一，内有“五羊石雕”',
      '广州市天河体育中心',
      '广州市广播电视塔',
      '广州市广播电视塔',
      '广州租界最后的“世外桃源”',
      '南粤名山之一，广州有名的踏青胜地',
      '羊城八景之一，内有“五羊石雕”',
      '广州市天河体育中心',
      '广州市广播电视塔',
      '广州市广播电视塔',
      '广州租界最后的“世外桃源”',
      '南粤名山之一，广州有名的踏青胜地',
      '羊城八景之一，内有“五羊石雕”',
      '广州市天河体育中心',
      '广州市广播电视塔',
      '广州市广播电视塔',
      '广州租界最后的“世外桃源”',
      '南粤名山之一，广州有名的踏青胜地',
      '羊城八景之一，内有“五羊石雕”',
    ]
    
  },
  // 点击跳转
  mapGo:function(e){
    var that=this

    that.addHistory(e.currentTarget.dataset.name)
  },
  // 添加历史搜索
  addHistory: function (hisVal) {
    var that = this
    let _historyListShow = that.data.historyList
    for (var i in _historyListShow) {
      if (_historyListShow[i] === hisVal) {
        _historyListShow.splice(i, 1);
      }
    }

    wx.getStorage({
      key: 'historyList',
      success(res) {
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
  // 获取历史信息
  getHistoryShow: function () {
    var that = this
    wx.getStorage({
      key: 'historyList',
      success(res) {

        that.setData({
          historyList: res.data
        })
      }, fail(e) {
        let _historyList = []
        wx.setStorage({
          key: "historyList",
          data: _historyList,
          success(res) {
            that.setData({
              historyList: []
            })
          }
        })
      }
    })
  },
   // 搜索框改变时候触发
  changeSearch: function (e) {
    // console.log(e)
    let that = this;
    var inputSearch = e.detail.value;
    that.setData({
      searchVal: inputSearch
    })
    if (inputSearch.length>0)
    {
      that.setData({
        searchLoadingStatus: true
      })
      that.associateList(inputSearch)
    }else{
      that.setData({
        searchLoadingStatus:false,
        bindSource: []
      })
    }
   
  },

  // 清空历史列表
  removeHistory: function () {
    var that = this
    let _historyList = []
    wx.setStorage({
      key: "historyList",
      data: _historyList,
      success(res) {
        wx.showLoading({
          title: '历史数据在清空',
          icon: 'success',
          duration: 1000
        })
        that.setData({
          historyList: []
        })
      }
    })

  },
  // 搜索输入时联想列表
  associateList: function (inputSearch){
    // console.log(1)
    var that=this
    var _associateData = that.data.associateData
    let _bindSource = []
    for (let i in _associateData)
    {
      if (_associateData[i].indexOf(inputSearch)!=-1)
      {
        _bindSource.push(_associateData[i])
      }
    }
    if (_bindSource.length!=0)
    {
      that.setData({
        bindSource: _bindSource,
        searchLoadingStatus: true
      })
    }else{
      that.setData({
        
        bindSource: [],
        searchLoadingStatus: false
      })
    }
   
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    that.getHistoryShow()
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