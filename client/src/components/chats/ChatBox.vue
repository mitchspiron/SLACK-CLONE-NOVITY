<template>
  <div class="flex flex-col h-full w-full bg-gray-600 px-4 py-6">
    <div
      class="flex flex-row items-center py-4 px-6 rounded-2xl shadow bg-gray-50 dark:bg-gray-700"
    >
      <div
        class="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-100"
      >
        T
      </div>
      <div class="flex flex-col ml-3">
        <div class="font-semibold text-sm">Mitch Spiron</div>
        <div class="text-xs text-gray-500">Active</div>
      </div>
      <div class="ml-auto">
        <ul class="flex flex-row items-center space-x-2">
          <li>
            <a
              href="#"
              class="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-400 h-10 w-10 rounded-full"
            >
              <span>
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  ></path>
                </svg>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="h-full overflow-hidden py-4">
      <div class="h-full overflow-y-auto">
        <div class="grid grid-cols-12 gap-y-2">
          <div class="col-start-1 col-end-8 p-3 rounded-lg">
            <div class="flex items-start gap-2.5">
              <div
                class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
              >
                A
              </div>
              <div class="flex flex-col gap-1 w-full max-w-[320px]">
                <div class="flex items-center space-x-2 rtl:space-x-reverse">
                  <span
                    class="text-sm font-semibold text-gray-900 dark:text-white"
                    >Bonnie Green</span
                  >
                  <span
                    class="text-sm font-normal text-gray-500 dark:text-gray-400"
                    >11:46</span
                  >
                </div>
                <div
                  class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700"
                >
                  <p class="text-sm font-normal text-gray-900 dark:text-white">
                    That's awesome. I think our users will really appreciate the
                    improvements.
                  </p>
                </div>
                <span
                  class="text-sm font-normal text-gray-500 dark:text-gray-400"
                  >Delivered</span
                >
              </div>
            </div>
          </div>
          <div class="col-start-6 col-end-13 p-3 rounded-lg">
            <div class="flex items-center justify-end gap-2">
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                data-dropdown-placement="bottom-end"
                class="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
                type="button"
              >
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 4 15"
                >
                  <path
                    d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                  />
                </svg>
              </button>
              <div
                id="dropdown"
                class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-500 dark:divide-gray-600"
              >
                <ul
                  class="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >Modifier</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >Supprimer</a
                    >
                  </li>
                </ul>
              </div>
              <div class="flex flex-col gap-1 w-full max-w-[320px]">
                <div class="flex items-center space-x-2 rtl:space-x-reverse">
                  <span
                    class="text-sm font-normal text-gray-500 dark:text-gray-400"
                    >11:46</span
                  >
                </div>
                <div
                  class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-xl dark:bg-gray-700"
                >
                  <p class="text-sm font-normal text-gray-900 dark:text-white">
                    That's awesome. I think our users will really appreciate the
                    improvements.
                  </p>
                </div>
                <span
                  class="text-sm font-normal text-gray-500 dark:text-gray-400"
                  >Delivered</span
                >
              </div>
            </div>
          </div>
          <div class="col-start-1 col-end-8 p-3 rounded-lg">
            <div class="flex items-start gap-2.5">
              <div
                class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
              >
                A
              </div>
              <div class="flex flex-col gap-1 w-full max-w-[320px]">
                <div class="flex items-center space-x-2 rtl:space-x-reverse">
                  <span
                    class="text-sm font-semibold text-gray-900 dark:text-white"
                    >Bonnie Green</span
                  >
                  <span
                    class="text-sm font-normal text-gray-500 dark:text-gray-400"
                    >11:46</span
                  >
                </div>
                <div
                  class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700"
                >
                  <p class="text-sm font-normal text-gray-900 dark:text-white">
                    That's awesome. I think our users will really appreciate the
                    improvements.
                  </p>
                </div>
                <span
                  class="text-sm font-normal text-gray-500 dark:text-gray-400"
                  >Delivered</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <form>
      <label for="chat" class="sr-only">Laissez un message</label>
      <div
        class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700"
      >
        <textarea
          id="chat"
          rows="1"
          class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Laissez un message..."
        ></textarea>
        <button
          type="submit"
          class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
        >
          <svg
            class="w-5 h-5 rotate-90 rtl:-rotate-90"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 20"
          >
            <path
              d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"
            />
          </svg>
          <span class="sr-only">Envoyer</span>
        </button>
      </div>
    </form>
  </div>
</template>
