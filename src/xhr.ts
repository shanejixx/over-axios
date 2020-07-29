import { AxiosRequestConfig } from './types'

const xhr = (config: AxiosRequestConfig): void => {
  const { url, method = 'get', data = null, params = null, headers } = config

  const xhr = new XMLHttpRequest()

  xhr.open(method.toUpperCase(), url, true)

  Object.keys(headers).forEach((headerName: string) => {
    // 当传入的 data 为空的时候，请求 header 配置 Content-Type 是没有意义的，
    if (data === null && headerName.toLowerCase() === 'content-type') {
      delete headers[headerName]
    } else {
      xhr.setRequestHeader(headerName, headers[headerName])
    }
  })

  xhr.send(data)
}

export default xhr
