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
import Sidebar from "../../components/layouts/Sidebar.vue";
import ChatBox from "../../components/chats/ChatBox.vue";
import ChatList from "../../components/chats/ChatList.vue";
</script>
