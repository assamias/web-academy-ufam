import axios from "axios";

export const productsApi = axios.create({
  baseURL: "https://ranekapi.origamid.dev/json/api",
});

export const favoriteApi = axios.create({
  baseURL: "https://favorites-json-server-eta.vercel.app",
});
