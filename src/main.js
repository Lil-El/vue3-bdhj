import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";

import App from "./App.vue";

import "element-plus/dist/index.css";
import "animate.css/animate.min.css";

import router from "./router";
import "./assets/style.css";
import "./assets/index.scss";

import mixin from "./mixin";

const app = createApp(App);

app.mixin(mixin);

app.use(createPinia()).use(router).use(ElementPlus);
app.mount("#app");
