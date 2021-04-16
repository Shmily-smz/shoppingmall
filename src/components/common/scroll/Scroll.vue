<template>
  <div class="wrapper" ref="wrapper">
    <!-- 通过ref明确拿到某个子组件 -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType:{
      type:Number,
      default:0,
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data(){
      return{
          scroll:null,
          message:'hahaha'
      }
  },
  mounted () {
    //创建BSroll对象
      this.scroll=new BScroll(this.$refs.wrapper,{
         click:true,                               //默认点击为false,设置为true
         probeType:this.probeType,                 //(0,1,2,3)0与1都是不监听，2是监听手指滚动，3是监听手指滚动和惯性滚动
         pullUpLoad:this.pullUpLoad,
         disableMouse: true,  
        
                  
      })
      //监听滚动事件
      if(this.probeType===3||this.probeType===2){   //优化性能
        this.scroll.on('scroll',(position)=>{
        // console.log(position);
        this.$emit('scrolls',position);   //传出去一个自定义事件scrolls，一个属性position
      })
      }     
      //监听上拉加载更多事件  
      if(this.pullUpLoad){                         //优化性能，默认只能加载一次
         this.scroll.on('pullingUp',()=>{
          //  console.log('完成上拉加载更多');
          this.$emit('pullingup')           
      })
      }
     
  },
  methods: {
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    refresh(){
      this.scroll && this.scroll.refresh()
      // console.log('11111');
      
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  }
};
</script>

<style scoped>
</style>
