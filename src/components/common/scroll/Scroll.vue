<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
    <!-- 底部提示信息 -->
    <div class="bottom-tip">
      <span class="loading-hook">{{pullupMsg}}</span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    /**
      * 1 滚动的时候会派发scroll事件，会截流。
      * 2 滚动的时候实时派发scroll事件，不会截流。
      * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
      */
    probeType: {
      type: Number,
      default: 0
    },
    /**
     * 点击列表是否派发click事件
     */
    click: {
      type: Boolean,
      default: true
    },
    // /**
    //    * 是否开启横向滚动
    //    */
    // scrollX: {
    //   type: Boolean,
    //   default: false
    // },
    // /**
    //   * 是否派发滚动事件
    //   */
    // listenScroll: {
    //   type: Boolean,
    //   default: false
    // },
    // /**
    //   * 列表的数据
    //   */
    // data: {
    //   type: Array,
    //   default: null
    // },
    // /**
    //  * 是否派发滚动到底部的事件，用于上拉加载
    //  */
    // pullup: {
    //   type: Boolean,
    //   default: false
    // },
    // /**
    //   * 是否派发顶部下拉的事件，用于下拉刷新
    //   */
    // pulldown: {
    //   type: Boolean,
    //   default: false
    // },
    // /**
    //   * 是否派发列表滚动开始的事件
    //   */
    // beforeScroll: {
    //   type: Boolean,
    //   default: false
    // },
    // /**
    //   * 当数据更新后，刷新scroll的延时。
    //   */
    // refreshDelay: {
    //   type: Number,
    //   default: 20
    // },
    pullUpLoad: { // 上拉加载功能
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      scroll: null,
      pullupMsg: '加载更多'
    }
  },
  mounted () {
    // better-scroll的初始化 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 默认是false，true代表div等可以进行点击监听
      click: this.click,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })

    // 监听滚动的位置
    this.scroll.on('scroll', (position) => {
      if (position.y > 30) {
        this.pulldownMsg = '释放立即刷新'
      }
      this.$emit('scroll', position)
    })

    // 监听上拉事件
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
      this.pullupMsg = '加载中。。。'
    })
  },
  methods: {
    // 跳转位置
    scrollTo (x, y, time = 300) {
      this.scroll.scrollTo(x, y, time)
    },
    // 当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载。
    finishPullUp () {
      this.scroll.finishPullUp()
    }
  }
}
</script>
<style scoped>
.bottom-tip {
  width: 100%;
  height: 35px;
  line-height: 35px;
  text-align: center;
  color: #777;
  background: #f2f2f2;
  position: absolute;
  bottom: -35px;
  left: 0;
}
</style>
