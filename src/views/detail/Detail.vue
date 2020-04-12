<template>
  <div id="detail">
    <!-- 商品详情页面导航栏组件 -->
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <!-- scroll滚动组件 -->
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <!-- 轮播图组件 -->
      <detail-swiper :top-images="topImages" />
      <!-- 商品基本信息组件 -->
      <detail-base-info :goods="goodsInfo" />
      <!-- 店铺信息组件 -->
      <detail-shop-info :shop="shopInfo" />
      <!-- 商品详情组件 -->
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <!-- 商品参数信息组件 -->
      <detail-param-info ref="params" :param-info="paramInfo" />
      <!-- 商品评论组件 -->
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <!-- 推荐信息组件 -->
      <detail-recommend-info ref="recommend" :recommend-list="recommend" />
    </scroll>
    <!-- 底部工具栏组件 -->
    <detail-bottom-bar />
  </div>
</template>

<script>
// 商品详情页面导航栏组件
import DetailNavBar from '@/views/detail/childComps/DetailNavBar'
// 商品详情页轮播图组件
import DetailSwiper from './childComps/DetailSwiper'
// 商品基本信息组件
import DetailBaseInfo from './childComps/DetailBaseInfo'
// 店铺信息组件
import DetailShopInfo from './childComps/DetailShopInfo'
// 商品详情组件
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
// 商品参数信息组件
import DetailParamInfo from './childComps/DetailParamInfo'
// 商品评论组件
import DetailCommentInfo from './childComps/DetailCommentInfo'
// 推荐信息组件
import DetailRecommendInfo from './childComps/DetailRecommendInfo'
// 底部工具栏组件
import DetailBottomBar from './childComps/DetailBottomBar'

// 封装的Scroll滚动组件
import Scroll from 'components/common/scroll/Scroll'

// 请求数据
import { getDetail, getRecommend, Goods, Shop, GoodsParam } from '@/network/detail'
// 混入
import { itemListenerMixin } from '@/common/mixin'
// 防抖函数
import { debounce } from '@/common/utils'

export default {
  // 商品详情页
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottomBar,
    Scroll
  },
  mixins: [itemListenerMixin],
  data () {
    return {
      iid: null, // 商品ID
      topImages: [], // 轮播图
      goodsInfo: {}, // 商品基本信息
      shopInfo: {}, // 店铺信息
      detailInfo: {}, // 详情信息
      paramInfo: {}, // 参数信息
      commentInfo: {}, // 评论
      recommend: [], // 推荐信息
      themeTopYs: [], // 导航栏选项offsetTop信息
      getThemeTopY: null // 给getThemeTopY赋值操作进行防抖对象
    }
  },
  created () {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // 2.1 获取数据
      const data = res.result
      // 2.2 获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages

      // 2.3 获取商品基本信息
      this.goodsInfo = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 2.4.获取店铺信息
      this.shopInfo = new Shop(data.shopInfo)

      // 2.5.保存商品的详情数据
      this.detailInfo = data.detailInfo

      // 2.6.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 2.7.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    // 3.获取推荐数据
    getRecommend().then((res, error) => {
      if (error) return
      this.recommend = res.data.list
    })

    // 4.给getThemeTopY赋值操作进行防抖
    this.getThemeTopY = debounce(() => {
      this.themeTopYs.push(0)
      // 商品参数信息组件
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 58)
      // 商品评论组件
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 58)
      // 推荐信息组件
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 58)
    })
  },
  methods: {
    imageLoad () {
      this.getThemeTopY()
      this.$refs.scroll.refresh()
    },
    titleClick (index) { // 导航点击事件
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
    },
    contentScroll (position) {
      // 滚动内容显示相应导航栏标题
      const positionY = -position.y
      const length = this.themeTopYs.length
      for (let i = 0; i < length; i++) {
        if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
/* 固定导航栏 */
.detail-nav {
  /* position: relative; 开始使用相对定位，鼠标拖动导航栏也滚上去了，故改固定定位*/
  z-index: 9;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background-color: #fff;
}
/* 设定滚动区域高度 */
.content {
  height: calc(100% - 44px - 58px);
}
</style>
