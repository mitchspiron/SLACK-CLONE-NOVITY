import { defineStore } from "pinia";
import { loginUser, isLoggedIn, updateUserStatus } from "../api/auth.api";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {
      id: "",
      email: "",
      firstname: "",
      lastname: "",
      status: "",
    },
    isConnected: false,
  }),
  actions: {
    async login(email: string, password: string) {
      const response = await loginUser(email, password);
      localStorage.setItem("slack_token", response.data.access_token);
      this.user = response.data.user;
      this.isConnected = true;
      await updateUserStatus(this.user.id);
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
    async logout() {
      await updateUserStatus(this.user.id);
      localStorage.removeItem("slack_token");
      this.isConnected = false;
      this.user = {
        id: "",
        email: "",
        firstname: "",
        lastname: "",
        status: "",
      };
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
