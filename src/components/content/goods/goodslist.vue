<template>
  <div class="goods">
      <goods-list-item v-for="item in goodss" :key="item.index" :goods-item="item"></goods-list-item>
    
  </div>
</template>

<script>
import goodsListItem from './goodsLIstItem'
export default {
    
  name:"goodslist",
  components: {
      goodsListItem,
  },
  props: {
      goodss:{
          type:Array,
          default(){
              return[]
          }
      }
  }
}
</script>

<style>
  .goods{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding: 2px;     
      overflow: hidden;
      margin-bottom: 49px;
  }

</style>