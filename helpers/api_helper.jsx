import { parseApiError } from "@/utils/parseApiError";
import SecureStorage from "@/utils/secureStorage";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import * as url from "./url_helper";

//pass new generated access token here
const token = SecureStore.getItemAsync("token");

//apply base url for axios
const API_URL = process.env.EXPO_PUBLIC_API_URL;

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

// export async function get(url, config = {}) {
//   return await axiosApi
//     .get(url, { ...config })
//     .then((response) => response.data);
// }

// export async function post(url, data, config = {}) {
//   return axiosApi
//     .post(url, { ...data }, { ...config })
//     .then((response) => response.data);
// }

// export async function put(url, data, config = {}) {
//   return axiosApi
//     .put(url, { ...data }, { ...config })
//     .then((response) => response.data);
// }

// export async function del(url, config = {}) {
//   return await axiosApi
//     .delete(url, { ...config })
//     .then((response) => response.data);
// }

const loginUserAuth = async (data) => {
  try {
    const response = await axiosApi.post(url.AUTH_LOGIN_USER, data);

    if (response.status >= 200 && response.status <= 299) {
      await SecureStorage.setItem("token", response.data.token);
      await SecureStorage.setItem("refreshToken", response.data.refreshToken);
      return response.data;
    }

    throw new Error("Unexpected response status");
  } catch (err) {
    let message = parseApiError(err);
    throw new Error(message);
  }
};

const getInvoices = async (data, config = {}) => {
  try {
    const response = await axiosApi.get(url.INVOICE_LIST, { ...config });

    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    }

    throw new Error("Unexpected response status");
  } catch (err) {
    let message = parseApiError(err);
    throw new Error(message);
  }
};

export { getInvoices, loginUserAuth };
