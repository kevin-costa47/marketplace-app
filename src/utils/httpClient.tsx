import axios from "axios";

export const httpClient = axios.create({
  baseURL: "https://fakestoreapi.com/",
});

export default httpClient;
