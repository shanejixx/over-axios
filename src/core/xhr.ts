import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from '../types'
import { parseHeaders } from '../helpers/header'
import { createError, AxiosError } from '../helpers/error'
import { request } from 'http'

const xhr = (config: AxiosRequestConfig): AxiosPromise => {
  return new Promise((resolve, reject) => {
    const { url, method = 'get', data = null, headers, responseType, timeout } = config

    const xhr = new XMLHttpRequest()

    xhr.open(method.toUpperCase(), url as string, true)

    if (timeout) {
      xhr.timeout = timeout
    }

    xhr.ontimeout = function handleTimeout() {
      // reject(new Error(`Timeout of ${timeout} ms exceeded`))
      reject(new AxiosError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }

    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        // reject(new Error(`Request failed with status code ${response.status}`))
        reject(
          new AxiosError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }

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

      handleResponse(response)
    }

    xhr.onerror = function handleError() {
      // reject(new Error('Network Error'))
      reject(new AxiosError('Network Error', config, null, request))
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
