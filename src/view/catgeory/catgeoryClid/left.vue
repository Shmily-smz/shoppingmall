<template>
  <div class="lefttitle">
     <div class="leftitem" v-for="(item,index) in leftwenzi" :key="index" @click="itemClick(index)" :class="{activeindex:index===currentindex}">
         <div class="title">{{item.title}}</div>
     </div>
  </div>
</template>

<script>
export default {
  name:"left",
  data () {
      return {
        currentindex:0      
      }
  },
  props: {
      leftwenzi:{
          type:Array,
          default(){
              return[]
          }
      }
  },
  methods: {
      itemClick(index){
          this.currentindex=index
          this.$emit('selectItem', index)
      }
  }
}
</script>

<style scoped>
.lefttitle{
     background-color: #f7f7f7;
    height: 100%;
    width: 26.66667vw;
    box-sizing: border-box;
}
 .leftitem{
    height: 12vw;
    line-height: 12vw;
    text-align: center;
    font-size: 3.73333vw;
 }
  .activeindex{
      background-color: #fff;
      color:rgb(255, 87, 119);
      border-left: 0.8vw solid rgb(255, 87, 119);
  }
</style>