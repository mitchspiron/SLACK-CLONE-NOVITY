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

export const signUpUser = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string
) => {
  const response = await api.post("/auth/signup", {
    firstname,
    lastname,
    email,
    password,
  });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const isLoggedIn = async () => {
  const response = await api.get("/auth/verify");
  return response.data;
};

export const updateUserStatus = async (userId: any) => {
  const response = await api.patch("/auth/change-status", { userId });
  return response.data;
};
