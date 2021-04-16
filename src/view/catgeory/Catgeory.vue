<template>
  <div class="catgeory">
    <navbar class="navbar">
      <div slot="center">分类</div>
    </navbar>
    <div class="content">
     <left :leftwenzi="leftwenzi" @selectItem="selectItem" class="left"></left>
    <scroll class="wangaoqi4" ref="scroll">
     
      <right :categoryData="categoryData" class="right"></right>
    </scroll>
    </div>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/maintabbar/MainTabBar'
import navbar from 'components/common/navbar/NavBar'
import scroll from 'components/common/scroll/Scroll'

import left from './catgeoryClid/left'
import right from './catgeoryClid/right'

import {debounce} from '../../common/untils'

import {getCategory, getSubcategory} from '../../network/catgeory';

export default {
  name:"Catgeory",
  components: {
    MainTabBar,
    navbar,
    scroll,
    left,
    right
  },
  data () {
    return {
      leftwenzi:[],
      categoryData:[]
    }
  },
  created () {
    this.getCategory()   
  },
   mounted(){
    let refresh = debounce(this.$refs.scroll.refresh,50)
    this.$bus.$on('imgLoad',()=>{
      refresh() 
    })
  },
  methods: {
    getCategory(){
      getCategory().then(res=>{
          //console.log(res);
          this.leftwenzi=res.data.data.category.list
          this.getSubcategory(0)
      })
    },
    getSubcategory(index){
      const maitKey = this.leftwenzi[index].maitKey
     getSubcategory(maitKey).then(res=>{
        console.log(res);     
        this.categoryData=res.data.data.list		   
      })
    },
    selectItem(index) {
        this.getSubcategory(index)
      }
  }  
}
</script>
<style scoped>
 .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    display: flex;
  }
  .wangaoqi4{
    flex: 1;
    height: 100%;
  }
  .navbar{
   background-color: #ff8a9d;
    color:#fff;
}
</style>