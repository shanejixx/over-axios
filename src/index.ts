import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { builURL } from './helpers/url'
import { transformRequestData } from './helpers/data'

const transformURL = (config: AxiosRequestConfig): string => {
  const { url, params } = config

  return builURL(url, params)
}

const transformRequest = (config: AxiosRequestConfig): any => {
  const { data } = config
  return transformRequestData(data)
}

const processConfig = (config: AxiosRequestConfig): void => {
  config.url = transformURL(config)
  config.data = transformRequest(config)
}

const axios = (config: AxiosRequestConfig): void => {
  processConfig(config)
  xhr(config)
}

export default axios
