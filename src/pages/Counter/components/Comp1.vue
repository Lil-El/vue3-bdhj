<template>
  <div>
    <span>第一级-值：</span>
    <el-input-number v-model="state.value"></el-input-number>
    <el-input class="comp-input" v-model="message"></el-input>
  </div>
  <!-- 组件传值：使用v-model方式 -->
  <comp-2 v-model="state.value" />
</template>

<script setup>
import { provide, reactive, watch, ref } from "vue";
import Comp2 from "./Comp2.vue";

const state = reactive({
  value: 10,
});

// 使用provide实现深度组件通信、传值
const message = ref("Hello World!");
provide("message", message);
</script>

<style lang="sass" scoped>
.comp-input
    width: 200px
    margin-left: 20px
</style>