// pages/Illustrated/illustratedList/illustratedList.js
Page({

  /**
   * 页面的初始数据
   * 
   * listHeight 列表高度
   * searchVal 搜索的值
   * typeData 搜索的类型  （animall，plant)
   * focusStatus 输入框光标状态控制页面展示
   * moreStatus 是否为精准搜索还是模糊搜索来判断是否隐藏搜索框
   * historyList 历史搜索列表
   * showList 列表数据
   */
  data: {
    listHeight:0,
    searchVal: '鹬科',
    typeData:'animall',
    focusStatus:false,
    moreStatus:false,
    historyList: ['asda', 'adasda', 'asasdasda', 'adasda', 'asda', 'adasda', 'asda', 'adasda'],
    showList: [
      {
        img:'https://gss0.bdstatic.com/70cFfyinKgQIm2_p8IuM_a/daf/pic/item/a8773912b31bb051ec146159397adab44aede08b.jpg',
        Name:'哈哈哈哈',
        scientificName:'asdasd',
        anotherName:'别名'
      },
      {
        img: 'https://gss0.bdstatic.com/70cFfyinKgQIm2_p8IuM_a/daf/pic/item/a8773912b31bb051ec146159397adab44aede08b.jpg',
        Name: '哈哈哈哈',
        scientificName: 'asdasd',
        anotherName: '别名'
      },
      {
        img: 'https://gss0.bdstatic.com/70cFfyinKgQIm2_p8IuM_a/daf/pic/item/a8773912b31bb051ec146159397adab44aede08b.jpg',
        Name: '哈哈哈哈',
        scientificName: 'asdasd',
        anotherName: '别名'
      },
      {
        img: 'https://gss0.bdstatic.com/70cFfyinKgQIm2_p8IuM_a/daf/pic/item/a8773912b31bb051ec146159397adab44aede08b.jpg',
        Name: '哈哈哈哈',
        scientificName: 'asdasd',
        anotherName: '别名'
      },
      {
        img: 'https://gss0.bdstatic.com/70cFfyinKgQIm2_p8IuM_a/daf/pic/item/a8773912b31bb051ec146159397adab44aede08b.jpg',
        Name: '哈哈哈哈',
        scientificName: 'asdasd',
        anotherName: '别名'
      },
      {
        img: 'https://gss0.bdstatic.com/70cFfyinKgQIm2_p8IuM_a/daf/pic/item/a8773912b31bb051ec146159397adab44aede08b.jpg',
        Name: '哈哈哈哈',
        scientificName: 'asdasd',
        anotherName: '别名'
      },
      
    ]
  },
  // 开始搜索
  searchGo: function () {
    var that = this
    if (that.data.searchVal.length > 0) {
      // this.addHistory(that.data.searchVal)
      wx.showToast({
        'title': '开始搜索了',
        'icon': 'none',
        'duration': 2000
      })
      that.getSearchListShow()
    } else {
      wx.showToast({
        'title': '你未输入搜索信息',
        'icon': 'none',
        'duration': 2000
      })
    }

  },
  // 搜索框改变时候触发
  changeSearch: function (e) {
    let that = this;
    var inputSearch = e.detail.value;
    that.setData({
      searchVal: inputSearch
    })
  },
   // 获取搜索的列表数据
  getSearchListShow:function(){
    var that = this
    let _typeData = that.data.typeData
    if (_typeData == 'animall') {
      wx.showToast({
        title: '正在加载动物搜索数据...',
        icon: 'loading',
        duration: 1000
      });
    } else if (_typeData == 'plant') {
      wx.showToast({
        title: '正在加载植物搜索数据...',
        icon: 'loading',
        duration: 1000
      });
    } else {
      wx.showToast({
        title: '正在加载搜索数据...',
        icon: 'loading',
        duration: 1000
      });
    }
  },
  // 获取查看更多的列表数据
  getMoreListShow: function () {
    var that = this
    let _typeData = that.data.typeData
    if (_typeData =='animall')
    {
      wx.showToast({
        title: '正在加载动物查看更多数据...',
        icon: 'loading',
        duration: 1000
      });
    } else if (_typeData == 'plant')
    {
      wx.showToast({
        title: '正在加载植物查看更多数据...',
        icon: 'loading',
        duration: 1000
      });
    }else{
      wx.showToast({
        title: '正在加载查看更多数据...',
        icon: 'loading',
        duration: 1000
      });
    }
    
  
  },
  // 获取焦点时候触发
  getInputFocus:function(){
    var that=this
    that.setData({
      focusStatus:true
    })
  },
   // 失去焦点时候触发
  noInputtFocus:function(){
    var that = this
    that.setData({
      focusStatus: false
    })
  },

  // 设置页面的一些基本参数
  setPageInit: function () {
    var that = this
    // 获取页面高度
    let winHeight = wx.getSystemInfoSync().windowHeight;
    //  设置列表高度
    if (that.data.moreStatus)
    {
      that.setData({
        listHeight: winHeight
      })
    }else{
      let searchH = wx.createSelectorQuery();
      searchH.select('.SearchBox').boundingClientRect()
      searchH.exec((res) => {
        var searchHeight = res[0].height; // 获取搜索框高度
        console.log()

        that.setData({
          listHeight: winHeight - searchHeight
        })

      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    // 判断是否为模糊查找
    if(options.more=='no')
    {
      that.setData({
        moreStatus:false,
        typeData: options.type
      })
    } else if (options.more == 'yes')
    {
      that.setData({
        moreStatus: true,
         typeData: options.type
      })
      that.getMoreListShow()
    }
    // if (options.familyName) {
    //   that.setData({
    //     familyName: options.familyName
    //   })

    // }
    that.setPageInit()

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