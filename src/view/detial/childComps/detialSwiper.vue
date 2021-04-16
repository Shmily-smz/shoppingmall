<template>
  <el-carousel :interval="5000" arrow="always" class="detial-sw swiperr">
    <el-carousel-item v-for="item in topImages" :key="item.index">
        <img :src="item" alt />
    </el-carousel-item>
  </el-carousel>
</template>

<script>

export default {
  name:"detialSwiper",
  components: {
     
  },
  props: {
      topImages:{
          type:Array,
          default(){
              return []
          }
      }
  }
}
</script>

<style scoped>
@import '/static/css/yourStyle.css';
 .swiperr{
   height: 300px;
   overflow: hidden;
 }
.swiperr .el-carousel__button{
  width: 7px !important;
  height: 7px !important;
  border-radius: 50% !important;
}
.swiperr img{
  width: 100%;
 
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>