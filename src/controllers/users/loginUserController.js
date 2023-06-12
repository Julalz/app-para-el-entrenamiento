"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const createJsonError = require("../../errors/createJsonError");
const { findUserByEmail } = require("../../repositories/usersRepository");
const throwJsonError = require("../../errors/throwJsonError");
const express = require("express");
const SendEmailVerificationRemember = require("../../helpers/RememberActivation");
const SendEmail = require("../../helpers/mailSmtp");

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
        "Este usuario y contraseña no se encuentra registrado"
      );
    }
    const {
      name,
      password: passwordHash,
      verifiedAt,
      role,
      id,
      verificationCode,
    } = UserCheckByEmail;

    const passwordChecked = await bcrypt.compare(password, passwordHash);
    if (!passwordChecked) {
      throwJsonError(
        403,
        "Este usuario y contraseña no se encuentra registrado"
      );
    }
    if (!verifiedAt) {
      await SendEmailVerificationRemember(name, email, verificationCode);
    }
    console.log(verifiedAt);

    const { JWT_SECRET } = process.env;
    const tokenLoad = {
      id,
      email,
      role,
    };
    const token = jwt.sign(tokenLoad, JWT_SECRET, {
      expiresIn: `1y`,
    });
    res.status(200);
    res.json({
      message: `${email} se ha logeado correctamente`,
      data: { verificationCode: verificationCode },
      token,
      expiresIn: "1y",
    });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = loginUser;
