export type Method =
  | 'get'
  | 'GET'
  | 'put'
  | 'PUT'
  | 'delete'
  | 'DELETE'
  | 'post'
  | 'POST'
  | 'options'
  | 'OPTIONS'
  | 'head'
  | 'HEAD'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AxiosResponse {
  data: any
  status: any
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {}
