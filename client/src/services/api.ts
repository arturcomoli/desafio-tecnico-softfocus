import axios from "axios";

const api = axios.create({
  baseURL: "https://desafio-softfocus-backend.herokuapp.com",
  timeout: 20000,
});

export default api;
