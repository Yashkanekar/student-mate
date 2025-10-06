import axios from "axios";

const API_BASE_URL = "https://student-mate-server.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,

  headers: {},
});

export default api;
