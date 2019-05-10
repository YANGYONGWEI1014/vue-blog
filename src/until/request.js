import axios from 'axios'
import qs from 'qs'
// import {
//   Message
// } from 'element-ui'
// import store from '../store'
// import {
//   getToken,
//   setToken
// } from '@/utils/auth'
// import {
//   tokenGet
// } from '@/api/login'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 10000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //   config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    // 在发送请求之前做某件事
    if (
      config.method === 'post' ||
      config.method === 'put' ||
      config.method === 'delete'
    ) {
      if (!config.headers['Content-Type']) {
        const obj = {}
        for (const k in config.data) {
          if (config.data[k] !== '') {
            obj[k] = config.data[k]
          }
        }
        // 序列化
        config.data = qs.stringify(obj)
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      }
    }
    // console.log(config)
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    const status = response.status
    const data = response.data
    if (status === 200) {
      if (!data.is_error) {
        return data
      }
    } else {
      if (data.is_error) {
        // Message(data.error)
      }
    }
  },
  error => {
    const code = parseInt(error.response.data.api_code)
    const errors = error.response.data.error
    switch (code) {
      case 400112:
        // Message({
        //   message: errors,
        //   type: 'error',
        //   duration: 2 * 1000
        // })
        break
      case 40101:
        // tokenGet({}).then(res => {
          // const token = res
          // setToken(token)
          // store.commit('SET_TOKEN', token)
        // })
        break
      default:
        // Message({
        //   message: errors,
        //   type: 'error',
        //   duration: 2 * 1000
        // })
        break
    }
    return Promise.reject(error)
  }
)

export default service
