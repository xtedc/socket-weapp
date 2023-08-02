// pages/room/index.js
import moment from 'moment'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '',
    userName: '',
    isAddUserVisble: false,
    isTransferVisble: false,
    currentInfo: {},
    userInfo: {},
    amount:'',
    list: [{
        name: 'xxx',
        id: '000',
        url: 'https://avatars.githubusercontent.com/u/79403683?v=4',
        amount: 0
      },
      {
        name: 'qqq',
        id: '111',
        url: 'https://avatars.githubusercontent.com/u/79403683?v=4',
        amount: 0
      },
      {
        name: 'www',
        id: '222',
        url: 'https://avatars.githubusercontent.com/u/79403683?v=4',
        amount: 0
      },
      // {
      //   name:'eee',
      //   url:'https://avatars.githubusercontent.com/u/79403683?v=4'
      // },
    ],
    recordList: [{
        msg: 'xxx加入了房间 2023-07-28 10:10:29'
      },
      {
        msg: 'qqq加入了房间 2023-07-28 10:11:22'
      },
      {
        msg: 'www加入了房间 2023-07-28 10:12:11'
      },
      {
        msg: 'xxx向qqq转账1元  2023-07-28 10:10:29'
      },
      {
        msg: 'aaa向qwq转账2元  2023-07-28 10:10:29'
      },
      {
        msg: 'xwsxx向asxzq转账3元  2023-07-28 10:10:29'
      },
      {
        msg: 'eex向qazq转账2元  2023-07-28 10:10:29'
      }
    ]
  },
  onAddUser() {
    this.setData({
      isAddUserVisble: true
    })
  },
  onTransferPopup(e) {
    // console.log(e.currentTarget.dataset.item)
    // const currentId =e.currentTarget.dataset.item.id
    // const userId = this.data.list[0].id
    const currentInfo = e.currentTarget.dataset.item
    const userInfo = this.data.list[0]
    this.setData({
      isTransferVisble: true,
      currentInfo,
      userInfo
    })
  },
  onCloseAddUser() {
    this.setData({
      isAddUserVisble: false
    })
  },
  onCloseTransfer() {
    this.setData({
      isTransferVisble: false
    })
  },
  onAmount(e){
    const amount = Number(e.detail.value)
    this.setData({
      amount
    })
  },
  onTransfer(){
    const userId = this.data.userInfo.id
    const userName = this.data.userInfo.name
    const currentId = this.data.currentInfo.id
    const currentName = this.data.currentInfo.name
    const amount = this.data.amount
   const list= this.data.list.map(res=>{
      let temp = res.amount
      if(res.id === currentId){
         temp = res.amount+amount
      }
      if(res.id === userId){
         temp = res.amount-amount
      }
      console.log(temp)
      return{
        ...res,
        amount:temp,
      }
    })
    const msg = `${userName}向${currentName}转账${amount}元 ${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}`
    console.log(msg)
    console.log(list)
    const recordList = this.data.recordList
    recordList.push({msg})
    this.setData({
      list,
      amount:'',
      recordList,
      isTransferVisble:false
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {
      avatar,
      userName
    } = options
    this.setData({
      avatar,
      userName
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})