const createJsonError = (error, res) => {
  console.log("ERROR", error);
  const { status, message } = error;
  res.status(status || (error.details ? 422 : 500));
  res.send({
    error: message,
  });
};

module.exports = createJsonError;
