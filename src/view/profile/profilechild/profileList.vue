<template>
  <div class="profilelist">
    <div v-for="(item,index) in profileList" :key='index'>
      <div class="list">
           <img :src="item.icon" alt="">
           <p class="info">{{item.info}}</p>
      </div>      
    </div>
  </div>
</template>

<script>
export default {
  name:"profileList",
  props: {
      profileList:{
         type:Array,
         default(){
             return []
         }
      }
  },
  
}
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
}
.profilelist{
  
   
      border-bottom: 5px solid #F2F2F2;
}
  .list{
   border-bottom: 1px solid #f2f2f2;
   padding:5px 20px;
  
  }
  .list img{
      width: 10vw;
  }
  .list p{
      display: inline-block;
       position: absolute;
       line-height: 10vw;
       margin-left: 15px;
  }
</style>