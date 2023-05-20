const createJsonError = require("../errors/createJsonError");
const throwJsonError = require("../errors/throwJsonError");
const jwt = require("jsonwebtoken");

const accessToken = (headers) => {
  const { authorization } = headers;
  if (!authorization || !authorization.startsWith("Bearer "))
    throwJsonError(403, "Autorización Requerida");

  return authorization.split(" ")[1];
};
const { JWT_SECRET } = process.env;

const validAuth = (req, res, next) => {
  try {
    const { headers } = req;

    const token = accessToken(headers);

    const decodedToken = jwt.verify(token, JWT_SECRET);

    const { name, email, role } = decodedToken;
    req.auth = { name, email, role };
    next();
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = validAuth;
