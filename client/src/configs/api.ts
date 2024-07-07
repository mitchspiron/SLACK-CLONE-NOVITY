import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("slack_token"),
  },
});

export const handleApiError = (error: any) => {
  console.error("API Error:", error.response.data.message);
};
