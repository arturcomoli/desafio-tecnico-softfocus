import axios from "axios";

const api = axios.create({
  baseURL: "https://desafio-softfocus-backend.herokuapp.com",
  timeout: 10000,
});

export default api;
