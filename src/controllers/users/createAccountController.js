"use strict";
const joi = require("joi");
const bycrypt = require("bcrypt");
const randomstring = require("randomstring");
const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");
const {
  findUserByEmail,
  createUser,
} = require("../../repositories/usersRepository");
const SendEmail = require("../../helpers/mailSmtp");

const schema = joi.object().keys({
  name: joi.string().min(4).max(125).required(),
  email: joi.string().email().required(),
  password: joi.string().min(4).max(20).required(),
});

async function createAccount(req, res) {
  try {
    const { body } = req;
    const { name, email, password } = body;
    await schema.validateAsync(body);

    const user = await findUserByEmail(email);
    if (user) {
      throwJsonError(409, "Usuario ya existe");
    }

    const passwordHash = await bycrypt.hash(password, 12);
    console.log(`password encriptada  ${passwordHash}`);

    const verificationCode = randomstring.generate(64);
    console.log(`codigo de verificacion  ${verificationCode}`);

    const userDB = {
      name,
      email,
      password: passwordHash,
      verificationCode,
    };

    await SendEmail(name, email, verificationCode);

    const userID = await createUser(userDB);

    res.status(201);
    res.send({ id: userID });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = createAccount;
