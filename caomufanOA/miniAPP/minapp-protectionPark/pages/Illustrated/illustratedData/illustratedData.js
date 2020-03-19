// pages/Illustrated/illustratedData/illustratedData.js
Page({

  /**
   * 页面的初始数据
   * 
   * searchId 要搜索的ID
   * typeData 展示的类型  （植物或动物）
   * dImgList 展示的轮播图数组
   * showData 展示的数据
   */
  data: {
    searchId:'',
    typeData:'adimall',
    imgDataList: [
      'https://tpc.googlesyndication.com/daca_images/simgad/18459128420976898',
      'https://tpc.googlesyndication.com/daca_images/simgad/18459128420976898'
    ],
    showData: {
      dataName:'飞天树木',
      pinYin:'wàng tiān shù',
      scientificName:'Parashorea chinensis Wang Hsie',
      orderName:'水瓶座一代目',
      familyName:'语文科',
      genusName: '属于你',
      chinaLv:'一级',
      cnRedLv:'一级',
      iucnLv:'十六级',
      citesLv:'三十级',
      details:[
        {
          title:'奇怪东西',
          content:'七奇怪怪'
        },
        {
          title: '奇怪东西',
          content: '七奇怪怪'
        }
      ]
    }
  },
  // 图片点击预览放大
  imgBig: function (event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-lis
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表

    })

  },
  // 获取数据
  getDataShow:function(){
    var that = this
    let _typeData = that.data.typeData
    if (_typeData == 'animall') {
      wx.showToast({
        title: '正在加载动物数据...',
        icon: 'loading',
        duration: 1000
      });
    } else if (_typeData == 'plant') {
      wx.showToast({
        title: '正在加载植物数据...',
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    // 判断是否为模糊查找
    if (options.type) {
      that.setData({
        searchId: options.itemID,
        typeData: options.type
      })
      that.getDataShow()
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