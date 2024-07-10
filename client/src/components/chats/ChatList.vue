<template>
  <div class="flex flex-col w-full h-full pl-4 pr-4 py-4 -mr-4">
    <div class="flex flex-row items-center">
      <div class="flex flex-row items-center">
        <div class="text-xl font-semibold">Messages</div>
        <div
          class="flex items-center justify-center ml-2 text-xs h-5 w-5 text-white bg-red-500 rounded-full font-medium"
        >
          5
        </div>
      </div>
    </div>
    <div class="mt-5">
      <div class="text-xs text-gray-400 font-semibold uppercase">
        Mes messages
      </div>
    </div>

    <div class="h-3/6 overflow-hidden relative pt-2">
      <div class="flex flex-col h-full overflow-y-auto -mx-4">
        <div
          v-for="user in users_chated"
          :key="user.id"
          class="relative flex flex-row items-center p-4 cursor-pointer"
          @click="goToChat(user.chatId)"
        >
          <div class="absolute text-xs text-gray-500 right-0 mr-4">
            {{ moment(user.lastMessageCreatedAt).startOf("hour").fromNow() }}
          </div>
          <div
            class="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0"
          >
            {{ Array.from(user.otherUserFirstName)[0] }}
          </div>
          <div class="flex flex-col flex-grow ml-3">
            <div class="flex items-center">
              <div class="text-sm font-medium">{{ user.otherUserFirstName }}</div>
              <div
                v-if="user.otherUserStatus === 'ONLINE'"
                class="h-2 w-2 rounded-full bg-green-500 ml-2"
              ></div>
            </div>
            <div class="text-xs truncate w-40">
              {{ user.lastMessageContent }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <div class="text-xs text-gray-400 font-semibold uppercase">
        Les utilisateurs connectés
      </div>
    </div>

    <div class="h-3/6 overflow-hidden relative pt-2">
      <div class="flex flex-col divide-y h-full overflow-y-auto -mx-4">
        <div
          v-for="user in users_not_chated"
          :key="user.id"
          class="flex flex-row items-center p-4"
        >
          <div
            class="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0"
          >
            {{ Array.from(user.firstname)[0] }}
          </div>
          <div class="flex flex-col flex-grow ml-3">
            <div class="flex items-center">
              <div class="text-sm font-medium">{{ user.firstname }}</div>
              <div
                v-if="user.status === 'ONLINE'"
                class="h-2 w-2 rounded-full bg-green-500 ml-2"
              ></div>
            </div>
          </div>
          <button
            type="button"
            class="px-3 py-2 me-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              class="w-3 h-3 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path
                d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"
              />
              <path
                d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import { ref, onMounted } from "vue";
import { useUserStore } from "../../stores/user.ts";
import {
  getAllUsersNotChatedByUser,
  getAllUserChatsByUserId,
} from "../../api/message.api";
import { useRouter } from "vue-router";
import { socket } from "../../configs/socket";

const router = useRouter();
const userStore = useUserStore();

const user = ref(userStore.user);
const users_not_chated = ref([]);
const users_chated = ref([]);

const getUsersNotChated = async (user) => {
  try {
    const response = await getAllUsersNotChatedByUser(user.value);
    if (response) {
      users_not_chated.value = response.data.chats;
    }
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};

const getAllUserChats = async (user) => {
  try {
    const response = await getAllUserChatsByUserId(user.value);
    if (response) {
      users_chated.value = response.data.chats;
    }
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};

const goToChat = (link) => {
  router.push(`/message/${link}`);
};

onMounted(() => {
  getUsersNotChated(user);
  getAllUserChats(user);
  socket.on("arrival-message", () => {
    getAllUserChats(user);
  });
});
</script>
