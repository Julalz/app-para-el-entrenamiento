const createJsonError = require("../errors/createJsonError");
const throwJsonError = require("../errors/throwJsonError");
const jwt = require("jsonwebtoken");

const accessToken = (headers) => {
  const { authorization } = headers;
  if (!authorization || !authorization.startsWith("Bearer "))
    throwJsonError(403, "No eres Admin, ponte en contacto con tu superior");

  return authorization.split(" ")[1];
};
const { JWT_SECRET } = process.env;

const validAuth = (req, res, next) => {
  try {
    const { headers } = req;

    const token = accessToken(headers);

    const decodedToken = jwt.verify(token, JWT_SECRET);

    const { id, email, role } = decodedToken;
    req.auth = { id, email, role };
    next();
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = validAuth;
