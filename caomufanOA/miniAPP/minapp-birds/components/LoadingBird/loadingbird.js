// components/LoadingBird/loadingbird.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    modalHidden: {
      type: Boolean,      
    },
    modalText:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    winHeight:0,
  },
  // 自定义防止点透效果
  noTouch: function () {
    return;
  }, 
  // 获取高度并赋值
  attached() {

    let _winHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      winHeight: _winHeight
    })
    console.log(this.data.modalHidden)
  },
 
  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
