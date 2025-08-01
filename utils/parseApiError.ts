// utils/parseApiError.ts

export function parseApiError(
  err: any,
  fallbackMessage = "An error occured processing your current request!"
) {
  let message = fallbackMessage;

  if (err?.response) {
    const data = err.response.data;

    if (typeof data === "string") {
      message = data;
    } else if (data?.message) {
      message = data.message;
    } else if (Array.isArray(data?.errors)) {
      message = data.errors.join(", ");
    } else if (typeof data?.errors === "object") {
      message = Object.values(data.errors).flat().join(", ") || message;
    }
  } else if (err?.request) {
    // Request was made but no response received
    message =
      "No response from server. Please check your internet connection.!";
  } else if (err?.message) {
    message = err.message;
  }

  return message;
}
