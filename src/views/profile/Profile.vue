<template>
  <div id="profile">
    <!--基本导航组件-->
    <nav-bar class="nav-bar">
      <div slot="center">XXX商城</div>
    </nav-bar>
    <!--登录用户信息组件-->
    <user-info />
    <!--账户信息-->
    <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </section>
    <!--菜单-->
    <list-view :list-data="orderList" class="order-list"/>
    <list-view :list-data="serviceList" class="service-list"/>
  </div>
</template>

<script>
// 基本导航组件
import NavBar from 'components/common/navbar/NavBar'
// 登录用户信息组件
import UserInfo from './childComps/UserInfo'
// 菜单
import ListView from './childComps/ListView'

export default {
  // 我的
  name: 'Profile',
  data () {
    return {
      orderList: [
        { icon: '#order', iconColor: '#ff8198', info: '我的消息' },
        { icon: '#point', iconColor: '#fc7b53', info: '积分商城' },
        { icon: '#vip', iconColor: '#ffc636', info: '会员卡' }
      ],
      serviceList: [
        { icon: '#service', iconColor: '#ff8198', info: '我的购物车', path: '/cart' },
        { icon: '#download', iconColor: '#ff8198', info: '下载购物APP' }
      ]
    }
  },
  components: {
    NavBar,
    UserInfo,
    ListView
  },
  methods: {
  }
}
</script>

<style scoped>
  #profile {
    background-color: #f2f2f2;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .account {
    display: flex;
  }

  .account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
  }

  .account-item:last-of-type {
    margin-right: 0;
  }

  .account-item {
    color: #666;
    font-size: 13px;
    padding: 18px;
  }

  .account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .account-info {
    margin-top: 6px;
  }

  .order-list, .service-list {
    margin-top: 12px;
  }
</style>
