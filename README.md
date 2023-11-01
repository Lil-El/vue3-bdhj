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
  使用 1.则在 Main.vue 中修改，使用 2，在 App.vue 修改

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

  > 对应的 Home.vue, Counter.vue 的 template 需要一个 root 节点
  >
  > ```html
  > <template>
  >   <div>h1 span ...</div>
  > </template>
  > ```
  >
  > transition 内的顶层需要一个节点，如果是多个会产生问题。
  > 所以 component（即其他的 vue 文件）需要有一个 div 包裹

- style lang="sass": 没有“{}”，“;”
  style lang="scss"
- transition 其中一个页面的切换效果不生效：该页面设置了 animate，导致和 transition 的 animate 冲突
- 异步组件：1. 仅异步的加载组件(.vue)，即懒加载的路由或组件；与组件内部的异步请求逻辑无关 2. setup 顶层 await
- Suspense：可以和异步组件搭配使用
- git cherry-pick: 在 feature 上 commit 提交了修改，切换到 master 时使用`git cherry-pick [commit-id前5位]`，可以将 commit 在 master 上也进行修改
- git merge: 在 feature 上 commit 提交修改，切换到 master 时使用`git merge feature`，可以将 feature 合并到 master 上

## blog

- [rules 自动校验](https://blog.csdn.net/qq_38425020/article/details/128779662)
