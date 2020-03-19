// pages/AudioDistinguish/AudioResult/audioresult.js

import { audioReco, getAudioShare } from '../../../Api/AudioDistinguish/AudioResult.js'

Page({

  /**
   * 页面的初始数据
   * pageHeight 页面高度
   * randomList 柱子随机数列表
   * dataList 匹配数据列表
   * audioUrl 音频路径
   * playStatus 音频播放状态
   * voiceAnimaStatus 声纹动画状态
   * recoID 分享ID
   * shareName 分享鸟名
   *  shareImg  分享展示图片
   */
  data: {
    pageHeight: 0,
    randomList: [],
    dataList:[
      
    ],
    pageData: {},
    audioUrl:'',
    playStatus:false,
    voiceAnimaStatus:false,
    recoID: 0,
    shareName:'某种鸟',
    shareImg:'../../../images/Share/default.png'

  },
  // 点击查看详情跳转
  goDataPage: function (e) {
    console.log(e.currentTarget.dataset.birdid)
    let birdid = e.currentTarget.dataset.birdid
    let birdName = e.currentTarget.dataset.birdName
    if (birdid != null && birdName != '非鸟类' && birdid != '') {
      wx.navigateTo({
        url: '/pages/Illustrated/BirdData/BirdData?birdID=' + birdid
      })
    } else if (birdName == '非鸟类') {
      wx.showToast({
        title: '非鸟类，暂无该信息',
        icon: 'none',
        duration: 1500
      });
    } else {
      wx.showToast({
        title: '数据库未录入该鸟类',
        icon: 'none',
        duration: 1500
      });
    }

  },
  // 播放录音
  recordingAndPlaying() {
    var that =this
    var res = wx.getSystemInfoSync()
    if (res.platform == 'ios') {
      that.audio = wx.getBackgroundAudioManager()
    } else {
      that.audio = wx.createInnerAudioContext();
    }

    that.audio.title = "音乐文件";
    that.audio.src = that.data.audioUrl;
    if (that.data.playStatus === false) {
      console.log('开始播放')
      that.audio.play();
      that.setData({
        playStatus: true,
        voiceAnimaStatus:true
      })
      // 执行动画
      that.newrandom()
      that.audio.onEnded(()=>{
        console.log(12)
        that.setData({
          playStatus: false,
          voiceAnimaStatus: false
        })
      })
    }else{
      //点击暂停
      that.audio.stop();
      console.log('停止播放')
      that.setData({
        playStatus: false,
        voiceAnimaStatus: false
      })
      
    }
   
    

  },
  // 声纹动画
  newrandom: function () {
    const that = this;
    let _randomList = []
    // colNum 获取生成的柱子个数
    let colNum = Math.floor((wx.getSystemInfoSync().windowWidth) / 4)+1;

    // randomNum 生成一个加或减少随机数
    let randomNum = 0;
    let signs = 1;//1为=加；2为减
    let newHeight = 50;
    for (var i = 0; i < colNum; i++) {

      randomNum = (Math.random()) * 30;
      signs = Math.floor(Math.random() * 2 + 1);
      if (signs == 1) {
        newHeight = newHeight + randomNum
      } else if (signs == 2) {
        newHeight = newHeight - randomNum
      }
      if (newHeight > 180) {
        newHeight = newHeight - randomNum - randomNum
      } else if (newHeight < 0 || newHeight == 0) {
        newHeight = newHeight + randomNum + randomNum
      }

      //+1是为了避免为0
      if (signs == 1) {
        _randomList[i] = { 'height': newHeight, 'time': 2 + 0.5 * (Math.random()) }
      } else if (signs == 2) {
        _randomList[i] = { 'height': newHeight, 'time': 2 - 0.5 * (Math.random()) }
      }


    }

    that.setData({
      randomList: _randomList
    });
    if (that.data.voiceAnimaStatus) {
    setTimeout(function () { that.newrandom(); }, 1500);
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
  // 获取音频识别的列表
  getAudioReco: function () {
    var that = this
    wx.showToast({
      title: '正在加载数据...',
      icon: 'loading',
      duration: 100000
    });
    let res = that.data.pageData
    console.log(res)
      wx.hideToast()
      if (res.messageType === 0) {
        let _dataList = res.result.birds
        for (let i in _dataList) {
          _dataList[i].similarity = (_dataList[i].similarity * 100).toFixed(2)
          if (i == 0) {
            // 给分享数据赋值
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
   
  },

  // 获取鸟类图片识别分享数据
  getAudioShare: function () {
    var that = this
    wx.showToast({
      title: '正在加载数据...',
      icon: 'loading',
      duration: 100000
    });
    getAudioShare({
      recoID: that.data.recoID
    }).then(res => {
      console.log(res)
      wx.hideToast()
      if (res.data.messageType === 0) {
        let _dataList = res.data.result.birds

        for (let i in _dataList) {
          _dataList[i].similarity = (_dataList[i].similarity * 100).toFixed(2)
          // 给分享数据赋值
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
          audioUrl: res.data.result.audioUrl,
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
    var that =this
    that.pageSetHeight()


    if (options.audioUrl) {
      that.setData({
        audioUrl: options.audioUrl
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
        audioUrl: options.audioUrl,
        recoID: options.recoID
      })
      // 读取识别数据
      that.getAudioShare()
    } else {
      // 进行识别
      that.getAudioReco()
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
    this.newrandom()
    // getUrlParam('url')
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
   * shareName:'',
    shareImg:''
   */
  onShareAppMessage: function () {
    var that=this
    return {
      title: '我通过声音识别了“ ' + that.data.shareName+' ”',
      path: ' /pages/AudioDistinguish/AudioResult/audioresult?audioUrl=' + this.data.audioUrl + '&recoID=' + this.data.recoID,
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