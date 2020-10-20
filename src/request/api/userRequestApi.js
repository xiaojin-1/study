// 用户相关的一些请求方法
import axios from '@/request/api.js'

export const login = ({userName, passWord}) => {
  const data = {
    userName: userName,
    passWord: passWord
  }
  return axios.request({
    url: 'consumer/writer/login',
    data,
    method: 'post'
  })
}

export const logOut= ()=>{
  return axios.request({
    url:"consumer/writer/logOut",
    method:"get"
  })
}

export const getLoginUserInfo=()=>{
  return axios.request({
      url: 'consumer/writer/getUserInfo',
      method: 'get'
    }
  )
}
