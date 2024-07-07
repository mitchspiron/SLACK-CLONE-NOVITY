<template>
  <div
    class="antialiased flex flex-row h-screen text-white bg-gray-50 dark:bg-gray-900"
  >
    <div class="flex flex-row w-96 flex-shrink-0 p-4">
      <Sidebar />
      <ChannelList />
    </div>
    <ChannelBox />
    <div class="flex flex-col h-full w-1/4">
      <ChannelAbout />
    </div>
  </div>
</template>

<script setup>
import Sidebar from "../../components/layouts/Sidebar.vue";
import ChannelBox from "../../components/channels/ChannelBox.vue";
import ChannelList from "../../components/channels/ChannelList.vue";
import ChannelAbout from "../../components/channels/ChannelAbout.vue";
</script>
