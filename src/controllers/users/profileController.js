const createJsonError = require("../../errors/createJsonError");
const {
  findUserByEmail,
  updateUserRole,
} = require("../../repositories/usersRepository");

const userProfile = async (req, res) => {
  try {
    const { email } = req.auth;
    const user = await findUserByEmail(email);
    const { role, id, name, verifiedAt, verificationCode, createdAt } = user;

    res.status(200);
    res.send({ data: role, id, name, verifiedAt, verificationCode, createdAt });
  } catch (error) {
    createJsonError(error, res);
  }
};
const resquestAdminRole = async (req, res) => {
  try {
    const { email } = req.auth;
    const user = await findUserByEmail(email);
    const { role } = user;

    if (role !== "admin") {
      throwJsonError(403, "No tienes permiso para realizar esta opcion");
    }

    await updateUserRole(email, "admin");

    res.status(200);
    res.send("solicitud de rol admin, enviada");
  } catch (error) {
    throwJsonError(error, massage);
  }
};

module.exports = { userProfile, resquestAdminRole };
