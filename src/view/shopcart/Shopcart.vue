<template>
<div id="shopcart">
 
  <nav-bar class="nav-bar">
    <div slot="center">购物车({{$store.state.cartList.length}})</div>
  </nav-bar>
   <div v-if="$store.state.cartList.length>0">
       <shoplist :list="list" class="shoplist"></shoplist>
  </div>
   <div v-if="$store.state.cartList.length===0">
      <div class="img">
        <img src="~assets/img/gouwuc.jpg" alt="">
      </div>
   </div>
   <shop-bottom></shop-bottom>
  <main-tab-bar></main-tab-bar>
</div>
 
</template>

<script>
import navBar from '../../components/common/navbar/NavBar'
import MainTabBar from '../../components/content/maintabbar/MainTabBar'
import shoplist  from './shopcild/shoplist'
import shopBottom from './shopcild/shopBottom'
import{mapGetters} from 'vuex'
export default {
  name:"Shopcart",
  components: {
    navBar,
    MainTabBar,
    shoplist,
    shopBottom
  },
  computed: {
    ...mapGetters({
      length:'cartCount',
      list:'cartList'
    })
  }
}
</script>

<style scoped>
  .nav-bar{
    background-color: #ff8a9d;
    color:#fff;
  }
 .shopcart{
  height: 100vh;
  position: relative;
}
.img{
   position: relative;
     height:calc(100vh - 132px);
     width: 100%;
       background-color: #F2F2F2;
}
.img img{
  width: 100%;
 
}
</style>