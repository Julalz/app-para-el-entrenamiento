const createJsonError = (error, res) => {
  const { status, message } = error;

  res.status(status || (error.details ? 422 : 500));
  res.send({
    error: message,
  });
};

module.exports = createJsonError;
