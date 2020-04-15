<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <div>
        <!--购物车商品组件-->
        <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item" />
      </div>
    </scroll>
  </div>
</template>

<script>
// 封装的Scroll滚动组件
import Scroll from 'components/common/scroll/Scroll'
// 购物车商品组件
import CartListItem from './CartListItem'

// Getters 辅助函数
import { mapGetters } from 'vuex'

export default {
  // 购物车列表组件
  name: 'CartList',
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated () {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  .cart-list{
    height: 100%;
  }
  .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>
