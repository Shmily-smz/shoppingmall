<template>
  <div id="app">
    <keep-alive exclude="Detial">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {}
};
</script>

<style scoped>
@import "assets/css/normal.css"; /* 引入normal.css *,在style里面引用样式有固定的格式@import,如果在main.js里面引用就是import ... from*/
</style>
