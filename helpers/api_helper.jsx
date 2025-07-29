import axios from "axios";
import * as url from "./url_helper";

//pass new generated access token here
const token = "accessToken";

//apply base url for axios
const API_URL = process.env.EXPO_PUBLIC_API_URL;

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.defaults.headers.common["Authorization"] = token;

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
      console.log(response.data);
      return response.data;
    }

    throw new Error("Unexpected response status");
  } catch (err) {
    let message = "Something went wrong";
    if (err.response && err.response.status) {
      switch (err.response.status) {
        case 404:
          message = "Sorry! the page you are looking for could not be found";
          break;
        case 500:
          message =
            "Sorry! something went wrong, please contact our support team";
          break;
        case 401:
          message = "Invalid credentials";
          break;
        default:
          message = err.response.data?.message || "An unknown error occurred";
          break;
      }
    } else if (err.message) {
      message = err.message;
    }

    throw new Error(message);
  }
};

export { loginUserAuth };
