<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <!-- 底部导航栏 -->
    <main-tab-bar />
  </div>
</template>

<script>
// 底部导航栏
import MainTabBar from '@/components/content/mainTabbar/MainTabBar'

export default {
  components: {
    MainTabBar
  }
}
</script>
<style>
@import 'assets/css/base.css';
</style>
