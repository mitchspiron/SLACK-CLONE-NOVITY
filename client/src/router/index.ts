import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/auth/LoginPage.vue";
import RegisterPage from "../views/auth/RegisterPage.vue";
import NotFound from "../views/NotFound.vue";
import HomePage from "../views/HomePage.vue";
import ChatPage from "../views/chats/ChatPage.vue";
import MessagePage from "../views/chats/MessagePage.vue";
import ChannelPage from "../views/channels/ChannelPage.vue";
import { useUserStore } from "../stores/user";

const routes = [
  {
    path: "/",
    component: HomePage,
    meta: {
      title: "Accueil",
      noAccessNotLoggedIn: true,
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
      noAccessTo: true,
    },
  },
  {
    path: "/register",
    component: RegisterPage,
    meta: {
      title: "S'inscrire",
      noAccessTo: true,
    },
  },
  {
    path: "/message",
    component: MessagePage,
    meta: {
      title: "Messages",
      noAccessNotLoggedIn: true,
    },
  },
  {
    path: "/message/:id",
    component: ChatPage,
    meta: {
      title: "Messages",
      noAccessNotLoggedIn: true,
    },
  },
  {
    path: "/channel",
    component: ChannelPage,
    meta: {
      title: "Canaux",
      noAccessNotLoggedIn: true,
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

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.noAccessTo)) {
    const userStore = useUserStore();
    if (!userStore.isLoggedIn) {
      next();
      return;
    }
    next("/");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.noAccessNotLoggedIn)) {
    const userStore = useUserStore();
    if (userStore.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
