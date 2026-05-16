import axios from "axios";


const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});


API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);


export const taskAPI = {
  async getTasks() {
    try {
      const response = await API.get("/tasks");
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async createTask(title, description, priority) {
    try {
      const response = await API.post("/tasks", {
        title,
        description,
        priority,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async deleteTask(id) {
    try {
      await API.delete(`/tasks/${id}`);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async updateTask(id, title, description, priority) {
    try {
      const response = await API.put(`/tasks/${id}`, {
        title,
        description,
        priority,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async toggleTask(id) {
    try {
      const response = await API.patch(`/tasks/${id}/toggle`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  async getCurrentUser() {
  try {
    const response = await API.get("/auth/me");
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
},
};

export default API;