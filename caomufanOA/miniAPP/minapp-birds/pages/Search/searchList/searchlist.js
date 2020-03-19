// pages/searchList/searchlist.js
import { search} from '../../../Api/Search/searchList.js'
import { getHotWords, getRareWords } from '../../../Api/Search/search.js'

Page({

  /**
   * 页面的初始数据
   * listHeight 展示列表高度
   * showList  展示列表
   * searchVal  搜索值
   * 
   */
  data: {
    listHeight:0,   
    showList:[],
    searchVal: '',
    listStatus:false,
    words: [
      '鹎', '饕', '餮'
    ],
    historyList: [
      '鹧鸪'
    ],
    hotword: [
      '西红胶隼'
    ],
  },
  // 顶部加载
  topLoad:function(){
    var that=this
    that.formSubmit()
    wx.showToast({
              title: '正在刷新...',
              icon: 'loading',
              duration: 2000
            });
  },
  // 底部加载
  bottpmLoad:function(){
    wx.showToast({
              title: '正在加载...',
              icon: 'loading',
              duration: 2000
            });
  },
  // 搜索框失去焦点时触发
  blurSearch: function () {
    var that=this
    that.setData({
      listStatus: false
    })
  },
  // 搜索框获取焦点时触发
  focusSearch:function(){
    var that = this
    // that.setData({
    //   listStatus: true
    // })
    wx.navigateBack({

      delta: 1 // 1返回上一个界面，2返回上上个页面

    })
  },
  // 搜索框改变时候触发
  changeSearch: function (e) {
    let that = this;
    var inputSearch = e.detail.value;
    that.setData({
      searchVal: inputSearch
    })
  },
  // 点击搜索按钮时候
  formSubmit:function (){
    var that = this
    if (that.data.searchVal.length > 0) {
      // 把搜索的内容添加进
      that.addHistory(that.data.searchVal)
      that.searchPageShow()
      
    } else {
      wx.showToast({
        'title': '你未输入搜索信息',
        'icon': 'none',
        'duration': 2000
      })
    }
   
  },
  // 查询搜索页面
  searchPageShow:function(){
    wx.showToast({
      title: '正在加载数据...',
      icon: 'loading',
      duration: 100000
    });
   
    var that = this
    search({
      searchWords: that.data.searchVal
    }).then(res => {
      console.log(res)
      wx.hideToast()
      if (res.data.messageType === 0) {
        that.setData({
          showList: res.data.result.birds
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

 
 
  
  // 生僻字选择
  fontSet: function (e) {
    // console.log()
    let that = this;
    var inputSearch = this.data.searchVal + e.currentTarget.dataset.font
    that.setData({
      searchVal: inputSearch
    })


  },
 
  // 添加历史搜索
  addHistory: function (hisVal) {
    var that = this
    wx.getStorage({
      key: 'historyList',
      success(res) {
        let _historyListShow = res.data
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
        
   
      }
      })
    

  },
  // 清空文本
  formReset: function () {
    var that = this
    console.log('清空文本')
    that.setData({
      searchVal: ''
    })
  },
  // 初始化页面时部分view的高度赋值
  fromHeight(){

    //  设置列表高度
    let searchH = wx.createSelectorQuery();
    searchH.select('.SearchBox').boundingClientRect()
    searchH.exec((res) => {
      var searchHeight = res[0].height; // 获取搜索框高度
      // 获取页面高度
      let winHeight = wx.getSystemInfoSync().windowHeight;
      this.setData({
        listHeight: winHeight - searchHeight
      })

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    that.fromHeight()

    // console.log(options.searchVal)

// 给输入框赋值
    if (options.searchVal && options.searchVal != undefined)
    {
      that.setData({
        searchVal: options.searchVal
      })
      that.searchPageShow()
    }
   

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
    // this.onLoad()
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
    // wx.showToast({
    //   title: '正在刷新数据...',
    //   icon: 'loading',
    //   duration: 2000
    // });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      console.log('上拉了')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})