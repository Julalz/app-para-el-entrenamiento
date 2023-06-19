const throwJsonError = require("../errors/throwJsonError");

const isAdmin = (role, email) => {
  if (role !== "admin") {
    throwJsonError(
      401,
      `${email} No tienes permisos para realizar esta acción`
    );
  }

  return true;
};

module.exports = { isAdmin };
