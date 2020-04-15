<template>
  <div class="bottom-bar">
    <div class="check-content">
      <CheckButton class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">合计: ¥{{totalPrice}}</div>
    <div class="calculate" @click="calcClick">去计算({{checkLength}})</div>
  </div>
</template>

<script>
// 多选按钮组件
import CheckButton from 'components/content/checkButton/CheckButton'

// Getters 辅助函数
import { mapGetters } from 'vuex'

export default {
  // 购物车底部计算汇总组件
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice () {
      const cartList = this.cartList
      return cartList.filter(item => {
        // 获取选中商品
        return item.checked
      }).reduce((preValue, item) => {
        // 累加价格
        return preValue + item.count * item.price
      }, 0).toFixed(2)
    },
    checkLength () {
      // 计算选中的数量
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll () {
      // 查找是否有没有选中，有返回false
      if (this.cartList.length === 0) return false
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkClick () {
      console.log('-------')
      if (this.isSelectAll) { // 全部选中
        // eslint-disable-next-line no-return-assign
        this.cartList.forEach(item => item.checked = false)
      } else {
        // eslint-disable-next-line no-return-assign
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick () {
      if (!this.isSelectAll) {
        this.$toast('请选择购买的商品', 2000)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    background-color: #eee;
    color: #888;

    position: fixed;
    bottom: 50px;
    left: 0;
    display: flex;

    width: 100%;
    height: 45px;
    font-size: 14px;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
  }

  .check-content {
    display: flex;
    align-items: center;
  }

  .check-button {
    width: 20px;
    height: 20px;
    margin-left: 20px;
  }

  .price {
    font-size: 16px;
    color: #666;
    line-height: 44px;
    margin-left: 15px;
    flex: 1;
  }

  .calculate {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
