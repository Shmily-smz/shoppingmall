<template>
  <div class="profile">
    <nav-bar class="profile-bar">
      <div slot="center">个人中心</div>
    </nav-bar>
    <scroll ref="scroll" class="scroll">
    <user></user>
    <all></all>
    <profile-list :profile-list="profileList"></profile-list>
     <profile-list :profile-list="profileList2"></profile-list>
     
   <div class="recommend">
      <div class="line"></div>
      <h4>你可能还想要</h4>
      <div class="line"></div>
    </div>
    <goodlist :goodss="list"></goodlist>
      <div class='tips'>已经拉到底了噢~</div>
     </scroll>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import navBar from "components/common/navbar/NavBar";
import MainTabBar from "components/content/maintabbar/MainTabBar";
import scroll from 'components/common/scroll/Scroll'
import goodlist from '../../components/content/goods/goodslist'
import { getHomeMultidata, getHomeGoods } from "network/home";

import {debounce} from 'common/untils'

import user from "./profilechild/user";
import all from "./profilechild/three";
import profileList from './profilechild/profileList'
export default {
  name: "Profile",
  components: {
    MainTabBar,
    navBar,
    user,
    all,
    profileList,
    scroll,
    goodlist
  },
  data() {
    return {
      profileList: [
        {icon:require("../../assets/img/profile/message.svg"), info: '我的消息'},
        {icon: require('../../assets/img/profile/pointer.svg'), info: '积分商城'},
        {icon: require('../../assets/img/profile/vip.svg'),info: '会员卡'}],
      profileList2: [
        {icon:require("assets/img/profile/cart.svg"),info: '我的购物车'},
        {icon: require('assets/img/profile/shopping.svg'),info: '下载购物APP'}],
       list:[]
    }
  },
  mounted () { 
    const refresh=debounce(this.$refs.scroll.refresh,50) 
     this.$bus.$on('imgLoad',()=>{    
      refresh()
    })
  },
  activated () {
    this.$refs.scroll.refresh()
  },
  created () {
    this.getHomeGoods()
  },
  methods: {
     getHomeGoods(){
        getHomeGoods('pop',1).then(res => {
        console.log(res);
        this.list=res.data.data.list
      })
      },
  }
};
</script>

<style scoped>
.profile-bar {
  background-color: #ff8a9d;
  color: white;
}
.profile{
  height: 100vh;
  position: relative;
}
.scroll{
  overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
   
}
.wantmore{
  width: 100%;
  padding: 10px 0;
}
.wantmore p{
  text-align: center;
}
.recommend{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    
    padding:20px 0px;
  }
  .line{
    width: 30vw;
    height: 1px;
    background-color: #a3a3a5;
  }
  .tips{
    position: absolute;
    bottom: -20px;
    left: calc(100% - 65%);
  }
  .content{
    height: 100%;
  }
</style>
