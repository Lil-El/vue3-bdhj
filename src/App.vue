<script setup>
import { reactive, watch, ref } from "vue";
import { useRouter } from "vue-router";
import { setStorage, getStorage } from "./utils/storage";
import { routes } from "./router"

const router = useRouter();

const history = ref(getStorage("HISTORY") == "history");

// 菜单
const state = reactive({
  defaultName: "",
  menu: routes.filter(r => r.name).map(i => i.name),
});

// 监听路由变化，选中对应的Menu
watch(
  () => router.currentRoute.value,
  (r) => {
    state.defaultName = r.name;
  },
  {
    immediate: true,
    deep: true,
  }
);

// history切换
const onChange = (val) => {
  setStorage("HISTORY", val ? "history" : "hash");
  window.open("/");
};
</script>

<template>
  <div class="nav-bar flex-x-center">
    <el-menu class="el-menu-demo" mode="horizontal" :default-active="state.defaultName" router>
      <el-menu-item v-for="item in state.menu" :key="item" :index="item">
        {{
        item
        }}
      </el-menu-item>
    </el-menu>
    <div>
      <!-- <el-color-picker v-model="color" show-alpha /> -->
      <el-switch v-model="history" active-text="History" inactive-text="Hash" @change="onChange" />
    </div>
  </div>

  <div class="app-container">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
#app {
  animation: background-animate 2.2s ease-in-out infinite;
}
@keyframes background-animate {
  0% {
    background-color: white;
  }
  50% {
    background-color: rgba(239, 255, 254, 0.8);
  }
  100% {
    background-color: white;
  }
}
</style>

<style scoped>
.nav-bar {
  padding: 0 12px 0 4px;
  background-color: white;
  justify-content: space-between;
  box-shadow: 0px -8px 20px 0 rgb(90, 90, 90);
}
:deep(.el-menu) {
  flex: 1;
}
.router_fade-enter-active {
  animation: fadeIn 0.8s;
}
.router_bounce-enter-active {
  animation: bounceInDown 0.8s;
}
.router_slide-enter-active {
  animation: slideInRight 0.8s;
}
.router_fade-leave-active,
.router_bounce-leave-active,
.router_slide-leave-active {
  animation: slideOutLeft 0.8s;
}
</style>