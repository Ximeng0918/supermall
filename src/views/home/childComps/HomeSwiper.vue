<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a href="javascript:;">
        <!--:href="item.link"-->
        <img :src="item.image" alt @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
// 导入基本轮播图组件
import { Swiper, SwiperItem } from '@/components/common/swiper/index'

export default {
  // 首页轮播图组件
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad () {
      if (!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>
