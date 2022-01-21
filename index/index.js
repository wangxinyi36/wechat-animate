// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    statusBarHeight: wx.getSystemInfoSync().statusBarHeight, //状态栏高度
    menuBtnHeight:wx.getMenuButtonBoundingClientRect().bottom,//胶囊高度
    diffTop: 0, //第一个元素到顶部距离
    animateOneData: {}
  },

  initAmimation() {
    let animateOne = wx.createAnimation()
    let animateTwo = wx.createAnimation()

    this.animateOne = animateOne;
    this.animateTwo = animateTwo;

    this.setData({
      animateOneData: animateOne.export(),
      animateTwoData: animateTwo.export(),
    })
  },
  onLoad() {},
  onShow() {
    this.initAmimation()
  },
  onPageScroll() {
    this.getScrollOffset()
  },
  getScrollOffset() {
    let {
      statusBarHeight,
    } = this.data;
    let top = statusBarHeight + 50
    wx.createSelectorQuery().select('.item0').boundingClientRect(rect => {
      if (rect.top <= top) {
        this.animateOne.scaleY(0).step()
        this.animateTwo.scaleY(1).step()
      } else {
        this.animateOne.scaleY(1).step()
        this.animateTwo.scaleY(0).step()
      }
      this.setData({
        diffTop: rect.top,
        animateOneData: this.animateOne.export(),
        animateTwoData: this.animateTwo.export()
      })

    }).exec()
  }

})