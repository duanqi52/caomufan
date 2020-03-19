// pages/audio/audio.js

import { audioReco } from '../../../Api/AudioDistinguish/Audio'

import { alioss,uploadUserInfo} from '../../../Api/other.js'

var common = require('../../../Api/AudioDistinguish/Audio')

const recorderManager = wx.getRecorderManager()
var sysRes = wx.getSystemInfoSync()
if (sysRes.platform == 'ios') {
  var innerAudioContext= wx.getBackgroundAudioManager()
} else {
  var innerAudioContext= wx.createInnerAudioContext();
}


//  = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   * sysHeight 当前页面的一些高度
   * -----pageHeight 页面高度
   * -----btnHeight   按钮的高度
   * status 状态管理
   * -----loadingStatus  加载层显示状态
   * -----animationStatus 开始录音的状态
   * -----soundRecordingStatus 录音进度状态是否为已录音完
   * -----uploadStatus 开始上传按钮的状态
   * -----voiceAnimaStatus 声纹动画的状态
   * playColl 播放管理
   * -----playStatus  播放或停止状态
   * -----audioTime //录音计时
   * -----audioTimeShow //录音计时
   * -----setInter  //录音名称
   * -----playUrl   录音路径
   * animation 已显示动画
   * -----animationData1  第一个已显示圈的动画
   * -----animationData2  第一个已显示圈的动画
   * randomList  随机数列表
   * _colNum  声纹柱子个数
   * timeOver 播放录音倒计时

   */
  data: {
    sysHeight:{
      pageHeight: 0,
      btnHeight: 0,
    },
    status:{
      loadingStatus: false,
      animationStatus: false,
      soundRecordingStatus: false,
      uploadStatus: false,
      voiceAnimaStatus: false,
    },    
    playColl:{
      playStatus: false,
      audioTime: 0,
      audioTimeShow:0,
      setInter: "",
      playUrl: ''
    },
    animation:{
      animation1: "",
      animation2: "",
    },
    randomList: [],
    _colNum:0,
    timeOver:''
  },
  // 上传前的获取授权
  getUserInfoNow:function(e){
    console.log(e)
    if(e.detail.errMsg=="getUserInfo:fail auth deny")
    {
      wx.showToast({
        title:'识别语音需要您允许授权！',
        icon: 'none',
        duration: 2000
      });
      console.log('拒绝授权')
    }else if(e.detail.errMsg=="getUserInfo:ok")
    {
      console.log('同意授权')
      uploadUserInfo({
        'encryptedData': e.detail.encryptedData,
        'iv':e.detail.iv
      }).then(res=>{
        console.log(res)
        this.updataGo()
      })
    }else{
      console.log('错误了啊')
    }
    
  },
  // 上传音频
  updataGo:function(){
    
    var that=this
    // 显示屏蔽加载层
    let _status=this.data.status
    _status.loadingStatus=true
    that.setData({
      status:_status
    })
    // console.log(that.data.playColl.playUrl)
  //  setTimeout(
  //    function(){
  //      alioss({
  //        data: {
  //          'ossFolder': 'record',
  //          'uploadResult': '0'
  //        },
  //        filePath: that.data.playColl.playUrl
  //      }).then(res => {
  //        // 隐藏屏蔽加载层
  //        _status.loadingStatus = false
  //        that.setData({
  //          status: _status
  //        })
  //        let data = JSON.parse(res.data)
  //       //  console.log(data.result.url)
  //        if (data.messageType === 0) {
  //          wx.navigateTo({
  //            url: '/pages/AudioDistinguish/AudioResult/audioresult?audioUrl=' + data.result.url
  //          })
  //        }
  //        else {
  //          wx.showToast({
  //            title: data.message,
  //            icon: 'loading',
  //            duration: 2000
  //          });
  //        }
  //        console.log(JSON.parse(res.data))
  //      })
  //    },1000
  //  )
    setTimeout(
      function () {
        audioReco({
          data: {
            'ossFolder': 'record',
            'uploadResult': '0'
          },
          filePath: that.data.playColl.playUrl
        }).then(res => {
          console.log(res)
          // 隐藏屏蔽加载层
          _status.loadingStatus = false
          that.setData({
            status: _status
          })
          let data = JSON.parse(res.data)
          console.log(JSON.parse(res.data))
          console.log(JSON.parse(res.data))
          let strData = JSON.stringify(data)
          console.log(strData)
          console.log('audioData = ' + that.data.playColl.playUrl + ' & data=' + strData)
          if (data.messageType === 0) {
            wx.navigateTo({
              url: '/pages/AudioDistinguish/AudioResult/audioresult?audioUrl=' + that.data.playColl.playUrl + '&data=' + strData
            })
          }
          else {
            wx.showToast({
              title: data.message,
              icon: 'loading',
              duration: 2000
            });
          }
          // console.log(JSON.parse(res.data))
        })
      }, 1000
    )



   
  },

  // 点击开始按钮
  recodeClick: function () {
    // 判断录音授权
    this.getPermission()
  },
  // 结束录音按钮
  recodeEnd: function () {
    var that = this;
    clearInterval(that.data.setInter);
    that.animationEnd()
    recorderManager.stop();
    console.log(12);
    recorderManager.onStop(function(res){
      console.log(1);
      console.log('。。停止录音。。', res.tempFilePath)
      let _status = that.data.status
      _status.voiceAnimaStatus = false
      let _playColl = that.data.playColl
      _playColl.playUrl = res.tempFilePath
      that.setData({
        status: _status,
        playColl: _playColl
      })

    })

  },
  // 播放录音与停止播放
  playAudio() {

    var that = this
    innerAudioContext.title = "音乐文件";
    let _playColl = that.data.playColl
    let _status = this.data.status
    innerAudioContext.src = _playColl.playUrl;
    var interval;
    
    if (_playColl.playStatus===false)
    {
       _playColl.playStatus = true
      console.log('开始播放')
      innerAudioContext.play()
      
      // 执行动画
      _status.voiceAnimaStatus = true
      that.setData({
        status: _status
      })
      this.newrandom()

      // 执行倒计时
      let t = 0
      that.setData({
        status: _status,
        timeOver: setInterval(function () {
          
          _playColl.audioTimeShow = t
   
          that.setData({
            playColl: _playColl
          })
          t++
          if (t > _playColl.audioTime) {
            _status.voiceAnimaStatus = false
            _playColl.playStatus = false
            that.setData({
              status: _status,
              playColl: _playColl
            })
            clearInterval(that.data.timeOver);
          }

        }, 1000)
      })
     
    }else{
      
      //点击暂停
      innerAudioContext.stop();
      console.log('停止播放')
      // 停止开始播放时动画
      clearInterval(that.data.timeOver);
      _status.voiceAnimaStatus = false
      _playColl.playStatus = false
      _playColl.audioTimeShow = _playColl.audioTime 
  
      that.setData({
        status: _status,
        playColl: _playColl
      })
      
    }

    // //正常播放结束
    innerAudioContext.onEnded(() => {
      innerAudioContext.stop();
      _playColl.playStatus = false
      _playColl.audioTimeShow = that.data.playColl.audioTime  

      this.setData({
        playColl: _playColl
      })
    });

  },
  // 重新录制
  againaudio:function(){
    let _status = this.data.status
    _status.uploadStatus = false
    _status.animationStatus = false
    _status.soundRecordingStatus = false
    let _playColl = this.data.playColl
    _playColl.audioTime = 0
    _playColl.audioTimeShow = 0
    this.setData({
      status: _status,
      playColl: _playColl
    })
  
  },
  //录音计时器
  recordingTimer: function () {
    var that = this;
    //将计时器赋值给setInter
    that.data.setInter = setInterval(
      function () {
        var time = that.data.playColl.audioTime + 1;
        if(time<15)
        {
          let _playColl = that.data.playColl
          _playColl.audioTime = time
          _playColl.audioTimeShow = time

          that.setData({
            playColl: _playColl
          })
        }else{
          clearInterval(that.data.setInter)
        }
        

      }
      , 1000);
  },
  
  

  // 授权后开始正式录音
  startAudio:function(){
    let that = this;
    let _status = this.data.status
    _status.soundRecordingStatus = true
    _status.voiceAnimaStatus = true
    this.setData({
      status: _status
    })
    this.animationStart()
    const options = {
      duration: 15000, //指定录音的时长，单位 ms，最大为10分钟（600000），默认为1分钟（60000）
      sampleRate: 16000, //采样率
      numberOfChannels: 1, //录音通道数
      encodeBitRate: 96000, //编码码率
      format: 'mp3', //音频格式，有效值 aac/mp3
      frameSize: 50, //指定帧大小，单位 KB
    }

    //开始触发录音计时器   
    that.recordingTimer();
    //开始录音
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log('。。。开始录音。。。')
  
    });
    //录音达到最大时长时触发结束录音
    recorderManager.onStop((res) => {
    
      that.animationEnd()
      clearInterval(that.data.setInter);
        console.log('。。停止录音。。', res.tempFilePath)
        let _status = that.data.status
        _status.voiceAnimaStatus = false
        let _playColl = that.data.playColl
        _playColl.playUrl = res.tempFilePath
        that.setData({
          status: _status,
          playColl: _playColl
        })
    
    })
  },
  // 获取录音授权
  getPermission: function () {
    var that = this;
    wx.authorize({
      scope: 'scope.record',
      success() {
        console.log("录音授权成功");
        // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
        // wx.startRecord();
        that.startAudio()//使用新版录音接口，可以获取录音文件
      },
      fail() {
        wx.showModal({
          title: '是否录音',
          content: '是否录音',
          success: function (tip) {
            if (tip.confirm) {
              // wx.authorize({
              wx.openSetting({
                scope: 'scope.record',
                success: function (data) {
                  // console.log(data)
                  if (data.authSetting["scope.record"] === true) {
                    wx.showToast({
                      title: '授权成功',
                      icon: 'success',
                      duration: 1000
                    })

                  } else {
                    wx.showToast({
                      title: '授权失败',
                      icon: 'success',
                      duration: 1000
                    })
                  }
                }, fail(res) {
                  // authorize: fail auth deny
                  console.log(res)
                }
              })
            }
          }
        })
      }
      })
  },

  // 结束录音动画
  animationEnd:function(){
    var that =this
    let animation1 = wx.createAnimation({
      duration: 700
    })
    animation1.opacity(0.2).scale(1.25, 1.25).step();
    let animation2 = wx.createAnimation({
      duration: 1400
    })
    animation2.opacity(0.2).scale(1.5, 1.5).step();
    let _animation = this.data.animation
    _animation.animationData1 = animation1.export()
    _animation.animationData2 = animation2.export()
    that.setData({
      animation: _animation
    })
    let _status = this.data.status
    _status.animationStatus = false
    _status.uploadStatus=true
    that.setData({
      status: _status
    })
  },

  // 开始录音动画
  animationStart: function () {
    let animation1 = wx.createAnimation({
      duration: 700
    })
    animation1.opacity(0.1).scale(1, 1).step();
    let animation2 = wx.createAnimation({
      duration: 1400
    })
    animation2.opacity(0.2).scale(1, 1).step();
    let _animation = this.data.animation
    _animation.animationData1 = animation1.export()
    _animation.animationData2 = animation2.export()
    this.setData({
      animation: _animation
    })
    let _status = this.data.status
    _status.animationStatus = true
    this.setData({
      status: _status
    })
    // 开始动画触发
    this.newrandom()
    
  },

// 声纹动画
  newrandom: function () {
    const that = this;
    let _randomList = []
    let colNum =0
    // colNum 获取生成的柱子个数
    //  设置列表高度
    let winWidth = wx.getSystemInfoSync().windowWidth;

       // 获取搜索框高度
    var searchHeight = winWidth*380/750;
    
      colNum = searchHeight/4+1
      // console.log(colNum)
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
        if (newHeight > 150) {
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
 
    if (that.data.status.voiceAnimaStatus)
    {
      // 定时执行动画
      setTimeout(function () { that.newrandom(); }, 1500);    
    }
      
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let winHeight = wx.getSystemInfoSync().windowHeight;
    let _sysHeight = this.data.sysHeight
    _sysHeight.pageHeight = winHeight
    this.setData({
      sysHeight: _sysHeight
    })

    //  设置列表高度
    let searchH = wx.createSelectorQuery();
    searchH.select('.Bottom').boundingClientRect()
    searchH.exec((res) => {
      var searchHeight = res[0].height; // 获取搜索框高度
     
      // 获取页面高度
      let _sysHeight = this.data.sysHeight
      _sysHeight.btnHeight = winHeight - searchHeight
      this.setData({
        sysHeight: _sysHeight
      })
    
    })
    let _status = this.data.status
    _status.animationStatus = false
    _status.uploadStatus = false
    this.setData({
      status: _status
    })
 
    
    

  
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.createSelectorQuery()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    that.onLoad()
    // that.setData({
    //   status: {
    //     loadingStatus: false,
    //     animationStatus: false,
    //     soundRecordingStatus: false,
    //     uploadStatus: false,
    //     voiceAnimaStatus: false,
    //   }
    // })
    that.againaudio()
    
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
   var that=this
    clearInterval(that.data.setInter);
    clearInterval(that.data.timeOver);
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