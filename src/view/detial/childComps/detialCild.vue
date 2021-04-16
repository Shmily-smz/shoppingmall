<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="detial-child">
        <div
          class="detial-item"
          v-for="(item,index) in titles"
          :key="item.index"
          :class="{active:currentIndex===index}"
          @click="itemClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>
<script>
import navBar from 'components/common/navbar/NavBar'
export default {
  name:"detialCild",
  components: {
      navBar
  },
  data () {
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
     itemClick(index){
       this.currentIndex=index
       this.$emit('itemClick',index)
     },
     backClick(){
       this.$router.go(-1)
     }
  },
}
</script>

<style>
.detial-child {
  display: flex;
  font-size: 13px;
}
.detial-item {
  flex: 1;
}
.active {
  color: red;
}
.back{
  margin-top: 4px;
}
.back img{
  width: 17px;
  height: 17px;
}
</style>