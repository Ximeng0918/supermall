<template>
  <div class="cart">
    <!-- 导航组件 -->
    <nav-bar class="home-nav">
      <template #center>购物车（{{cartLength}}）</template>
    </nav-bar>
    <!--购物车列表组件-->
    <cart-list />
    <!--底部汇总-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
// 导航组件
import NavBar from 'components/common/navbar/NavBar'
// 购物车列表组件
import CartList from './childComps/CartList'
// 购物车底部计算汇总组件
import CartBottomBar from './childComps/CartBottomBar'

// Getters 辅助函数
import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters([
      'cartLength'
    ])
  }
}
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
