<template>
  <div class="counter-container">
    <h1>Component</h1>
    <el-divider>Start</el-divider>

    <!-- 组件通信、传值 -->
    <comp-1></comp-1>

    <el-divider>End</el-divider>

    <star-1 />
  </div>
</template>

<script setup>
import Comp1 from "./components/Comp1.vue";
import Star1 from "./components/Star.vue";
</script>

<style scoped>
.counter-container {
  padding: 0 20vw;
  margin: 0 auto;
}
</style>