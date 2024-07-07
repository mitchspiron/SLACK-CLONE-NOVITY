import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/auth/LoginPage.vue";
import RegisterPage from "../views/auth/RegisterPage.vue";
import NotFound from "../views/NotFound.vue";
import HomePage from "../views/HomePage.vue";
import MessagePage from "../views/chats/MessagePage.vue";
import ChannelPage from "../views/channels/ChannelPage.vue";

const routes = [
  {
    path: "/",
    component: HomePage,
    meta: {
      title: "Accueil",
    },
  },
  {
    path: "/:pathMatch(.*)",
    component: NotFound,
    meta: {
      title: "Page introuvable!",
    },
  },
  {
    path: "/login",
    component: LoginPage,
    meta: {
      title: "Se connecter",
    },
  },
  {
    path: "/register",
    component: RegisterPage,
    meta: {
      title: "S'inscrire",
    },
  },
  {
    path: "/message",
    component: MessagePage,
    meta: {
      title: "Messages",
    },
  },
  {
    path: "/channel",
    component: ChannelPage,
    meta: {
      title: "Canaux",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to) => {
  const title = to.meta.title as string;
  if (title) {
    document.title = title;
  }
});

export default router;
