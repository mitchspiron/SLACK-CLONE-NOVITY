import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/auth/LoginPage.vue";
import RegisterPage from "../views/auth/RegisterPage.vue";
import NotFound from "../views/NotFound.vue";
import HomePage from "../views/HomePage.vue";
import MessagePage from "../views/chats/MessagePage.vue";
import ChannelPage from "../views/channels/ChannelPage.vue";
/* import { decodeToken } from "../utils/decodeToken";
import { useUserStore } from "../stores/user";

const token = localStorage.getItem("slack_token");
if (token) {
  const decode = decodeToken(token);
  if (decode && typeof decode === "object") {
    const { iat, exp, ...filteredData } = decode;
    console.log("🚀 ~ decode:", filteredData);
    const userStore = useUserStore();
    userStore.setUser(filteredData);
  } else {
    console.error("Le token décodé n'est pas un objet valide :", decode);
  }
} else {
  console.error("Aucun token trouvé dans le localStorage");
} */

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
