import { AxiosRequestConfig } from './types'
import { processHeaders } from './helpers/header'
import { transformReponse } from './helpers/data'

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json,text/plain,*/*'
    }
  },

  transformRequest: [
    (data: any, headers: any): any => {
      processHeaders(headers, data)
      return transformReponse(data)
    }
  ],
  transformResponse: [
    (data: any): any => {
      return transformReponse(data)
    }
  ]
}

const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

export default defaults
