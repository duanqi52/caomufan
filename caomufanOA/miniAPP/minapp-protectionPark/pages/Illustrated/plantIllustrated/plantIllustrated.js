// pages/Illustrated/plantIllustrated/plantIllustrated.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listHeight: 0,
    activeIndex: 0,
    ListDataShow: [
      '树木','灌木','藤类','青草','蕨类','及绿藻','地衣'
    ],
    RightDataShow: [
      {
        familyName:'灌木',
        count:1,
        childItem:[
          {
            img: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1977270962,2808007120&fm=5',
            birdName:'啦啦啦啦'
          },
          {
            img: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1977270962,2808007120&fm=5',
            birdName: '啦啦啦啦'
          }
        ]
        
      },
      {
        familyName: '藤类',
        count: 1,
        childItem: [
          {
            img: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1977270962,2808007120&fm=5',
            birdName: '啦啦啦啦'
          },
          {
            img: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1977270962,2808007120&fm=5',
            birdName: '啦啦啦啦'
          },
          {
            img: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1977270962,2808007120&fm=5',
            birdName: '啦啦啦啦'
          },
          {
            img: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1977270962,2808007120&fm=5',
            birdName: '啦啦啦啦'
          }
        ]

      },
      {
        familyName: '青草',
        count: 1,
        childItem: [
          {
            img: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1977270962,2808007120&fm=5',
            birdName: '啦啦啦啦'
          },
          {
            img: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1977270962,2808007120&fm=5',
            birdName: '啦啦啦啦'
          }
        ]

      },
      {
        familyName: '蕨类',
        count: 1,
        childItem: [
          {
            img: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1977270962,2808007120&fm=5',
            birdName: '啦啦啦啦'
          },
          {
            img: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1977270962,2808007120&fm=5',
            birdName: '啦啦啦啦'
          }
        ]

      }
    ]
  },
  // 点击目分类时
  tabChange: function (e) {
    let that = this
    that.setData({
      activeIndex: e.target.dataset.index,
      
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
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