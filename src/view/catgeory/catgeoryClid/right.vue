<template>
  <div class="rightimg">
    <div class="all" v-for="(item,index) in categoryData" :key="index">
      <a href="item.link" style="text-decoration: none; color: black;">
          <img :src="item.image" @load="imgLoad" alt="">
        <div class="itemtitle">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "right",
  props: {
    categoryData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
 methods:{
    imgLoad(){
      this.$bus.$emit('imgLoad')
    }
  }
};
</script>

<style scoped>
 .rightimg{
    flex-wrap: wrap;
  
    color: #f4f4f4;
  }
  .all{
    width: 40%;
    margin-left: 20px;
    display: inline-block;
    
  }
.all img {
  width: 100%;
}
.all a div {
  text-align: center; 
}

</style>