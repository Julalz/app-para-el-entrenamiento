const createJsonError = (error, res) => {
  console.log("ERROR", error);
  const { status, message } = error;
  res.status(status);
  res.send({
    error: message,
  });
};

module.exports = createJsonError;
