import { isDate, isObject } from './utils'

/**
 * tansfrom params following url
 * @param url
 * @param params
 */
export const builURL = (url: string, params?: any): string => {
  if (!params) {
    return url
  }

  // to store `key=val` items
  let parts: string[] = []

  // mapping key to vals
  Object.keys(params).forEach(key => {
    const val = params[key]

    // handle params key`s val equal undefined or null
    if (val === `undefined` || val === null) {
      return
    }

    //  handle params key`s val equal array

    let values: string[]
    if (Array.isArray(val)) {
      values = val
    } else {
      values = [val]
    }

    // current key mapping to vals
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${key}= ${val}`)
    })
  })

  // serial
  let seializeParams = parts.join('&')

  // handle url includs '?' or '&'
  if (seializeParams) {
    const mark = url.indexOf('#')
    if (mark !== -1) {
      url = url.slice(0, mark)
    }
    url += (url.includes('?') ? '&' : '?') + seializeParams
  }

  return url
}
