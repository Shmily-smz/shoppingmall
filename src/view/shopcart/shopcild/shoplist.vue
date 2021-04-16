<template>
  
  <div class="shoplist">
  <Scroll class="content" ref="scroll">
      <shop-cart-item v-for="item in list" :key="item.index" :item-info="item"></shop-cart-item>    
    </Scroll>
  </div>
   
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import ShopCartItem from './shoplistitem'
export default {
  name:'shoplist',
   components: {
   Scroll,
   ShopCartItem
 },
  props: {
      list:{
          type:Array,
          default(){
            return []
          }
      }
  },
  activated () {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
   .shoplist{
    
     position: relative;
     height:calc(100vh - 132px);
     width: 100%;
   }
   .content{
      height: 100%;
     position: absolute;    
     width: 100%;
     overflow: hidden;
   
   }
</style>