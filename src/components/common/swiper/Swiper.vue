<template>
  <div id="wrapper">
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="item in bannerss" :key="item.index">
        <a :href="item.link">
          <img :src="item.image" alt @load="imgLoad" />
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  data () {
    return {
      istrue:true
    }
  },
  props: {
    bannerss: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    imgLoad(){
      if(this.istrue){
        this.$emit('imgLoad')
        this.istrue=false
      }
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

html {
  font-size: 14px;
}
#wrapper .el-carousel__container {
  width: 100%;
   height: 300px;
  display: flex;
}
.el-carousel__button {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}
#wrapper .el-carousel__container img {
  width: 100%;
  height: 100%;
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
