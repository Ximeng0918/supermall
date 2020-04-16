// 别名
import { POP, NEW, SELL } from './const'
// 防抖函数
import { debounce } from '@/common/utils'
// 图片防抖
export const itemListenerMixin = {
  data () {
    return {
      itemImgListener: null
    }
  },
  mounted () {
    // 图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 500)

    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    console.log('混入的内容')
  }
}
// 商品类型选项卡
export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick (index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType)
    }
  }
}
