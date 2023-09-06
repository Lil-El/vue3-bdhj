<template>
  <div>
    <h1 v-if="loading">loading...</h1>
    <div v-else>content</div>
    <button @click="getListWrapper(3, 4)">click</button>
  </div>
</template>

<script setup>
import { ref } from "vue"

function getList (a, b) {
  return new Promise((r) => {
    setTimeout(() => {
      console.log(a, b);
      r()
    }, 3000)
  })
}

const withLoading = (promiseFunc) => {
  const loading = ref(false);
  const fn = async (...args) => {
    loading.value = true;
    const res = await promiseFunc(...args);
    loading.value = false;
    return res;
  }
  return { loading, fn }
}

const { fn: getListWrapper, loading } = withLoading(getList);

getListWrapper(1, 2);

</script>

<style>
</style>