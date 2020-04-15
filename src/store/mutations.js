export default {
  // 购物车已有商品添加数量
  addCounter (state, payload) {
    payload.count++
  },
  // 添加购物车
  addToCart (state, payload) {
    payload.checked = false
    state.cartList.push(payload)
  },
  // 更改购物车商品选中状态
  checkedChange (state, payload) {
    payload.checked = !payload.checked
  }
}
