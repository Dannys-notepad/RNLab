import logError from "../utils/logger.js";
import { error as sendError } from "../utils/response.js";

const errorHandler = (err, req, res, next) => {
  logError(err, req);

  const status = err.status || 500;
  const message = err.isOperational
    ? err.message
    : "Something went wrong";

  const payload = {
    message,
    errors: err.details || null,
  };

  return sendError(res, message, payload.errors, status);
};

export default errorHandler;