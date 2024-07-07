<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="mx-auto max-w-screen-sm text-center">
        <h1
          class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500"
        >
          404
        </h1>
        <p
          class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white"
        >
          Quelque chose manque.
        </p>
        <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
          Désolé, nous ne pouvons pas trouver cette page. Vous trouverez des
          lots à explorer sur la page d'accueil.
        </p>
        <router-link
          to="/"
          class="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
          >Retour à la page d'accueil</router-link
        >
      </div>
    </div>
  </section>
</template>
