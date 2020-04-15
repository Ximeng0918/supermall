export default {
  cartLength (state) { // 购物车商品数量
    return state.cartList.length
  },
  cartList (state) { // 购物车列表
    return state.cartList
  }
}
