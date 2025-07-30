import axios from "axios";
import * as SecureStore from "expo-secure-store";
import * as url from "./url_helper";
const defErrorMessage =
  "No response from server. Please check your internet connection.!";
// const defErrorMessage = "An error occured processing your current request!";

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {
    alert("No values stored under that key.");
  }

  return result;
}

//pass new generated access token here
const token = SecureStore.getItemAsync("token");

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
      // console.log(response.data);
      await SecureStore.setItemAsync("token", response.data.token);
      await SecureStore.setItemAsync(
        "refreshToken",
        response.data.refreshToken
      );
      return response.data;
    }

    throw new Error("Unexpected response status");
  } catch (err) {
    let message = "An error occured processing your current request!";
    // if (err.response && err.response.status) {
    //   switch (err.response.status) {
    //     case 500:
    //       message =
    //         "Sorry! something went wrong, please contact our support team";
    //       break;
    //     // case 401:
    //     //   message = "Invalid credentials";
    //     //   break;
    //     default:
    //       message = err.response?.data;
    //       break;
    //   }
    // } else if (err.request) {
    //   message = err.message;
    // }

    if (err.response) {
      const data = err.response.data;

      if (typeof data === "string") {
        message = data;
      } else if (data?.message) {
        message = data.message;
      } else if (Array.isArray(data?.errors)) {
        // Join multiple errors if it's an array of strings
        message = data.errors.join(", ");
      } else if (typeof data?.errors === "object") {
        // If errors is an object like { email: ['Email is invalid'] }
        const errorMessages = Object.values(data.errors).flat().join(", ");
        message = errorMessages || message;
      }
    } else if (err.request) {
      // Request made but no response received (network error, timeout, etc)
      message = defErrorMessage;
    } else if (err.message) {
      message = err.message;
    }

    throw new Error(message);
  }
};

export { loginUserAuth };
