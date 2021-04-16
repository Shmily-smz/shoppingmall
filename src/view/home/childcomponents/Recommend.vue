<template>
  <div id="recommend">
    <div class="reitem" v-for="item in recommends" :key="item.index">   <!-- 加key具有唯一标识，Diff算法更加高效 -->
      <a :href="item.link">
        <img :src="item.image" alt />
        <div id="retext">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommend",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style>
#recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
}
.reitem {
  flex: 1;
}
.reitem img {
  width: 70px;
  height: 70px;
  margin-bottom: 8px;
}
#recommend a {
  text-decoration: none;
}
#retext {
  text-decoration: none;
  color: black;
}
</style>