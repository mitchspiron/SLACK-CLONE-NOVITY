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

export const createMessage = async (
  user: any,
  content: string,
  recipientId: string
) => {
  const response = await api.post("/message", { user, content, recipientId });
  return response.data;
};

export const editMessage = async (
  user: any,
  content: string,
  messageId: string
) => {
  const response = await api.patch("/message", { user, content, messageId });
  return response;
};

export const deleteMessageById = async (user: any, messageId: string) => {
  const response = await api.post("/message/delete", { user, messageId });
  return response.data;
};

export const getAllMessageByChatId = async (user: any, chatId: string) => {
  const response = await api.post(`/message/chat/${chatId}`, { user });
  return response.data;
};

export const updateAllMessageToSeenByChatId = async (user: any, chatId: string) => {
  const response = await api.post(`/message/to-seen/${chatId}`, { user });
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
