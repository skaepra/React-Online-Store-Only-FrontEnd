// shared/api/apis.ts
import axios from "axios";

const Api = axios.create({
  baseURL: "https://bazzar-backend-krgn.onrender.com", // رابط الباك إند لديك
});

// إرفاق التوكن تلقائياً مع كل طلب
Api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default Api;