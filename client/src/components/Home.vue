<template>
  <div
    class="antialiased flex flex-row h-screen text-white bg-gray-50 dark:bg-gray-900"
  >
    <div class="flex flex-row w-96 flex-shrink-0 p-4">
      <Sidebar />
      <ChatList />
    </div>
    <div class="flex flex-col h-full w-full bg-gray-600 px-4 py-4">
      <section class="bg-white dark:bg-gray-900 h-full my-auto">
        <div
          class="my-12 grid max-w-screen-xl px-4 py-auto mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12"
        >
          <div class="mr-auto place-self-center lg:col-span-7">
            <h1
              class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"
            >
              Nous vous souhaitons rebonjour 👋
            </h1>
            <p
              class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
          <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <Welcome />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "./layouts/Sidebar.vue";
import ChatBox from "./chats/ChatBox.vue";
import ChatList from "./chats/ChatList.vue";
import Welcome from "./layouts/Welcome.vue";
</script>
