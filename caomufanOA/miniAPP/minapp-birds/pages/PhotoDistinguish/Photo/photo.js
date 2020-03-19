// pages/photo/photo.js

import { alioss,uploadUserInfo } from '../../../Api/other.js'
import { imgReco } from '../../../Api/PhotoDistinguish/Photo.js'

Page({

  /**
   * 页面的初始数据
   * pageHeight 页面高度
   * photoHeight 照相框的高度
   * loadingStatus  加载层显示状态
   * isShowImage 展示照片状态
   * oldImageUrl  原图路径
   * imageUrl 裁剪后图片路径
   * cameraShow  画布显示状态
   */
  data: { 
    pageHeight:0,
    photoHeight:0,
    loadingStatus: false,
    isShowImage:false,
    oldImageUrl:'',
    imageUrl:'',
    cameraShow:true
  },
  // 上传前的获取授权
  getUserInfoNow:function(e){
    console.log(e)
    if(e.detail.errMsg=="getUserInfo:fail auth deny")
    {
      wx.showToast({
        title:'识别图片需要您允许授权！',
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
  // 上传照片
  updataGo: function () {
    var that = this
    wx.showLoading({
      title: '正在上传',
      maskL:true,
      duration:100000
    })
    // 显示屏蔽加载层
    that.setData({
      loadingStatus: true
    })

    console.log(that.data.loadingStatus)
  
      imgReco({
        data: {
          'ossFolder': 'img',
          'uploadResult': '0'
        },
        filePath: that.data.imageUrl
      }).then(res => {
        wx.hideLoading()
        // 隐藏屏蔽加载层
        that.setData({
          loadingStatus: false
        })

        let data = JSON.parse(res.data)
        // console.log(data)
        let strData = JSON.stringify(data)
        console.log(strData)
        if (data.messageType == 0) {
          // console.log(data)
          wx.navigateTo({
            url: '/pages/PhotoDistinguish/PhotoResult/photoresult?imgUrl=' + that.data.imageUrl + '&data=' + strData
          })
        }
        else {
          wx.showToast({
            title: data.message,
            icon: 'none',
            duration: 2000
          });
        }
      })
   
   
  },
  // 重新拍照
  againCrearmGo:function(){
    this.setData({
      isShowImage: false,
      loadingStatus:false,
      oldImageUrl: '',
      imageUrl: ''
    })
  },
  // 选择照片
  firePhoto(){
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album'], //album 从相册选图，camera 使用相机，默认二者都有
      count: 1,
      success: function(res){ 
     
        // console.log(res.tempFilePaths[0])
        
        that.setData({
          oldImageUrl: res.tempFilePaths[0]
        })
        // console.log(that.data.oldImageUrl)
        that.loadTempImagePath(that.data.oldImageUrl);
        // wx.showLoading({
        //   title: '数据处理中...',
        //   icon: 'loading',
        //   duration: 10000
        // })
        
      },
      fail: function () {
        // fail
      },
      complete: function () {

        // complete
      }      

    })
    // setTimeout(function () {
    //   this.loadTempImagePath(this.data.oldImageUrl);
    // }, 1000)
  },
  /** * 点击拍照按钮 */
  takePhotoAction: function () {
  
    this.getPermission()
  },
  // 开始拍照
  startCamera(){
    var that = this
    // this.loadTempImagePath(1)
    that.ctx.takePhoto({
      quality: 'high', //高质量
      success: (res) => {
        this.loadTempImagePath(res.tempImagePath);
        that.setData({
          oldImageUrl: res.tempImagePath
        })


      },
    })
  },
  // 获取拍照授权
  getPermission: function () {
    var that = this;
    wx.getSetting({
      success(res) {
        console.log(res.authSetting)
        console.log(res.authSetting["scope.camera"])
        if (res.authSetting["scope.camera"] === false || res.authSetting["scope.camera"] === undefined) {
          wx.showModal({
            title: '是否拍照',
            content: '是否拍照',
            success: function (tip) {
              if (tip.confirm) {
                wx.openSetting({
                  // scope: 'scope.camera',
                  success: function (data) {
                    if (data.authSetting["scope.camera"] === true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      wx.redirectTo({
                        url: '/pages/PhotoDistinguish/Photo/photo'
                      }) 
                      that.startCamera()
                      //授权成功之后，再调用chooseLocation选择地方
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'success',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else {

          that.startCamera()
        }
      }, fail(res) {

      }
    })
  },
  // 生成画布
  loadTempImagePath: function (options){
    wx.hideLoading()
    var that = this
    that.path = options
    that.setData({
      cameraShow: false,
    })
    // 获取顶部的高度来定义相框的Y轴
    new Promise((resolve) => {
      wx.createSelectorQuery().in(this).select('.BgTopItem').boundingClientRect(function (rect) {
        wx.getSystemInfo({
          success: function (res) {
            // console.log(res)
            // 正方形的位置
            var image_x = res.windowWidth / 7 * 1;
            var image_y = rect.height;
            var image_width = res.windowWidth/7*5;
            var image_height = res.windowWidth / 7 * 5;
        
            // 页面高度
            var winWidth = res.windowWidth;
            var winHeight = res.windowHeight;
            
            wx.getImageInfo({
              src: that.path,
              success: function (res) {
                that.setData({
                  isShowImage: true,
                })
                // 创建 canvas 的绘图
                that.canvas = wx.createCanvasContext("image-canvas", that)
                // 绘制图像到画布
                that.canvas.drawImage(that.path, 0, 0, winWidth, winHeight)
                wx.showLoading({
                  title: '数据处理中...',
                  icon: 'loading',
                  duration: 10000
                })
                // 描绘画布中间边框颜色
                that.canvas.setStrokeStyle('#ddd')
                // 画一个矩形(非填充) 。
                that.canvas.strokeRect(image_x, image_y, image_width, image_height)
                // 将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。
                that.canvas.draw()
                // 延迟待画布生成后进行裁剪
                setTimeout(function () {
                  wx.canvasToTempFilePath({
                    canvasId: "image-canvas",
                    x: image_x, //画布x轴起点
                    y: image_y, //画布y轴起点
                    width: image_width, //画布宽度
                    height: image_height, //画布高度
                    destWidth: image_width, //输出图片宽度
                    destHeight: image_height, //输出图片高度
                    success:(res) =>{
                      // console.log(res)
                      that.setData({
                        imageUrl: res.tempFilePath,
                        cameraShow:true
                      })
                    
                      // console.log(that.data.imageUrl)
                      wx.hideLoading()

                      resolve();
                    },
                    fail: function (e) {
                      console.log(e)
                      wx.hideLoading()
                      that.setData({
                        // imageUrl: res.tempFilePath,
                        cameraShow: true,
                        isShowImage: false
                      })
                      wx.showToast({
                        title: '出错啦...',
                        icon: 'loading'
                      })
                      // if (this.data.skipphotoStatus == 1) {
                      //   wx.redirectTo({
                      //     url: 'addCarInfo/addCarInfo',
                      //   })
                      // } else {
                      //   wx.navigateBack({
                      //     delta: 1
                      //   });
                      // }
                    }
                  })
                },1000)

              }
            })
          }
        })
      }).exec()
    })
    
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 设置中间拍摄区域高度
    let _photoHeight = 750 / 7 * 5;
    // 获取页面高度
    let winHeight = wx.getSystemInfoSync().windowHeight;
    
    this.setData({
      pageHeight: winHeight,
      photoHeight: _photoHeight
    })

    this.ctx = wx.createCameraContext()
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
    var that=this
    that.onLoad()
    that.againCrearmGo()
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