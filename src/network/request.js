import axios from 'axios'

import basePath from '../requestPath'

export function request (config) {
  // 1.创建axios的实例
  const instance = axios.create({
    // 防止接口泄露，故读取本地文件
    // 需要资料和新接口的添加老师微信 coderwhy002
    baseURL: basePath(),
    timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err)
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })

  // 3.发送真正的网络请求
  return instance(config)
}
