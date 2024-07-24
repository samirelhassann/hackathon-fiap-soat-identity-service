/* eslint-disable no-param-reassign */
import axios from "axios";

import { env } from "@/config/env";

const api = axios.create({
  baseURL: env.VIACEP_URL,
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

export default api;
