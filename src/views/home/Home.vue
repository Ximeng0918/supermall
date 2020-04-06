<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template #center>购物街</template>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
// 导入首页轮播图组件
import HomeSwiper from './childComps/HomeSwiper'

import RecommendView from './childComps/RecommendView'

import { getHomeMultidata } from '@/network/home'

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  },
  data () {
    return {
      banners: [],
      recommends: []
    }
  },
  created () {
    // 请求数据
    this.getHomeMultidata()
  },
  methods: {
    getHomeMultidata () {
      getHomeMultidata().then(res => {
        console.log(res)
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    }
  }
}
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: white;
}
</style>
