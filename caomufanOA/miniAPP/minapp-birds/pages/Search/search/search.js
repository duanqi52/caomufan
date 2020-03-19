// pages/search/search.js
import { getHotWords, getRareWords} from '../../../Api/Search/search.js'
Page({

  /**
   * 页面的初始数据
   * searchVal 搜索的值
   * fontList 生僻字列表
   * historyList 搜索历史列表
   * popular 热门搜索列表
   * 
   */
  data: {
    focusShowed:false,
    words: [],
    historyList: [],
    hotword:[],
    searchVal:''
  },
  // 清空历史列表
  removeHistory:function(){
    var that=this
    let _historyList = []
    wx.setStorage({
      key: "historyList",
      data: _historyList,
      success(res){
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
  // 提交表单 当前页面不需要
  formSubmit: function (e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.showToast({
      title: '搜索提交',
      icon: 'success',
      duration: 2000
    })
   
  },
  // 热门搜索
  hotwordGo:function(e){
    var that=this
    console.log(e.currentTarget.dataset.val)
    that.addHistory(e.currentTarget.dataset.val)
    // wx.navigateTo({
    //   url: '/pages/Search/searchList/searchlist?searchVal=' + e.currentTarget.dataset.val
    // })

  },
  // 搜索框改变时候触发
  changeSearch:function(e){
    let that = this;
    var inputSearch = e.detail.value;
    that.setData({
      searchVal: inputSearch
    })
  },
  // 生僻字选择
  fontSet:function(e){
    // console.log()
    let that = this;
    var inputSearch = this.data.searchVal+e.currentTarget.dataset.font
    that.setData({
      searchVal: inputSearch
    })
    
    
  },

  // 进行搜索时候
  searchGo:function(){
    var that=this
    if (that.data.searchVal.length>0)
    {
      this.addHistory(that.data.searchVal)
      wx.navigateTo({
        url: '/pages/Search/searchList/searchlist?searchVal=' + that.data.searchVal
      })
      
    }else{
      wx.showToast({
        'title':'你未输入搜索信息',
        'icon':'none',
        'duration':2000
      })
    }
    
  },
  // 清空文本
  formReset: function () {
    var that=this
    // console.log('清空文本')
    that.setData({
      searchVal: ''
    })
  },
  // 获取热门搜索
  getHotWorldShow:function(){
    var that = this;
    wx.showToast({
      title: '正在获取热门搜索...',
      'icon': 'none',
      duration: 1000
    })
    getHotWords({}).then(res => {
      if (res.data.messageType === 0) {
        that.setData({
          hotword: res.data.result.hotword
        })
      } else {
        wx.showToast({
          title: res.data.message,
          'icon': 'none',
          duration: 1000
        })
      }
    })
  },
  // 获取生僻字列表
  getFontShow:function(){
    var that = this;
    getRareWords({}).then(res => {
      if(res.data.messageType===0)
      {
        that.setData({
          words: res.data.result.words
        })
      }else{
        wx.showToast({
          title: res.data.message,
          'icon': 'none',
          duration: 1000
        })
      }
    })
  },
  // 添加历史搜索
  addHistory:function(hisVal){
    var that=this
    let _historyListShow=that.data.historyList
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
         

        }
      })

  },
  // 获取历史信息
  getHistoryShow:function(){
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 获取生僻字列表
    that.getFontShow()
    // 获取历史信息
    that.getHistoryShow()
    // 获取热门搜索
    that.getHotWorldShow()

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
    var that=this
    // this.onLoad()
    that.setData({
      focusShowed:true
    })
    // 获取历史信息
    that.getHistoryShow()
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