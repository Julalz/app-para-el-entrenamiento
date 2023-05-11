const createJsonError = (error, res) => {
  const { status, message } = error;

  if (res && typeof res === "object") {
    res.status(status || (error.details ? 422 : 500));
    res.send({
      error: message,
    });
  } else {
    console.error("Error: 'res' is not a valid object");
  }
};

module.exports = createJsonError;
