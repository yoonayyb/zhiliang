// 实时日志
const log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null
const sys = wx.getSystemInfoSync()

let currentPage = ''
const addFilters = () => {
  const pages = getCurrentPages()
  const lastPage = (pages.pop() || {}).route
  if (currentPage !== lastPage) {
    currentPage = lastPage
    const data = getApp().globalData
    ;['SDKVersion', 'model', 'platform', 'system', 'version'].map((key) => sys[key] && log.addFilterMsg(sys[key]))
    ;['openId', 'unionId', 'userId'].map((key) => data[key] && log.addFilterMsg(data[key]))
  }
}
const getRequireInfo = () => {
  const { SDKVersion, model, platform, system, version } = sys
  const { openId, unionId, userId, nickname } = getApp().globalData
  return [
    '[=== systemInfo ===]',
    { SDKVersion, model, platform, system, version },
    '[=== userInfo ===]',
    { openId, unionId, userId, nickname }
  ]
}

export default {
  info() {
    if (__wxConfig.envVersion === 'develop') return
    if (!log) return
    addFilters()
    log.info.apply(log, [...arguments, ...getRequireInfo()])
  },
  warn() {
    if (__wxConfig.envVersion === 'develop') return
    if (!log) return
    addFilters()
    log.warn.apply(log, [...arguments, ...getRequireInfo()])
  },
  error() {
    if (__wxConfig.envVersion === 'develop') return
    if (!log) return
    addFilters()
    log.error.apply(log, [...arguments, ...getRequireInfo()])
  },
  setFilterMsg(msg) {
    if (__wxConfig.envVersion === 'develop') return
    // 从基础库2.7.3开始支持
    if (!log || !log.setFilterMsg) return
    if (typeof msg !== 'string') return
    addFilters()
    log.setFilterMsg(msg)
  },
  addFilterMsg(msg) {
    if (__wxConfig.envVersion === 'develop') return
    // 从基础库2.8.1开始支持
    if (!log || !log.addFilterMsg) return
    if (typeof msg !== 'string') return
    addFilters()
    log.addFilterMsg(msg)
  }
}
