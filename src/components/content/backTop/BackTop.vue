<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt />
  </div>
</template>

<script>
export default {
  // 回到顶部组件
  name: 'BackTop'
}
</script>
<style scoped>
.back-top {
  position: fixed;
  right: 10px;
  bottom: 55px;
}
.back-top img {
  width: 43px;
}
</style>
