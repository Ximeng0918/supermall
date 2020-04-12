<template>
  <div class="recommend-info">
    <div class="info-header">热门推荐</div>
    <!-- 商品列表组件 -->
    <goods-list :goods="recommendList" />
  </div>
</template>

<script>
// 商品列表组件
import GoodsList from '@/components/content/goods/GoodsList'

export default {
  // 推荐信息组件
  name: 'DetailRecommendInfo',
  components: {
    GoodsList
  },
  props: {
    recommendList: {
      type: Array
    }
  }
}
</script>

<style scoped>
.recommend-info {
  padding: 5px;
}

.info-header {
  line-height: 40px;
  padding-left: 8px;
  font-size: 15px;
  color: #333;
}
</style>
