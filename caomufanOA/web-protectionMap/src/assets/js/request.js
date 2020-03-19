import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 610000, // 请求超时时间
  withCredentials: true // 允许携带cookie
})


// request拦截器
service.interceptors.request.use(config => {
  //在请求发送之前做一些事
  config.headers['token'] = '' // 请求头带上token
  //开启加载层

  return config;
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    //关闭加载层
   
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    if (res.code !== 200) {
     
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 401) {
       
      }
      return Promise.reject("系统错误");
    } else {
      

      return response.data
    }
  },
  error => {
    
    return Promise.reject(error)
  }
)


export default service
