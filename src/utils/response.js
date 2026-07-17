const sendResponse = (res, { success, message, status, data = null, errors = null }) => {
  const payload = { success, message };

  if (data !== null) payload.data = data;
  if (errors !== null) payload.errors = errors;

  return res.status(status).json(payload);
};

export const success = (res, message, data = null, status = 200) =>
  sendResponse(res, { success: true, message, status, data });

export const error = (res, message, errors = null, status = 400) =>
  sendResponse(res, { success: false, message, status, errors });
