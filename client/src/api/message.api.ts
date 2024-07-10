import { api } from "../configs/api";

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("slack_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const createMessage = async (user: any, content: string, recipientId: string) => {
  const response = await api.post("/message", { user, content, recipientId });
  return response.data;
};

export const editMessage = async () => {
  /* const response = await api.post("/auth/login", { email, password });
    return response.data; */
};

export const deleteMessageById = () => {};

export const getAllMessageByChatId = async (user: any, chatId: string) => {
  const response = await api.post(`/message/chat/${chatId}`, { user });
  return response.data;
};

export const getAllUserChatsByUserId = async (userId: any) => {
  const response = await api.get("/message/user-chat", userId);
  return response.data;
};

export const getAllUsersNotChatedByUser = async (userId: any) => {
  const response = await api.get("/message/user-not-chat", userId);
  return response.data;
};
