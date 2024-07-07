import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import "./index.css";
import "flowbite/dist/flowbite.js";
import router from "./router";

import { createPinia } from "pinia";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
  position: "top-center",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
};

createApp(App).use(router).use(Toast, options).use(createPinia()).mount("#app");
