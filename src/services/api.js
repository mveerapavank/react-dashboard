import axios from "axios";

const api = axios.create({
  baseURL: "http://172.18.0.158:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Auto logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

// LOGIN
export const login = async (email, password) => {
  const res = await api.post("/auth/login", {
    email,
    password,
  });

  localStorage.setItem("token", res.data.access_token);
  localStorage.setItem("role", res.data.user.role);
  return res.data;
};

export default api;
