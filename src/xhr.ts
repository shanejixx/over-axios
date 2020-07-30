import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from './types'
import { parseHeaders } from './helpers/header'

const xhr = (config: AxiosRequestConfig): AxiosPromise => {
  return new Promise(resolve => {
    const { url, method = 'get', data = null, headers, responseType } = config

    const xhr = new XMLHttpRequest()

    xhr.open(method.toUpperCase(), url, true)

    xhr.onreadystatechange = function handleLoad() {
      if (xhr.readyState !== 4) {
        return
      }
      const responseHeaders = parseHeaders(xhr.getAllResponseHeaders())
      const responseData = responseType && responseType !== 'text' ? xhr.response : xhr.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: responseHeaders,
        config,
        request: xhr
      }

      resolve(response)
    }

    Object.keys(headers).forEach((headerName: string) => {
      // 当传入的 data 为空的时候，请求 header 配置 Content-Type 是没有意义的，
      if (data === null && headerName.toLowerCase() === 'content-type') {
        delete headers[headerName]
      } else {
        xhr.setRequestHeader(headerName, headers[headerName])
      }
    })

    xhr.send(data)
  })
}

export default xhr
