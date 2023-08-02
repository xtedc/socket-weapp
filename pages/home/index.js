const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
import {
  login,
  getUserInfo,
  test
} from '../../utils/api.js'
Page({
  data: {
    avatarUrl: defaultAvatarUrl,
    userName: '',
    isToken: false,
    isLoding: false,
    userInfo:{}
  },
  async onLoad() {
    // const token = await wx.getStorageSync('token')
    // this.setData({
    //   isToken: token ? true : false
    // })
    this.getUserInfo()
  },
  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail
    this.setData({
      avatarUrl,
    })
  },
  handleInputChange(e) {
    const userName = e.detail.value
    if (userName.length === 0) return;
    this.setData({
      userName
    })
  },
  async getUserInfo() {
   const data = await getUserInfo()
   console.log(data.data.userInfo);
  this.setData({
    userInfo:data.data.userInfo
  })
  console.log(this.data.userInfo)
  },
  async createRoom() {
      wx.navigateTo({
        url: `/pages/room/index?userName=${this.data.userName}&avatar=${this.data.avatarUrl}`,
      })
  },
  onTest() {
    test()
  }
})