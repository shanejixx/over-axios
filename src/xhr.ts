import { AxiosRequestConfig } from './types'

const xhr = (config: AxiosRequestConfig) => {
  const { url, method = 'get', data = null, params = null } = config

  const xhr = new XMLHttpRequest()

  xhr.open(method.toUpperCase(), url, true)

  xhr.send(data)
}

export default xhr
