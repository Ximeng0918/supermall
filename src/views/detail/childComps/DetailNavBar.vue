<template>
  <div>
    <nav-bar>
      <template #left>
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt />
        </div>
      </template>
      <template #center>
        <div class="title">
          <div
            v-for="(item,index) in titles"
            :key="index"
            class="title-item"
            :class="{active:index===currentIndex}"
            @click="titleClick(index)"
          >{{item}}</div>
        </div>
      </template>
      <!-- <template #right></template> -->
    </nav-bar>
  </div>
</template>

<script>
// 导入基本导航组件
import NavBar from '@/components/common/navbar/NavBar'

export default {
  // 商品详情页面导航栏组件
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  data () {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick (index) {
      this.currentIndex = index
      this.$emit('titleClick', index)
    },
    backClick () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.title {
  display: flex;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back img {
  margin-top: 12px;
}
</style>
