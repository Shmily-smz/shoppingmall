<template>
  <div class="toast" v-show="show">
     <div class="content">{{message}}</div>
  </div>
</template>

<script>
export default {
  name:"toast",
  props: {
      message:{
          type:String,
          default:""
      },
      show:{
          type:Boolean,
          default:false
      }
  }
}
</script>

<style scoped>
  .toast{
      position: fixed;
      top:50%;
      left: 50%;
      transform: translate(-50%,-50%);
   
      z-index: 99;
  }
  .content{
      padding: 10px 15px;
      background-color: rgba(0,0,0,0.75);
      color: white;
  }
</style>