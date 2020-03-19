/**
 * API_URI 一般请求的地址
 * API_URI_COM com类型请求的地址
 * app_version 应用程序的版本
 * app_session 应用程序的session
 */
// const API_URI = 'http://172.19.1.112:9000'
const API_URI = 'https://birds.caomufan.net'
const API_URI_COM = 'https://com.caomufan.net'

const app_session ='838e2e71db2549edb4a549a1d19d83b7'
const app_version = '1.0.0'


// 获取token
function getToken(){
  return new Promise(function (resolve, reject) {
  wx.getStorage({
    key: 'token',
    success(res) {
      resolve(res)
    }, fail(res) {
      reject(res)
    }
  })
  }).catch((e) => { })
}





// 进行请求 ----‘登录’和‘获取用户信息’接口-不-适用此方法，即 适用
function request({ url, method, params}) {
  // console.log(params)
  let token
  return new Promise(function (resolve, reject) {
    getToken().then(res => {
      
      if (res === undefined)
      {
        var res;
        token=''
      }else{
        token=res.data
      }
        wx.request({
          url: API_URI + url,
          data: params,
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'x-eco-client-appsession': app_session,
            'x-eco-client-version': app_version,
            'x-eco-session': token
          },
          method: method,
          success: function (res) {
            let resData =res.data
            if (resData.messageType === 3) {
              wx.showToast({
                title: '跳转登录中',
                icon: 'loading',
                duration: 2000
              });
              setTimeout(function () {
                wx.reLaunch({
                  url: '/pages/index/index?loginStatus=false'
                });
              }, 2000)
            }
            resolve(res)
          },
          fail: function (res) {
            reject(res)
          }
     })
   })
  }).catch((e) => { reject(e)})
  
}

// 进行请求 ----‘登录’和‘获取用户信息’接口+仅-适用此方法，即com适用
function request2({ url, method, params }) {
  // console.log(params)
  let token;
  return new Promise(function (resolve, reject) {
    getToken().then(res => {

      if (res === undefined) {
        var res;
        token = ''
      } else {
        token = res.data
      }
      wx.request({
        url: API_URI_COM + url,
        data: params,
        header: {
          'content-type': 'application/json;charset=UTF-8',
          'x-eco-client-appsession': app_session,
          'x-eco-client-version': app_version,
          'x-eco-session': token
        },
        method: method,
        success: function (res) {
          console.log(res)
          let resData = res.data
          if (resData.messageType === 3) {
            wx.showToast({
              title: '跳转登录中',
              icon: 'loading',
              duration: 2000
            });
            setTimeout(function () {
              wx.reLaunch({
                url: '/pages/index/index?loginStatus=false'
              });
            }, 2000)

          }
          resolve(res)
        },
        fail: function (res) {
          reject(res)
        }
      })
    })
  }).catch((e) => { reject(e) })

}


// 上传文件
function uploadFile({ url, filePath, params }) {
  let token
  return new Promise(function (resolve, reject) {
    getToken().then(res => {

      if (res === undefined) {
        token = ''
      } else {
        token = res.data
      }


      wx.uploadFile({
        url: API_URI + url,
        filePath: filePath,
        name: "file",//后台要绑定的名称
        header: {
          'x-eco-client-appsession': app_session,
          'x-eco-client-version': app_version,
          'x-eco-session': token
        },
        //参数绑定
        formData: params,
        success: function (res) {
          console.log(res)
          let resData = JSON.parse(res.data)
          if (resData.messageType === 3) {
            wx.showToast({
              title: '跳转登录中',
              icon: 'loading',
              duration: 2000
            });
            setTimeout(function () {
              wx.reLaunch({
                url: '/pages/index/index?loginStatus=false'
              });
            }, 2000)

          }
          resolve(res)
        },
        fail: function (res) {
          console.log(res)
          reject(res)

        }
      })
    }).catch((e) => { reject(e)})
  })
}

// 上传文件 com专用上传
function uploadFile2({ url, filePath, params}){
  let token
  return new Promise(function (resolve, reject) {
    getToken().then(res => {

      if (res === undefined) {
        token = ''
      } else {
        token = res.data
      }
  
    
      wx.uploadFile({
        url: API_URI_COM+url,
        filePath: filePath,
        name: "file",//后台要绑定的名称
        header: {
          'content-type': 'application/json;charset=UTF-8',
          'x-eco-client-appsession': app_session,
          'x-eco-client-version': app_version,
          'x-eco-session': token
        },
        //参数绑定
        formData: params,
        success: function (res) {
          let resData = JSON.parse(res.data)
          if (resData.messageType === 3) {
            wx.showToast({
              title: '跳转登录中',
              icon: 'loading',
              duration: 2000
            });
            setTimeout(function () {
              wx.reLaunch({
                url: '/pages/index/index?loginStatus=false'
              });
            }, 2000)

          }
          resolve(res)
        },
        fail: function (res) {
          reject(res)
          
        }
      })
    }).catch((e) => { reject(e) })
  })
}






module.exports = {
  request, request2, uploadFile, uploadFile2
}


