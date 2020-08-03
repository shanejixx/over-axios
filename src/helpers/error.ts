import { AxiosRequestConfig, AxiosResponse } from '../types'

export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: any

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: any
  ) {
    super(message)

    this.isAxiosError = true
    this.config = config
    this.code = code
    this.request = request
    this.response = response

    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export const createError = (
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: any
): AxiosError => {
  const error = new AxiosError(message, config, code, request, response)

  return error
}
