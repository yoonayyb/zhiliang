// 导航栏loading状态
let loadingCount = 0
export const navBarLoading = (value) => {
  loadingCount = Math.max(0, (loadingCount || 0) + value)
  loadingCount === 1 && wx.showNavigationBarLoading()
  loadingCount === 0 && wx.hideNavigationBarLoading()
}

// 获取URL上的参数
export const getUrlParams = (url) => {
  const params = {}
  ;(url.match(/\w+\=\w+/g) || []).map((item) => {
    const $match = item.match(/\w+/g) || []
    params[$match[0]] = $match[1]
  })
  return params
}
