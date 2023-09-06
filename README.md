# Vue 3 + Vite

> vue3 / vite / vue-router / pinia / animate.css / element-plus

## Vue3 Q&A

- 页面重复渲染：routes 中使用了 App.vue（createApp(App.vue)）
- pinia: `defineStore(id, options)`, `defineStore(id, storeSetup)`
- router 配置：
  1.  router.js
      ```javascript
      const routes = [
        {
          path: "/",
          redirect: "Home",
          component: () => import("./Main.vue"),
          children: [
            {
              name: "Home",
              path: "/Home",
              component: () => import("./pages/Home.vue"),
            },
          ],
        },
      ];
      ```
      App.vue
      ```
          <template><router-view></router-view></template>
      ```
      Main.vue
      ```
          <template>
              <el-menu></el-menu>
              <!-- 其他公共组件 -->
              <router-view></router-view>
          </template>
      ```
  2.  router.js
      ```javascript
      const routes = [
        {
          path: "/",
          redirect: "Home",
        },
        {
          name: "Home",
          path: "/Home",
          component: () => import("./pages/Home.vue"),
        },
        {
          name: "Tabs",
          path: "/Tabs",
          component: () => import("./pages/Tabs/index.vue"),
        },
      ];
      ```
      App.vue
      ```
          <template>
              <el-menu></el-menu>
              <!-- 其他公共组件 -->
              <router-view></router-view>
          </template>
      ```
      `Main.vue`删除
- transition:
    使用1.则在Main.vue中修改，使用2，在App.vue修改
    ```html
        <router-view v-slot="{ Component }">
            <transition name="fade-right" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
        <style scoped>
            .fade-right-enter-to,
            .fade-right-leave-from {
                opacity: 1;
                transform: none;
            }

            .fade-right-enter-active,
            .fade-right-leave-active {
                transition: all 0.5s;
            }

            .fade-right-enter-from,
            .fade-right-leave-to {
                opacity: 0;
                transform: translateX(20px);
            }
        </style>
    ```
    > 对应的Home.vue, Counter.vue的template需要一个root节点
    > ```html
    > <template>
    >    <div>
    >        h1
    >        span
    >        ...
    >    </div>
    > </template>
    > ```
- style lang="sass": 没有“{}”，“;”
  style lang="scss"
- transition其中一个页面的切换效果不生效：该页面设置了animate，导致和transition的animate冲突
- 异步组件：1. 仅异步的加载组件(.vue)，即懒加载的路由或组件；与组件内部的异步请求逻辑无关
          2. setup 顶层await
- Suspense：可以和异步组件搭配使用

## blog

- [rules自动校验](https://blog.csdn.net/qq_38425020/article/details/128779662)