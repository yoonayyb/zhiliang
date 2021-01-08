import log from './log'
import { navBarLoading } from './tools'

const showLog = (option, request, response) => {
  const { $devtools, $vconsole, $consoleColor, APIHOST } = getApp().globalData

  const message = response.message
  ;/(error|fail)/.test(option.tag) && message && wx.showToast({ title: message, duration: 3000, icon: 'none' })

  $devtools && console.group(`[${request.method}]${request.url.replace(APIHOST, '')}`)

  switch (option.tag) {
    case 'success':
      log.info('[request-success]', request)
      if ($devtools) {
        request.data && console.log('%c[params]', `color:${$consoleColor.blue}`, request.data)
        console.log('%c[result]', `color:${$consoleColor.green}`, response.result || response)
      }
      if ($vconsole) {
        console.debug(`[${request.method}]${request.url}`)
        request.data && console.debug('[params]', request.data)
        console.debug('[result]', response.result || response)
      }
      break
    case 'error':
      wx.getNetworkType({ success: ({ networkType }) => log.warn(`[request-warn-${networkType}]`, request, response) })

      if ($devtools) {
        request.data && console.log('%c[params]', `color:${$consoleColor.red}`, request.data)
        console.log('%c[code]', `color:${$consoleColor.red}`, response.code || response.error)
        console.log('%c[message]', `color:${$consoleColor.red}`, response.message)
        console.log('%c[result]', `color:${$consoleColor.red}`, response.result || response)
      }
      if ($vconsole) {
        console.error(`[${request.method}]${request.url}`)
        request.data && console.debug('[params]', request.data)
        console.debug('[code]', response.code || response.error)
        console.debug('[message]', response.message)
        console.debug('[result]', response.result || response)
      }
      break
    case 'fail':
      wx.getNetworkType({ success: ({ networkType }) => log.error(`[request-fail-${networkType}]`, request, response) })

      if ($devtools) {
        request.data && console.log('%c[params]', `color:${$consoleColor.red}`, request.data)
        console.log('%c[fail]', `color:${$consoleColor.red}`, response)
      }
      if ($vconsole) {
        console.error(`[${request.method}]${request.url}`)
        request.data && console.debug('[params]', request.data)
        console.debug('[fail]', response)
      }
      break
  }

  $devtools && console.groupEnd()
}

const request = (options) =>
  new Promise(async (resolve, reject) => {
    try {
      Object.keys(options || {}).map((key) => !options[key] && delete options[key])

      const { APIHOST, hospId, openId, unionId } = getApp().globalData
      options.url = (/^http(s)?\:\/\//.test(options.url) && options.url) || `${APIHOST}/api${options.url}`
      options.header = {
        hospId,
        openId,
        unionId,
        ...options.header
      }

      navBarLoading(1)

      wx.request({
        ...options,
        success: async ({ data }) => {
          if (data.error || data.code) {
            showLog({ tag: 'error' }, options, data)
            reject(data)
          } else {
            showLog({ tag: 'success' }, options, data)
            resolve(data.result !== undefined ? data.result : data)
          }
        },
        fail: (error) => {
          showLog({ tag: 'fail' }, options, error)
          reject(error)
        },
        complete: () => navBarLoading(-1)
      })
    } catch (error) {
      reject(error)
    }
  })

/**
 * request
 * @param url URL地址
 * @param data 传参数据
 * @param header 请求头设置
 *
 * 使用方法
 * import request from '../../utils/request'
 *
 * request.get(url, [data], [header])
 * request.post(url, [data], [header])
 * ......
 */

export default {
  get: (url, data, header) => request({ url, method: 'GET', data, header }),
  post: (url, data, header) => request({ url, method: 'POST', data, header })
}
