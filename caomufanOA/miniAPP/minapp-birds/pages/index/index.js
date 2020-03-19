//index.js
//获取应用实例
import { wxlogin, uploadUserInfo, alioss} from '../../Api/other.js'
// const app = getApp()


/**data说明
 * 
 * loadingStatus 透明层loding状态
 * 
 */



Page({
  data: {
    loadingStatus: false,

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 获取用户信息
  getUserInfoNow:function(e){
    console.log(e)
    if(e.detail.errMsg=="getUserInfo:fail auth deny")
    {
      console.log('拒绝授权')
    }else if(e.detail.errMsg=="getUserInfo:ok")
    {
      console.log('同意授权')
      uploadUserInfo({
        'encryptedData': e.detail.encryptedData,
        'iv':e.detail.iv
      }).then(res=>{
        console.log(res)
      })
    }else{
      console.log('错误了啊')
    }
    
  },
  // 判断登录是否过期
  checkLoginnNow: function (e) {
    let that=this
    wx.checkSession({
      success(res) {
        console.log(res)
        wx.getStorage({
          key: 'token',
          success: function(res) {
            if (res.data === undefined || res.data === '') {
              that.loginNow()
            }
          },fail:function(res){
            if (res.data === undefined || res.data ==='')
            {
              that.loginNow()
            }
          },
        })
        //token 未过期，并且在本生命周期一直有效
      },
      fail(res) {
        //token 已经失效，需要重新执行登录流程
        // console.log(res)
        that.loginNow() //重新登录
      }
    })
  },
  // 登录
  loginNow: function (e) {
    wx.showLoading({
      title: '登录中',
      mask:true
    })
    wx.login({      
      success(res) {
        console.log(res)
        wxlogin({
          'code':res.code
        }).then(res2=>{
        wx.hideLoading()
          if (res2.data.messageType === 0)
          {
            wx.setStorage({
              key: 'token',
              data: res2.data.result.session,
            })
          }else{
             wx.showToast({
               title: '登录失败...' ,
              icon: 'loading',
              duration: 2000
            });
          }
          
        })

      }
    })
  },
  onLoad: function (options) {
    this.checkLoginnNow()
    // console.log(options)

    // 当其他页面判断没有登录时进行判断登录
    if (options.loginStatus =='false')
    {
      this.loginNow()
    }
    // 上传文件 
    // uploadUserInfo2({ data:'数据', filePath:'路径'})
   
    
  },
  onShareAppMessage: function () {
    return {
      title: '鸟类爱好者的查鸟之选',
      path: '/pages/index/index?from_uid=1',
      imageUrl: '../../images/Share/default.png',
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
