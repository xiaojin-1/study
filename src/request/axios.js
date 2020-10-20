import axios from 'axios'
//import {getToken} from '@/libs/utils'
import router from '@/router'

const NOT_LOGIN_OR_EXPIRE=406

class HttpRequest {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  /**
   * 创建 基础配置信息
   * @returns {{baseURL: *, headers: {}}}
   */
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }

  /**
   * 请求拦截器 启动
   * @param instance
   * @param url
   */
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      this.queue[url] = true
      if(config.url!='consumer/writer/login'){
        config.headers.token='8993a1b041d54563af134e0493746708';
      }
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截 TODO 需要完善还
    // instance.interceptors.response.use(res => {
    //   // this.destroy(url)
    //   // 需要请求之后判断是否存在token 过期如果过期则跳转登录页面
    //   if(res.data.code==NOT_LOGIN_OR_EXPIRE){
    //     router.push({
    //       name:"Login"
    //     })
    //   }else{
    //     return new Promise((resolve,reject)=>{
    //       const result = res.data;
    //       if(result.code==0){
    //         resolve(result.data);
    //       }else{
    //         reject(result.message)
    //       }
    //     })
    //   }
    // }, error => {
    //   // this.destroy(url)
    //   // let errorInfo = error.response
    //   // if (!errorInfo) {
    //   //   const { request: { code, message }, config } = JSON.parse(JSON.stringify(error))
    //   //   errorInfo = {
    //   //     code,
    //   //     message,
    //   //     request: { responseURL: config.url }
    //   //   }
    //   // }
    //   // addErrorLog(errorInfo)
    //   return Promise.reject(error)
    // })
  }

  /**
   * 开启请求并添加请求拦截器
   * @param options 额外的配置信息 手动的添加可以 对于已有的属性会进行覆盖
   * @returns {AxiosPromise}
   */
  request (options) {
    const instance = axios.create()
    // 把 options中的类容添加到 前面的对象中去，并且会对已有的属性进行一个覆盖操作
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
