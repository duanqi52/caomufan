// pages/Illustrated/Illustrated/illustrated.js
import { getBirdOrder, getBirdByOrder } from '../../../Api/Illustrated/Illustrated.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    listHeight:0,
    activeIndex: 0,
    activeName:'',
    ListDataShow:[
     

      ],
      RightDataShow:[]
  },
  // 获取目列表
  getOrderShow:function(e)
  {
    var that=this
    getBirdOrder({

    }).then(res=>{
      console.log(res)
      if (res.data.messageType === 0) {
        that.setData({
          ListDataShow: res.data.result.orders,
          activeName: res.data.result.orders[0]
        })
        // 获取科列表
        that.getFamilyShow()
      } else {
        wx.showToast({
          title: res.data.message,
          'icon': 'none',
          duration: 1000
        })
      }

    })
  },
  // 获取科列表
  getFamilyShow: function (e) {
    var that=this
    wx.showToast({
      title: '正在加载数据...',
      icon: 'loading',
      duration: 100000
    });
     getBirdByOrder({
       orderName:that.data.activeName
     }).then(res=>{
       wx.hideToast()
       if (res.data.messageType === 0) {
         that.setData({
           RightDataShow: res.data.result.familyList,
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

  // 点击目分类时
  tabChange: function (e){
    let that=this
    that.setData({
      activeIndex: e.target.dataset.index,
      activeName:e.target.dataset.name
    })
     // 获取科列表
    that.getFamilyShow()
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    //  设置列表高度
    let searchH = wx.createSelectorQuery();
    searchH.select('.SearchBox').boundingClientRect()
    searchH.exec((res) => {
      var searchHeight = res[0].height; // 获取搜索框高度
      console.log()
      // 获取页面高度
      let winHeight = wx.getSystemInfoSync().windowHeight;
      this.setData({
        listHeight: winHeight - searchHeight
      })

    })

    // 获取目列表
    that.getOrderShow()
  
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