<template>
  <div class="flex flex-col w-full h-full pl-4 pr-4 py-4 -mr-4">
    <div class="flex flex-row items-center">
      <div class="flex flex-row items-center">
        <div class="text-xl font-semibold">Messages</div>
        <!-- <div
          class="flex items-center justify-center ml-2 text-xs h-5 w-5 text-white bg-red-500 rounded-full font-medium"
        >
          5
        </div> -->
      </div>
    </div>
    <div class="mt-5">
      <div class="text-xs text-gray-400 font-semibold uppercase">
        Mes messages
      </div>
      <form class="mt-2 max-w-md mx-auto">
        <label
          for="default-search"
          class="mb-1 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >Search</label
        >
        <div class="relative">
          <div
            class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
          >
            <svg
              class="w-3 h-3 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-2 ps-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Chercher un utilisateur..."
            v-model="chatSearchQuery"
          />
        </div>
      </form>
    </div>

    <div class="h-3/6 overflow-hidden relative pt-2">
      <div class="flex flex-col h-full overflow-y-auto -mx-4">
        <div
          v-if="filteredChats.length == 0"
          class="relative flex flex-row items-center p-4"
        >
          Aucun utilisateur trouvé
        </div>
        <div
          v-for="user in filteredChats"
          :key="user.id"
          class="relative flex flex-row items-center p-4 cursor-pointer"
          @click="goToChat(user.chatId)"
        >
          <div class="absolute text-xs text-gray-400 right-0 mr-8 pb-4">
            {{ moment(user.lastMessageCreatedAt).startOf("hour").fromNow() }}
          </div>
          <div
            class="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-pink-300 font-bold flex-shrink-0"
          >
            <minidenticon-svg
              :username="user.otherUserFirstName + ' ' + user.otherUserLastName"
              class="h-10 w-10"
            ></minidenticon-svg>
          </div>
          <div :class="{
                  ' flex flex-col flex-grow m-1 rounded-xl px-3':
                    me.id === user.lastMessageSenderId,
                  'flex flex-col flex-grow bg-gray-600 m-1 rounded-xl px-2 py-1':
                    me.id !== user.lastMessageSenderId &&
                    user.lastMessageStatus === 'SENT',
                  'flex flex-col flex-grow m-1 rounded-xl px-3':
                    me.id !== user.lastMessageSenderId &&
                    user.lastMessageStatus !== 'SENT',
                }">
            <div class="flex items-center">
              <div class="text-sm font-medium">
                {{ user.otherUserFirstName + " " + user.otherUserLastName }}
              </div>

              <div
                v-if="user.otherUserStatus === 'ONLINE'"
                class="h-2 w-2 rounded-full bg-green-500 ml-2"
              ></div>
            </div>
            <div class="text-xs truncate w-40">
              {{
                me.id == user.lastMessageSenderId
                  ? "vous: " + user.lastMessageContent
                  : user.lastMessageContent
              }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <div class="text-xs text-gray-400 font-semibold uppercase">
        Les utilisateurs inscrits
      </div>
      <form class="mt-2 max-w-md mx-auto">
        <label
          for="default-search"
          class="mb-1 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >Search</label
        >
        <div class="relative">
          <div
            class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
          >
            <svg
              class="w-3 h-3 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-2 ps-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Chercher un utilisateur..."
            v-model="userSearchQuery"
          />
        </div>
      </form>
    </div>

    <div class="h-3/6 overflow-hidden relative pt-2">
      <div class="flex flex-col divide-y h-full overflow-y-auto -mx-4">
        <div
          v-if="filteredSubscribedUsers.length == 0"
          class="relative flex flex-row items-center p-4"
        >
          Aucun utilisateur trouvé
        </div>
        <div
          v-for="user in filteredSubscribedUsers"
          :key="user.id"
          class="flex flex-row items-center p-4"
        >
          <div
            class="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-pink-300 font-bold flex-shrink-0"
          >
            <minidenticon-svg
              :username="user.firstname + ' ' + user.lastname"
              class="h-10 w-10"
            ></minidenticon-svg>
          </div>
          <div class="flex flex-col flex-grow ml-3">
            <div class="flex items-center">
              <div class="text-sm font-medium">
                {{ user.firstname + " " + user.lastname }}
              </div>
              <div
                v-if="user.status === 'ONLINE'"
                class="h-2 w-2 rounded-full bg-green-500 ml-2"
              ></div>
            </div>
          </div>
          <button
            @click="sendMessage(user.id)"
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
import { minidenticon } from "minidenticons";
import { ref, onMounted, computed } from "vue";
import { useUserStore } from "../../stores/user.ts";
import {
  getAllUsersNotChatedByUser,
  getAllUserChatsByUserId,
  createMessage,
} from "../../api/message.api";
import { useRouter } from "vue-router";
import { socket } from "../../configs/socket";

const router = useRouter();
const userStore = useUserStore();

const user = ref(userStore.user);
const me = ref(userStore.me);
const users_not_chated = ref([]);
const users_chated = ref([]);
const userSearchQuery = ref("");
const chatSearchQuery = ref("");
const recipientId = ref("");

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

const goToChat = async (chatId) => {
  router.push(`/message/${chatId}`);
};

const sendMessage = async (userId) => {
  try {
    recipientId.value = userId;
    const response = await createMessage(
      user.value,
      "Salut 👋",
      recipientId.value
    );
    socket.emit("send-message", response.data);
    goToChat(response.data.message.chatId);
    return response;
  } catch (error) {
    console.error("An error occured while sending message:", error);
  }
};

const filteredSubscribedUsers = computed(() => {
  return users_not_chated.value.filter((user) => {
    const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
    return fullName.includes(userSearchQuery.value.toLowerCase());
  });
});

const filteredChats = computed(() => {
  return users_chated.value.filter((user) => {
    const fullName =
      `${user.otherUserFirstName} ${user.otherUserLastName}`.toLowerCase();
    return fullName.includes(chatSearchQuery.value.toLowerCase());
  });
});

onMounted(() => {
  getUsersNotChated(user);
  getAllUserChats(user);
  socket.on("arrival-message", () => {
    getAllUserChats(user);
  });
});
</script>
