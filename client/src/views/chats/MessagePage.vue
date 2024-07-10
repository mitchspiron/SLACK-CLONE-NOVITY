<template>
    <div
      class="antialiased flex flex-row h-screen text-white bg-gray-50 dark:bg-gray-900"
    >
      <div class="flex flex-row w-96 flex-shrink-0 p-4">
        <Sidebar />
        <ChatList />
      </div>
      <HomeMessage/>
    </div>
  </template>
  
  <script setup>
  import Sidebar from "../../components/layouts/Sidebar.vue";
  import ChatList from "../../components/chats/ChatList.vue";
  import HomeMessage from "../../components/chats/HomeMessage.vue";
  </script>
  