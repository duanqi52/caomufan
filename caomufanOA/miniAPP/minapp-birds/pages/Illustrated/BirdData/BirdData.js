// pages/Illustrated/BirdData/BirdData.js

import { getBirdsDetail } from '../../../Api/Illustrated/BirdData.js'

var sysRes = wx.getSystemInfoSync()
if (sysRes.platform == 'ios') {
  var innerAudioContext = wx.getBackgroundAudioManager()
} else {
  var innerAudioContext = wx.createInnerAudioContext();
}


Page({

  /**
   * 页面的初始数据
   * birdImgList 鸟图片列表
   * birdID 鸟ID
   * playUrl 鸟声录音播放
   * birdData 鸟详细数据
   * shareImg 分享展示的图片
   * shareName 分享展示的鸟名
   * showPlayer  播放状态
   * aduioDuration 录音时长
   * count // 设置播放动画 计数器 初始为0
   * countTimer // 设置播放动画  定时器 初始为null
   * intervalStatus  // 设置播放动画状态  定时器 初始为null
   */
  data: {
    birdImgList:[],
    birdID:'01C1957C-71E4-4050-9887-9CCCDDC0DDAE',
    playUrl:'',
    birdData:{},
    shareImg:'../../../images/Share/default.png',
    shareName:'某种鸟',
    showPlayer:true,
    aduioDuration:0,
    playerTimer:null,
    count: 0, 
    countTimer: null, // 设置 定时器 初始为null
    intervalStatus:false

  },
  // 停止音频
  stopAudio(){
    console.log('停止')
    var that=this
    that.setData({
      showPlayer: true,
      count: 0
    })
    that.drawCircle(0)
    clearInterval(that.data.countTimer);
    clearTimeout(that.data.playerTimer)
    innerAudioContext.stop()
    innerAudioContext.onStop(() => {
      console.log('进入停止结束')
     
    
     
  
 
    });

    
  },
  // 播放录音与停止播放
  playAudio() {

    var that = this
 
    let _playUrl = that.data.playUrl
    // let _playUrl ='https://oss.caomufan.net/Birds/Records/1d7ad031d77a4a669fa3ca3af14996fd.mp3'
    if (_playUrl != '' && _playUrl != null && _playUrl!=undefined)
    {
      that.setData({
        showPlayer: false,
      })
      console.log('播放')
      // 获取录音长度并赋值
      let _duration = 0
      innerAudioContext.title = "鸟类叫声";
      innerAudioContext.src = that.data.playUrl;
      // innerAudioContext.src = 'https://oss.caomufan.net/Birds/Records/1d7ad031d77a4a669fa3ca3af14996fd.mp3'
        //音频进入可以播放状态，但不保证后面可以流畅播放
        innerAudioContext.onCanplay(() => {
          innerAudioContext.duration //类似初始化-必须触发-不触发此函数延时也获取不到
          
          setTimeout(function () {
            _duration = innerAudioContext.duration
            that.setData({
              aduioDuration: _duration
            })
            console.log(that.data.aduioDuration)
            // wx.showToast({
            //   title: that.data.aduioDuration + '时间1' ,
            //   'icon': 'none',
            //   duration: 1000
            // })
          },700)
             
        })
      console.log(that.data.showPlayer)
      if (!that.data.showPlayer) {
         console.log(that.data.showPlayer)
        that.data.playerTimer=setTimeout(function () {
         
            that.countInterval()
            innerAudioContext.play()
          
          // //正常播放结束
          innerAudioContext.onEnded(() => {
            console.log('播放结束')
            that.setData({
              showPlayer: true,
            })
            that.stopAudio()
            innerAudioContext.stop();
          });
        },1000)
      }else{
        return
      }
     
    }else{
      wx.showToast({
        title: '数据库未录入该声音',
        icon: 'none',
        duration: 1000
      });
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
  // 获取鸟类详情
  getBirdData:function(){
    var that=this
    wx.showToast({
      title: '正在加载数据...',
      icon: 'loading',
      duration: 100000
    });
    getBirdsDetail({
      birdID: that.data.birdID
    }).then(res=>{
      console.log(res)
      wx.hideToast()
      if (res.data.messageType === 0) {
        that.setData({
          birdData: res.data.result,
          birdImgList: res.data.result.imgs,
          playUrl: res.data.result.vioceUrl
        })     
        that.getShitTime()
        // 给分享数据赋值      
          var _img = res.data.result.imgs[0]
          var _birdName = res.data.result.birdName
          if (_img != '' && _img != null) {
            that.setData({
              shareImg: _img,
              shareName: _birdName
            })
          } else {
            that.setData({
              shareImg: '../../../images/Share/default.png',
              shareName: _birdName
            })

          }        
      } else {
        wx.showToast({
          title: res.data.message,
          'icon': 'none',
          duration: 1000
        })
      }    

    })
  },
  // 播放动画计时器
  countInterval: function () {
   
     var that=this
    let setp = 0
    let _aduioDuration = that.data.aduioDuration*10
    // wx.showToast({
    //   title: _aduioDuration + '进来了yi' + that.data.count,
    //   'icon': 'none',
    //   duration: 2000
    // })
    if (_aduioDuration==0)
    {
      setTimeout(function(){
        _aduioDuration = that.data.aduioDuration * 10
        console.log('动画')
        // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
        that.data.countTimer = setInterval(() => {
          // wx.showToast({
          //   title: _aduioDuration + '进来了er' + that.data.count,
          //   'icon': 'none',
          //   duration: 2000
          // })
          if (that.data.count <= _aduioDuration) {
            /* 绘制彩色圆环进度条  
            注意此处 传参 step 取值范围是0到2，
            所以 计数器 最大值 60 对应 2 做处理，计数器count=60的时候step=2
            */

            setp = (that.data.count / (_aduioDuration / 2)).toFixed(2)

            that.drawCircle(setp)
            that.data.count++;


          } else {

            clearInterval(that.data.countTimer);
            that.setData({
              count: 0
            })
            that.drawCircle(0)
          }
        }, 100)
      },1000)
     
    }else{
      
      console.log('动画')
      // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
      that.data.countTimer = setInterval(() => {
        // wx.showToast({
        //   title: _aduioDuration + '进来了san' + that.data.count,
        //   'icon': 'none',
        //   duration: 2000
        // })
        if (that.data.count <= _aduioDuration) {
          /* 绘制彩色圆环进度条  
          注意此处 传参 step 取值范围是0到2，
          所以 计数器 最大值 60 对应 2 做处理，计数器count=60的时候step=2
          */

          setp = (that.data.count / (_aduioDuration / 2)).toFixed(2)

          that.drawCircle(setp)
          that.data.count++;


        } else {

          clearInterval(that.data.countTimer);
          that.setData({
            count: 0
          })
          that.drawCircle(0)
        }
      }, 100)
    }
 
    
  },
  // 圆圈动画
  drawCircle: function (step) {
    // console.log(step)
  
     let arc_rem = 0
     wx.getSystemInfo({
       success: function (res) {
         arc_rem = res.windowWidth / 750

         var context = wx.createCanvasContext('canvasProgress', this);
         context.setStrokeStyle('#ddd');
         context.setLineWidth(arc_rem * 3);

         context.setLineCap('round')
         context.beginPath();
         // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
         // context.arc((arc_rem * 86) / 2, (arc_rem * 86) / 2, (arc_rem * 81)/ 2 , -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
         context.arc((arc_rem * 86) / 2, (arc_rem * 86) / 2, (arc_rem * 81) / 2, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
         context.stroke();
         context.draw()
       }
     })
  
  },
  // 生成底部声音按钮的默认圆
  drawProgressbg: function () {
    console.log(12)
    let arc_rem = 0
    wx.getSystemInfo({
      success: function (res) {
        arc_rem = res.windowWidth / 750
        // 使用 wx.createContext 获取绘图上下文 context
        var ctx = wx.createCanvasContext('canvasProgressbg', this)
        ctx.setLineWidth(arc_rem*3);// 设置圆环的宽度
            ctx.setStrokeStyle('#74b113'); // 设置圆环的颜色
        ctx.setLineCap('round') // 设置圆环端点的形状
        ctx.beginPath();//开始一个新的路径
        ctx.arc((arc_rem * 86) / 2, (arc_rem * 86) / 2, (arc_rem * 81) / 2, 0, 2 * Math.PI, false);
        //设置一个原点(110,110)，半径为100的圆的路径到当前路径
        ctx.stroke();//对当前路径进行描边
        ctx.draw();
        console.log(1233)
      }
    })
    
  },
  // 获取bug时间
  getShitTime(){
    var that=this
    console.log(1)
    innerAudioContext.title = "鸟类叫声";
    innerAudioContext.src = that.data.playUrl;
    let _duration=0
    // innerAudioContext.src = 'https://oss.caomufan.net/Birds/Records/1d7ad031d77a4a669fa3ca3af14996fd.mp3'
    //音频进入可以播放状态，但不保证后面可以流畅播放
    innerAudioContext.onCanplay(() => {
      innerAudioContext.duration //类似初始化-必须触发-不触发此函数延时也获取不到

      setTimeout(function () {
        _duration = innerAudioContext.duration
        that.setData({
          aduioDuration: _duration
        })
        
        // wx.showToast({
        //   title: _duration + '时间1',
        //   'icon': 'none',
        //   duration: 1000
        // })
        console.log(that.data.aduioDuration)
      }, 1000)

    })
    innerAudioContext.play()
    innerAudioContext.stop()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that=this
    // setTimeout(function () {
    //   that.drawProgressbg()
    //   that.countInterval()
    // }, 100)
   
    // 判断ID并赋值
    if (options.birdID && options.birdID !='null') {
      that.setData({
        birdID: options.birdID
      })

      that.getBirdData()
    }else{
      wx.showToast({
        title: '错误的id',
        icon: 'loading',
        duration: 1000
      });
      setTimeout(function(){
        wx.reLaunch({
          url: '/pages/index/index'
        });
      },1000)
     
     
    }
   
    
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   var that=this
    setTimeout(function () {
      that.drawProgressbg()
      // that.countInterval()
    }, 100)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this

    // that.drawProgressbg()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.stopAudio()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var that=this
    this.stopAudio()
    clearInterval(that.data.countTimer);
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
   * shareImg 分享展示的图片
   * shareName 分享展示的鸟名
   */
  onShareAppMessage: function () {
    var that=this
    return {
      title: '我分享了“ '+that.data.shareName+' ”，快来看看吧',
      path: '/pages/Illustrated/BirdData/BirdData?birdID=' + this.data.birdID,
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