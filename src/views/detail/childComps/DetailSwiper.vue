<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="(item,index) in topImages" :key="index">
      <img :src="item" alt />
    </swiper-item>
  </swiper>
</template>

<script>
// 基本轮播图组件
import { Swiper, SwiperItem } from 'components/common/swiper/index'

export default {
  // 商品详情页轮播图组件
  name: 'DetailSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>
