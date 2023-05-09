"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const createJsonError = require("../../errors/createJsonError");
const { findUserByEmail } = require("../../repositories/usersRepository");
const throwJsonError = require("../../errors/throwJsonError");
const express = require("express");

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
        " 1 Este usuario y contraseña no se encuentra registrado"
      );
    }
    const { password: passwordHash, verifiedAt, role, id } = UserCheckByEmail;

    const passwordChecked = await bcrypt.compare(password, passwordHash);
    if (!passwordChecked) {
      throwJsonError(
        403,
        "Este usuario y contraseña no se encuentra registrado"
      );
    }
    if (verifiedAt) {
      throwJsonError(401, "Verifique su cuenta");
    }

    const JWT_SECRET = "asdf1234";
    console.log;
    const tokenLoad = {
      id,
      email,
      role,
    };
    const token = jwt.sign(tokenLoad, JWT_SECRET, {
      expiresIn: `1m`,
    });
    res.status(200);
    res.json({ token });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = loginUser;
