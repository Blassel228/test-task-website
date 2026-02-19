import axios, {AxiosInstance} from "axios";
import qs from "qs";

const baseApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL!,
  withCredentials: true,
  timeout: 60000,
  paramsSerializer: (params) => {
    return qs.stringify(params, {
      arrayFormat: "repeat",
      skipNulls: true,
    });
  },
});

baseApi.interceptors.request.use(config => {
  console.log(
    "➡️",
    config?.method?.toUpperCase(),
    (config?.baseURL ?? '') + (config?.url ?? ''),
    config?.params || ""
  );
  return config;
});

baseApi.interceptors.response.use(
  res => {
    console.log("✅", res.status, res.config.url, res.data);
    return res;
  },
  err => {
    console.error("❌", err.response?.status, err.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default baseApi;