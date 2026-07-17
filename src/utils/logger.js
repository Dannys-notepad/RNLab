const logError = (error, req = null) => {
  const base = {
    time: new Date().toISOString(),
    message: error.message,
    status: error.status || 500,
    stack: error.stack,
  };

  if (req) {
    base.path = req.path;
    base.method = req.method;
    base.body = req.body;
  }

  console.error(JSON.stringify(base, null, 2));
};

export default logError;