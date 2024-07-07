<template>
  <div class="flex flex-col w-full h-full pl-4 pr-4 py-4 -mr-4">
    <div class="flex flex-row items-center">
      <div class="flex flex-row items-center">
        <div class="text-xl font-semibold">Canaux</div>
        <div
          class="flex items-center justify-center ml-2 text-xs h-5 w-5 text-white bg-red-500 rounded-full font-medium"
        >
          5
        </div>
      </div>
    </div>
    <div class="mt-5">
      <div class="text-xs text-gray-400 font-semibold uppercase">
        Mes abonnements
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
            class="flex items-center justify-center h-10 w-10 rounded-full bg-green-500 text-white font-bold flex-shrink-0"
          >
            #
          </div>
          <div class="flex flex-col flex-grow ml-3">
            <div class="text-sm font-medium">CODEUR MADA</div>
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
        Les canaux publics
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
            class="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white font-bold flex-shrink-0"
          >
            #
          </div>
          <div class="flex flex-col flex-grow ml-3">
            <div class="flex items-center">
              <div class="text-sm font-medium">CUISINE MADA</div>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 right-0 mr-2">
        <button
          class="flex items-center justify-center shadow-sm h-10 w-10 bg-red-500 text-white rounded-full"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
