<template>
  <div class="tab-bar-item" @click="itemClick()">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-active-icon"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red"
    }
  },
  data() {
    return {
      // isActive:true,
    };
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
      // 判断$router.path是当前处于活跃的path，父传子传过来一个this.path，如果这两个一样就调用indexOf()如果不等于-1就是两个path一样
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    }
  },
  methods: {
    itemClick() {
      this.$router.push(this.path);
    }
  }
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  height: 48px;
  text-align: center;
  font-size: 12px;
  color: black;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 5px;
  vertical-align: middle;
}
</style>