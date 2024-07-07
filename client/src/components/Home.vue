<template>
  <div
    class="antialiased flex flex-row h-screen text-white bg-gray-50 dark:bg-gray-900"
  >
    <div class="flex flex-row w-96 flex-shrink-0 p-4">
      <Sidebar />
      <ChatList />
    </div>
    <ChatBox />
  </div>
</template>

<script setup>
import Sidebar from "./layouts/Sidebar.vue";
import ChatBox from "./chats/ChatBox.vue";
import ChatList from "./chats/ChatList.vue";
</script>
