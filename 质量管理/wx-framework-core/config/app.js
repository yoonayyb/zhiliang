import request from '../utils/request'

const SUB = { develop: 'test-', trial: 'test-', release: '' }[__wxConfig.envVersion] || ''
export const APIHOST = `https://${SUB}ihosp-api.healthan.net`
export const FILEHOST = SUB ? APIHOST.replace('ihosp-api', 'file-appcenter') : APIHOST.replace('api', 'file')

export const $devtools = /devtools/i.test(__wxConfig.platform) // 环境
export const $vconsole = !$devtools && __wxConfig.debug // 真机且debug模式
export const $consoleColor = {
  green: '#87d068',
  red: '#f50',
  blue: '#2db7f5',
  yellow: '#faad14',
  pink: '#eb2f96'
}

export const data = {
  $devtools,
  $vconsole,
  $consoleColor,

  APIHOST,
  FILEHOST,

  APPNAME: '',

  appId: __wxConfig.accountInfo.appId,

  hospId: { develop: 1, trial: 1, release: 1 }[__wxConfig.envVersion],
  openId: wx.getStorageSync(`${SUB}_openId`),
  unionId: wx.getStorageSync(`${SUB}_unionId`),
  userId: wx.getStorageSync(`${SUB}_userId`),
  avatar: wx.getStorageSync(`${SUB}_avatar`),
  nickname: wx.getStorageSync(`${SUB}_nickname`),

  // 就诊卡
  cardList: [],
  cardSelected: {}
}

export const extra = {
  /**
   *  微信小程序用户登录
   */
  promiseWxLogin: null,
  wxLogin(detail) {
    const { appId, unionId, userId } = getApp().globalData
    return (
      (((unionId && userId) || !detail) && Promise.resolve(getApp().globalData)) ||
      this.promiseWxLogin ||
      (this.promiseWxLogin = new Promise((resolve, reject) =>
        wx.checkSession({
          complete: () =>
            wx.login({
              success: async ({ code, errMsg }) => {
                if (code) {
                  try {
                    const { encryptedData, iv } = detail
                    const { openId, unionId, id, avatar, nickname } = await request.get('/base/checkOrCreateUser', {
                      loginChannel: 1,
                      appId,
                      encryptedData,
                      iv,
                      code
                    })

                    if (unionId && id && avatar) {
                      Object.assign(getApp().globalData, { openId, unionId, userId: id, avatar, nickname })

                      wx.setStorageSync(`${SUB}_openId`, openId)
                      wx.setStorageSync(`${SUB}_unionId`, unionId)
                      wx.setStorageSync(`${SUB}_userId`, id)
                      wx.setStorageSync(`${SUB}_avatar`, avatar)
                      wx.setStorageSync(`${SUB}_nickname`, nickname)

                      resolve(getApp().globalData)
                    } else {
                      delete this.promiseWxLogin
                      resolve(getApp().globalData)
                    }
                  } catch (error) {
                    delete this.promiseWxLogin
                    reject(error)
                  }
                } else {
                  delete this.promiseWxLogin
                  reject(errMsg)
                }
              },
              fail: (error) => {
                delete this.promiseWxLogin
                reject(error)
              }
            })
        })
      ))
    )
  },

  // 获取就诊卡列表
  promiseCardList: null,
  getCardList(options = {}) {
    const { reload, selectedId } = options
    return (
      (!reload && this.promiseCardList) ||
      (this.promiseCardList = new Promise(async (resolve, reject) => {
        try {
          const cardList = await request.get('/portal/card/list')
          Object.assign(getApp().globalData, {
            cardList,
            cardSelected:
              cardList.find((item) => item.hisPatientId === selectedId) ||
              cardList.find((item) => item.defaultFlag === 1) ||
              cardList[0] ||
              {}
          })
          resolve(cardList)
        } catch (error) {
          delete this.promiseCardList
          reject(error)
        }
      }))
    )
  }
}
