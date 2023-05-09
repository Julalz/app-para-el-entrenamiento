"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const createJsonError = require("../../errors/createJsonError");
const { findUserByEmail } = require("../../repositories/usersRepository");
const throwJsonError = require("../../errors/throwJsonError");
const { response } = require("express");

const schema = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().min(4).max(20).required(),
});
async function loginUser(req, res) {
  try {
    const { body } = req;
    const { email, password } = body;
    await schema.validateAsync(body);

    const UserCheckByEmail = await findUserByEmail(email);
    if (!UserCheckByEmail) {
      throwJsonError(
        403,
        " Este usuario y contraseña no se encuentra registrado"
      );
    }
    const { password: passwordHash, verifiedAt } = UserCheckByEmail;
    const passwordChecked = await bcrypt.compare(password, passwordHash);
    if (!passwordChecked) {
      throwJsonError(
        403,
        " Este usuario y contraseña no se encuentra registrado"
      );

      const { JWT_SECRET } = process.env;

      const tokenLoad = {
        id,
        email,
        role,
      };
      const token = jwt.sign(tokenLoad, JWT_SECRET, {
        expiresIn: `1m`,
      });
      console.log(token);
      res.status(200);
      res.send("ok");
    }
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = loginUser;
