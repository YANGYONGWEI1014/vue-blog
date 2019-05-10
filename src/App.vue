<template>
  <div id="app" :key="Key" >
    <!-- 路由匹配到的组件将显示在这里 -->
    <!-- keep-alive是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM。解决路由跳转后页面不刷新。 -->
    <!-- <keep-alive> -->
    <router-view></router-view>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
import Canvas from "@/assets/js/canvas-nest.min.js";
import Click from "@/assets/js/click.js";
export default {
  name: "App",
  components: {
    Canvas
  },
  data() {
    return {
      Key: ''
    };
  },
  watch: {
    $route: function(newUrl, oldUrl) {
      this.Key = new Date().getTime();
    }
  }
};
</script>

<style>
canvas {
  background: #EEE9E9;
}

</style>
