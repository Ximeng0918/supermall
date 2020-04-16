<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <!-- 底部导航栏 -->
    <main-tab-bar />
    <icon></icon>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
// 底部导航栏
import MainTabBar from 'components/content/mainTabbar/MainTabBar'
// 图标
import Icon from 'components/content/Icon/Icon.vue'
import SvgIcon from 'components/content/Icon/SvgIcon.vue'

export default {
  components: {
    MainTabBar,
    Icon,
    SvgIcon
  }
}
</script>
<style>
@import 'assets/css/base.css';
</style>
