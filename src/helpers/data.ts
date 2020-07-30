import { format } from 'path'
import { isPlainObject } from './utils'

export const transformRequestData = (data: any): any => {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }

  return data
}

export const transformReponse = (data: any): any => {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      console.log(e)
    }
  }

  return data
}
