export function formatApiError(error: unknown) {
  const defaultMessage = "Something went wrong. Please try again.";

  if (!error) return { message: defaultMessage };

  const anyErr = error as any;
  let code: number | undefined;
  let message: string = defaultMessage;

  // Axios-style response
  if (anyErr?.response) {
    code = anyErr.response?.status;
    const data = anyErr.response?.data;

    if (data) {
      if (typeof data === "string") {
        message = data;
      } else if (typeof data.message === "string" && data.message.trim()) {
        message = data.message;
      } else if (typeof data.error === "string" && data.error.trim()) {
        message = data.error;
      } else if (data.errors) {
        try {
          if (Array.isArray(data.errors) && data.errors.length > 0) {
            const first = data.errors[0];
            message = first?.message || JSON.stringify(first) || message;
          } else if (typeof data.errors === "object") {
            message = Object.values(data.errors)
              .flat()
              .map((v: any) => (typeof v === "string" ? v : JSON.stringify(v)))
              .join(" ") || message;
          }
        } catch (e) {
          // ignore parsing errors
        }
      } else if (anyErr.message) {
        message = anyErr.message;
      }
    } else if (anyErr.message) {
      message = anyErr.message;
    }
  } else if (anyErr instanceof Error) {
    message = anyErr.message || defaultMessage;
  } else if (typeof anyErr === "string") {
    message = anyErr;
  } else if (typeof anyErr === "object") {
    message = (anyErr && (anyErr.message || anyErr.error)) || defaultMessage;
  }

  // Map some status codes to friendlier messages when the raw message is generic
  if (code === 400 && /Request failed/.test(message)) {
    message = "Bad request. Please check the data and try again.";
  } else if (code === 401) {
    message = "Unauthorized. Please login again.";
  } else if (code === 403) {
    message = "You don't have permission to perform this action.";
  } else if (code === 404) {
    message = "Requested resource was not found.";
  } else if (code && code >= 500) {
    message = "Server error. Please try again later.";
  }

  return { message, code };
}
