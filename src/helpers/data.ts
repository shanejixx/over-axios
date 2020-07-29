import { format } from 'path'
import { isPlainObject } from './utils'

export const transformRequestData = (data: any): any => {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }

  return data
}
