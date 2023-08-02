// app.js
import HttpClint from './utils/request.js'
import {
  login
} from './utils/api'
App({
  $Http: HttpClint,
  onLaunch() {
    const token = wx.getStorageSync('token')
    if (!token) {
      // 登录
      wx.login({
        success: async res => {
          const data = await login({
            code: res.code
          })
          const {
            token,
            openid
          } = data.data
          if(token){
            wx.setStorageSync('token', `${openid}_${token}`)
          }else{
           console.log('登陆失败')
          }
          
        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})