<template>
  <div id="app">
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { decodeToken } from "./utils/decodeToken";
import { useUserStore } from "./stores/user";

onMounted(() => {
  const token = localStorage.getItem("slack_token");
  if (token) {
    const decode = decodeToken(token);
    if (decode && typeof decode === "object") {
      const { iat, exp, ...filteredData } = decode;
      const userStore = useUserStore();
      userStore.setUser(filteredData);
      userStore.setConnected();
    } else {
      console.log("Le token décodé n'est pas un objet valide :", decode);
    }
  } else {
    console.log("🚀 ~  Be a good developer");
  }
});
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
