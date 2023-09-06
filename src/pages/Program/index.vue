<template>
  <div>
    <Suspense>
      <template #default>
        <AsyncComponent />
      </template>
      <template v-slot:fallback>Loading...</template>
    </Suspense>
  </div>
</template>

<script setup>
import { defineAsyncComponent, onErrorCaptured } from "vue";
// 1. 异步组件：使用顶层await setup的组件
// import AsyncComponent from "./component.vue"

// 2. 异步组件：通过懒加载获取的组件（Network会请求xxx.vue）
const AsyncComponent = defineAsyncComponent({
  loader: () => import("./component.vue"),
  // Error是component.vue加载失败时展示的，而不是内部promise错误时展示的
  // error: Error 
})

</script>