// components/auth/index.js
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * Component properties
   */
  properties: {
    show: {
      type: Boolean,
      default: false
    },
    hideClose: {
      type: Boolean,
      default: false
    }
  },

  /**
   * Component initial data
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loading: false
  },

  /**
   * Component methods
   */
  methods: {
    async getUserInfo(event) {
      try {
        if (this.data.loading) return

        this.setData({ loading: true })
        await getApp().wxLogin(event.detail)

        this.setData({ show: false })
        this.triggerEvent('success')
      } catch (error) {
      } finally {
        this.setData({ loading: false })
      }
    },
    close() {
      this.setData({ show: false })
      this.triggerEvent('close')
    }
  }
})
