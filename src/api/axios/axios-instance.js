import axios from "axios";

const instance = axios.create({
  baseURL: "https://totoba-2daa8.web.app/",
});

export default instance;
