import { defineStore } from "pinia";
import { loginUser } from "../api/auth.api";
import { isLoggedIn } from "../api/auth.api";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
    isConnected: false,
  }),
  actions: {
    async login(email: string, password: string) {
      const response = await loginUser(email, password);
      localStorage.setItem("slack_token", response.data.access_token);
      this.user = response.data.user;
      this.isConnected = true;
      return response;
    },
    async fetchUser() {
      try {
        const userData = await isLoggedIn();
        this.user = userData;
        this.isConnected = true;
      } catch (error) {
        console.error("Failed to fetch user:", error);
        this.isConnected = false;
      }
    },
    logout() {
      localStorage.removeItem("slack_token");
      this.isConnected = false;
      this.user = {};
    },
    setUser(data: any) {
      this.user = data;
    },
    setConnected() {
      this.isConnected = true;
    },
    setDisconnected() {
      this.isConnected = false;
    },
  },
  getters: {
    isLoggedIn: (state) => state.isConnected,
    me: (state) => state.user,
  },
  persist: {
    storage: localStorage,
    key: "slack_token",
  },
});
