const throwJsonError = require("../errors/throwJsonError");

const isAdmin = (role) => {
  if (role !== "admin") {
    throwJsonError(401, "No tienes permisos para realizar esta acción");
  }

  return true;
};

module.exports = { isAdmin };
