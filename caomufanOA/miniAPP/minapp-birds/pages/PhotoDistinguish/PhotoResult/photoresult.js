// pages/PhotoDistinguish/PhotoResult/photoresult.js

import { imgReco, getImgShare } from '../../../Api/PhotoDistinguish/PhotoResult.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageHeight: 0,
    recoID:0,
    dataList: [
     
    ],
    imgUrl:'',
    pageData:{},
    shareImg:'../../../images/Share/default.png',
    shareName:'某种鸟'
  },
  // 点击查看详情跳转
  goDataPage:function(e){
    console.log(e.currentTarget.dataset.birdid)
    let birdid = e.currentTarget.dataset.birdid
    let birdName = e.currentTarget.dataset.birdName
    if (birdid != null && birdName != '非鸟类'&&birdid != '' )
    {
      wx.navigateTo({
        url: '/pages/Illustrated/BirdData/BirdData?birdID=' + birdid
    })
    } else if (birdName=='非鸟类')
    {
      wx.showToast({
        title: '非鸟类，暂无该信息',
        icon: 'none',
        duration: 1500
      });
    }else{
      wx.showToast({
        title: '数据库未录入该鸟类',
        icon: 'none',
        duration: 1500
      });
    }
    
  },
  // 设置页面高度
  pageSetHeight: function () {
    var that = this
    let winHeight = wx.getSystemInfoSync().windowHeight;
    that.setData({
      pageHeight: winHeight,
    })
  },
  // 获取识别的列表
  getImgReco: function () {
    var that = this
   
    let res=that.data.pageData
    console.log(res)
    if (res.messageType === 0) {
      let _dataList=res.result.birds
      console.log()
      // 相似度赋值
      for (let i in _dataList)
      {
        _dataList[i].similarity = (_dataList[i].similarity * 100).toFixed(2)
        if(i==0)
        {
          if (_dataList[i].img != '' && _dataList[i].img!=null)
          {
            that.setData({
              shareImg: _dataList[i].img,
              shareName: _dataList[i].birdName
            })
          }else{
            that.setData({
              shareImg: '../../../images/Share/default.png',
              shareName: _dataList[i].birdName
            })
          }
        }
      }
        that.setData({
          dataList: _dataList,
          recoID: res.result.recoID
        })
      } else {
        wx.showToast({
          title: res.message,
          'icon': 'none',
          duration: 1000
        })
      }


    // wx.showToast({
    //   title: '正在加载数据...',
    //   icon: 'loading',
    //   duration: 100000
    // });
    // imgReco({
    //   imgurl: that.data.imgUrl
    // }).then(res => {
    //   console.log(res)
    //   wx.hideToast()
    //   if (res.data.messageType === 0) {
    //     that.setData({
    //       dataList: res.data.result.birds,
    //       recoID: res.data.result.recoID
    //     })
    //   } else {
    //     wx.showToast({
    //       title: res.data.message,
    //       'icon': 'none',
    //       duration: 1000
    //     })
    //   }
    // })
  },
  // 放大图片
  bigImg:function(e){

    let url=[]
    url.push(e.target.dataset.url)
    wx.previewImage({
      current: e.target.dataset.url,
      urls: url
    })
  },

  // 获取鸟类图片识别分享数据
  getImgShare: function () {
    console.log(1)
    var that = this
    wx.showToast({
      title: '正在加载数据...',
      icon: 'loading',
      duration: 100000
    });
    getImgShare({
      recoID: that.data.recoID
    }).then(res => {
      console.log(res)
      wx.hideToast()
      if (res.data.messageType === 0) {
        let _dataList = res.data.result.birds

        for (let i in _dataList) {
          _dataList[i].similarity = (_dataList[i].similarity * 100).toFixed(2)
          if (i == 0) {
            if (_dataList[i].img != '' && _dataList[i].img != null) {
              that.setData({
                shareImg: _dataList[i].img,
                shareName: _dataList[i].birdName
              })
            } else {
              that.setData({
                shareImg: '../../../images/Share/default.png',
                shareName: _dataList[i].birdName
              })
            }
          }
        }
        that.setData({
          imgUrl: res.data.result.imgUrl,
          dataList: _dataList,
          recoID: that.data.recoID
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.pageSetHeight()
  

    if (options.imgUrl) {
      that.setData({
        imgUrl: options.imgUrl
      })      
    }

    if (options.data) {
      let data = JSON.parse(options.data)
      that.setData({
        pageData: data
      })
    }

    // 判断是否为分享页面
    if (options.recoID) {
      that.setData({
        imgUrl: options.imgUrl,
        recoID: options.recoID
      })
      // 读取识别数据
      that.getImgShare()
    } else {
      // 进行识别
      that.getImgReco()
    }

    console.log(options)
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
   * 用户点击右上角分享shareImg: '../../../images/Share/default.png',
              shareName:
   */
  onShareAppMessage: function () {
    var that=this
    return {
      title: '我通过图片识别了“ '+that.data.shareName+' ”',
      path: '/pages/PhotoDistinguish/PhotoResult/photoresult?imgUrl=' + this.data.imgUrl + '&recoID=' + this.data.recoID,
      imageUrl: that.data.shareImg,
      success: function (res) { 
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 1000
        });
      }
    }
  }
})