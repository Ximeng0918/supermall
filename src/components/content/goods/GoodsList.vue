<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :key="index" :goodsItem="item" />
  </div>
</template>

<script>
// 商品组件
import GoodsListItem from './GoodsListItem'

export default {
  // 商品列表组件
  name: 'GoodsList',
  props: {
    goods: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    GoodsListItem
  }
}
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
