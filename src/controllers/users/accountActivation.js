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
    const { name, id, verifiedAt } = userData;
    if (verifiedAt) {
      throwJsonError(400, `${name} ya ha sido verificado`);
    }
    console.log("hola");
    await atVerificationDate(id);

    console.log(userData);
    res.status(200);
    res.send(`${name} bienvenido! Su cuenta ha sido Verificada`);
  } catch (error) {
    createJsonError(error, res);
  }
}
module.exports = activationAccount;
