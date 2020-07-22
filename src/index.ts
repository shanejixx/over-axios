import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { builURL } from './helpers/url'

const transformURL = (config: AxiosRequestConfig): string => {
  const { url, params } = config

  return builURL(url, params)
}

const processConfig = (config: AxiosRequestConfig): void => {
  config.url = transformURL(config)
}

const axios = (config: AxiosRequestConfig): void => {
  processConfig(config)
  xhr(config)
}

export default axios
