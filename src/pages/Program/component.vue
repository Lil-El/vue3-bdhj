<template>
  <h1>Async Component</h1>
  <span>{{ num }}</span>
</template>

<script setup>
import { onErrorCaptured, ref } from "vue";

const num = ref(0);
await getList();

function getList () {
  return new Promise((r, j) => {
    setTimeout(() => {
      num.value = 1;
      r()
    }, 3000)
  })
}
onErrorCaptured(err => {
  console.log(err);
})
</script>

<style>
</style>