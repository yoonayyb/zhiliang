//app.js
import { data, extra } from './config/app'

App({
  globalData: { ...data },

  ...extra,

  onShow(options) {
    if (wx.getUpdateManager instanceof Function) {
      const update = wx.getUpdateManager()
      update.onUpdateReady(() => update.applyUpdate())
      update.onUpdateFailed((res) => wx.showToast({ title: '更新失败', icon: 'none' }))
    }
  },

  onPageNotFound(result) {
    wx.switchTab({ url: '/pages/index/index' })
  }
})
