import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { builURL } from '../helpers/url'
import { transformRequestData, transformReponse } from '../helpers/data'
import { processHeaders } from '../helpers/header'

const transformURL = (config: AxiosRequestConfig): string => {
  const { url, params } = config

  return builURL(url, params)
}

const transformRequest = (config: AxiosRequestConfig): any => {
  const { data } = config
  return transformRequestData(data)
}

const transformHeaders = (config: AxiosRequestConfig): any => {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

const transformReponseData = (res: AxiosResponse): AxiosResponse => {
  res.data = transformReponse(res.data)
  return res
}

const processConfig = (config: AxiosRequestConfig): void => {
  config.url = transformURL(config)
  // 处理 header 的时候依赖了 data，所以要在处理请求 body 数据之前处理请求 header
  config.headers = transformHeaders(config)
  config.data = transformRequest(config)
}

const axios = (config: AxiosRequestConfig): AxiosPromise => {
  processConfig(config)

  return xhr(config).then(res => {
    return transformReponseData(res)
  })
}

export default axios
