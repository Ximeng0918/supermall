export default {
  addCart (context, payload) { // 添加到购物车对象中
    return new Promise((resolve, reject) => {
      // 查找之前数组中是否有该商品
      const oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      // 判断 oldProduct
      if (oldProduct) {
        context.commit('addCounter', oldProduct)
        resolve('当前商品数量+1')
      } else {
        payload.count = 1
        context.commit('addToCart', payload)
        resolve('添加购物车成功！')
      }
    })
  },
  checkedChange (context, payload) { // 更改购物车商品选中状态
    const oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    context.commit('checkedChange', oldProduct)
  }
}
