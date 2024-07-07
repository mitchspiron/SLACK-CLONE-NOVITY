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
          v-for="index in 25"
          :key="index"
          class="relative flex flex-row items-center p-4"
        >
          <div class="absolute text-xs text-gray-500 right-0 top-0 mr-4 mt-3">
            5 min
          </div>
          <div
            class="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0"
          >
            T
          </div>
          <div class="flex flex-col flex-grow ml-3">
            <div class="text-sm font-medium">Cuberto</div>
            <div class="text-xs truncate w-40">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis,
              doloribus?
            </div>
          </div>
          <div class="flex-shrink-0 ml-2 self-end mb-1">
            <span
              class="flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs rounded-full"
              >5</span
            >
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
          v-for="index in 15"
          :key="index"
          class="flex flex-row items-center p-4"
        >
          <div
            class="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0"
          >
            T
          </div>
          <div class="flex flex-col flex-grow ml-3">
            <div class="flex items-center">
              <div class="text-sm font-medium">Sarah D</div>
              <div class="h-2 w-2 rounded-full bg-green-500 ml-2"></div>
            </div>
            <div class="text-xs truncate w-40">En ligne</div>
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
