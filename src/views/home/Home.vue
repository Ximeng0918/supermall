<template>
  <div id="home" class="wrapper">
    <!-- 导航组件 -->
    <nav-bar class="home-nav">
      <template #center>购物街</template>
    </nav-bar>
    <!-- 商品类型选项卡组件(固定定位) -->
    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControlFixed"
      class="tab-control"
      v-show="isTabFixed"
    />
    <!-- Scroll滚动组件 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="pullingUp"
    >
      <!-- 首页轮播图组件 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <!-- 推荐信息组件 -->
      <recommend-view :recommends="recommends" />
      <!-- 流行信息组件 -->
      <featureView />
      <!-- 商品类型选项卡组件 -->
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl" />
      <!-- 商品列表组件 -->
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- 回到顶部组件 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
// 基本导航组件
import NavBar from 'components/common/navbar/NavBar'
// 首页轮播图组件
import HomeSwiper from './childComps/HomeSwiper'
// 推荐信息组件
import RecommendView from './childComps/RecommendView'
// 流行信息组件
import FeatureView from './childComps/FeatureView'

// 商品类型选项卡组件
import TabControl from 'components/content/tabControl/TabControl'
// 商品列表组件
import GoodsList from '@/components/content/goods/GoodsList'
// 封装的Scroll滚动组件
import Scroll from '@/components/common/scroll/Scroll'
// 回到顶部组件
import BackTop from '@/components/content/backTop/BackTop'

// 获取首页数据
import { getHomeMultidata, getHomeGoods } from '@/network/home'

// 混入
import { itemListenerMixin } from '@/common/mixin'

export default {
  // 首页
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data () {
    return {
      banners: [], // 轮播图图片数组
      recommends: [], // 推荐信息
      goods: { // 商品信息
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop', // 当前商品类型
      isShowBackTop: false, // 是否显示回到顶部图标，默认false（不显示）
      tabOffsetTop: 0, // 选项卡距离上方父级元素的距离
      isTabFixed: false, // 决定tabControl是否吸顶
      saveY: 0 // 保存滚动的Y值
    }
  },
  mixins: [itemListenerMixin],
  computed: {
    showGoods () {
      return this.goods[this.currentType].list
    }
  },
  activated () {
    // 滚动到保存的位置
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated () {
    // 保存当前滚动的位置
    this.saveY = this.$refs.scroll.getScrollY()

    // 取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  created () {
    // 请求数据
    this.getHomeMultidata()

    // 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    // 事件监听
    tabClick (index) {
      console.log(index)
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      // 统一两个选项卡的当前选择项
      this.$refs.tabControlFixed.currentIndex = index
      this.$refs.tabControl.currentIndex = index
    },
    backClick () {
      // 回到顶部
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    contentScroll (position) {
      // 判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000

      // 决定tabControl是否吸顶（posi）    （（滚动位置>选项卡距离上方的位置）
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    pullingUp () {
      // 上拉加载更多
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad () {
      // 获取tabControl的offsetTop(距离上方父级元素的距离)
      // 所有的组件都有一个属性$el：用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    },
    // 网络请求
    getHomeMultidata () {
      getHomeMultidata().then(res => {
        console.log(res)
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
} */
.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 9;
}
</style>
