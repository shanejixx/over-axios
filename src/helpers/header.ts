import { isPlainObject } from './utils'

// header 属性名规范化
export const normalizeHeadersName = (headersName: any, normalizedName: string): any => {
  if (!headersName) return
  Object.keys(headersName).forEach(headerName => {
    if (
      headerName !== normalizedName &&
      headerName.toUpperCase() === normalizedName.toUpperCase()
    ) {
      headersName[normalizedName] = headersName[headerName]
      delete headersName[headerName]
    }
  })
}

export const processHeaders = (headers: any, data: any): any => {
  normalizeHeadersName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}
