<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img
          class="w-8 h-8 mr-2"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="logo"
        />
        SlackClone
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Créer un compte
          </h1>
          <form
            @submit.prevent="registerHandler"
            class="space-y-4 md:space-y-6"
            action="#"
          >
            <div>
              <label
                for="firstname"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Votre prénom</label
              >
              <input
                type="text"
                name="firstname"
                id="firstname"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                v-model="form.firstname"
              />
              <span v-if="v$.firstname.$error">{{
                v$.firstname.$errors[0].$message
              }}</span>
            </div>
            <div>
              <label
                for="firstname"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Votre nom</label
              >
              <input
                type="text"
                name="lastname"
                id="lastname"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Doe"
                v-model="form.lastname"
              />
              <span v-if="v$.lastname.$error">{{
                v$.lastname.$errors[0].$message
              }}</span>
            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Votre email</label
              >
              <input
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                v-model="form.email"
              />
              <span v-if="v$.email.$error">{{
                v$.email.$errors[0].$message
              }}</span>
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Mot de passe</label
              >
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-model="form.password"
              />
              <span v-if="v$.password.$error">{{
                v$.password.$errors[0].$message
              }}</span>
            </div>
            <div>
              <label
                for="confirm-password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Confirmation mot de passe</label
              >
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-model="form.confirm"
              />
              <span v-if="v$.confirm.$error">{{
                v$.confirm.$errors[0].$message
              }}</span>
            </div>
            <button
              type="submit"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              S'inscrire
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Avez-vous déjà un compte ?
              <router-link
                to="/login"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Se connecter ici</router-link
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { signUpUser } from "../../api/auth.api";
import { useVuelidate } from "@vuelidate/core";
import {
  sameAs,
  maxLength,
  minLength,
  required,
  email,
} from "@vuelidate/validators";

const router = useRouter();
const errorMessage = ref<string | null>(null);
const toast = useToast();

const form = reactive({
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirm: "",
});

const rules = computed(() => {
  return {
    firstname: {
      required,
    },
    lastname: {
      required,
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(15),
    },
    confirm: {
      required,
      sameAs: sameAs(form.password),
    },
  };
});

const v$ = useVuelidate(rules, form);

const registerHandler = async () => {
  try {
    const result = await v$.value.$validate();
    if (!result) {
      return;
    }
    errorMessage.value = null;
    const response = await signUpUser(
      form.firstname,
      form.lastname,
      form.email,
      form.password
    );
    if (response) {
      router.push("/login");
      toast.success(response?.message);
    }
  } catch (error: any) {
    toast.warning(error.response?.data?.message);
  }
};
</script>

<style scoped>
span {
  color: red;
  font-size: 0.8em;
  text-align: left;
}
</style>
