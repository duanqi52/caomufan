// pages/Illustrated/animalIllustrated/animalIllustrated.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listHeight: 0,
    activeIndex: 0,
    classIndex:0,
    ListDataShow: [
      '叶足动物',
      '缓步动物',
      '有爪动物',
      '腹毛动物',
      '轮虫动物',
      '鳃曳动物',
      '动吻动物',
      '铠甲动物',
      '内肛动物',
      '环口动物',
      '舌形动物',
      '微颚动物',
      '颚胃动物',
      '腕足动物',
      '外肛动物',
      '帚虫动物',
      '古虫动物',
      '棘皮动物门',

    ],
    RightDataShow: [
      {
        familyName: '服务服务',
        count: 1,
        childItem: [
          {
            img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3068422679,2383213749&fm=26&gp=0.jpg',
            birdName: '啦啦啦啦'
          },
          {
            img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3068422679,2383213749&fm=26&gp=0.jpg',
            birdName: '啦啦啦啦'
          }
        ]

      },
      {
        familyName: '服务服务',
        count: 1,
        childItem: [
          {
            img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3068422679,2383213749&fm=26&gp=0.jpg',
            birdName: '啦啦啦啦'
          },
          {
            img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3068422679,2383213749&fm=26&gp=0.jpg',
            birdName: '啦啦啦啦'
          },
          {
            img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3068422679,2383213749&fm=26&gp=0.jpg',
            birdName: '啦啦啦啦'
          },
          {
            img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3068422679,2383213749&fm=26&gp=0.jpg',
            birdName: '啦啦啦啦'
          }
        ]

      },
      {
        familyName: '服务服务',
        count: 1,
        childItem: [
          {
            img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3068422679,2383213749&fm=26&gp=0.jpg',
            birdName: '啦啦啦啦'
          },
          {
            img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3068422679,2383213749&fm=26&gp=0.jpg',
            birdName: '啦啦啦啦'
          }
        ]

      }
    ],
    classData:[
      '蛇纲',
      '蜘蛛纲',
      '非洲大鸭舌纲',
      '虫纲',
      '蒜头王八纲',
      '蛇纲',
      '蛇纲',
     
      
    ]
  },
  // 点击纲分类时
  classChange: function (e) {
    let that = this
    that.setData({
      classIndex : e.target.dataset.index,

    })


  },
  // 点击目分类时
  tabChange: function (e) {
    let that = this
    that.setData({
      activeIndex: e.target.dataset.index,

    })


  },
  // 设置页面的一些基本参数
  setPageInit:function(){
    var that = this
    //  设置列表高度
    let searchH = wx.createSelectorQuery();
    searchH.select('.SearchBox').boundingClientRect()
    searchH.select('.classBox').boundingClientRect()
    searchH.exec((res) => {

      var searchHeight = res[0].height; // 获取搜索框高度
        var classHeight = res[1].height;
      
        // 获取页面高度
        let winHeight = wx.getSystemInfoSync().windowHeight;
        this.setData({
          listHeight: winHeight - searchHeight - classHeight
        })
     

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
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