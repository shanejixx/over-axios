import { AxiosRequestConfig } from '../types'
import { deepMerge, isPlainObject } from '../helpers/utils'

const strats = Object.create(null)

// 默认合并策略
// 如果自定义配置中定义了某个属性，就采用自定义的，否则就用默认配置
function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

// 只接受自定义配置合并策略
//对于 url、params、data 这些属性，默认配置显然是没有意义的，它们是和每个请求强相关的，所以只从自定义配置中获取
function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

const stratKeysFromVal2 = ['url', 'params', 'data']

stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})

// 复杂对象合并策略
// 需要使用深拷贝的方式 // 对于一些属性如 headers
function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const stratKeysDeepMerge = ['headers']

stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

// config1 代表默认配置，config2 代表自定义配置
export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }

  return config
}
