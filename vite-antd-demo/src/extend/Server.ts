import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import bus from 'vue3-eventbus'
import Config from 'src/config'
import { Modal } from 'ant-design-vue'

let $error = null
let $errorTimer = null
function showError (option: any) {
  // 多个请求并行触发, 只弹出最后一个提示
  $errorTimer && clearTimeout($errorTimer)
  $errorTimer = setTimeout(() => {
    !$error && ($error = Modal.error)
    $error && $error().update({
      content: '',
      okText: '确定',
      onOk: () => {
        Modal.destroyAll()
      },
      ...option
    })
  }, 50)
}

const instance: AxiosInstance = axios.create({
  baseURL: Config.host,
  headers: {},
  trimNull: true, // 是否去除空值
  withCredentials: true, // default
  needLoading: false, // 是否需要加载效果
  ignoreCode: false, // 是否忽略服务端的错误提示
  timeout: 5000
})

instance.interceptors.request.use(function (config) {
  if (config.needLoading) {
    bus.emit('loading.show')
  }
  const timeStamp = {
    _t: new Date().getTime()
  }
  if (config.params) {
    Object.assign(config.params, timeStamp)
  } else {
    config.params = timeStamp
  }
  config.data = config.data || {}
  if (config.trimNull && !(config.data instanceof window.FormData)) {
    let _data = Object.assign({}, config.data)
    isNull(_data)
    config.data = _data
  }
  if (Config.mock) {
    config.withCredentials = false
    config.url = config.url.replace(Config.host, Config.mockhost)
  }
  return config
  function isNull (obj: any) {
    if (obj !== undefined && obj !== null) {
      for (let [key, value] of Object.entries(obj)) {
        if (typeof value == 'object' && !(value instanceof Date)) isNull(value)
        if (typeof value != 'boolean' && !value && typeof value != 'number') {
          delete obj[key]
        }
      }
    }
  }
}, function (error) {
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response: AxiosResponse) {
  if (response.config.needLoading) {
    bus.emit('loading.hide')
  }
  let isSuccess = response.data.resSuccuss || response.data.code == 200
  // code: 200, 正常; code: 400、4001、4002、4003
  if (!isSuccess && !response.config.ignoreCode) {
    showError({
      content: response.data.msg || response.data.errorMsg || '请求错误'
    })
    return Promise.reject(response)
  } else {
    if (!response.config.isFromSSO && response.data.code && response.data.code !== 200) {
      showError({
        content: response.data.msg
      })
      return Promise.reject(response)
    }
    return Promise.resolve(response.config.isFromSSO ? response : response.data)
  }
}, function (error) {
  let status = error.response && error.response.status
  let message = error.message
  if (!error.response || error.response.config.needLoading) {
    bus.emit('loading.hide')
  }
  switch (status) {
    case 401:
      showError({
        content: '你没有权限访问此系统'
      })
      break
    case 403:
      showError({
        content: '认证失败,重新登录',
        onOk: () => {
          bus.emit('logout')
        }
      })
      break
    default:
      if (message === 'Network Error') {
        message = '异常，请刷新页面'
      }
      showError({
        content: message
      })
      break
  }
  return Promise.reject(error)
})

export default instance
