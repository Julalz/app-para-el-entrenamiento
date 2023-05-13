const createJsonError = require("../../errors/createJsonError");

const uploadImageProfile = async (req, res) => {
  try {
    res.status(204);
    res.send();
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = uploadImageProfile;
