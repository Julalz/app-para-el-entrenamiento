const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");
const {
  findUserVerificationCode,
  atVerificationDate,
} = require("../../repositories/usersRepository");

async function activationAccount(req, res) {
  try {
    const { code } = req.params;

    const userData = await findUserVerificationCode(code);
    const { id, verifiedAt } = userData;
    if (verifiedAt) {
      throwJsonError(400, "usuario ya ha sido verificado");
    }
    console.log("hola");
    await atVerificationDate(id);

    console.log(userData);
    res.status(200);
    res.send("ok");
  } catch (error) {
    createJsonError(error, res);
  }
}
module.exports = activationAccount;
